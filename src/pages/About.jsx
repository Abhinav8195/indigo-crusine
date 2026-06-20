import Layout from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Users, Heart, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Utensils,
      title: "Authentic Recipes",
      description: "Traditional Punjabi recipes passed down through generations, prepared with the same love and care as in our family home.",
    },
    {
      icon: Users,
      title: "Family Run",
      description: "We're a close-knit family dedicated to sharing our culinary heritage with the Wolverhampton community.",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish is prepared with passion and attention to detail, using the finest ingredients and authentic spices.",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "We never compromise on quality, sourcing the freshest ingredients and traditional spices for every meal.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-card overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              About Indigo Cuisine
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              A family run Punjabi restaurant, specialising in traditional cuisine
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=500&fit=crop"
                alt="Restaurant interior"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Our Journey
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Indigo Cuisine was born from a passion for authentic Punjabi cooking and 
                a desire to share the rich culinary traditions of our heritage with the 
                people of Wolverhampton.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As a family-run restaurant, we take pride in every dish that leaves our 
                kitchen. Our recipes have been perfected over generations, combining the 
                very best spices with culinary skills passed down through our family.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From the moment you step through our doors, you become part of the 
                Indigo family. We believe in creating not just meals, but memorable 
                experiences that bring people together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Our Culinary Philosophy
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At Indigo Cuisine, we believe that great food starts with great 
                ingredients. We source our spices directly from trusted suppliers, 
                ensuring authentic flavours in every dish.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our tandoor oven is the heart of our kitchen, producing perfectly 
                charred breads and succulent meats that capture the essence of 
                traditional Punjabi cooking.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're enjoying our signature Butter Chicken, savouring a 
                slow-cooked Lamb Shank, or indulging in our freshly baked Naan, 
                each bite tells the story of our culinary heritage.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=500&fit=crop"
                alt="Spices and ingredients"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground text-lg">
              Our values guide everything we do, from sourcing ingredients to serving our guests
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Champagne Lounge */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=500&fit=crop"
                alt="Champagne lounge"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <p className="text-primary font-medium tracking-widest uppercase text-sm">
                Elevated Experience
              </p>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Champagne Lounge
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Complement your dining experience with a visit to our Champagne Lounge, 
                where mixology meets Indian hospitality.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're celebrating a special occasion or simply unwinding after 
                a delicious meal, our carefully curated selection of champagnes, wines, 
                and signature cocktails offers the perfect accompaniment.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Let our expert staff guide you through our drinks menu to find the 
                perfect pairing for your chosen dishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Behind every great dish is a passionate team. From our skilled chefs who 
              bring decades of experience to our kitchen, to our warm and welcoming 
              front-of-house staff, everyone at Indigo Cuisine is committed to making 
              your visit exceptional.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We're more than colleagues – we're family. And when you dine with us, 
              you become part of that family too.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-secondary-foreground mb-6">
            Experience Indigo Cuisine
          </h2>
          <p className="text-secondary-foreground/80 text-xl mb-8 max-w-2xl mx-auto">
            We look forward to welcoming you to our restaurant and sharing our 
            love of authentic Punjabi cuisine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01902621144"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Call to Book: 01902 621144
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
