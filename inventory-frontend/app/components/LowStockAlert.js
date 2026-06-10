"use client";

export default function LowStockAlert({ products }) {

  const lowStockProducts =
    products.filter(
      (p) => p.stock < 10
    );

  return (
    <div
      className="
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-6"
    >

      <h2 className="text-white text-xl font-bold mb-4">
        Low Stock Alert
      </h2>

      <div className="space-y-3">

        {lowStockProducts.map((item) => (

          <div
            key={item.id}
            className="flex justify-between"
          >

            <span className="text-gray-300">
              {item.product_name}
            </span>

            <span className="text-red-400">
              {item.stock}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}