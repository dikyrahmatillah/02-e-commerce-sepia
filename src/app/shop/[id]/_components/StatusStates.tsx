export const LoadingState = () => (
  <div className="bg-[#fbf7f4] text-brand-ink">
    <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24">
      <div className="rounded-2xl border border-brand-ink-soft bg-white px-8 py-6 text-sm text-brand-ink shadow-[0_18px_45px_rgba(160,114,90,0.18)]">
        Loading product details...
      </div>
    </section>
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div className="bg-[#fbf7f4] text-brand-ink">
    <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24">
      <div className="rounded-2xl border border-brand-ink-soft bg-white px-8 py-6 text-sm text-brand-ink shadow-[0_18px_45px_rgba(160,114,90,0.18)]">
        {message}
      </div>
    </section>
  </div>
);
