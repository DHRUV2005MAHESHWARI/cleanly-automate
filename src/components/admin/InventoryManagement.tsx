
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUpDown, 
  AlertTriangle, 
  PackageCheck, 
  ShoppingCart 
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  supplier: string;
  price: number;
}

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    category: '',
    quantity: 0,
    supplier: '',
    price: 0
  });
  const [editingItem, setEditingItem] = useState<string | null>(null);
  
  // Mock inventory data
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'INV-001',
      name: 'Laundry Detergent (Premium)',
      category: 'Cleaning Supplies',
      quantity: 45,
      status: 'In Stock',
      lastUpdated: '2023-10-15',
      supplier: 'CleanCo Ltd',
      price: 24.99
    },
    {
      id: 'INV-002',
      name: 'Fabric Softener',
      category: 'Cleaning Supplies',
      quantity: 12,
      status: 'Low Stock',
      lastUpdated: '2023-10-12',
      supplier: 'CleanCo Ltd',
      price: 18.50
    },
    {
      id: 'INV-003',
      name: 'Stain Remover',
      category: 'Cleaning Supplies',
      quantity: 0,
      status: 'Out of Stock',
      lastUpdated: '2023-10-05',
      supplier: 'SpotFree Inc',
      price: 15.75
    },
    {
      id: 'INV-004',
      name: 'Clothes Hangers (100 pack)',
      category: 'Storage',
      quantity: 32,
      status: 'In Stock',
      lastUpdated: '2023-10-18',
      supplier: 'StoreSmart',
      price: 45.00
    },
    {
      id: 'INV-005',
      name: 'Laundry Bags',
      category: 'Storage',
      quantity: 8,
      status: 'Low Stock',
      lastUpdated: '2023-10-10',
      supplier: 'StoreSmart',
      price: 12.99
    },
    {
      id: 'INV-006',
      name: 'Garment Tags',
      category: 'Accessories',
      quantity: 500,
      status: 'In Stock',
      lastUpdated: '2023-09-30',
      supplier: 'LabelPro',
      price: 8.25
    },
  ]);
  
  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value 
    }));
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.category || formData.quantity === undefined || !formData.supplier || formData.price === undefined) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Determine status based on quantity
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    if (formData.quantity === 0) {
      status = 'Out of Stock';
    } else if (formData.quantity && formData.quantity <= 15) {
      status = 'Low Stock';
    } else {
      status = 'In Stock';
    }
    
    if (editingItem) {
      // Update existing item
      setInventory(prev => prev.map(item => 
        item.id === editingItem ? 
          { 
            ...item, 
            ...formData, 
            status,
            lastUpdated: new Date().toISOString().split('T')[0]
          } : item
      ));
      toast.success('Inventory item updated successfully');
    } else {
      // Create new item
      const newItem: InventoryItem = {
        id: `INV-${(inventory.length + 1).toString().padStart(3, '0')}`,
        name: formData.name!,
        category: formData.category!,
        quantity: formData.quantity!,
        status,
        lastUpdated: new Date().toISOString().split('T')[0],
        supplier: formData.supplier!,
        price: formData.price!
      };
      
      setInventory(prev => [...prev, newItem]);
      toast.success('Inventory item added successfully');
    }
    
    // Reset form and close dialog
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      supplier: '',
      price: 0
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };
  
  // Handle edit item
  const handleEdit = (id: string) => {
    const itemToEdit = inventory.find(item => item.id === id);
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        category: itemToEdit.category,
        quantity: itemToEdit.quantity,
        supplier: itemToEdit.supplier,
        price: itemToEdit.price
      });
      setEditingItem(id);
      setIsDialogOpen(true);
    }
  };
  
  // Handle delete item
  const handleDelete = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    toast.success('Inventory item deleted successfully');
  };
  
  // Get inventory status summary
  const inventorySummary = {
    total: inventory.length,
    inStock: inventory.filter(item => item.status === 'In Stock').length,
    lowStock: inventory.filter(item => item.status === 'Low Stock').length,
    outOfStock: inventory.filter(item => item.status === 'Out of Stock').length,
  };
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold">{inventorySummary.total}</p>
            </div>
            <PackageCheck className="h-8 w-8 text-primary opacity-80" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">In Stock</p>
              <p className="text-2xl font-bold">{inventorySummary.inStock}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold">{inventorySummary.lowStock}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-amber-500"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold">{inventorySummary.outOfStock}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-red-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Inventory Management */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
          <CardDescription>Manage your inventory items, stock levels, and suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setFormData({
                      name: '',
                      category: '',
                      quantity: 0,
                      supplier: '',
                      price: 0
                    });
                    setEditingItem(null);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}</DialogTitle>
                  <DialogDescription>
                    {editingItem 
                      ? 'Update the details of the existing inventory item' 
                      : 'Fill in the details to add a new inventory item'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity || 0}
                      onChange={handleInputChange}
                      min={0}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supplier" className="text-right">Supplier</Label>
                    <Input
                      id="supplier"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price || 0}
                      onChange={handleInputChange}
                      step="0.01"
                      min={0}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleSubmit}>{editingItem ? 'Update' : 'Add'}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Order Supplies
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell>
                        <Badge variant={
                          item.status === 'In Stock' 
                            ? 'default' 
                            : item.status === 'Low Stock' 
                            ? 'outline' 
                            : 'destructive'
                        }>
                          {item.status === 'Low Stock' && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      {searchTerm 
                        ? 'No items found matching your search criteria' 
                        : 'No inventory items available'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredInventory.length} of {inventory.length} items
          </p>
          {inventorySummary.lowStock > 0 || inventorySummary.outOfStock > 0 ? (
            <p className="text-sm flex items-center text-amber-500">
              <AlertTriangle className="h-4 w-4 mr-1" />
              {inventorySummary.lowStock} items low, {inventorySummary.outOfStock} items out of stock
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

export default InventoryManagement;
