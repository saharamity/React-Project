import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { FiSearch } from "react-icons/fi";
import { searchAction } from "../../../Store/SearchSlice";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage navbar toggle
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchAction.searchWord(value));
  };

  const toggleNavbar = () => {
    setIsOpen(prev => !prev); // Toggle the navbar open state
  };

  return (
    <Navbar fluid rounded className="p-5 shadow-lg" style={{ backgroundColor: "#112e42" }}>
      <Navbar.Brand as={Link} to="/home">
        <span className="self-center text-3xl font-semibold" style={{ color: "#00abf0" }}>Sahar.</span>
      </Navbar.Brand>

      <Navbar.Toggle onClick={toggleNavbar} /> {/* Call toggle function on click */}

      <Navbar.Collapse className={`flex flex-col items-center md:flex-row space-x-4 ${isOpen ? 'block' : 'hidden'}`}> {/* Toggle visibility */}
        <div className="flex items-center justify-center w-full mx-4 my-4 md:my-0 md:mx-10 md:w-1/3">
          <TextInput
            className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            placeholder="Find services or products..."
            style={{ backgroundColor: "#ededed", color: "#081b29" }}
            rightIcon={FiSearch}
            onChange={search}
          />
        </div>

        {!user && (
          <Navbar.Link as={Link} to="/register" active={location === "/register"} className="text-lg font-semibold" style={{ color: "#ededed" }}>
            Register
          </Navbar.Link>
        )}
        {!user && (
          <Navbar.Link as={Link} to="/login" active={location === "/login"} className="text-lg font-semibold" style={{ color: "#ededed" }}>
            Login
          </Navbar.Link>
        )}
        {user && (
          <Navbar.Link as={Link} to="/favorites" active={location === "/favorites"} className="text-lg font-semibold" style={{ color: "#ededed" }}>
            Favorites
          </Navbar.Link>
        )}
        {user?.isBusiness && (
          <Navbar.Link as={Link} to="/myCard" active={location === "/myCard"} className="text-lg font-semibold" style={{ color: "#ededed" }}>
            My Card
          </Navbar.Link>
        )}
        {user?.isBusiness && (
          <Navbar.Link as={Link} to="/updateUser" active={location === "/updateUser"} className="text-lg font-semibold" style={{ color: "#ededed" }}>
            Profile
          </Navbar.Link>
        )}
        <Navbar.Link as={Link} to="/about" active={location === "/about"} className="text-lg font-semibold" style={{ color: "#ededed" }}>
          About
        </Navbar.Link>
        {user && (
          <Navbar.Link className="text-lg font-semibold" onClick={logout} style={{ color: "#ededed" }}>
            Logout
          </Navbar.Link>
        )}
        <DarkThemeToggle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
