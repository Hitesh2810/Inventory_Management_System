"use client";

export default function Filters({ search, setSearch, category, setCategory }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full items-center gap-3 rounded-2xl bg-white/6 px-3 py-2 md:w-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-2xl border border-cyan-500/20 bg-[#07101f] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>
      <div className="flex items-center gap-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl bg-white/6 px-3 py-2 text-sm">
          <option value="">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Computer Accessories">Computer Accessories</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Furniture">Furniture</option>
          <option value="Home Appliances">Home Appliances</option>
        </select>
      </div>
    </div>
  );
}
