import logo from "../assets/logo.webp";

function Header() {
  return (
<header className="relative flex items-center px-8 py-3 bg-white shadow-sm">
      <img
        src={logo}
        alt="Excellence Training Centre Logo"
        className="h-28 w-auto object-contain"
      />

      <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-black">
        Excellence Training Centre
      </h1>

    </header>
  );
}

export default Header;