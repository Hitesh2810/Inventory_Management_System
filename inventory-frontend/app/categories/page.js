"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import {
  FaTags,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";

export default function CategoriesPage() {

  const [categories, setCategories] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // FETCH
  const fetchCategories = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/categories/"
      );

      setCategories(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD CATEGORY
  const addCategory = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/categories/",
        formData
      );

      toast.success("Category Added");

      fetchCategories();

      resetForm();

    } catch (error) {

      console.log(error);
      toast.error("Error Adding Category");

    }
  };

  // DELETE CATEGORY
  const deleteCategory = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/categories/${id}/`
      );

      toast.success("Category Deleted");

      fetchCategories();

    } catch (error) {

      console.log(error);

    }
  };

  // EDIT CATEGORY
  const editCategory = (category) => {

    setFormData({
      category_name: category.category_name,
      description: category.description,
    });

    setEditingId(category.id);
  };

  // UPDATE CATEGORY
  const updateCategory = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/categories/${editingId}/`,
        formData
      );

      toast.success("Category Updated");

      fetchCategories();

      setEditingId(null);

      resetForm();

    } catch (error) {

      console.log(error);

    }
  };

  // RESET FORM
  const resetForm = () => {

    setFormData({
      category_name: "",
      description: "",
    });
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <Toaster />

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">

        <FaTags size={40} className="text-cyan-600" />

        <h1 className="text-4xl font-bold text-gray-800">
          Categories Management
        </h1>

      </div>

      {/* FORM */}
      <form
        onSubmit={editingId ? updateCategory : addCategory}
        className="bg-white p-8 rounded-3xl shadow-lg mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">

          {editingId ? "Update Category" : "Add Category"}

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            name="category_name"
            placeholder="Category Name"
            value={formData.category_name}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

        </div>

        <button
          type="submit"
          className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl flex items-center gap-3"
        >

          <FaPlus />

          {editingId ? "Update Category" : "Add Category"}

        </button>

      </form>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-cyan-600 text-white">

            <tr>

              <th className="p-5 text-left">
                Category
              </th>

              <th className="p-5 text-left">
                Description
              </th>

              <th className="p-5 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-5 font-semibold">
                  {category.category_name}
                </td>

                <td className="p-5">
                  {category.description}
                </td>

                <td className="p-5 flex gap-4">

                  <button
                    onClick={() => editCategory(category)}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}