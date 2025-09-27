"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "./ImageUpload";
import { PageHeader } from "@/components/admin/PageHeader";

interface CategoryFormProps {
  categoryId?: string;
}

interface CategoryData {
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
}

interface FormErrors {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
}

export function CategoryForm({ categoryId }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<CategoryData>({
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`);
      if (response.ok) {
        const category = await response.json();
        setFormData({
          name: category.name || "",
          slug: category.slug || "",
          description: category.description || "",
          image: category.image || "",
          isActive: category.isActive ?? true,
        });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Failed to fetch category details");
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

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "URL slug is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Banner image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      const url = categoryId
        ? `/api/admin/categories/${categoryId}`
        : "/api/admin/categories";

      const method = categoryId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const successMessage = categoryId
          ? "Category updated successfully"
          : "Category created successfully";
        toast.success(successMessage);
        router.push("/admin/categories");
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      const errorMessage = categoryId
        ? "Failed to update category"
        : "Failed to create category";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const breadcrumbs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Products", href: "/admin/products" },
    { label: categoryId ? "Edit Category" : "New Category" },
  ];

  return (
    <>
      <PageHeader
        title={categoryId ? "Edit Category" : "Add New Category"}
        description={
          categoryId
            ? "Update category information"
            : "Create a new category for your sweet shop"
        }
        breadcrumbs={breadcrumbs}
      />

      <div className="w-full">
        <Card>
          <CardHeader>
            <h1 className="text-xl">
              Category Details
            </h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Category Name <span className="text-red-500">*</span>
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
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder="e.g., Classic collection"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">
                    URL Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        slug: e.target.value,
                      }));
                      // Clear error when user starts typing
                      if (errors.slug) {
                        setErrors((prev) => ({ ...prev, slug: undefined }));
                      }
                    }}
                    placeholder="e.g., classic-collection"
                    className={errors.slug ? "border-red-500" : ""}
                  />
                  {errors.slug && (
                    <p className="text-sm text-red-500">{errors.slug}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isActive: checked }))
                  }
                />
                <Label htmlFor="isActive">Active Category</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                    // Clear error when user starts typing
                    if (errors.description) {
                      setErrors((prev) => ({
                        ...prev,
                        description: undefined,
                      }));
                    }
                  }}
                  placeholder="Brief description of this category..."
                  className={errors.description ? "border-red-500" : ""}
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2 w-[20%]">
                <Label>
                  Category Image <span className="text-red-500">*</span>
                </Label>
                <ImageUpload
                  value={formData.image}
                  onChange={(value) =>
                    handleImageChange("image", value as string)
                  }
                  multiple={false}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {(() => {
                    if (loading) return "Saving...";
                    return categoryId ? "Update Category" : "Create Category";
                  })()}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/categories">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
