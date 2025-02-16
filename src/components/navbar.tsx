import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { label: "home", href: "/" },
    { label: "github", href: "https://github.com/falconhvy" },
    { label: "wiki", href: "https://organization-dtn.gitbook.io/wdvsh" },
  ];

  return (
    <nav className="py-10">
      <ul className="flex select-none flex-row font-medium">
        {navItems.map(item => (
          <li key={item.label} className="mr-10">
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
