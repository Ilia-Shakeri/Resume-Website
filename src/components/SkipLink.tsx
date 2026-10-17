export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-mint focus:px-4 focus:py-3 focus:text-on-mint"
    >
      {label}
    </a>
  );
}
