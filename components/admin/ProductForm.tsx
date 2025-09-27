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
import { Badge } from "@/components/ui/badge";
import ImageUpload from "./ImageUpload";

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
    images: [],
    weightPrices: [{ weight: "", price: 0 }],
    ingredients: [],
    isFeatured: false,
    isActive: true,
    inStock: true,
  });
  const [newIngredient, setNewIngredient] = useState("");

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
        weightPrices:
          product.weightPrices?.length > 0
            ? product.weightPrices
            : [{ weight: "", price: 0 }],
        ingredients:
          product.ingredients?.length > 0 ? product.ingredients : [""],
        isFeatured: product.isFeatured ?? false,
        isActive: product.isActive ?? true,
        inStock: product.inStock ?? true,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product details");
    }
  };

  const handleImageChange = (
    field: string,
    value: any | ((prev: any) => any)
  ) => {
    setFormData((prev) => {
      const updatedValue =
        typeof value === "function"
          ? value(prev[field as keyof ProductFormData])
          : value;

      const updatedForm = { ...prev, [field]: updatedValue };

      return updatedForm;
    });
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

  // const addIngredient = () => {
  //   setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  // };

  // const removeIngredient = (index: number) => {
  //   setFormData({
  //     ...formData,
  //     ingredients: formData.ingredients.filter((_, i) => i !== index),
  //   });
  // };

  const addIngredient = () => {
    const ingredientValue = newIngredient.trim();
    if (ingredientValue && !formData.ingredients.includes(ingredientValue)) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientValue],
      }));
      setNewIngredient("");
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter(
        (ingredient) => ingredient !== ingredientToRemove
      ),
    }));
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
        <Card className="w-full">
          <CardHeader>
            <h1 className="text-2xl">Product Information</h1>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
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
                  <Label htmlFor="slug">
                    Slug <span className="text-red-500">*</span>
                  </Label>
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
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  Category <span className="text-red-500">*</span>
                </Label>
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
            </div>

            {/* Product Images Section */}
            <div className="space-y-4">
              <Label>
                  Product Images <span className="text-red-500">*</span>
                </Label>
              <ImageUpload
                value={formData.images}
                onChange={(images) => handleImageChange("images", images)}
                multiple={true}
              />
              {errors.images && (
                <p className="text-sm text-red-500">{errors.images}</p>
              )}
            </div>

            {/* Weight & Pricing Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>
                  Weight & Pricing <span className="text-red-500">*</span>
                </Label>
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
              <div className="space-y-4">
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
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="space-y-4">
              {/* <h3 className="text-lg font-semibold text-muted-foreground border-b pb-2">
                Ingredients
              </h3> */}
              <Label>
                  Ingredients <span className="text-red-500">*</span>
                </Label>
              <div className="flex flex-wrap gap-2">
                {formData.ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {ingredient}
                    <button
                      type="button"
                      className="h-auto p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeIngredient(ingredient)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addIngredient())
                  }
                  placeholder="Add an ingredient"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={addIngredient}>
                  Add
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-fit">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
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
          </CardContent>
        </Card>
      </form>
    </>
  );
}
