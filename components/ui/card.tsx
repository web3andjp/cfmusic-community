export function Card({ children }) {
  return (
    <div className="bg-campfire-panel border border-campfire-border rounded-xl p-5 shadow-lg">
      {children}
    </div>
  );
}