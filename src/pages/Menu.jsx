import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Default ingredient mappings — keyword based
const ingredientMap = [
  { match: /tikka masala/i, ing: "Yogurt-marinated meat, tomato, cream, garam masala, fenugreek, ginger, garlic" },
  { match: /butter chicken/i, ing: "Tandoori chicken, butter, tomato, cashew, cream, kasuri methi, garam masala" },
  { match: /korma/i, ing: "Almond, cashew, coconut milk, cream, cardamom, mild aromatic spices" },
  { match: /rogan josh/i, ing: "Lamb, Kashmiri chilli, yogurt, fennel, ginger, asafoetida, ghee" },
  { match: /vindaloo/i, ing: "Vinegar, dried red chilli, garlic, mustard seed, cumin, jaggery" },
  { match: /madras/i, ing: "Mustard seed, curry leaf, tamarind, red chilli, coconut, turmeric" },
  { match: /jalfrezi/i, ing: "Bell peppers, onion, green chilli, tomato, ginger, cumin" },
  { match: /bhuna/i, ing: "Slow-fried onion, tomato, ginger-garlic, garam masala, fresh coriander" },
  { match: /patia/i, ing: "Tamarind, jaggery, tomato, chilli, fenugreek, curry leaves" },
  { match: /karahi/i, ing: "Tomato, ginger, green chilli, coriander, black pepper, ghee" },
  { match: /saag|saagwala/i, ing: "Fresh spinach, mustard greens, ginger, garlic, green chilli, ghee" },
  { match: /biryani/i, ing: "Basmati rice, saffron, fried onion, mint, yogurt, whole spices, ghee" },
  { match: /tandoori/i, ing: "Yogurt, ginger-garlic, lemon, paprika, garam masala, kasuri methi" },
  { match: /seekh kebab/i, ing: "Minced lamb, onion, green chilli, ginger, coriander, garam masala" },
  { match: /malai/i, ing: "Cream, cheese, cardamom, white pepper, ginger, mild spices" },
  { match: /achari/i, ing: "Pickling spices, mustard, fennel, fenugreek, nigella, mango pickle" },
  { match: /pakora/i, ing: "Gram flour, turmeric, ajwain, green chilli, coriander" },
  { match: /samosa/i, ing: "Potato, peas, cumin, garam masala, coriander, pastry" },
  { match: /bhaji/i, ing: "Sliced onion, gram flour, turmeric, cumin, green chilli" },
  { match: /aloo tikki/i, ing: "Potato, peas, ginger, green chilli, chaat masala" },
  { match: /chilli paneer/i, ing: "Paneer, soy, capsicum, garlic, ginger, green chilli" },
  { match: /paneer/i, ing: "Cottage cheese, yogurt, ginger-garlic, garam masala, kasuri methi" },
  { match: /lamb chops/i, ing: "Lamb, yogurt, ginger-garlic, garam masala, raw papaya, mustard oil" },
  { match: /lamb shank/i, ing: "Lamb shank, onion, tomato, whole spices, saffron, slow-cooked gravy" },
  { match: /lamb nihari/i, ing: "Lamb, wheat flour, fennel, nutmeg, mace, slow-cooked stock" },
  { match: /keema/i, ing: "Minced lamb, peas, onion, tomato, garam masala, ginger" },
  { match: /tarka daal|daal makhani/i, ing: "Lentils, garlic, cumin, butter, cream, tomato" },
  { match: /aloo gobi/i, ing: "Potato, cauliflower, cumin, turmeric, ginger, coriander" },
  { match: /bombay aloo/i, ing: "Potato, mustard seed, curry leaf, turmeric, chilli" },
  { match: /chana masala/i, ing: "Chickpeas, onion, tomato, amchur, garam masala, ginger" },
  { match: /bhindi/i, ing: "Okra, onion, tomato, amchur, coriander, cumin" },
  { match: /mushroom/i, ing: "Mushroom, onion, garlic, garam masala, cream" },
  { match: /prawn/i, ing: "King prawns, garlic, ginger, tomato, butter, coriander" },
  { match: /fish/i, ing: "Fresh fish, mustard oil, turmeric, panch phoron, green chilli" },
  { match: /salmon/i, ing: "Salmon, mustard, yogurt, panch phoron, lemon" },
  { match: /duck/i, ing: "Duck, tomato, cream, fenugreek, garam masala, ginger" },
  { match: /naan/i, ing: "Wheat flour, yogurt, yeast, ghee, nigella seeds" },
  { match: /peshwari/i, ing: "Coconut, almond, sultana, sweetened naan dough" },
  { match: /garlic naan/i, ing: "Wheat flour, yogurt, garlic, butter, coriander" },
  { match: /keema naan/i, ing: "Naan dough stuffed with spiced minced lamb" },
  { match: /cheese naan/i, ing: "Naan dough stuffed with mozzarella" },
  { match: /roti|chapati/i, ing: "Wholewheat flour, water, salt" },
  { match: /paratha/i, ing: "Layered wheat flour, ghee, salt" },
  { match: /pilau rice/i, ing: "Basmati rice, cumin, cardamom, bay leaf, ghee" },
  { match: /steamed rice/i, ing: "Basmati rice, water" },
  { match: /mushroom rice/i, ing: "Basmati rice, mushroom, butter, herbs" },
  { match: /egg fried rice/i, ing: "Basmati rice, egg, spring onion, soy" },
  { match: /lemon rice/i, ing: "Basmati rice, lemon, mustard seed, curry leaf, peanut" },
  { match: /coconut rice/i, ing: "Basmati rice, coconut, mustard seed, curry leaf" },
  { match: /raita/i, ing: "Yogurt, cucumber, mint, cumin" },
  { match: /poppadom/i, ing: "Lentil flour, cumin, black pepper" },
  { match: /pickle tray/i, ing: "Mango chutney, lime pickle, onion salad, mint yogurt" },
  { match: /chips/i, ing: "Potato, salt, vegetable oil" },
  { match: /salad/i, ing: "Cucumber, tomato, onion, lemon, coriander" },
  { match: /chutney|sauce/i, ing: "House-made condiment" },
  { match: /platter/i, ing: "Selection of our finest tandoori starters" },
  { match: /wings/i, ing: "Chicken wings, yogurt, paprika, garam masala, mint" },
  { match: /puri/i, ing: "Crispy puri, prawns, tomato, onion, spices" },
  { match: /chicken/i, ing: "Chicken, onion, tomato, ginger-garlic, garam masala" },
  { match: /lamb/i, ing: "Lamb, onion, tomato, ginger-garlic, garam masala" },
  { match: /vegetable/i, ing: "Seasonal vegetables, onion, tomato, aromatic spices" },
];

const getIngredients = (name) => {
  const hit = ingredientMap.find((m) => m.match.test(name));
  return hit ? hit.ing : "Traditional Punjabi spices and fresh ingredients";
};

const Menu = () => {
  const { addItem } = useCart();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0]._id);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        toast.error("Failed to load menu");
        setLoading(false);
      });
  }, []);

  const handleAdd = (item) => {
    if (item.variants && item.variants.length > 0) {
      const vName = selectedVariants[item._id] || item.variants[0].name;
      const variant = item.variants.find((v) => v.name === vName);
      addItem({ ...item, variantName: variant.name, price: variant.price });
    } else {
      addItem(item);
    }
  };

  const renderMenuItems = (items) => (
    <div className="grid gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="group/item relative flex items-start gap-4 py-4 px-3 rounded-lg border-b border-border last:border-0 transition-colors hover:bg-muted/40"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-serif text-xl text-foreground font-medium">{item.name}</h4>
              {item.popular && (
                <Badge className="bg-primary/20 text-primary border-primary/30">Popular</Badge>
              )}
              {item.serves && (
                <Badge variant="outline" className="text-muted-foreground">Serves {item.serves}</Badge>
              )}
            </div>
            {item.description && (
              <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
            )}
            {/* Ingredients - fade in on hover */}
            <div className="grid grid-rows-[0fr] group-hover/item:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
              <div className="overflow-hidden">
                <p className="mt-2 text-xs uppercase tracking-wider text-primary/70 font-medium">Ingredients</p>
                <p className="text-sm text-foreground/80 italic opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 delay-75">
                  {getIngredients(item.name)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {item.variants && item.variants.length > 0 ? (
              <select
                className="bg-transparent border border-input rounded-md text-sm p-1 max-w-[120px]"
                value={selectedVariants[item._id] || item.variants[0].name}
                onChange={(e) => setSelectedVariants({ ...selectedVariants, [item._id]: e.target.value })}
              >
                {item.variants.map((v) => (
                  <option key={v.name} value={v.name} className="bg-card text-foreground">
                    {v.name} - £{Number(v.price).toFixed(2)}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-primary font-semibold text-lg whitespace-nowrap">£{Number(item.price).toFixed(2)}</span>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAdd(item)}
              className="opacity-70 group-hover/item:opacity-100 transition-opacity gap-1"
            >
              <Plus className="w-3 h-3" /> Add
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCategory = (categoryId) => {
    const data = categories.find((c) => c._id === categoryId);
    if (!data) return null;
    return (
      <div>
        <div className="mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{data.name}</h2>
          {data.description && <p className="text-muted-foreground text-lg">{data.description}</p>}
        </div>
        {renderMenuItems(data.items)}
      </div>
    );
  };

  if (loading) {
    return (
      <Layout>
        <section className="py-20 bg-card text-center min-h-[50vh] flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Loading Menu...</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Authentic Punjabi Cuisine</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">Our Menu</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Hover over any dish to reveal its ingredients, then add it straight to your cart.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md py-4 mb-8 -mx-4 px-4 border-b border-border">
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex space-x-2 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat._id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat._id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-6 md:p-8">{renderCategory(activeCategory)}</CardContent>
          </Card>

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <p className="text-muted-foreground text-sm text-center">
              <strong className="text-foreground">Allergen Information:</strong> Please inform our staff of any allergies or dietary requirements.
              Some dishes may contain nuts, dairy, gluten, and other allergens. All our food is prepared in a kitchen where allergens are present.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
