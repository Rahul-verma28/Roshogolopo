import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface OrderItem {
  product: string
  name: string
  image: string
  weightOption: string
  price: number
  quantity: number
  total: number
}

interface Order {
  _id: string
  orderNumber: string
  customer: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: string
  appliedCoupon?: {
    code: string
    type: "percentage" | "fixed"
    value: number
    discount: number
  }
  createdAt: string
  updatedAt: string
}

interface OrdersState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
    totalOrders: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  } | null
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  pagination: null,
}

// Async thunks
export const createOrder = createAsyncThunk(
  "orders/create",
  async (
    orderData: {
      items: Array<{
        productId: string
        weightOption: string
        quantity: number
      }>
      shippingAddress: {
        street: string
        city: string
        state: string
        zipCode: string
      }
      paymentMethod: string
      couponCode?: string
    },
    { getState },
  ) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No token available")
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create order")
    }

    return response.json()
  },
)

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async ({ page = 1, limit = 10, status }: { page?: number; limit?: number; status?: string } = {}, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No token available")
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (status) {
      params.append("status", status)
    }

    const response = await fetch(`/api/orders?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch orders")
    }

    return response.json()
  },
)

export const fetchOrderById = createAsyncThunk("orders/fetchById", async (orderId: string, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const token = state.auth.token

  if (!token) {
    throw new Error("No token available")
  }

  const response = await fetch(`/api/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch order")
  }

  return response.json()
})

export const cancelOrder = createAsyncThunk("orders/cancel", async (orderId: string, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const token = state.auth.token

  if (!token) {
    throw new Error("No token available")
  }

  const response = await fetch(`/api/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: "cancel" }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to cancel order")
  }

  return response.json()
})

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders.unshift(action.payload.order)
        state.currentOrder = action.payload.order
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to create order"
      })

      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload.orders
        state.pagination = action.payload.pagination
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch orders"
      })

      // Fetch Order by ID
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload.order
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload.order
        const index = state.orders.findIndex((order) => order._id === updatedOrder._id)
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
        if (state.currentOrder && state.currentOrder._id === updatedOrder._id) {
          state.currentOrder = updatedOrder
        }
      })
  },
})

export const { clearError, clearCurrentOrder } = ordersSlice.actions
export default ordersSlice.reducer
