// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
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
// import { Plus, Search, Pencil, Trash } from "lucide-react";
// import { toast } from "sonner";
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

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   image?: string;
//   isActive: boolean;
//   createdAt: string;
// }

// export function CategoriesTable() {
//   const router = useRouter();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("/api/admin/categories");
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(data.categories);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Failed to fetch categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteCategory = async (id: string) => {
//     try {
//       const response = await fetch(`/api/admin/categories/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setCategories(categories.filter((cat) => cat._id !== id));
//         toast.success("Category deleted successfully");
//       } else {
//         throw new Error("Failed to delete category");
//       }
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       toast.error("Failed to delete category");
//     }
//   };

//   const filteredCategories = categories.filter(
//     (category) =>
//       category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       category.slug.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center py-8">Loading categories...</div>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle>Categories</CardTitle>
//             <CardDescription>Manage your product categories</CardDescription>
//           </div>
//           <Button asChild>
//             <Link href="/admin/categories/new">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Category
//             </Link>
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center gap-4 mb-6">
//           <div className="relative flex-1 max-w-sm">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//             <Input
//               placeholder="Search categories..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Slug</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Created</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredCategories.map((category) => (
//                 <TableRow key={category._id}>
//                   <TableCell>
//                     <div className="flex items-center gap-3 min-w-48 ">
//                       {category.image && (
//                         <img
//                           src={category.image || "/placeholder.svg"}
//                           alt=""
//                           className="w-12 h-12 rounded-lg object-cover"
//                         />
//                       )}
//                       <div>
//                         <div className="font-medium">{category.name}</div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <code className="text-sm bg-muted px-2 py-1 rounded">
//                       {category.slug}
//                     </code>
//                   </TableCell>
//                   <TableCell>
//                     <div className="max-w-xs truncate text-muted-foreground">
//                       {category.description || "No description"}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={category.isActive ? "default" : "secondary"}
//                     >
//                       {category.isActive ? "Active" : "Inactive"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     {new Date(category.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() =>
//                           router.push(`/admin/categories/${category._id}`)
//                         }
//                         className="text-primary"
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => setCategoryToDelete(category)}
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
//           open={!!categoryToDelete}
//           onOpenChange={(open) => !open && setCategoryToDelete(null)}
//         >
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This will permanently delete the category "
//                 {categoryToDelete?.name}". This action cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() =>
//                   categoryToDelete && handleDeleteCategory(categoryToDelete._id)
//                 }
//                 className="bg-red-600 text-white hover:bg-red-700"
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         {filteredCategories.length === 0 && (
//           <div className="text-center py-8 text-muted-foreground">
//             {searchTerm
//               ? "No categories found matching your search."
//               : "No categories found."}
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
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, Pencil, Trash, FolderOpen, CheckCircle, XCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/admin/StatsCard";
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

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
}

export function CategoriesTable() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    recent: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
        
        // Calculate stats
        const categories = data.categories;
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        setStats({
          total: categories.length,
          active: categories.filter((cat: Category) => cat.isActive).length,
          inactive: categories.filter((cat: Category) => !cat.isActive).length,
          recent: categories.filter((cat: Category) => 
            new Date(cat.createdAt) > sevenDaysAgo
          ).length,
        });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter((cat) => cat._id !== id));
        toast.success("Category deleted successfully");
      } else {
        throw new Error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
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
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your product categories</CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/categories/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
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

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
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
            <CardTitle className="text-xl sm:text-2xl">Categories</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Manage your product categories
            </CardDescription>
          </div>
          <Button asChild className="w-full sm:w-auto transition-all duration-200 hover:scale-105">
            <Link href="/admin/categories/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Categories"
            value={stats.total.toLocaleString()}
            description="All product categories"
            icon={<FolderOpen className="h-4 w-4 text-yellow-600" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
          <StatsCard
            title="Active Categories"
            value={stats.active.toLocaleString()}
            description="Currently active"
            icon={<CheckCircle className="h-4 w-4 text-green-600" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
          <StatsCard
            title="Inactive Categories"
            value={stats.inactive.toLocaleString()}
            description="Currently inactive"
            icon={<XCircle className="h-4 w-4 text-red-600" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
          <StatsCard
            title="Recent Categories"
            value={stats.recent.toLocaleString()}
            description="Added in last 7 days"
            icon={<Calendar className="h-4 w-4 text-blue-600" />}
            className="hover:shadow-lg transition-all duration-300 hover:scale-102"
          />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors duration-200" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="rounded-md border transition-all duration-300 hover:shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50 transition-colors duration-200">
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category, index) => (
                <TableRow 
                  key={category._id}
                  className="group hover:bg-muted/50 transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-48">
                      {category.image && (
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={category.image || "/placeholder.svg"}
                            alt=""
                            className="w-12 h-12 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium transition-colors duration-200 group-hover:text-primary">
                          {category.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded transition-all duration-200 hover:bg-muted/80">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate text-muted-foreground">
                      {category.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={category.isActive ? "default" : "secondary"}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/admin/categories/${category._id}`)
                        }
                        className="text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCategoryToDelete(category)}
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
          open={!!categoryToDelete}
          onOpenChange={(open) => !open && setCategoryToDelete(null)}
        >
          <AlertDialogContent className="animate-in fade-in-0 zoom-in-95 duration-300">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Trash className="h-5 w-5 text-red-500" />
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the category "
                <span className="font-medium text-foreground">
                  {categoryToDelete?.name}
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
                  categoryToDelete && handleDeleteCategory(categoryToDelete._id)
                }
                className="bg-red-600 text-white hover:bg-red-700 transition-all duration-200 hover:scale-105"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {filteredCategories.length === 0 && !loading && (
          <div className="text-center py-12 text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="animate-bounce">
              <FolderOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-medium mb-2">No categories found</h3>
            <p className="text-sm">
              {searchTerm
                ? "No categories match your search criteria."
                : "Get started by creating your first category."}
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                className="mt-4 transition-all duration-200 hover:scale-105"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
