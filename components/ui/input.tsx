import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-10 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 shadow-sm transition-all duration-200",
        
        // Placeholder & file input
        "placeholder:text-gray-400 file:border-0 file:bg-transparent file:text-sm file:font-medium",

        // Focus styles
        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",

        // Dark mode
        "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Custom class override
        className
      )}
      {...props}
    />
  )
}

export { Input }
