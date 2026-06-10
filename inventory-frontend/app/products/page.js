"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ThemedPageShell from "@/app/components/ThemedPageShell";

import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaBoxes,
  FaSearch,
} from "react-icons/fa";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const lowStockProducts = products.filter(
  (product) => product.stock <= 5
).length;

  const [search, setSearch] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
  );
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    barcode: "",
    category: "",
    supplier: "",
    created_by: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH PRODUCTS
  async function fetchProducts() {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  }

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD PRODUCT
  const addProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/products/",
        formData
      );

      toast.success("Product Added Successfully");

      fetchProducts();

      resetForm();

    } catch (error) {

      console.log(error);
      toast.error("Error Adding Product");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/products/${id}/`
      );

      toast.success("Product Deleted");

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  // EDIT PRODUCT
  const editProduct = (product) => {

    setFormData({
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
      barcode: product.barcode,
      category: product.category,
      supplier: product.supplier,
      created_by: product.created_by,
    });

    setEditingId(product.id);
  };

  // UPDATE PRODUCT
  const updateProduct = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/products/${editingId}/`,
        formData
      );

      toast.success("Product Updated");

      fetchProducts();

      setEditingId(null);

      resetForm();

    } catch (error) {

      console.log(error);
      toast.error("Update Failed");
    }
  };

  // RESET FORM
  const resetForm = () => {

    setFormData({
      product_name: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
      barcode: "",
      category: "",
      supplier: "",
      created_by: "",
    });
  };

  return (

    <ThemedPageShell
      title="Products Management"
      subtitle="Manage inventory products professionally"
      icon={FaBoxes}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search Products..."
    >

      <Toaster />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="ims-panel bg-gradient-to-br from-blue-500/35 to-cyan-400/10">
          <h2 className="text-sm font-semibold text-slate-200">Total Products</h2>
          <p className="mt-3 text-4xl font-black text-white">{products.length}</p>
        </div>

        <div className="ims-panel bg-gradient-to-br from-emerald-500/35 to-teal-400/10">
          <h2 className="text-sm font-semibold text-slate-200">In Stock</h2>
          <p className="mt-3 text-4xl font-black text-emerald-200">
            {products.filter((p) => p.stock > 5).length}
          </p>
        </div>

        <div className="ims-panel bg-gradient-to-br from-rose-500/35 to-orange-400/10">
          <h2 className="text-sm font-semibold text-slate-200">Low Stock</h2>
          <p className="mt-3 text-4xl font-black text-rose-200">{lowStockProducts}</p>
        </div>
      </div>

      <div className="ims-panel flex items-center gap-4 p-5">
        <FaSearch className="text-cyan-200" />
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
        />
      </div>

      <form
        onSubmit={editingId ? updateProduct : addProduct}
        className="ims-panel"
      >

        <h2 className="mb-6 text-2xl font-black text-white">
          {editingId ? "Update Product" : "Add Product"}
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} className="ims-input" required />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="ims-input" required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="ims-input" required />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="ims-input" required />
          <input type="url" name="image_url" placeholder="Product Image URL" value={formData.image_url} onChange={handleChange} className="ims-input" />
          <input type="text" name="barcode" placeholder="Barcode" value={formData.barcode} onChange={handleChange} className="ims-input" required />
          <input type="number" name="category" placeholder="Category ID" value={formData.category} onChange={handleChange} className="ims-input" required />
          <input type="number" name="supplier" placeholder="Supplier ID" value={formData.supplier} onChange={handleChange} className="ims-input" required />
          <input type="number" name="created_by" placeholder="Created By User ID" value={formData.created_by} onChange={handleChange} className="ims-input" required />
        </div>

        <button type="submit" className="ims-primary-btn mt-8">
          <FaPlus />
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>

      <div className="ims-panel overflow-hidden p-0">
        <div className="border-b border-white/10 p-6">
          <h2 className="text-xl font-black text-white">Product List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="ims-table min-w-[920px]">
            <thead className="ims-table-head">
              <tr>
                <th className="p-5 text-left">Image</th>
                <th className="p-5 text-left">Product</th>
                <th className="p-5 text-left">Category</th>
                <th className="p-5 text-left">Price</th>
                <th className="p-5 text-left">Stock</th>
                <th className="p-5 text-left">Barcode</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products
                .filter((product) =>
                  product.product_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((product) => (
                  <tr key={product.id} className="ims-table-row">
                    <td className="p-5">
                      <img
                        src={product.image_url || "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=900&q=80"}
                        alt={product.product_name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    </td>
                    <td className="p-5 font-semibold text-white">{product.product_name}</td>
                    <td className="p-5">{product.category_name || product.category}</td>
                    <td className="p-5">&#8377; {product.price}</td>
                    <td className="p-5">
                      {product.stock <= 5 ? (
                        <span className="rounded-full bg-rose-500/20 px-3 py-1 text-sm font-semibold text-rose-200">
                          Low Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-200">
                          {product.stock}
                        </span>
                      )}
                    </td>
                    <td className="p-5">{product.barcode}</td>
                    <td className="p-5">
                      {product.stock > 10 ? (
                        <span className="rounded-full bg-emerald-500/20 px-4 py-1 text-sm text-emerald-200">
                          In Stock
                        </span>
                      ) : (
                        <span className="rounded-full bg-rose-500/20 px-4 py-1 text-sm text-rose-200">
                          Low Stock
                        </span>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-5">
                        <button onClick={() => editProduct(product)} className="ims-edit-btn">
                          <FaEdit size={20} />
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="ims-danger-btn">
                          <FaTrash size={20} />
                        </button>
                      </div>
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
