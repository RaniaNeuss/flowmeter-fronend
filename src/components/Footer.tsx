'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background px-6 py-4 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Flow Meter System</span>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>

        <div className="flex items-center gap-2">
          <span>Built with</span>
          <Button variant="link" asChild className="p-0 h-auto text-blue-500">
            <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
              Nuess Company
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
