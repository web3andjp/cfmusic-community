export function Badge({ children }) {
  return (
    <span className="px-2 py-1 rounded-md bg-campfire-amber/20 text-campfire-amber text-xs font-semibold">
      {children}
    </span>
  );
}