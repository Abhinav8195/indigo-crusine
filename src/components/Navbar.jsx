import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User, LogOut, ClipboardList, CalendarDays, UserRound } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BookTableDialog from "./BookTableDialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { count, setIsOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <span className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Indigo Cuisine
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <BookTableDialog />
            <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} aria-label="Cart" className="relative">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Button>
            {user ? (
              <div className="relative group">
                <Button variant="ghost" size="icon" aria-label="User menu" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
                <div className="absolute right-0 mt-1 w-56 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex flex-col py-2">
                  <div className="px-4 py-2 font-semibold text-sm border-b border-border">My Account</div>
                  <Link to="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors">
                    <UserRound className="mr-2 h-4 w-4" />
                    Profile Details
                  </Link>
                  <Link to="/profile?tab=orders" className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Past Orders
                  </Link>
                  <Link to="/profile?tab=reservations" className="flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Table Bookings
                  </Link>
                  <div className="border-t border-border my-1"></div>
                  <button onClick={logout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/login"><User className="w-4 h-4 mr-1" />Login</Link>
              </Button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} aria-label="Cart" className="relative">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl px-6 py-6 flex flex-col space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium text-lg transition-colors duration-300 hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <BookTableDialog />
              </div>
              
              {user ? (
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="font-bold text-foreground text-sm uppercase tracking-wider">My Account</div>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-primary transition-colors">Profile Details</Link>
                  <Link to="/profile?tab=orders" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-primary transition-colors">Past Orders</Link>
                  <Link to="/profile?tab=reservations" onClick={() => setIsOpen(false)} className="block py-2 text-foreground/80 hover:text-primary transition-colors">Table Bookings</Link>
                  <Button variant="outline" onClick={() => { logout(); setIsOpen(false); }} className="mt-4 w-full justify-center text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />Log out
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-border">
                  <Button asChild variant="default" className="w-full justify-center text-lg h-12">
                    <Link to="/login" onClick={() => setIsOpen(false)}><User className="w-5 h-5 mr-2" />Login / Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
