import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <nav>
        <Link href="/" className="mr-4">
          Accueil
        </Link>
        <Link href="/produits" className="mr-4">
          Produits
        </Link>
        <Link href="/factures">Factures</Link>
      </nav>
    </header>
  );
};
export default Header;
