// Arcjet integration — optional, only active if ARCJET_KEY is set.
// In dev without a key, all requests pass through (no blocking).
// Get a free key at https://arcjet.com

type Decision = {
  isDenied: () => boolean
  reason: { isRateLimit: () => boolean }
}

// Stub protector — allows everything
const stubProtect = async (): Promise<Decision> => ({
  isDenied: () => false,
  reason: { isRateLimit: () => false },
})

// Only load Arcjet if a key is configured
let realAj: { protect: (req: unknown) => Promise<Decision> } | null = null

if (process.env.ARCJET_KEY && process.env.ARCJET_KEY !== 'ajtest_dummy_key_for_dev') {
  // Arcjet is loaded dynamically via import() in the route handlers
  // when ARCJET_KEY is set. See api/admin/route.ts and api/content/route.ts.
}

export const aj = {
  protect: stubProtect,
}

// Helper to check if Arcjet is configured
export function isArcjetConfigured(): boolean {
  return !!(
    process.env.ARCJET_KEY &&
    process.env.ARCJET_KEY !== 'ajtest_dummy_key_for_dev'
  )
}

// Dynamic loader — call this in route handlers
export async function loadArcjet(): Promise<{
  protect: (req: unknown) => Promise<Decision>
} | null> {
  if (!isArcjetConfigured()) return null
  try {
    const mod = await import('@arcjet/next')
    const { default: arcjet, detectBot, shield, tokenBucket } = mod
    const instance = arcjet({
      key: process.env.ARCJET_KEY!,
      rules: [
        shield({ mode: 'LIVE' }),
        detectBot({ mode: 'LIVE', block: ['AUTOMATED', 'LIKELY_AUTOMATED'] }),
        tokenBucket({
          mode: 'LIVE',
          characteristics: ['ip.src'],
          refillRate: 10,
          interval: 60,
          capacity: 10,
        }),
      ],
    })
    return { protect: instance.protect.bind(instance) }
  } catch {
    return null
  }
}
