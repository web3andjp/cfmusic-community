import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-3 rounded-lg",
        "bg-campfire-panel text-white placeholder-campfire-textMuted",
        "border border-campfire-border focus:border-campfire-amber focus:ring-1 focus:ring-campfire-amber",
        "min-h-[140px]",
        className
      )}
      {...props}
    />
  );
}