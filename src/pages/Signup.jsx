import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Signup = () => {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    const res = await signup(form);
    if (res.error) return toast.error(res.error);
    toast.success(`Welcome to Indigo Cuisine, ${res.user.name}!`);
    navigate("/menu");
  };

  return (
    <Layout>
      <section className="py-20 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-3xl text-foreground">Create Account</CardTitle>
              <CardDescription>Join us to order online and book tables</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
                <Button type="submit" className="w-full" size="lg">Sign Up</Button>
                <p className="text-center text-sm text-muted-foreground">
                  Have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
