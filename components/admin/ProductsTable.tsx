// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Plus,
//   Search,
//   Trash2,
//   Download,
//   Upload,
//   Star,
//   Package,
//   Pencil,
//   Trash,
// } from "lucide-react";
// import type { Product } from "@/lib/types";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface ProductsResponse {
//   products: Product[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     pages: number;
//   };
// }

// export function ProductsTable() {
//   const router = useRouter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//   const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
//     []
//   );
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [stockFilter, setStockFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0,
//   });
//   const [productToDelete, setProductToDelete] = useState<Product | null>(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("/api/admin/categories");
//         if (!response.ok) throw new Error("Failed to fetch categories");
//         const data = await response.json();
//         setCategories(data.categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to fetch categories");
//       }
//     };
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: "10",
//         sortBy,
//         sortOrder,
//         ...(search && { search }),
//         ...(categoryFilter !== "all" && { category: categoryFilter }),
//         ...(statusFilter !== "all" && { status: statusFilter }),
//         ...(stockFilter !== "all" && { stock: stockFilter }),
//       });
//       console.log("Fetching products with params:", params.toString());
//       const response = await fetch(`/api/admin/products?${params}`);
//       if (!response.ok) throw new Error("Failed to fetch products");

//       const data: ProductsResponse = await response.json();
//       setProducts(data.products);
//       setPagination(data.pagination);
//     } catch (error) {
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteProduct = async (id: string) => {
//     try {
//       const response = await fetch(`/api/admin/products/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) throw new Error("Failed to delete product");

//       toast.success("Product deleted successfully");

//       fetchProducts();
//     } catch (error) {
//       toast.error("Failed to delete product");
//     }
//   };

//   const handleBulkAction = async (action: string) => {
//     if (selectedProducts.length === 0) {
//       toast.error("No products selected");
//       return;
//     }

//     const confirmMessage = {
//       delete: "Are you sure you want to delete the selected products?",
//       activate: "Are you sure you want to activate the selected products?",
//       deactivate: "Are you sure you want to deactivate the selected products?",
//       feature: "Are you sure you want to feature the selected products?",
//       unfeature: "Are you sure you want to unfeature the selected products?",
//     };

//     try {
//       const response = await fetch("/api/admin/products/bulk", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           action,
//           productIds: selectedProducts,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to perform bulk action");

//       toast.success("Bulk action completed successfully");

//       setSelectedProducts([]);
//       fetchProducts();
//     } catch (error) {
//       toast.error("Failed to perform bulk action");
//     }
//   };

//   const handleSelectAll = (checked: boolean) => {
//     if (checked) {
//       setSelectedProducts(products.map((p) => p._id.toString()));
//     } else {
//       setSelectedProducts([]);
//     }
//   };

//   const handleSelectProduct = (productId: string, checked: boolean) => {
//     if (checked) {
//       setSelectedProducts((prev) => [...prev, productId]);
//     } else {
//       setSelectedProducts((prev) => prev.filter((id) => id !== productId));
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [
//     page,
//     search,
//     categoryFilter,
//     statusFilter,
//     stockFilter,
//     sortBy,
//     sortOrder,
//   ]);

//   if (loading) {
//     return <div className="flex justify-center py-8">Loading products...</div>;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle>Products Management</CardTitle>
//             <CardDescription>
//               Manage your sweet shop products with advanced features
//             </CardDescription>
//           </div>
//             <Button asChild>
//               <Link href="/admin/products/new">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Product
//               </Link>
//             </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-col gap-4 mb-6">
//           <div className="flex items-center gap-4">
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-40">
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {categories.map((category) => (
//                   <SelectItem
//                     key={category._id.toString()}
//                     value={category._id.toString()}
//                   >
//                     {category.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-32">
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="inactive">Inactive</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={stockFilter} onValueChange={setStockFilter}>
//               <SelectTrigger className="w-32">
//                 <SelectValue placeholder="Stock" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Stock</SelectItem>
//                 <SelectItem value="instock">In Stock</SelectItem>
//                 <SelectItem value="outofstock">Out of Stock</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select
//               value={`${sortBy}-${sortOrder}`}
//               onValueChange={(value) => {
//                 const [field, order] = value.split("-");
//                 setSortBy(field);
//                 setSortOrder(order);
//               }}
//             >
//               <SelectTrigger className="w-40">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="createdAt-desc">Newest First</SelectItem>
//                 <SelectItem value="createdAt-asc">Oldest First</SelectItem>
//                 <SelectItem value="name-asc">Name A-Z</SelectItem>
//                 <SelectItem value="name-desc">Name Z-A</SelectItem>
//                 <SelectItem value="ratings-desc">Highest Rated</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {selectedProducts.length > 0 && (
//             <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
//               <span className="text-sm font-medium">
//                 {selectedProducts.length} product
//                 {selectedProducts.length > 1 ? "s" : ""} selected
//               </span>
//               <div className="flex items-center gap-2 ml-auto">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleBulkAction("activate")}
//                 >
//                   Activate
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleBulkAction("deactivate")}
//                 >
//                   Deactivate
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleBulkAction("feature")}
//                 >
//                   <Star className="h-4 w-4 mr-1" />
//                   Feature
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleBulkAction("unfeature")}
//                 >
//                   Unfeature
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   onClick={() => handleBulkAction("delete")}
//                 >
//                   <Trash2 className="h-4 w-4 mr-1" />
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-12">
//                   <Checkbox
//                     checked={
//                       selectedProducts.length === products.length &&
//                       products.length > 0
//                     }
//                     onCheckedChange={handleSelectAll}
//                   />
//                 </TableHead>
//                 <TableHead>Product</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Price Range</TableHead>
//                 <TableHead>Stock</TableHead>
//                 <TableHead>Rating</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {products.map((product) => (
//                 <TableRow key={product._id.toString()}>
//                   <TableCell>
//                     <Checkbox
//                       checked={selectedProducts.includes(
//                         product._id.toString()
//                       )}
//                       onCheckedChange={(checked) =>
//                         handleSelectProduct(
//                           product._id.toString(),
//                           checked as boolean
//                         )
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       {product.images[0] && (
//                         <img
//                           src={product.images[0] || "/placeholder.svg"}
//                           alt={product.name}
//                           className="w-12 h-12 rounded-lg object-cover"
//                         />
//                       )}
//                       <div>
//                         <div className="font-medium flex items-center gap-2">
//                           {product.name}
//                           {product.isFeatured && (
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                           )}
//                         </div>
//                         <div className="text-sm text-muted-foreground">
//                           {product.slug}
//                         </div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="secondary">
//                       {typeof product.category === "object"
//                         ? product.category?.name
//                         : "unknown"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     {product.weightPrices.length > 0 && (
//                       <div className="text-sm">
//                         ₹
//                         {Math.min(
//                           ...product.weightPrices.map((wp) => wp.price)
//                         )}{" "}
//                         - ₹
//                         {Math.max(
//                           ...product.weightPrices.map((wp) => wp.price)
//                         )}
//                       </div>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={product.inStock ? "default" : "destructive"}
//                     >
//                       {product.inStock ? "In Stock" : "Out of Stock"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-1">
//                       <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm">
//                         {product.ratings.toFixed(1)}
//                       </span>
//                       <span className="text-xs text-muted-foreground">
//                         ({product.numReviews})
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={product.isActive ? "default" : "secondary"}>
//                       {product.isActive ? "Active" : "Inactive"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() =>
//                           router.push(`/admin/products/${product._id}`)
//                         }
//                         className="text-primary"
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => setProductToDelete(product)}
//                         className="text-red-500"
//                       >
//                         <Trash className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//         <AlertDialog
//           open={!!productToDelete}
//           onOpenChange={(open) => !open && setProductToDelete(null)}
//         >
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This will permanently delete the category "
//                 {productToDelete?.name}". This action cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() =>
//                   productToDelete && handleDeleteProduct(productToDelete._id)
//                 }
//                 className="bg-red-600 text-white hover:bg-red-700"
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         {products.length === 0 && (
//           <div className="text-center py-8 text-muted-foreground">
//             <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
//             <p>No products found matching your criteria.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="flex items-center justify-between mt-6">
//             <div className="text-sm text-muted-foreground">
//               Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
//               {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
//               of {pagination.total} products
//             </div>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setPage(page - 1)}
//                 disabled={page === 1}
//               >
//                 Previous
//               </Button>
//               <span className="text-sm px-3 py-1 bg-muted rounded">
//                 {page} of {pagination.pages}
//               </span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setPage(page + 1)}
//                 disabled={page === pagination.pages}
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Trash2,
  Download,
  Upload,
  Star,
  Package,
  Pencil,
  Trash,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import type { Product } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export function ProductsTable() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    outOfStock: 0,
    featured: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/admin/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
    fetchProductStats(); // Fetch initial stats
  }, []);

  const fetchProductStats = async () => {
    try {
      // Fetch all products without pagination to get accurate stats
      const response = await fetch('/api/admin/products?limit=1000&page=1');
      if (!response.ok) throw new Error("Failed to fetch product stats");
      
      const data: ProductsResponse = await response.json();
      const allProducts = data.products;
      
      setStats({
        total: data.pagination.total,
        active: allProducts.filter(p => p.isActive).length,
        inactive: allProducts.filter(p => !p.isActive).length,
        outOfStock: allProducts.filter(p => !p.inStock).length,
        featured: allProducts.filter(p => p.isFeatured).length,
      });
    } catch (error) {
      console.error("Error fetching product stats:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sortBy,
        sortOrder,
        ...(search && { search }),
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(stockFilter !== "all" && { stock: stockFilter }),
      });
      console.log("Fetching products with params:", params.toString());
      const response = await fetch(`/api/admin/products?${params}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data: ProductsResponse = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
      
      // Fetch stats separately to ensure accuracy
      fetchProductStats();
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedProducts.length === 0) {
      toast.error("No products selected");
      return;
    }

    const confirmMessage = {
      delete: "Are you sure you want to delete the selected products?",
      activate: "Are you sure you want to activate the selected products?",
      deactivate: "Are you sure you want to deactivate the selected products?",
      feature: "Are you sure you want to feature the selected products?",
      unfeature: "Are you sure you want to unfeature the selected products?",
    };

    try {
      const response = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          productIds: selectedProducts,
        }),
      });

      if (!response.ok) throw new Error("Failed to perform bulk action");

      toast.success("Bulk action completed successfully");

      setSelectedProducts([]);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to perform bulk action");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p._id.toString()));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    page,
    search,
    categoryFilter,
    statusFilter,
    stockFilter,
    sortBy,
    sortOrder,
  ]);

  // Use pre-calculated stats for accurate numbers across all products

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="w-4 h-4" />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-3 w-6" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
        </div>
      </TableCell>
    </TableRow>
  );

  if (loading) {
    return (
      <Card className="transition-all duration-300 ease-in-out">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products Management</CardTitle>
              <CardDescription>
                Manage your sweet shop products with advanced features
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Loading Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Skeleton className="w-4 h-4" />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl sm:text-2xl">Products Management</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Manage your sweet shop products with advanced features
            </CardDescription>
          </div>
          <Button asChild className="w-full sm:w-auto transition-all duration-200 hover:scale-105">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Products"
            value={stats.total.toLocaleString()}
            description="All products in inventory"
            icon={<Package className="h-4 w-4 text-blue-500" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
          <StatsCard
            title="Active Products"
            value={stats.active.toLocaleString()}
            description="Currently active items"
            icon={<CheckCircle className="h-4 w-4 text-green-600" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
          <StatsCard
            title="Out of Stock"
            value={stats.outOfStock.toLocaleString()}
            description="Items needing restock"
            icon={<AlertTriangle className="h-4 w-4 text-orange-600" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
          <StatsCard
            title="Featured Products"
            value={stats.featured.toLocaleString()}
            description="Highlighted items"
            icon={<Star className="h-4 w-4 text-yellow-500" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input - Full width on mobile */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-200" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            {/* Filters - Responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category._id.toString()}
                      value={category._id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="instock">In Stock</SelectItem>
                  <SelectItem value="outofstock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [field, order] = value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="ratings-desc">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-muted/50 rounded-lg border-l-4 border-primary transition-all duration-300 animate-in slide-in-from-top-2">
              <span className="text-sm font-medium">
                {selectedProducts.length} product
                {selectedProducts.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:ml-auto">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("activate")}
                  className="transition-all duration-200 hover:scale-105"
                >
                  Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("deactivate")}
                  className="transition-all duration-200 hover:scale-105"
                >
                  Deactivate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("feature")}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Star className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Feature</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("unfeature")}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <span className="hidden sm:inline">Unfeature</span>
                  <span className="sm:hidden">Unfeat.</span>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleBulkAction("delete")}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="rounded-md border transition-all duration-300 hover:shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50 transition-colors duration-200">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedProducts.length === products.length &&
                      products.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    className="transition-all duration-200"
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow 
                  key={product._id.toString()} 
                  className="group hover:bg-muted/50 transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(
                        product._id.toString()
                      )}
                      onCheckedChange={(checked) =>
                        handleSelectProduct(
                          product._id.toString(),
                          checked as boolean
                        )
                      }
                      className="transition-all duration-200 group-hover:scale-110"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.images[0] && (
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium flex items-center gap-2 transition-colors duration-200 group-hover:text-primary">
                          <span className="line-clamp-1">{product.name}</span>
                          {product.isFeatured && (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="transition-all duration-200 hover:scale-105">
                      {typeof product.category === "object"
                        ? (product.category as any)?.name || "unknown"
                        : "unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.weightPrices.length > 0 && (
                      <div className="text-sm font-medium">
                        ₹
                        {Math.min(
                          ...product.weightPrices.map((wp) => wp.price)
                        )}{" "}
                        - ₹
                        {Math.max(
                          ...product.weightPrices.map((wp) => wp.price)
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.inStock ? "default" : "destructive"}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {product.ratings.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.numReviews})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.isActive ? "default" : "secondary"}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/admin/products/${product._id}`)
                        }
                        className="text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setProductToDelete(product)}
                        className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 hover:scale-110"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <AlertDialog
          open={!!productToDelete}
          onOpenChange={(open) => !open && setProductToDelete(null)}
        >
          <AlertDialogContent className="animate-in fade-in-0 zoom-in-95 duration-300">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-500" />
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the product "
                <span className="font-medium text-foreground">
                  {productToDelete?.name}
                </span>
                ". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="transition-all duration-200 hover:scale-105">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  productToDelete && handleDeleteProduct(productToDelete._id.toString())
                }
                className="bg-red-600 text-white hover:bg-red-700 transition-all duration-200 hover:scale-105"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {products.length === 0 && !loading && (
          <div className="text-center py-12 text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="animate-bounce">
              <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-sm">No products match your current search criteria.</p>
            <Button
              variant="outline"
              className="mt-4 transition-all duration-200 hover:scale-105"
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setStatusFilter("all");
                setStockFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
            <div className="text-sm text-muted-foreground animate-in fade-in-0 slide-in-from-left-2">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} products
            </div>
            <div className="flex items-center gap-2 animate-in fade-in-0 slide-in-from-right-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === page;
                  return (
                    <Button
                      key={pageNum}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 p-0 transition-all duration-200 hover:scale-110 ${
                        isActive ? "animate-pulse" : ""
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {pagination.pages > 5 && (
                  <>
                    <span className="px-2 text-muted-foreground">...</span>
                    <Button
                      variant={page === pagination.pages ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pagination.pages)}
                      className="w-8 h-8 p-0 transition-all duration-200 hover:scale-110"
                    >
                      {pagination.pages}
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pages}
                className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
