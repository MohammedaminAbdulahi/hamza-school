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

// Helper to check if Arcjet is configured
export function isArcjetConfigured(): boolean {
  return !!(
    process.env.ARCJET_KEY &&
    process.env.ARCJET_KEY !== 'ajtest_dummy_key_for_dev'
  )
}

// Dynamic loader — call this in route handlers
// Returns null if Arcjet isn't configured or the package isn't installed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadArcjet(): Promise<{ protect: (req: any) => Promise<Decision> } | null> {
  if (!isArcjetConfigured()) return null
  try {
    const { default: arcjet, detectBot, shield, tokenBucket } = await import('@arcjet/next')
    const instance = arcjet({
      key: process.env.ARCJET_KEY!,
      rules: [
        shield({ mode: 'LIVE' }),
        detectBot({ mode: 'LIVE', allow: [] }),
        tokenBucket({
          mode: 'LIVE',
          characteristics: ['ip.src'],
          refillRate: 10,
          interval: 60,
          capacity: 10,
        }),
      ],
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { protect: instance.protect.bind(instance) as any }
  } catch {
    return null
  }
}

// Stub instance for when Arcjet isn't configured
export const aj = {
  protect: stubProtect,
}
