type Props = {
  minPrice: number;
  maxPrice: number;
  maxPriceFilter: number | null;
  onChange: (value: number) => void;
  formatPrice: (v: number | null) => string;
};

export default function PriceFilter({
  minPrice,
  maxPrice,
  maxPriceFilter,
  onChange,
  formatPrice,
}: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink-soft">
        Price
      </p>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={maxPriceFilter ?? maxPrice}
        step={0.01}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-(--brand-ink) cursor-pointer"
      />
      <div className="flex items-center justify-between text-xs text-brand-ink-soft">
        <div className="rounded-md border border-[#ead7ce] bg-white px-3 py-2">
          {formatPrice(minPrice)}
        </div>
        <div className="rounded-md border border-[#ead7ce] bg-white px-3 py-2">
          {formatPrice(maxPriceFilter ?? maxPrice)}
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-brand-ink-soft">
        <span>Min. Price</span>
        <span>Max. Price</span>
      </div>
    </div>
  );
}
