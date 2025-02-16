export default function Footer() {
  const year = new Date().getFullYear();
  return <footer className="my-20 text-neutral-600">© {year} falconhvy</footer>;
}
