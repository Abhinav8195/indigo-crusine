import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.error) return toast.error(res.error);
    toast.success(`Welcome back, ${res.user.name}!`);
    navigate("/menu");
  };

  return (
    <Layout>
      <section className="py-20 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-3xl text-foreground">Welcome Back</CardTitle>
              <CardDescription>Log in to order and track your bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
                <Button type="submit" className="w-full" size="lg">Log In</Button>
                <p className="text-center text-sm text-muted-foreground">
                  No account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
