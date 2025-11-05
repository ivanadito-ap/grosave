import React, { useState } from "react";

export default function Groceries() {
    // eslint-disable-next-line no-unused-vars
    const [groceries, setGroceries] = useState([
    { id: 1, name: "Milk", type: "Dairy", expiry: "15 Nov 2025" },
    { id: 2, name: "Eggs", type: "Poultry", expiry: "16 Nov 2025" },
    { id: 3, name: "Apples", type: "Fruit", expiry: "20 Nov 2025" },
  ]);

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-primary px-4 py-10">
      <div className="w-full max-w-4xl bg-neutral rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">🍎 My Groceries</h1>

        <p className="text-center text-secondary mb-8">
          Track your grocery items, check expiry dates, and manage your stock efficiently.
        </p>

        <div className="overflow-x-auto rounded-lg shadow-md border border-base-300-white">
          <table className="table w-full">
            <thead className="bg-linear-to-r from-primary to-secondary text-base-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 text-white">#</th>
                <th className="text-white">Name</th>
                <th className="text-white">Type</th>
                <th className="text-white">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="bg-base-200 text-base-content">
              {groceries.map((item, index) => (
                <tr key={item.id} className="hover:bg-base-300 transition-colors">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <button className="btn btn-primary px-8">+ Add Item</button>
        </div>
      </div>
    </div>
  );
}