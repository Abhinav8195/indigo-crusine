import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Utensils, Star, ChefHat } from "lucide-react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const features = [
    {
      icon: ChefHat,
      title: "Authentic Recipes",
      description: "Traditional Punjabi recipes passed down through generations, prepared with love and expertise.",
    },
    {
      icon: Utensils,
      title: "Premium Ingredients",
      description: "We source only the finest spices and freshest ingredients for an unforgettable dining experience.",
    },
    {
      icon: Star,
      title: "Award-Winning",
      description: "Recognised for excellence in authentic Indian cuisine and outstanding customer service.",
    },
  ];

  const signatureDishes = [
    {
      name: "Tandoori Mixed Grill",
      description: "A stunning selection of our finest tandoori specialities",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
    },
    {
      name: "Lamb Rogan Josh",
      description: "Slow-cooked lamb in aromatic Kashmiri spices",
      image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=400&h=300&fit=crop",
    },
    {
      name: "Chicken Tikka Masala",
      description: "Our signature creamy tomato-based curry",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <p className="text-primary font-medium tracking-widest uppercase text-sm md:text-base">
              Welcome to
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground">
              Indigo Cuisine
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
              A family run Punjabi restaurant, specialising in traditional cuisine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/menu">
                  View Our Menu
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-primary font-medium tracking-widest uppercase text-sm">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Authentic Punjabi Flavours
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At Indigo Cuisine, we combine the very best spices with culinary skills 
                passed down through generations. Our family-run restaurant brings you 
                the authentic taste of Punjab, right here in Wolverhampton.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every dish is prepared with passion, using traditional recipes and 
                the finest ingredients to create an unforgettable dining experience.
              </p>
              <Button asChild variant="link" className="text-primary p-0 text-lg">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=500&fit=crop"
                alt="Indian spices and ingredients"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
                <p className="font-serif text-3xl font-bold">15+</p>
                <p className="text-sm font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              The Indigo Experience
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Culinary Excellence
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Signature Dishes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {signatureDishes.map((dish, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/menu">
                View Full Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Opening Hours & Location */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Opening Hours */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                  <h3 className="font-serif text-3xl font-bold text-foreground">
                    Opening Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-foreground font-medium">Monday - Thursday</span>
                    <span className="text-primary font-semibold">5:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-foreground font-medium">Friday - Saturday</span>
                    <span className="text-primary font-semibold">5:00 PM - 11:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-foreground font-medium">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-8 h-8 text-primary" />
                  <h3 className="font-serif text-3xl font-bold text-foreground">
                    Find Us
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-lg">
                    Claverley Drive<br />
                    Wolverhampton<br />
                    WV4 4PP
                  </p>
                  <div className="space-y-2">
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Tel: </span>
                      <a href="tel:01902621144" className="text-primary hover:text-saffron transition-colors">
                        01902 621144
                      </a>
                    </p>
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Tel: </span>
                      <a href="tel:01902621155" className="text-primary hover:text-saffron transition-colors">
                        01902 621155
                      </a>
                    </p>
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Email: </span>
                      <a href="mailto:info@indigocuisine.co.uk" className="text-primary hover:text-saffron transition-colors">
                        info@indigocuisine.co.uk
                      </a>
                    </p>
                  </div>
                </div>
                <Button asChild className="mt-6 w-full" size="lg">
                  <Link to="/contact">
                    Get Directions
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
            Ready to Experience Authentic Indian Cuisine?
          </h2>
          <p className="text-secondary-foreground/80 text-xl mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable culinary journey through the flavours of Punjab
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="tel:01902621144">
                Call to Book
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
              <Link to="/menu">
                View Menu
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
