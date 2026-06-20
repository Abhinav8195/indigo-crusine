import { useState } from "react";
import Layout from "../components/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
      alt: "Butter Chicken with Naan",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      alt: "Restaurant Interior",
      category: "Ambiance",
    },
    {
      src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=600&fit=crop",
      alt: "Tandoori Mixed Grill",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
      alt: "Chicken Tikka Masala",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      alt: "Dining Area",
      category: "Ambiance",
    },
    {
      src: "https://images.unsplash.com/photo-1545247181-516773cae754?w=800&h=600&fit=crop",
      alt: "Lamb Curry",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",
      alt: "Fresh Spices",
      category: "Ingredients",
    },
    {
      src: "https://images.unsplash.com/photo-1574653853027-5d99c7b1a9fc?w=800&h=600&fit=crop",
      alt: "Biryani",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop",
      alt: "Bar Area",
      category: "Ambiance",
    },
    {
      src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop",
      alt: "Samosas",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800&h=600&fit=crop",
      alt: "Naan Bread",
      category: "Food",
    },
    {
      src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
      alt: "Restaurant Exterior",
      category: "Ambiance",
    },
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Visual Journey
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Gallery
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            A glimpse into the Indigo Cuisine experience - from our beautifully 
            presented dishes to our warm and inviting atmosphere
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-foreground font-serif text-lg font-semibold">
                      {image.alt}
                    </p>
                    <p className="text-primary text-sm mt-1">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl w-full p-0 bg-background border-border overflow-hidden">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            {selectedImage && (
              <div className="aspect-video">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Caption */}
            {selectedImage && (
              <div className="p-4 text-center bg-card">
                <p className="text-foreground font-serif text-xl font-semibold">
                  {selectedImage.alt}
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  {currentIndex + 1} of {galleryImages.length}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Experience It In Person
          </h2>
          <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
            Photos can only show so much. Visit us to experience the full ambiance, 
            aromas, and flavours of Indigo Cuisine
          </p>
          <a
            href="tel:01902621144"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Book Your Table: 01902 621144
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
