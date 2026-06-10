import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-5 text-gray-800">
            Dashboard
          </h1>

          <div className="grid grid-cols-3 gap-5">

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-gray-800">
                Products
              </h2>

              <p className="text-3xl mt-3 text-blue-600 font-bold">
                120
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-gray-800">
                Orders
              </h2>

              <p className="text-3xl mt-3 text-green-600 font-bold">
                45
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-gray-800">
                Revenue
              </h2>

              <p className="text-3xl mt-3 text-red-500 font-bold">
                ₹85,000
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}