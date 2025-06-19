import Link from "next/link";
import { Button } from "../components/ui/button";

const Home = async () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 gap-4">
      <Button asChild>
        <Link href={"/produits"}>Voir la liste des produits</Link>
      </Button>
      <Button asChild>
        <Link href={"/factures"}>Voir les factures</Link>
      </Button>
    </div>
  );
};
export default Home;
