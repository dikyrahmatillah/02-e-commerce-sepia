type Props = {
  selectedDiscounts: string[];
  onToggle: (value: string) => void;
};

export default function DiscountFilter({ selectedDiscounts, onToggle }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink-soft">
        Discount
      </p>
      <div className="space-y-2">
        <label className="flex items-center gap-3 text-sm text-brand-ink cursor-pointer">
          <input
            type="checkbox"
            checked={selectedDiscounts.includes("sale")}
            onChange={() => onToggle("sale")}
            className="h-4 w-4 rounded  accent-(--brand-ink) cursor-pointer"
          />
          <span className="h-3 w-3 rounded-full bg-brand-ink" />
          On Sale
        </label>
      </div>
    </div>
  );
}
