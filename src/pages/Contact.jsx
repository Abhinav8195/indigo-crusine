import Layout from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Static form - no actual submission
    alert("Thank you for your message! This is a static form. Please call us directly at 01902 621144 to make a reservation or enquiry.");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Get In Touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question, want to make 
            a reservation, or just want to say hello
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Visit Us
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  We're conveniently located in Wolverhampton and look forward 
                  to welcoming you to Indigo Cuisine.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Address */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                          Address
                        </h3>
                        <p className="text-muted-foreground">
                          Claverley Drive<br />
                          Wolverhampton<br />
                          WV4 4PP
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                          Phone
                        </h3>
                        <div className="space-y-1">
                          <a
                            href="tel:01902621144"
                            className="block text-muted-foreground hover:text-primary transition-colors"
                          >
                            01902 621144
                          </a>
                          <a
                            href="tel:01902621155"
                            className="block text-muted-foreground hover:text-primary transition-colors"
                          >
                            01902 621155
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                          Email
                        </h3>
                        <a
                          href="mailto:info@indigocuisine.co.uk"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          info@indigocuisine.co.uk
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Opening Hours */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                          Opening Hours
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monday - Thursday</span>
                            <span className="text-foreground font-medium">5:00 PM - 11:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Friday - Saturday</span>
                            <span className="text-foreground font-medium">5:00 PM - 11:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sunday</span>
                            <span className="text-foreground font-medium">Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    For reservations, please call us directly for immediate confirmation
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Your phone number"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        rows={5}
                        required
                        className="bg-background resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-card border-border overflow-hidden">
            <div className="aspect-[21/9] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.0!2d-2.15!3d52.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDM0JzQ4LjAiTiAywrAwOScwMC4wIlc!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Indigo Cuisine Location"
                className="grayscale contrast-125"
              ></iframe>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Call CTA */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
            Prefer to Call?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-6">
            For immediate reservations and enquiries, give us a call
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01902621144"
              className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground font-medium rounded-md hover:bg-background/90 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              01902 621144
            </a>
            <a
              href="tel:01902621155"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-foreground text-primary-foreground font-medium rounded-md hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              01902 621155
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
