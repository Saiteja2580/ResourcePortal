import Image from "next/image";
import logo from "../../public/scsvmv-logo.png";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-start bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] shadow-[var(--shadow-card)]">
      <Image
        src={logo} // Make sure logo.png is in /public
        alt="University Logo"
        width={200}
        height={40}
        className="mr-4 ml-35"
      />
      <h1
        className="text-2xl font-semibold text-[var(--color-white)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Resource Booking Portal
      </h1>
    </header>
  );
}
