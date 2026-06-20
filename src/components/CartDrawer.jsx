import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CheckoutDialog from "./CheckoutDialog";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQty, removeItem, total } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col bg-card">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl text-foreground flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Your Order
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => {
                const uniqueId = item.variantName ? `${item.name} - ${item.variantName}` : item.name;
                return (
                <div key={uniqueId} className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {item.name}
                      {item.variantName && <span className="text-muted-foreground text-sm ml-1">({item.variantName})</span>}
                    </p>
                    <p className="text-primary font-semibold">£{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(uniqueId, item.qty - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center text-foreground">{item.qty}</span>
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQty(uniqueId, item.qty + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeItem(uniqueId)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">£{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              )})
            )}
          </div>

          {items.length > 0 && (
            <SheetFooter className="border-t border-border pt-4">
              <div className="w-full space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-primary">£{total.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
};

export default CartDrawer;
