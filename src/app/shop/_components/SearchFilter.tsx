import SearchIcon from "@/components/icons/SearchIcon";

type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  onSearch: (trimmed: string) => void;
};

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  onSearch,
}: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink-soft">
        Search
      </p>
      <form
        className="flex items-center rounded-full border border-brand-ink-soft bg-white px-4 py-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch(searchTerm.trim());
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-ink-soft"
        />
        <button
          type="submit"
          className="grid h-8 w-8 place-items-center rounded-full bg-brand-ink text-white cursor-pointer"
          aria-label="Search products"
        >
          <SearchIcon width={14} height={14} />
        </button>
      </form>
    </div>
  );
}
