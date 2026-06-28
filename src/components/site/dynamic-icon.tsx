'use client'

import * as React from 'react'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

type IconProps = React.ComponentProps<'svg'>

interface DynamicIconProps extends IconProps {
  name: string
}

/**
 * Renders a Lucide icon by its string name.
 * Falls back to a circle if the name is not found.
 */
export function DynamicIcon({ name, className, ...props }: DynamicIconProps) {
  const Comp = (Icons as unknown as Record<string, React.ComponentType<IconProps>>)[name]
  if (!Comp) {
    return <Icons.Circle className={cn(className)} {...props} />
  }
  return <Comp className={cn(className)} {...props} />
}
