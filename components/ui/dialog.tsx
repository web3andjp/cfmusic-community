export function Dialog({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-campfire-panel p-6 rounded-xl border border-campfire-border shadow-xl">
        {children}
      </div>
    </div>
  );
}