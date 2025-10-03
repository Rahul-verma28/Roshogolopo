"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from "@/lib/redux/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingCart, Tag, X, Check } from "lucide-react";

export default function ClientCartPage() {
  const { items, totalItems, totalAmount, appliedCoupon } = useAppSelector(
    (s) => s.cart
  );
  const dispatch = useAppDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const changeQty = (productId: string, weightOption: string, q: number) => {
    if (q <= 0) dispatch(removeFromCart({ productId, weightOption }));
    else dispatch(updateQuantity({ productId, quantity: q, weightOption }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");

    try {
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: couponCode,
          cartTotal: subtotal,
        }),
      });

      const data = await response.json();
      console.log("Coupon validation response:", data);
      if (response.ok) {
        console.log("Coupon applied:", data);
        dispatch(
          applyCoupon({
            code: data.coupon.code,
            discount: data.coupon.discount, // The calculated discount amount
            value: data.coupon.value, // The raw coupon value
            type: data.coupon.type,
          })
        );
        setCouponCode("");
      } else {
        setCouponError(data.error || "Invalid coupon code");
      }
    } catch (error) {
      console.error("Coupon application error:", error);
      setCouponError("Failed to apply coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discount = (subtotal * appliedCoupon.discount) / 100;
    } else {
      discount = appliedCoupon.discount;
    }
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2">
            Add some delicious Bengali sweets to get started.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button
              asChild
              className="mt-6 bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-semibold text-[var(--roshogolpo-gold)]">
            Your Cart
          </h1>
          <p className="text-muted-foreground mt-1">
            You have {totalItems} item{totalItems > 1 ? "s" : ""} in your cart.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            className="bg-[var(--roshogolpo-active)] hover:bg-[var(--roshogolpo-gold)] text-white"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </Button>
        </motion.div>
      </motion.header>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg border p-6 h-fit space-y-4"
        >
          <h2 className="text-xl font-semibold text-[var(--roshogolpo-gold)]">
            Order Items
          </h2>
          <div>
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.productId + item.weightOption}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4 py-5 border-b border-gray-100 last:border-b-0"
                >
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-pretty">{item.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.category}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--roshogolpo-gold)] mt-1">
                      ₹{item.price},
                      <span className="pl-2 text-xs text-gray-500">
                        {item.weightOption}
                      </span>
                    </p>
                    {/* <p className="text-sm text-gray-500">{item.weightOption}</p> */}
                    <div className="mt-3 flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent hover:bg-[var(--roshogolpo-gold)] hover:text-white transition-colors"
                        onClick={() =>
                          changeQty(
                            item.productId,
                            item.weightOption,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="w-8 text-center font-semibold"
                      >
                        {item.quantity}
                      </motion.span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent hover:bg-[var(--roshogolpo-gold)] hover:text-white transition-colors"
                        onClick={() =>
                          changeQty(
                            item.productId,
                            item.weightOption,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-red-50"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId: item.productId,
                              weightOption: item.weightOption,
                            })
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <motion.div
                    key={item.quantity}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-right font-semibold text-[var(--roshogolpo-gold)]"
                  >
                    ₹{((item.price || 0) * item.quantity).toFixed(2)}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg border p-6 h-fit space-y-4"
        >
          <h2 className="text-xl font-semibold text-[var(--roshogolpo-gold)]">
            Order Summary
          </h2>

          {/* Coupon Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4" />
              Coupon Code
            </div>

            {appliedCoupon ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    {appliedCoupon.code}
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {appliedCoupon.type === "percent"
                      ? `${appliedCoupon.discount}%`
                      : `₹${appliedCoupon.discount}`}{" "}
                    off
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveCoupon}
                  className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                  onKeyUp={(e) => e.key === "Enter" && handleApplyCoupon()}
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim() || couponLoading}
                  className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]"
                >
                  {couponLoading ? "..." : "Apply"}
                </Button>
              </div>
            )}

            {couponError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600"
              >
                {couponError}
              </motion.p>
            )}
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {appliedCoupon && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between text-green-600"
              >
                <span>Discount ({appliedCoupon.code})</span>
                <span>-₹{discount?.toFixed(2)}</span>
              </motion.div>
            )}

            <Separator />

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <motion.span
                key={totalAmount}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-[var(--roshogolpo-gold)]"
              >
                ₹{(totalAmount || 0).toFixed(2)}
              </motion.span>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Button
              asChild
              className="w-full bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]"
            >
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>

          {/* Sample Coupon Codes */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-medium text-amber-800 mb-2">
              Try these codes:
            </p>
            <div className="space-y-1 text-xs text-amber-700">
              <div>
                <code className="bg-amber-100 px-1 rounded">SWEET10</code> - 10%
                off
              </div>
              <div>
                <code className="bg-amber-100 px-1 rounded">BENGALI50</code> -
                ₹50 off
              </div>
              <div>
                <code className="bg-amber-100 px-1 rounded">FESTIVAL15</code> -
                15% off
              </div>
            </div>
          </div>
        </motion.aside>
      </section>
    </main>
  );
}
