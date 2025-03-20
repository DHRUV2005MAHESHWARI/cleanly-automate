
import { useState } from 'react';
import { Layout } from "@/components/Layout";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarInset
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { Users, Shield, Settings, Package, CreditCard, LineChart, Home, Search, Edit, Trash2, UserPlus, Filter } from "lucide-react";

// Mock user data
const mockUsers = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "555-123-4567", status: "Active", joinDate: "Jan 12, 2023", orders: 8 },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "555-234-5678", status: "Active", joinDate: "Feb 5, 2023", orders: 12 },
  { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "555-345-6789", status: "Inactive", joinDate: "Mar 18, 2023", orders: 3 },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", phone: "555-456-7890", status: "Active", joinDate: "Apr 20, 2023", orders: 7 },
  { id: 5, name: "David Lee", email: "david@example.com", phone: "555-567-8901", status: "Active", joinDate: "May 2, 2023", orders: 5 },
  { id: 6, name: "Jessica Clark", email: "jessica@example.com", phone: "555-678-9012", status: "Suspended", joinDate: "Jun 15, 2023", orders: 0 },
  { id: 7, name: "Robert Taylor", email: "robert@example.com", phone: "555-789-0123", status: "Active", joinDate: "Jul 8, 2023", orders: 9 },
  { id: 8, name: "Lisa Martinez", email: "lisa@example.com", phone: "555-890-1234", status: "Active", joinDate: "Aug 22, 2023", orders: 4 },
  { id: 9, name: "Thomas Anderson", email: "thomas@example.com", phone: "555-901-2345", status: "Inactive", joinDate: "Sep 11, 2023", orders: 2 },
  { id: 10, name: "Patricia Moore", email: "patricia@example.com", phone: "555-012-3456", status: "Active", joinDate: "Oct 5, 2023", orders: 6 },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  
  const navigate = useNavigate();

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
  };

  const handleDeleteClick = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    // In a real app, this would make an API call to delete the user
    console.log(`Deleting user: ${selectedUser?.id}`);
    setIsDeleteDialogOpen(false);
    // Would then refresh the user list
  };

  return (
    <Layout>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Shield className="h-6 w-6 text-primary" />
              <div className="font-semibold text-lg">Admin Panel</div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" onClick={() => navigate('/admin')}>
                  <LineChart className="mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Users" onClick={() => navigate('/admin/users')}>
                  <Users className="mr-2" />
                  <span>User Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Orders">
                  <Package className="mr-2" />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Billing">
                  <CreditCard className="mr-2" />
                  <span>Billing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarSeparator />
            <div className="p-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Site</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">View and manage all users in the system.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button className="bg-primary text-primary-foreground">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Join Date</TableHead>
                    <TableHead className="hidden md:table-cell">Orders</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No users found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active" ? "bg-green-100 text-green-800" :
                            user.status === "Inactive" ? "bg-gray-100 text-gray-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.joinDate}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.orders}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewUser(user)}>
                              <span className="sr-only">View</span>
                              <Search className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <span className="sr-only">Edit</span>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteClick(user)}>
                              <span className="sr-only">Delete</span>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {mockUsers.length} users
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm User Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user "{selectedUser?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* User Detail Sheet */}
      <Sheet open={isUserDetailOpen} onOpenChange={setIsUserDetailOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-xl">User Details</SheetTitle>
            <SheetDescription>View detailed information about the user.</SheetDescription>
          </SheetHeader>
          
          {selectedUser && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="mt-1">{selectedUser.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="mt-1">{selectedUser.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                  <p className="mt-1">{selectedUser.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedUser.status === "Active" ? "bg-green-100 text-green-800" :
                      selectedUser.status === "Inactive" ? "bg-gray-100 text-gray-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {selectedUser.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Join Date</h3>
                  <p className="mt-1">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Orders</h3>
                  <p className="mt-1">{selectedUser.orders}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Recent Orders</h3>
                <div className="space-y-2">
                  {selectedUser.orders > 0 ? (
                    Array.from({ length: Math.min(3, selectedUser.orders) }).map((_, i) => (
                      <div key={i} className="flex justify-between p-2 bg-secondary/30 rounded-md">
                        <div className="text-sm font-medium">Order #{Math.floor(Math.random() * 10000)}</div>
                        <div className="text-sm text-muted-foreground">${(Math.random() * 100).toFixed(2)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">No orders yet</div>
                  )}
                </div>
                {selectedUser.orders > 3 && (
                  <Button variant="link" className="mt-2 p-0 h-auto">View all {selectedUser.orders} orders</Button>
                )}
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Account Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button>Edit User</Button>
                  <Button variant="outline">Reset Password</Button>
                  {selectedUser.status === "Active" ? (
                    <Button variant="outline">Deactivate Account</Button>
                  ) : (
                    <Button variant="outline">Activate Account</Button>
                  )}
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Layout>
  );
};

export default UserManagement;
