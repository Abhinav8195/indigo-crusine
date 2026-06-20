import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { CheckCircle2, User, LogIn, UserPlus } from "lucide-react";

const CheckoutDialog = ({ open, onOpenChange }) => {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState("choose");
  const [orderType, setOrderType] = useState("collection");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    if (open) {
      if (user) {
        setForm((f) => ({ ...f, name: user.name || f.name, email: user.email || f.email }));
        setStep("details");
      } else {
        setStep("choose");
      }
    } else {
      setConfirmed(null);
    }
  }, [open, user]);

  const goLogin = (path) => {
    onOpenChange(false);
    navigate(path);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    if (orderType === "delivery" && !form.address) {
      toast.error("Please enter a delivery address");
      return;
    }
    setSubmitting(true);
    
    try {
      const ref = "IND-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      const payload = {
        ref,
        orderType,
        totalAmount: total,
        items: items.map(i => ({ name: i.variantName ? `${i.name} (${i.variantName})` : i.name, price: i.price, quantity: i.qty })),
        customerDetails: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address
        },
        notes: form.notes
      };

      const response = await fetch("http://localhost:5000/api/online-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to place order");

      setConfirmed({ ref, orderType, total });
      clear();
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card max-h-[90vh] overflow-y-auto">
        {confirmed ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-center">Order Confirmed</DialogTitle>
              <DialogDescription className="text-center">
                Thank you! Your {confirmed.orderType} order has been placed.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">Order reference</p>
              <p className="font-mono font-bold text-primary text-lg">{confirmed.ref}</p>
              <p className="mt-2 text-sm">Total paid on {confirmed.orderType}: <span className="font-semibold text-primary">£{confirmed.total.toFixed(2)}</span></p>
            </div>
            <Button className="w-full mt-6" onClick={() => onOpenChange(false)}>Done</Button>
          </div>
        ) : step === "choose" ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">How would you like to checkout?</DialogTitle>
              <DialogDescription>
                Order total: <span className="font-semibold text-primary">£{total.toFixed(2)}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary transition text-left"
              >
                <User className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Continue as guest</p>
                  <p className="text-sm text-muted-foreground">Just enter your contact and order details — no account needed.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => goLogin("/login")}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary transition text-left"
              >
                <LogIn className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Log in</p>
                  <p className="text-sm text-muted-foreground">Sign in to autofill your details and track orders.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => goLogin("/signup")}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary transition text-left"
              >
                <UserPlus className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Create an account</p>
                  <p className="text-sm text-muted-foreground">Sign up to save your details for next time.</p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Checkout</DialogTitle>
              <DialogDescription>
                {user ? `Logged in as ${user.name}` : "Checking out as guest"} — Total: <span className="font-semibold text-primary">£{total.toFixed(2)}</span>
              </DialogDescription>
            </DialogHeader>


            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="mb-2 block">Order type</Label>
                <RadioGroup value={orderType} onValueChange={setOrderType} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="collection" id="collection" />
                    <Label htmlFor="collection" className="cursor-pointer">Collection</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="cursor-pointer">Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
              </div>

              {orderType === "delivery" && (
                <div>
                  <Label htmlFor="address">Delivery address *</Label>
                  <Textarea id="address" name="address" value={form.address} onChange={handleChange} rows={2} required />
                </div>
              )}

              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Allergies, spice preferences, etc." />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting || items.length === 0}>
                  {submitting ? "Placing..." : `Place order • £${total.toFixed(2)}`}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
