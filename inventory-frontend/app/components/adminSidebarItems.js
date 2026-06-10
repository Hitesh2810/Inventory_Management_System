import {
  FaBox,
  FaCog,
  FaEnvelope,
  FaRupeeSign,
  FaShoppingCart,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { MdReviews } from "react-icons/md";

export const ADMIN_SIDEBAR_ITEMS = [
  ["Dashboard", FaBox, "/admin/dashboard"],
  ["Products", FaBox, "/products"],
  ["Orders", FaShoppingCart, "/orders"],
  ["Users", FaUsers, "/users"],
  ["Suppliers", FaTruck, "/suppliers"],
  ["Sales", FaRupeeSign, "/sales"],
  ["Reports", MdReviews, "/reports"],
  ["Contact Us", FaEnvelope, "/admin/contact-us"],
  ["Settings", FaCog, "/settings"],
];
