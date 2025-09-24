"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "./PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Save } from "lucide-react";
import { toast } from "sonner";
import type { Category } from "@/lib/types";

interface WeightPrice {
  weight: string;
  price: number;
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  weightPrices: WeightPrice[];
  ingredients: string[];
  isFeatured: boolean;
  isActive: boolean;
  inStock: boolean;
}

interface FormErrors {
  name?: string;
  slug?: string;
  description?: string;
  category?: string;
  images?: string;
  weightPrices?: string;
  ingredients?: string;
}

export function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    description: "",
    category: "",
    images: [""],
    weightPrices: [{ weight: "", price: 0 }],
    ingredients: [""],
    isFeatured: false,
    isActive: true,
    inStock: true,
  });

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      
      const data = await response.json();
      // Handle both possible response structures
      const product = data.product || data;
      
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        category: product.category?._id || product.category || "",
        images: product.images?.length > 0 ? product.images : [""],
        weightPrices: product.weightPrices?.length > 0 ? product.weightPrices : [{ weight: "", price: 0 }],
        ingredients: product.ingredients?.length > 0 ? product.ingredients : [""],
        isFeatured: product.isFeatured ?? false,
        isActive: product.isActive ?? true,
        inStock: product.inStock ?? true,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product details");
    }
  };

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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic information validation
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Product slug is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    // Images validation - at least one image is required
    const validImages = formData.images.filter((img) => img.trim());
    if (validImages.length === 0) {
      newErrors.images = "At least one product image is required";
    }

    // Weight prices validation - at least one weight/price is required
    const validWeightPrices = formData.weightPrices.filter(
      (wp) => wp.weight.trim() && wp.price > 0
    );
    if (validWeightPrices.length === 0) {
      newErrors.weightPrices =
        "At least one weight and price combination is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const url = productId
        ? `/api/admin/products/${productId}`
        : "/api/admin/products";
      const method = productId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: formData.images.filter((img) => img.trim()),
          ingredients: formData.ingredients.filter((ing) => ing.trim()),
          weightPrices: formData.weightPrices.filter(
            (wp) => wp.weight && wp.price > 0
          ),
        }),
      });

      if (!response.ok) throw new Error("Failed to save product");

      const successMessage = productId
        ? "Product updated successfully"
        : "Product created successfully";
      toast.success(successMessage);
      router.push("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      const errorMessage = productId
        ? "Failed to update product"
        : "Failed to create product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addWeightPrice = () => {
    setFormData({
      ...formData,
      weightPrices: [...formData.weightPrices, { weight: "", price: 0 }],
    });
  };

  const removeWeightPrice = (index: number) => {
    setFormData({
      ...formData,
      weightPrices: formData.weightPrices.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Products", href: "/admin/products" },
    { label: productId ? "Edit Product" : "New Product" },
  ];

  return (
    <>
      <PageHeader
        title={productId ? "Edit Product" : "Add New Product"}
        description={
          productId
            ? "Update product information"
            : "Create a new product for your sweet shop"
        }
        breadcrumbs={breadcrumbs}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                          slug: generateSlug(e.target.value),
                        });
                        // Clear error when user starts typing
                        if (errors.name) {
                          setErrors((prev) => ({
                            ...prev,
                            name: undefined,
                            slug: undefined,
                          }));
                        }
                      }}
                      placeholder="Enter product name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => {
                        setFormData({ ...formData, slug: e.target.value });
                        // Clear error when user starts typing
                        if (errors.slug) {
                          setErrors((prev) => ({ ...prev, slug: undefined }));
                        }
                      }}
                      placeholder="product-slug"
                      className={errors.slug ? "border-red-500" : ""}
                    />
                    {errors.slug && (
                      <p className="text-sm text-red-500">{errors.slug}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      // Clear error when user starts typing
                      if (errors.description) {
                        setErrors((prev) => ({
                          ...prev,
                          description: undefined,
                        }));
                      }
                    }}
                    placeholder="Enter product description"
                    className={errors.description ? "border-red-500" : ""}
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Weight & Pricing */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Weight & Pricing *</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addWeightPrice}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Weight
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.weightPrices.map((wp, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Weight (e.g., 250g, 1kg)"
                        value={wp.weight}
                        onChange={(e) => {
                          const newWeightPrices = [...formData.weightPrices];
                          newWeightPrices[index].weight = e.target.value;
                          setFormData({
                            ...formData,
                            weightPrices: newWeightPrices,
                          });
                          if (errors.weightPrices) {
                            setErrors((prev) => ({
                              ...prev,
                              weightPrices: undefined,
                            }));
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        type="number"
                        placeholder="Price (₹)"
                        value={wp.price || ""}
                        onChange={(e) => {
                          const newWeightPrices = [...formData.weightPrices];
                          newWeightPrices[index].price =
                            Number.parseFloat(e.target.value) || 0;
                          setFormData({
                            ...formData,
                            weightPrices: newWeightPrices,
                          });
                          if (errors.weightPrices) {
                            setErrors((prev) => ({
                              ...prev,
                              weightPrices: undefined,
                            }));
                          }
                        }}
                      />
                    </div>
                    {formData.weightPrices.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeWeightPrice(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {errors.weightPrices && (
                  <p className="text-sm text-red-500">{errors.weightPrices}</p>
                )}
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product Images *</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImage}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[index] = e.target.value;
                          setFormData({ ...formData, images: newImages });
                          if (errors.images) {
                            setErrors((prev) => ({
                              ...prev,
                              images: undefined,
                            }));
                          }
                        }}
                        className={`${errors.images ? "border-red-500" : ""}`}
                      />
                    </div>
                    {formData.images.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {errors.images && (
                  <p className="text-sm text-red-500">{errors.images}</p>
                )}
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Ingredients</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIngredient}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Ingredient name"
                        value={ingredient}
                        onChange={(e) => {
                          const newIngredients = [...formData.ingredients];
                          newIngredients[index] = e.target.value;
                          setFormData({
                            ...formData,
                            ingredients: newIngredients,
                          });
                        }}
                      />
                    </div>
                    {formData.ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Category & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => {
                      setFormData({ ...formData, category: value });
                      if (errors.category) {
                        setErrors((prev) => ({ ...prev, category: undefined }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
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
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Product</Label>
                    <Switch
                      id="featured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isFeatured: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="active">Active</Label>
                    <Switch
                      id="active"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="instock">In Stock</Label>
                    <Switch
                      id="instock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, inStock: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 space-y-2"
              >
                <Save className="h-4 w-4 mr-2" />
                {(() => {
                  if (loading) return "Saving...";
                  return productId ? "Update Product" : "Create Product";
                })()}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
