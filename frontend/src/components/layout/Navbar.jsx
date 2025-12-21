import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { User, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActivePath = (path) => location.pathname === path;

  const fullName = user?.full_name || (isLoading ? "Loading..." : "");

  return (
    <>
      <div className="h-16" aria-hidden="true" />
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-white/70 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
        } border-b border-yellow-200`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
              aria-label="Auto Docs Home"
            >
              <img
                src="logo/just_icon.png"
                alt="Logo"
                className="h-11 w-11 sm:h-12 sm:w-12 object-cover rounded-full border-2 border-yellow-400 shadow-md group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition">
                Auto Docs
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-5">
              {NAV_ITEMS.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActivePath(path)
                      ? "bg-yellow-100 text-yellow-700"
                      : "text-gray-700 hover:bg-yellow-200 hover:text-yellow-900"
                  }`}
                  aria-current={isActivePath(path) ? "page" : undefined}
                >
                  {name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="ml-4 flex items-center gap-2 text-base font-semibold text-yellow-700 bg-yellow-100 px-3 py-2 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-200 transition"
                    aria-label="Profile"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline">{fullName}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="ml-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="ml-4 px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-lg shadow hover:bg-yellow-200 transition"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-yellow-200 hover:bg-yellow-300 transition focus:outline-none shadow"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className={`w-7 h-7 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`md:hidden bg-white/90 backdrop-blur-md border-t border-yellow-200 shadow overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pt-3 pb-5 space-y-2">
              {NAV_ITEMS.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={toggleMenu}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActivePath(path)
                      ? "bg-yellow-100 text-yellow-700"
                      : "text-gray-700 hover:bg-yellow-200 hover:text-yellow-900"
                  }`}
                  aria-current={isActivePath(path) ? "page" : undefined}
                >
                  {name}
                </Link>
              ))}
              
              <div className="pt-3 border-t border-yellow-300">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        toggleMenu();
                      }}
                      className="w-full flex items-center gap-2 py-2 px-4 text-base font-semibold text-yellow-700 bg-yellow-100 rounded-lg shadow-sm mb-2 cursor-pointer hover:bg-yellow-200 transition"
                    >
                      <User className="h-5 w-5" />
                      {fullName}
                    </button>
                    <button
                      onClick={() => {
                        toggleMenu();
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg shadow hover:from-yellow-500 hover:to-yellow-700 transition"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      toggleMenu();
                      navigate("/login");
                    }}
                    className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-lg shadow hover:bg-yellow-200 transition"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
