
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold mb-4 text-[#1EAEDB]">404</h1>
        <p className="text-xl mb-6">Oops! The page you're looking for couldn't be found.</p>
        <p className="text-gray-400 mb-8">
          The URL <span className="text-[#1EAEDB]">{location.pathname}</span> might be incorrect or the page may have been moved or deleted.
        </p>
        <Link to="/">
          <Button className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
