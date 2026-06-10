"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaEdit,
  FaMapMarkerAlt,
  FaPlus,
  FaRegClock,
  FaSave,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const tabs = [
  ["orders", "My Orders", FaClipboardList],
  ["profile", "Profile", FaUserCircle],
  ["activity", "Recent Activity", FaRegClock],
  ["addresses", "Addresses", FaMapMarkerAlt],
];

const emptyAddress = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
};

const statusStyles = {
  pending: "bg-amber-300/15 text-amber-200 ring-amber-300/20",
  processing: "bg-sky-300/15 text-sky-200 ring-sky-300/20",
  shipped: "bg-indigo-300/15 text-indigo-200 ring-indigo-300/20",
  delivered: "bg-emerald-300/15 text-emerald-200 ring-emerald-300/20",
  cancelled: "bg-rose-300/15 text-rose-200 ring-rose-300/20",
};

function readLocalStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.log(error);
    return fallback;
  }
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mapUserAddress(user) {
  if (!user) return emptyAddress;

  return {
    fullName: user.address_full_name || "",
    phone: user.address_phone || "",
    addressLine1: user.address_line1 || "",
    addressLine2: user.address_line2 || "",
    city: user.address_city || "",
    state: user.address_state || "",
    country: user.address_country || "",
    pincode: user.address_pincode || "",
  };
}

function hasAddress(address) {
  return Boolean(
    address?.fullName ||
      address?.phone ||
      address?.addressLine1 ||
      address?.addressLine2 ||
      address?.city ||
      address?.state ||
      address?.country ||
      address?.pincode
  );
}

function toUserAddressPayload(address) {
  return {
    address_full_name: address.fullName,
    address_phone: address.phone,
    address_line1: address.addressLine1,
    address_line2: address.addressLine2,
    address_city: address.city,
    address_state: address.state,
    address_country: address.country,
    address_pincode: address.pincode,
  };
}

export default function UserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("-");
  const [role, setRole] = useState("user");
  const [accountCreated, setAccountCreated] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activities, setActivities] = useState([]);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profile, setProfile] = useState({ name: "", phone: "" });

  const fetchAccountData = useCallback(async (currentUsername) => {
    try {
      const ordersRes = await axios.get(
        `http://127.0.0.1:8000/api/orders/?username=${encodeURIComponent(currentUsername)}`
      );
      const ordersData = ordersRes.data.results || ordersRes.data || [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.log(error);
    }

    try {
      const usersRes = await axios.get("http://127.0.0.1:8000/api/users/users/");
      const usersData = usersRes.data.results || usersRes.data || [];
      const currentUser = usersData.find((user) => user.username === currentUsername);

      if (currentUser?.email) {
        const nextAddress = mapUserAddress(currentUser);

        setCurrentUserId(currentUser.id);
        setEmail(currentUser.email);
        setSavedAddress(hasAddress(nextAddress) ? nextAddress : null);
        setAddressForm(nextAddress);
        setIsEditingAddress(!hasAddress(nextAddress));
        localStorage.setItem("email", currentUser.email);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username") || "User";

    if (storedRole !== "user") {
      router.push("/login");
      return;
    }

    const createdKey = "ims_user_account_created";
    const existingCreated = localStorage.getItem(createdKey);
    const nextCreated = existingCreated || new Date().toISOString();

    if (!existingCreated) {
      localStorage.setItem(createdKey, nextCreated);
    }

    const loadStoredAccount = setTimeout(() => {
      setUsername(storedUsername);
      setEmail(localStorage.getItem("email") || "-");
      setRole(storedRole);
      setAccountCreated(nextCreated);
      setProfile(readLocalStorage("ims_user_profile", { name: storedUsername, phone: "" }));
      setActivities(readLocalStorage("ims_user_activity", []));
      fetchAccountData(storedUsername);
    }, 0);

    return () => clearTimeout(loadStoredAccount);
  }, [fetchAccountData, router]);

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);
  const orderRows = useMemo(() => {
    return orders.flatMap((order) => {
      const items = order.items?.length
        ? order.items
        : [{ id: `order-${order.id}`, product_name: "Order items", quantity: "-", line_total: order.total_amount }];

      return items.map((item) => ({
        id: `${order.id}-${item.id}`,
        orderId: order.id,
        productName: item.product_name || `Product ${item.product || ""}`,
        quantity: item.quantity,
        amount: Number(item.line_total || order.total_amount || 0),
        status: order.order_status || "pending",
        date: order.order_date,
      }));
    });
  }, [orders]);

  function saveProfile() {
    localStorage.setItem("ims_user_profile", JSON.stringify(profile));
  }

  function handleAddressChange(event) {
    setAddressForm({
      ...addressForm,
      [event.target.name]: event.target.value,
    });
  }

  async function saveAddress() {
    if (!currentUserId || !addressForm.fullName || !addressForm.addressLine1 || !addressForm.phone) return;

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/users/users/${currentUserId}/`,
        toUserAddressPayload(addressForm)
      );

      setSavedAddress(addressForm);
      setIsEditingAddress(false);
    } catch (error) {
      console.log(error);
    }
  }

  function editAddress(address) {
    setAddressForm({
      fullName: address.fullName || "",
      phone: address.phone || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      pincode: address.pincode || "",
    });
    setIsEditingAddress(true);
  }

  async function deleteAddress() {
    if (!currentUserId) return;

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/users/users/${currentUserId}/`,
        toUserAddressPayload(emptyAddress)
      );

      setSavedAddress(null);
      setAddressForm(emptyAddress);
      setIsEditingAddress(true);
    } catch (error) {
      console.log(error);
    }
  }

  function renderOrders() {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-cyan-900/10">
            <p className="text-sm text-slate-400">Total Orders</p>
            <p className="mt-3 text-3xl font-black text-white">{orders.length}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-cyan-900/10">
            <p className="text-sm text-slate-400">Recent Orders</p>
            <p className="mt-3 text-3xl font-black text-white">{recentOrders.length}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-cyan-900/10">
            <p className="text-sm text-slate-400">Latest Status</p>
            <p className="mt-3 text-xl font-black capitalize text-white">{recentOrders[0]?.order_status || "-"}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-[#111827]/80 px-6 py-16 text-center shadow-2xl shadow-cyan-950/20">
            <FaBoxOpen className="mx-auto text-5xl text-slate-500" />
            <h2 className="mt-6 text-2xl font-black text-white">No orders yet</h2>
            <button
              onClick={() => router.push("/user/products")}
              className="mt-6 rounded-full bg-cyan-400 px-7 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07101f]/80">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.07] text-slate-300">
                <tr>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Product Name</th>
                  <th className="px-5 py-4">Quantity</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orderRows.map((order) => (
                  <tr key={order.id} className="border-t border-white/5">
                    <td className="px-5 py-5 font-bold text-white">#{order.orderId}</td>
                    <td className="px-5 py-5 text-slate-200">{order.productName}</td>
                    <td className="px-5 py-5 text-slate-300">{order.quantity}</td>
                    <td className="px-5 py-5 font-black text-cyan-100">
                      &#8377;{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-5">
                      <span className={`rounded-full px-3 py-2 text-xs font-bold capitalize ring-1 ${statusStyles[order.status] || "bg-sky-500/15 text-sky-200 ring-sky-300/20"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-slate-300">{formatDate(order.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  function renderProfile() {
    return (
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-[#07101f]/80 p-6 shadow-xl shadow-cyan-950/20">
          <FaUserCircle className="text-6xl text-cyan-200" />
          <h2 className="mt-5 text-2xl font-black text-white">{profile.name || username}</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div>
              <p className="text-slate-500">Username</p>
              <p className="mt-1 font-semibold text-white">{username}</p>
            </div>
            <div>
              <p className="text-slate-500">Email</p>
              <p className="mt-1 font-semibold text-white">{email}</p>
            </div>
            <div>
              <p className="text-slate-500">Role</p>
              <p className="mt-1 font-semibold capitalize text-white">{role}</p>
            </div>
            <div>
              <p className="text-slate-500">Account Created Date</p>
              <p className="mt-1 font-semibold text-white">{formatDate(accountCreated)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-cyan-950/20">
          <h3 className="text-xl font-black text-white">Edit Profile</h3>
          <div className="mt-6 grid gap-4">
            <label className="text-sm font-semibold text-slate-300">
              Name
              <input
                value={profile.name}
                onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-white outline-none ring-cyan-300/20 focus:ring-2"
              />
            </label>
            <label className="text-sm font-semibold text-slate-300">
              Phone
              <input
                value={profile.phone}
                onChange={(event) => setProfile({ ...profile, phone: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-white outline-none ring-cyan-300/20 focus:ring-2"
              />
            </label>
            <button
              onClick={saveProfile}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
            >
              <FaSave /> Save Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderActivity() {
    return activities.length === 0 ? (
      <div className="rounded-[28px] border border-white/10 bg-[#111827]/80 px-6 py-16 text-center text-slate-300 shadow-2xl shadow-cyan-950/20">
        No recent activity
      </div>
    ) : (
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-cyan-950/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-white">{activity.activity}</p>
                <p className="mt-1 text-sm text-slate-400">{formatDate(activity.createdAt)}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                <FaCalendarAlt /> {formatTime(activity.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderAddresses() {
    return (
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-cyan-950/20">
          <h3 className="text-xl font-black text-white">{savedAddress && !isEditingAddress ? "Saved Address" : "Address Details"}</h3>
          <div className="mt-6 grid gap-4">
            {[
              ["fullName", "Full Name"],
              ["phone", "Phone Number"],
              ["addressLine1", "Address Line 1"],
              ["addressLine2", "Address Line 2"],
              ["city", "City"],
              ["state", "State"],
              ["country", "Country"],
              ["pincode", "Pincode"],
            ].map(([name, label]) => (
              <label key={name} className="text-sm font-semibold text-slate-300">
                {label}
                <input
                  name={name}
                  value={addressForm[name]}
                  onChange={handleAddressChange}
                  disabled={savedAddress && !isEditingAddress}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-white outline-none ring-cyan-300/20 focus:ring-2"
                />
              </label>
            ))}
            {savedAddress && !isEditingAddress ? null : (
              <button
                onClick={saveAddress}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
              >
                <FaPlus /> {savedAddress ? "Update Address" : "Add Address"}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {!savedAddress ? (
            <div className="rounded-[28px] border border-white/10 bg-[#111827]/80 px-6 py-16 text-center text-slate-300 shadow-2xl shadow-cyan-950/20">
              No addresses saved
            </div>
          ) : (
            <div className="rounded-[24px] border border-white/10 bg-[#07101f]/80 p-5 shadow-xl shadow-cyan-950/20">
              <h4 className="text-lg font-black text-white">{savedAddress.fullName}</h4>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">
                {[savedAddress.addressLine1, savedAddress.addressLine2, savedAddress.city, savedAddress.state, savedAddress.country, savedAddress.pincode]
                  .filter(Boolean)
                  .join(",\n")}
              </p>
              <p className="mt-2 text-sm font-semibold text-cyan-100">{savedAddress.phone}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => editAddress(savedAddress)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  <FaEdit /> Edit Address
                </button>
                <button
                  onClick={deleteAddress}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-sm font-bold text-rose-100 transition hover:bg-rose-400/15"
                >
                  <FaTrash /> Delete Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative isolate overflow-hidden rounded-[36px] border border-white/10 bg-[#07101f] p-6 shadow-2xl shadow-cyan-900/35 sm:p-8 lg:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.2),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_24%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/70">Account Portal</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Welcome back, {username}</h1>
          <p className="mt-3 text-lg text-slate-300">Manage your account, orders and profile.</p>
        </div>
      </motion.section>

      <section className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-6">
        <div className="flex gap-3 overflow-x-auto border-b border-white/10 pb-4">
          {tabs.map(([id, label, Icon]) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon /> {label}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {activeTab === "orders" ? renderOrders() : null}
          {activeTab === "profile" ? renderProfile() : null}
          {activeTab === "activity" ? renderActivity() : null}
          {activeTab === "addresses" ? renderAddresses() : null}
        </div>
      </section>
    </div>
  );
}
