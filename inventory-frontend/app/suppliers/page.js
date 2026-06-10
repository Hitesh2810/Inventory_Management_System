"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ThemedPageShell from "@/app/components/ThemedPageShell";

import {
  FaTruck,
  FaTrash,
  FaEdit,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

export default function SuppliersPage() {

  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
  );

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    supplier_name: "",
    email: "",
    phone: "",
    address: "",
  });

  // FETCH SUPPLIERS
  const fetchSuppliers = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/suppliers/"
      );

      setSuppliers(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD SUPPLIER
  const addSupplier = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/suppliers/",
        formData
      );

      toast.success("Supplier Added");

      fetchSuppliers();

      resetForm();

    } catch (error) {

      console.log(error);
      toast.error("Error Adding Supplier");
    }
  };

  // DELETE SUPPLIER
  const deleteSupplier = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/suppliers/${id}/`
      );

      toast.success("Supplier Deleted");

      fetchSuppliers();

    } catch (error) {

      console.log(error);

    }
  };

  // EDIT SUPPLIER
  const editSupplier = (supplier) => {

    setFormData({
      supplier_name: supplier.supplier_name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });

    setEditingId(supplier.id);
  };

  // UPDATE SUPPLIER
  const updateSupplier = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/suppliers/${editingId}/`,
        formData
      );

      toast.success("Supplier Updated");

      fetchSuppliers();

      setEditingId(null);

      resetForm();

    } catch (error) {

      console.log(error);

    }
  };

  // RESET FORM
  const resetForm = () => {

    setFormData({
      supplier_name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (

    <ThemedPageShell
      title="Suppliers Management"
      subtitle="Manage all suppliers professionally"
      icon={FaTruck}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search Suppliers..."
    >

      <Toaster />

      <div className="ims-panel flex items-center gap-4 p-5">
        <FaSearch className="text-cyan-200" />
        <input type="text" placeholder="Search Suppliers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent text-white outline-none placeholder:text-slate-400" />
      </div>

      <form onSubmit={editingId ? updateSupplier : addSupplier} className="ims-panel">
        <h2 className="mb-6 text-2xl font-black text-white">
          {editingId ? "Update Supplier" : "Add Supplier"}
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <input type="text" name="supplier_name" placeholder="Supplier Name" value={formData.supplier_name} onChange={handleChange} className="ims-input" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="ims-input" required />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="ims-input" required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="ims-input" required />
        </div>

        <button type="submit" className="ims-primary-btn mt-6">
          <FaPlus />
          {editingId ? "Update Supplier" : "Add Supplier"}
        </button>
      </form>

      <div className="ims-panel overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="ims-table min-w-[760px]">
            <thead className="ims-table-head">
              <tr>
                <th className="p-5 text-left">Supplier</th>
                <th className="p-5 text-left">Email</th>
                <th className="p-5 text-left">Phone</th>
                <th className="p-5 text-left">Address</th>
                <th className="p-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {suppliers
                .filter((supplier) =>
                  supplier.supplier_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((supplier) => (
                <tr key={supplier.id} className="ims-table-row">
                  <td className="p-5 font-semibold text-white">{supplier.supplier_name}</td>
                  <td className="p-5">{supplier.email}</td>
                  <td className="p-5">{supplier.phone}</td>
                  <td className="p-5">{supplier.address}</td>
                  <td className="flex gap-4 p-5">
                    <button onClick={() => editSupplier(supplier)} className="ims-edit-btn"><FaEdit /></button>
                    <button onClick={() => deleteSupplier(supplier.id)} className="ims-danger-btn"><FaTrash /></button>
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
