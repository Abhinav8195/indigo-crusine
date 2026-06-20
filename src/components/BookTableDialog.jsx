import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarHeart, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const occasions = [
  "Birthday",
  "Anniversary",
  "Business Meal",
  "Date Night",
  "Family Gathering",
  "Other",
];

const BookTableDialog = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "",
    notes: "",
  });

  useEffect(() => {
    if (user && open) {
      setForm(prev => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || ""
      }));
    }
  }, [user, open]);

  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Error fetching settings:", err));
  }, []);

  const isDateDisabled = (dateStr) => {
    if (!settings) return false;
    const dateObj = new Date(dateStr);
    const dayOfWeek = dateObj.getDay();
    
    // Check specific holidays
    if (settings.holidays && settings.holidays.includes(dateStr)) return true;
    
    // Check weekly schedule
    if (settings.dailySchedules) {
      const schedule = settings.dailySchedules.find(s => s.dayOfWeek === dayOfWeek);
      if (schedule && schedule.isClosed) return true;
    }
    
    // Fallback to legacy closedDays if dailySchedules not present
    if (settings.closedDays && settings.closedDays.includes(dayOfWeek)) return true;
    
    return false;
  };

  const getMinTime = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    
    let minTimeStr = "10:00"; // default fallback
    let closingTimeStr = "22:00";
    
    if (settings && settings.dailySchedules && form.date) {
      const dateObj = new Date(form.date);
      const schedule = settings.dailySchedules.find(s => s.dayOfWeek === dateObj.getDay());
      if (schedule) {
        minTimeStr = schedule.openingTime;
        closingTimeStr = schedule.closingTime;
      }
    } else if (settings) {
      minTimeStr = settings.openingTime || "10:00";
      closingTimeStr = settings.closingTime || "22:00";
    }
    
    if (form.date === today) {
      now.setHours(now.getHours() + 2); // 2 hours advance
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const advancedTime = `${h}:${m}`;
      if (advancedTime > minTimeStr && advancedTime < closingTimeStr) {
        minTimeStr = advancedTime;
      }
    }
    return { minTime: minTimeStr, maxTime: closingTimeStr };
  };

  const availableTimeSlots = () => {
    if (!form.date) return [];
    const { minTime, maxTime } = getMinTime();
    
    const slots = [];
    const current = new Date(`2000-01-01T${minTime}:00`);
    const end = new Date(`2000-01-01T${maxTime}:00`);

    // Round up to nearest 30 mins
    const m = current.getMinutes();
    if (m > 0 && m <= 30) {
      current.setMinutes(30);
    } else if (m > 30) {
      current.setHours(current.getHours() + 1);
      current.setMinutes(0);
    }

    while (current <= end) {
      const h = String(current.getHours()).padStart(2, "0");
      const mins = String(current.getMinutes()).padStart(2, "0");
      slots.push(`${h}:${mins}`);
      current.setMinutes(current.getMinutes() + 30);
    }
    return slots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time || !form.occasion || !form.guests) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isDateDisabled(form.date)) {
      toast.error("The restaurant is closed on the selected date.");
      return;
    }

    const { minTime, maxTime } = getMinTime();
    // Re-verify against raw minTime (not rounded) just in case
    if (form.time < minTime) {
      toast.error(`For the selected date, earliest booking time is ${minTime}`);
      return;
    }
    if (form.time > maxTime) {
      toast.error(`The restaurant closes at ${maxTime} on this day.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guests: parseInt(form.guests, 10)
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to reserve table");
      }
      
      toast.success(`Table book request sent for ${form.occasion} on ${form.date}!`);
      setOpen(false);
      setForm({ name: "", email: "", phone: "", date: "", time: "", guests: 2, occasion: "", notes: "" });
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book table. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-2">
            <CalendarHeart className="w-4 h-4" />
            Book Table
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">Reserve Your Table</DialogTitle>
          <DialogDescription>Tell us about your visit and we'll prepare something special.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2 flex flex-col justify-end">
              <Label htmlFor="date">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10",
                      !form.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? format(new Date(form.date), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.date ? new Date(form.date) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        // Using local date string
                        const offset = date.getTimezoneOffset()
                        date = new Date(date.getTime() - (offset*60*1000))
                        const dateStr = date.toISOString().split('T')[0]
                        setForm({ ...form, date: dateStr })
                      }
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      if (date < today) return true;
                      
                      const offset = date.getTimezoneOffset()
                      const localDate = new Date(date.getTime() - (offset*60*1000))
                      const dateStr = localDate.toISOString().split('T')[0];
                      return isDateDisabled(dateStr);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <Label htmlFor="time">Time *</Label>
              <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })} disabled={!form.date}>
                <SelectTrigger id="time" className="h-10">
                  <SelectValue placeholder={!form.date ? "Select date first" : "Select time"} />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-[200px] overflow-y-auto">
                  {availableTimeSlots().map(timeSlot => {
                    // Format to AM/PM for nice UI
                    const [h, m] = timeSlot.split(":");
                    let hour = parseInt(h, 10);
                    const ampm = hour >= 12 ? "PM" : "AM";
                    hour = hour % 12 || 12;
                    const displayTime = `${hour}:${m} ${ampm}`;
                    return (
                      <SelectItem key={timeSlot} value={timeSlot}>
                        {displayTime}
                      </SelectItem>
                    );
                  })}
                  {availableTimeSlots().length === 0 && form.date && (
                    <SelectItem value="none" disabled>No slots available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="guests">Guests *</Label>
              <Input id="guests" type="number" min="1" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occasion">Occasion *</Label>
              <Select value={form.occasion} onValueChange={(v) => setForm({ ...form, occasion: v })}>
                <SelectTrigger id="occasion"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {occasions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Special requests</Label>
            <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Allergies, seating preferences, surprises..." />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" size="lg">Confirm Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookTableDialog;
