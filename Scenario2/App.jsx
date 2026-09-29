import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Accessories",
    price: 18,
    icon: "🖱️",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 64,
    icon: "⌨️",
  },
  { id: 3, name: "USB-C Hub", category: "Accessories", price: 32, icon: "🔌" },
  {
    id: 4,
    name: "Studio Headphones",
    category: "Audio",
    price: 85,
    icon: "🎧",
  },
  { id: 5, name: "Portable Speaker", category: "Audio", price: 45, icon: "🔊" },
  {
    id: 6,
    name: "Desktop Microphone",
    category: "Audio",
    price: 58,
    icon: "🎙️",
  },
  { id: 7, name: "Laptop Stand", category: "Workspace", price: 29, icon: "💻" },
  { id: 8, name: "Desk Lamp", category: "Workspace", price: 38, icon: "💡" },
  { id: 9, name: "Notebook Set", category: "Workspace", price: 12, icon: "📓" },
  { id: 10, name: "Webcam", category: "Accessories", price: 72, icon: "📷" },
  {
    id: 11,
    name: "Monitor Light Bar",
    category: "Workspace",
    price: 48,
    icon: "🖥️",
  },
  {
    id: 12,
    name: "Bluetooth Earbuds",
    category: "Audio",
    price: 55,
    icon: "🎵",
  },
];



export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredProduct = products.filter(product => {
    return product.name.toLowerCase() .includes(search.toLowerCase().trim()) &&
    (category === "all" || product.category === category)
  })

  const sortedProducts = [...filteredProduct];
  if(sortBy === "high" ) sortedProducts.sort((a,b) => a.price - b.price)
  if(sortBy === "low" ) sortedProducts.sort((a,b) => b.price - a.price)

    function resetFilters() {
      setSearch("")
      setCategory("all")
      setSortBy("default")
    }


  return (
    <main className="page">
      <header className="hero">
        <div className="hero-inner">
          <span className="eyebrow">HBC · REACT PRACTICE</span>
          <h1>Find your everyday tech.</h1>
          <p>
            A small catalog to practice live search, category filtering, and
            price sorting.
          </p>
        </div>
      </header>

      <section className="catalog" aria-labelledby="catalog-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow dark">THE CATALOG</span>
            <h2 id="catalog-heading">Browse products</h2>
          </div>
          <span className="count" aria-live="polite">
            {sortedProducts.length} products found
          </span>
        </div>

        <div className="controls">
          <label className="search-field">
            Search by name
            <input
              type="search"
              placeholder="Try keyboard or lamp..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="all">All categories</option>
              <option value="Accessories">Accessories</option>
              <option value="Audio">Audio</option>
              <option value="Workspace">Workspace</option>
            </select>
          </label>
          <label>
            Sort by price
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="default">Default order</option>
              <option value="low">Low to high</option>
              <option value="high">High to low</option>
            </select>
          </label>
          <button className="reset" type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="empty" role="status">
            <span>⌕</span>
            <h3>No products found</h3>
            <p>Try another name or category.</p>
            <button type="button" onClick={resetFilters}>
              Show all products
            </button>
          </div>
        ) : (
          <div className="grid">
            {sortedProducts.map((product) => (
              <article className="card" key={product.id}>
                <div className="product-art" aria-hidden="true">
                  {product.icon}
                </div>
                <div className="card-body">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <strong>${product.price}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
