import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-primary">
              Indigo Cuisine
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A family run Punjabi restaurant, specialising in traditional cuisine.
              Combining the very best spices with culinary skills passed down through generations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold text-foreground">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Claverley Drive<br />
                  Wolverhampton<br />
                  WV4 4PP
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-muted-foreground">
                  <a href="tel:01902621144" className="hover:text-primary transition-colors block">
                    01902 621144
                  </a>
                  <a href="tel:01902621155" className="hover:text-primary transition-colors block">
                    01902 621155
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@indigocuisine.co.uk"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@indigocuisine.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold text-foreground">
              Opening Hours
            </h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Mon - Thurs</p>
                  <p>5:00 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pl-8">
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Fri - Sat</p>
                  <p>5:00 PM - 11:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pl-8">
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Sunday</p>
                  <p>Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Indigo Cuisine. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Authentic Punjabi Cuisine in Wolverhampton
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
