"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ThemedPageShell from "@/app/components/ThemedPageShell";

import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
  );

  const [formData, setFormData] = useState({
    user: "",
    total_amount: "",
    order_status: "pending",
    payment_status: "unpaid",
  });

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/orders/"
      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/users/users/"
      );

      console.log("USERS:", res.data);

      if (Array.isArray(res.data)) {

        setUsers(res.data);

      } else if (res.data.results) {

        setUsers(res.data.results);

      } else {

        setUsers([]);

      }

    } catch (error) {

      console.log(error);

      setUsers([]);

    }
  };

  useEffect(() => {

    fetchOrders();
    fetchUsers();

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD ORDER
  const addOrder = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        {
          user: Number(formData.user),

          total_amount: Number(formData.total_amount),

          order_status: formData.order_status,

          payment_status: formData.payment_status,
        }
      );

      toast.success("Order Added Successfully");

      fetchOrders();

      setFormData({
        user: "",
        total_amount: "",
        order_status: "pending",
        payment_status: "unpaid",
      });

    } catch (error) {

      console.log(error.response?.data);

      toast.error("Error Adding Order");
    }
  };

  // DELETE ORDER
  const deleteOrder = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/orders/${id}/`
      );

      toast.success("Order Deleted");

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <ThemedPageShell
      title="Orders Management"
      subtitle="Track all customer orders"
      icon={FaShoppingCart}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search Orders..."
    >

      <Toaster />

      <div className="ims-panel flex items-center gap-4 p-5">
        <FaSearch className="text-cyan-200" />
        <input
          type="text"
          placeholder="Search Orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
        />
      </div>

      <form onSubmit={addOrder} className="ims-panel">
        <h2 className="mb-6 text-2xl font-black text-white">Create New Order</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <select name="user" value={formData.user} onChange={handleChange} className="ims-select h-[58px]" required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>

          <input type="number" name="total_amount" placeholder="Total Amount" value={formData.total_amount} onChange={handleChange} className="ims-input" required />

          <select name="order_status" value={formData.order_status} onChange={handleChange} className="ims-select">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select name="payment_status" value={formData.payment_status} onChange={handleChange} className="ims-select">
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <button type="submit" className="ims-primary-btn mt-6">
          <FaPlus />
          Create Order
        </button>
      </form>

      <div className="ims-panel overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="ims-table min-w-[720px]">
            <thead className="ims-table-head">
              <tr>
                <th className="p-5 text-left">User</th>
                <th className="p-5 text-left">Total</th>
                <th className="p-5 text-left">Order Status</th>
                <th className="p-5 text-left">Payment</th>
                <th className="p-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders
                .filter((order) => {
                  const query = search.toLowerCase();
                  return (
                    String(order.id || "").toLowerCase().includes(query) ||
                    String(order.username || "").toLowerCase().includes(query) ||
                    String(order.user || "").toLowerCase().includes(query) ||
                    String(order.order_status || "").toLowerCase().includes(query)
                  );
                })
                .map((order) => (
                  <tr key={order.id} className="ims-table-row">
                    <td className="p-5">{order.user}</td>
                    <td className="p-5 font-semibold">&#8377;{order.total_amount}</td>
                    <td className="p-5">
                      <span className="rounded-full bg-amber-500/20 px-4 py-2 text-sm text-amber-200">
                        {order.order_status}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-200">
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="p-5">
                      <button onClick={() => deleteOrder(order.id)} className="ims-danger-btn">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </ThemedPageShell>
  );
}
