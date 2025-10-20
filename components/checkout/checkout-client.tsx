// "use client"

// import type React from "react"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { useAppSelector, useAppDispatch } from "@/lib/hooks"
// import { clearCart } from "@/lib/features/cartSlice"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { CheckCircle, CreditCard, Truck, Shield } from "lucide-react"
// import Image from "next/image"
// import { useRouter } from "next/navigation"

// export function CheckoutClient() {
//   const { items, total, itemCount } = useAppSelector((state) => state.cart)
//   const dispatch = useAppDispatch()
//   const router = useRouter()

//   const [isProcessing, setIsProcessing] = useState(false)
//   const [orderComplete, setOrderComplete] = useState(false)
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: "",
//     notes: "",
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsProcessing(true)

//     // Simulate order processing
//     await new Promise((resolve) => setTimeout(resolve, 3000))

//     setIsProcessing(false)
//     setOrderComplete(true)
//     dispatch(clearCart())

//     // Redirect to home after 5 seconds
//     setTimeout(() => {
//       router.push("/")
//     }, 5000)
//   }

//   if (items.length === 0 && !orderComplete) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h1>
//         <p className="text-gray-500 mb-8">Add some delicious Bengali sweets to get started!</p>
//         <Button asChild className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]">
//           <a href="/products">Browse Products</a>
//         </Button>
//       </div>
//     )
//   }

//   if (orderComplete) {
//     return (
//       <div className="container mx-auto px-4 py-16">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-md mx-auto text-center"
//         >
//           <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
//           <p className="text-gray-600 mb-6">
//             Thank you for your order! We'll contact you shortly to confirm delivery details.
//           </p>
//           <p className="text-xs sm:text-sm text-gray-500">Redirecting to home page in a few seconds...</p>
//         </motion.div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-[var(--roshogolpo-gold)] mb-8 font-playfair">Checkout</h1>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Order Form */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CreditCard className="h-5 w-5" />
//                 Delivery Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium mb-2">First Name *</label>
//                     <Input name="firstName" required value={formData.firstName} onChange={handleInputChange} />
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium mb-2">Last Name *</label>
//                     <Input name="lastName" required value={formData.lastName} onChange={handleInputChange} />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium mb-2">Email *</label>
//                     <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} />
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium mb-2">Phone *</label>
//                     <Input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium mb-2">Address *</label>
//                   <Textarea
//                     name="address"
//                     required
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     placeholder="Enter your complete address"
//                   />
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium mb-2">City *</label>
//                     <Input name="city" required value={formData.city} onChange={handleInputChange} />
//                   </div>
//                   <div>
//                     <label className="block text-xs sm:text-sm font-medium mb-2">PIN Code *</label>
//                     <Input name="pincode" required value={formData.pincode} onChange={handleInputChange} />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium mb-2">Special Instructions</label>
//                   <Textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     placeholder="Any special delivery instructions or preferences..."
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isProcessing}
//                   className="w-full bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white py-3"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Processing Order...
//                     </>
//                   ) : (
//                     `Place Order - ₹${(total || 0).toFixed(2)}`
//                   )}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Order Summary */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Order Summary ({itemCount} items)</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.id} className="flex items-center gap-3">
//                     <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
//                       <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-medium text-xs sm:text-sm">{item.name}</h4>
//                       <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                     <p className="font-semibold">₹{((item.price || 0) * item.quantity).toFixed(2)}</p>
//                   </div>
//                 ))}

//                 <Separator />

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Subtotal:</span>
//                     <span>₹{(total || 0).toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Delivery:</span>
//                     <span className="text-green-600">Free</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between text-sm sm:text-lg font-bold">
//                     <span>Total:</span>
//                     <span className="text-[var(--roshogolpo-gold)]">₹{(total || 0).toFixed(2)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Trust Indicators */}
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <Shield className="h-5 w-5 text-green-500" />
//                     <span className="text-xs sm:text-sm">Secure & Safe Payment</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Truck className="h-5 w-5 text-blue-500" />
//                     <span className="text-xs sm:text-sm">Free Delivery in Greater Noida</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                     <span className="text-xs sm:text-sm">Fresh & Quality Guaranteed</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/redux/slices/cartSlice";
import { createOrder } from "@/lib/redux/slices/ordersSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  CreditCard,
  Truck,
  Shield,
  AlertCircle,
  Loader2,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  paymentMethod?: string;
}

export function CheckoutClient() {
  const { items, totalItems, totalAmount, appliedCoupon } = useAppSelector(
    (state) => state.cart
  );
  const { isLoading: orderLoading, error: orderError } = useAppSelector(
    (state) => state.orders
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  // Validation functions
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete address (minimum 10 characters)";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.city = "State is required";
    }

    // PIN code validation
    const pincodeRegex = /^\d{6}$/;
    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit PIN code";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          weightOption: item.weightOption,
          quantity: item.quantity,
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
        couponCode: appliedCoupon?.code,
      };

      const result = await dispatch(createOrder(orderData)).unwrap();

      setOrderComplete(true);
      dispatch(clearCart());

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${result.orderNumber} has been created.`,
      });

      // Redirect to order confirmation or orders page
      setTimeout(() => {
        router.push(`/orders/${result._id}`);
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && validateForm()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8">
          Add some delicious Bengali sweets to get started!
        </p>
        <Button
          asChild
          className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]"
        >
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4 font-playfair"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-6"
          >
            Thank you for your order! We'll contact you shortly to confirm
            delivery details.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting to order details...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[var(--roshogolpo-gold)] font-playfair">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center mt-6 mb-8">
            <div
              className={`flex items-center ${
                currentStep >= 1
                  ? "text-[var(--roshogolpo-gold)]"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 1
                    ? "border-[var(--roshogolpo-gold)] bg-[var(--roshogolpo-gold)] text-white"
                    : "border-gray-300"
                }`}
              >
                {currentStep > 1 ? <CheckCircle className="h-4 w-4" /> : "1"}
              </div>
              <span className="ml-2 font-medium">Delivery Info</span>
            </div>
            <div
              className={`flex-1 h-0.5 mx-4 ${
                currentStep >= 2 ? "bg-[var(--roshogolpo-gold)]" : "bg-gray-300"
              }`}
            />
            <div
              className={`flex items-center ${
                currentStep >= 2
                  ? "text-[var(--roshogolpo-gold)]"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 2
                    ? "border-[var(--roshogolpo-gold)] bg-[var(--roshogolpo-gold)] text-white"
                    : "border-gray-300"
                }`}
              >
                {currentStep > 2 ? <CheckCircle className="h-4 w-4" /> : "2"}
              </div>
              <span className="ml-2 font-medium">Review & Pay</span>
            </div>
          </div>
        </motion.div>

        {orderError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{orderError}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 ? (
                    <>
                      <User className="h-5 w-5" />
                      Delivery Information
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Review & Payment
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {currentStep === 1 ? (
                    <motion.form
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-1 text-sm font-medium mb-2">
                            <User className="h-4 w-4" />
                            First Name *
                          </label>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={errors.firstName ? "border-red-500" : ""}
                            placeholder="Enter first name"
                          />
                          {errors.firstName && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.firstName}
                            </motion.p>
                          )}
                        </div>
                        <div>
                          <label className="flex items-center gap-1 text-sm font-medium mb-2">
                            <User className="h-4 w-4" />
                            Last Name *
                          </label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={errors.lastName ? "border-red-500" : ""}
                            placeholder="Enter last name"
                          />
                          {errors.lastName && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.lastName}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            Email *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? "border-red-500" : ""}
                            placeholder="Enter email address"
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            Phone *
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={errors.phone ? "border-red-500" : ""}
                            placeholder="10-digit mobile number"
                          />
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            City *
                          </label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={errors.city ? "border-red-500" : ""}
                            placeholder="City"
                          />
                          {errors.city && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.city}
                            </motion.p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            State *
                          </label>
                          <Input
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            PIN Code *
                          </label>
                          <Input
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className={errors.pincode ? "border-red-500" : ""}
                            placeholder="6-digit PIN"
                          />
                          {errors.pincode && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-xs mt-1"
                            >
                              {errors.pincode}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Address *
                        </label>
                        <Textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={errors.address ? "border-red-500" : ""}
                          placeholder="Enter your complete address with landmarks"
                          rows={3}
                        />
                        {errors.address && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1"
                          >
                            {errors.address}
                          </motion.p>
                        )}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]"
                        >
                          Continue to Review
                        </Button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Payment Methods */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Payment Method
                        </h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cod"
                              checked={formData.paymentMethod === "cod"}
                              onChange={handleInputChange}
                              className="text-[var(--roshogolpo-gold)]"
                            />
                            <CreditCard className="h-5 w-5" />
                            <span>Cash on Delivery</span>
                          </label>
                          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="online"
                              disabled
                              className="text-[var(--roshogolpo-gold)]"
                            />
                            <Shield className="h-5 w-5" />
                            <span>Online Payment (Coming Soon)</span>
                          </label>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Delivery Details
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                          <p>
                            <strong>Name:</strong> {formData.firstName}{" "}
                            {formData.lastName}
                          </p>
                          <p>
                            <strong>Phone:</strong> {formData.phone}
                          </p>
                          <p>
                            <strong>Email:</strong> {formData.email}
                          </p>
                          <p>
                            <strong>Address:</strong> {formData.address},{" "}
                            {formData.city}, {formData.state} -{" "}
                            {formData.pincode}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="px-6"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={isProcessing || orderLoading}
                          className="flex-1 bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]"
                        >
                          {isProcessing || orderLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Processing Order...
                            </>
                          ) : (
                            `Place Order - ₹${(totalAmount || 0).toFixed(2)}`
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Order Summary ({totalItems} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.quantity}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs sm:text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{((item.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{(subtotal || 0).toFixed(2)}</span>
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
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm sm:text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-[var(--roshogolpo-gold)]">
                      ₹{(totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-xs sm:text-sm">
                      Secure & Safe Payment
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm">
                      Free Delivery in Greater Noida
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-xs sm:text-sm">
                      Fresh & Quality Guaranteed
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
