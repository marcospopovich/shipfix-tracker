import type React from "react"
import { cn } from "@/lib/utils"

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 text-sm font-medium transition hover:bg-gray-50",
        className
      )}
      {...props}
    />
  )
}
