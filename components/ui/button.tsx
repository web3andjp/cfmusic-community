import { cn } from "@/lib/utils";

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-3 rounded-lg font-semibold transition",
        "bg-campfire-amber text-black hover:bg-campfire-amberHover",
        className
      )}
      {...props}
    />
  );
}
