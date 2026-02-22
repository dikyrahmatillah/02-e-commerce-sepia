import FilterIcon from "@/components/icons/FilterIcon";

type Option = { label: string; count: number };

type Props = {
  categoryOptions: Option[];
  selectedCategories: string[];
  onToggle: (label: string) => void;
};

export default function CategoryFilter({
  categoryOptions,
  selectedCategories,
  onToggle,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm font-semibold text-brand-ink">
        <span className="grid h-8 w-8 place-items-center rounded-full border border-brand-ink-soft bg-white">
          <FilterIcon width={16} height={16} className="text-brand-ink" />
        </span>
        Filter
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink-soft">
          Category
        </p>
        <div className="space-y-3">
          {categoryOptions.map((item) => (
            <label
              key={item.label}
              className="flex items-center gap-3 text-sm text-brand-ink cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(item.label)}
                onChange={() => onToggle(item.label)}
                className="h-4 w-4 rounded accent-(--brand-ink) cursor-pointer"
              />
              <span>
                {item.label} ({item.count})
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
