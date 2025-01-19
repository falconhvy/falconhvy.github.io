export default function Footer() {
  const year = new Date().getFullYear();
  return <footer className="mt-16 py-2 text-neutral-600">© {year} wdvsh</footer>;
}
