import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full px-4 py-3 rounded-lg",
        "bg-campfire-panel text-white placeholder-campfire-textMuted",
        "border border-campfire-border focus:border-campfire-amber focus:ring-1 focus:ring-campfire-amber",
        className
      )}
      {...props}
    />
  );
}