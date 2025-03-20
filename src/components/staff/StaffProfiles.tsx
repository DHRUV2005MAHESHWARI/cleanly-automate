
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Mail, Phone } from "lucide-react";

// Mock staff data
const mockStaff = [
  { 
    id: 1, 
    name: "John Doe", 
    role: "Laundry Manager", 
    email: "john.doe@laundry.com", 
    phone: "(555) 123-4567", 
    image: "/placeholder.svg", 
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    role: "Senior Washing Specialist", 
    email: "jane.smith@laundry.com", 
    phone: "(555) 234-5678", 
    image: "/placeholder.svg", 
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Robert Johnson", 
    role: "Ironing Specialist", 
    email: "robert.johnson@laundry.com", 
    phone: "(555) 345-6789", 
    image: "/placeholder.svg", 
    status: "On Leave" 
  },
  { 
    id: 4, 
    name: "Sarah Williams", 
    role: "Dry Cleaning Expert", 
    email: "sarah.williams@laundry.com", 
    phone: "(555) 456-7890", 
    image: "/placeholder.svg", 
    status: "Active" 
  },
  { 
    id: 5, 
    name: "Michael Brown", 
    role: "Delivery Coordinator", 
    email: "michael.brown@laundry.com", 
    phone: "(555) 567-8901", 
    image: "/placeholder.svg", 
    status: "Active" 
  },
  { 
    id: 6, 
    name: "Emily Davis", 
    role: "Customer Service Rep", 
    email: "emily.davis@laundry.com", 
    phone: "(555) 678-9012", 
    image: "/placeholder.svg", 
    status: "Inactive" 
  },
];

interface StaffProfilesProps {
  searchTerm: string;
}

const StaffProfiles = ({ searchTerm }: StaffProfilesProps) => {
  const [selectedStaff, setSelectedStaff] = useState<typeof mockStaff[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredStaff = mockStaff.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (staff: typeof mockStaff[0]) => {
    setSelectedStaff(staff);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No staff members found. Try adjusting your search.</p>
          </div>
        ) : (
          filteredStaff.map(staff => (
            <Card key={staff.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={staff.image} alt={staff.name} />
                      <AvatarFallback>{staff.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <Badge variant={staff.status === "Active" ? "default" : staff.status === "On Leave" ? "warning" : "secondary"}>
                    {staff.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{staff.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{staff.phone}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => handleViewProfile(staff)}
                >
                  View Profile
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedStaff && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Staff Profile</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedStaff.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={selectedStaff.image} alt={selectedStaff.name} />
                <AvatarFallback className="text-2xl">{selectedStaff.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{selectedStaff.name}</h2>
              <p className="text-muted-foreground">{selectedStaff.role}</p>
              <Badge className="mt-2" variant={selectedStaff.status === "Active" ? "default" : selectedStaff.status === "On Leave" ? "warning" : "secondary"}>
                {selectedStaff.status}
              </Badge>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" value={selectedStaff.email} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" value={selectedStaff.phone} className="col-span-3" readOnly />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default StaffProfiles;
