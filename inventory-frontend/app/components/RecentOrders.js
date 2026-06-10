"use client";

export default function RecentOrders({ orders }) {

  return (

    <div className="
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    rounded-3xl
    p-6">

      <h2 className="text-white text-2xl font-bold mb-5">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-gray-400 border-b border-white/10">

              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Payment</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b border-white/5"
              >

                <td className="p-3 text-white">
                  #{order.id}
                </td>

                <td className="p-3 text-cyan-400">
                  ₹{order.total_amount}
                </td>

                <td className="p-3">

                  <span
                    className={
                      order.order_status === "completed"
                        ? "bg-green-500/20 text-green-400 px-3 py-1 rounded-full"
                        : "bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full"
                    }
                  >
                    {order.order_status}
                  </span>

                </td>

                <td className="p-3">

                  <span
                    className={
                      order.payment_status === "paid"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {order.payment_status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}