import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { io } from "socket.io-client";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'received': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ready': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'out_for_delivery': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const Profile = () => {
  const { user, login } = useAuth(); // We might need a way to refresh user context, or we can just update local state
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  const currentTab = searchParams.get("tab") || "profile";

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
    
    // Fetch History
    const token = localStorage.getItem("indigo_auth_token");
    
    fetch("http://localhost:5000/api/users/orders", {
      headers: { "x-auth-token": token }
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch("http://localhost:5000/api/users/reservations", {
      headers: { "x-auth-token": token }
    })
      .then(res => res.json())
      .then(data => setReservations(Array.isArray(data) ? data : []))
      .catch(console.error);

    // Socket Connection for live updates
    const socket = io("http://localhost:5000");
    
    socket.on('order_status_updated', (updatedOrder) => {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === updatedOrder._id ? { ...order, status: updatedOrder.status } : order
        )
      );
    });

    socket.on('reservation_status_updated', (updatedRes) => {
      setReservations(prevRes => 
        prevRes.map(res => 
          res._id === updatedRes._id ? { ...res, status: updatedRes.status, checkInStatus: updatedRes.checkInStatus } : res
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [user, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("indigo_auth_token");
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      toast.success("Profile updated successfully!");
      // Force reload to update auth context (or we could expose a setUser in AuthContext)
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <section className="py-20 min-h-[70vh] bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">My Account</h1>
          
          <Tabs value={currentTab} onValueChange={(v) => setSearchParams({ tab: v })} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="orders">Past Orders</TabsTrigger>
              <TabsTrigger value="reservations">Table Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past online orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <p className="text-muted-foreground">No orders found.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order Ref</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map(o => (
                          <TableRow key={o._id}>
                            <TableCell className="font-medium">{o.ref}</TableCell>
                            <TableCell>{new Date(o.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="capitalize">{o.orderType}</TableCell>
                            <TableCell>£{o.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(o.status)}`}>
                                {o.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reservations">
              <Card>
                <CardHeader>
                  <CardTitle>Table Bookings</CardTitle>
                  <CardDescription>View your past and upcoming reservations.</CardDescription>
                </CardHeader>
                <CardContent>
                  {reservations.length === 0 ? (
                    <p className="text-muted-foreground">No reservations found.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Guests</TableHead>
                          <TableHead>Occasion</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Check-In</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservations.map(r => (
                          <TableRow key={r._id}>
                            <TableCell className="font-medium">{r.date}</TableCell>
                            <TableCell>{r.time}</TableCell>
                            <TableCell>{r.guests}</TableCell>
                            <TableCell>{r.occasion}</TableCell>
                            <TableCell>
                              <Badge className={
                                r.status === "Confirmed" ? "bg-green-500 hover:bg-green-600" :
                                r.status === "Cancelled" ? "bg-red-500 hover:bg-red-600" :
                                "bg-yellow-500 hover:bg-yellow-600"
                              }>
                                {r.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {r.checkInStatus === 'Arrived' && <Badge className="bg-emerald-500 hover:bg-emerald-600">Arrived</Badge>}
                              {r.checkInStatus === 'Not Arrived' && <Badge className="bg-orange-500 hover:bg-orange-600">Not Arrived</Badge>}
                              {(!r.checkInStatus || r.checkInStatus === 'Pending') && <span className="text-sm text-muted-foreground">Pending</span>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
