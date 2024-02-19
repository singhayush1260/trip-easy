import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from '../components/SignOutButton';
const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 px-2">
      <div className="container mx-auto flex justify-between">
        <span className="text-1xl text-white font-bold tracking-tight">
          <Link to="/">Trip Ease</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="flex items-center text-white px-3 py-1 font-medium hover:bg-blue-600 rounded-sm">My Bookings</Link>
              <Link to="/my-hotels" className="flex items-center text-white px-3 py-1 font-medium hover:bg-blue-600 rounded-sm">My Hotels</Link>
              <SignOutButton/>
            </>
          ) : (
            <Link to="/sign-in" className="flex items-center bg-white text-blue-600 px-3 font-medium rounded-sm hover:bg-gray-200">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
