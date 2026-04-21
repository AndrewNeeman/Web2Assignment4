import { type JSX, useState } from "react";

export default function Create(): JSX.Element {
  const [formData, setFormData] = useState({
    type: "",
    colour: "",
    size: "M"
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Adding...");
    try {
      const response = await fetch("http://localhost:3000/clothing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Clothing item added successfully!");
        setFormData({ type: "", colour: "", size: "M" });
      } else {
        const error = await response.text();
        setStatus(`Error: ${error}`);
      }
    } catch (err) {
      setStatus(`Error connecting to server: ${err}`);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Clothing Piece</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="type">Type</label>
          <input
            id="type"
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={{ padding: '10px', borderRadius: '4px', border: '2px solid #ccc', background: 'rgba(255,255,255,0.1)', color: 'white' }}
            required
            placeholder="e.g. T-Shirt"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="colour">Colour</label>
          <input
            id="colour"
            type="text"
            value={formData.colour}
            onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
            style={{ padding: '10px', borderRadius: '4px', border: '2px solid #ccc', background: 'rgba(255,255,255,0.1)', color: 'white' }}
            required
            placeholder="e.g. Blue"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="size">Size</label>
          <select
            id="size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            style={{ padding: '10px', borderRadius: '4px', border: '2px solid #ccc', background: 'rgba(255,255,255,0.1)', color: 'white' }}
            required
          >
            <option value="XS" style={{ background: '#333' }}>XS</option>
            <option value="S" style={{ background: '#333' }}>S</option>
            <option value="M" style={{ background: '#333' }}>M</option>
            <option value="L" style={{ background: '#333' }}>L</option>
            <option value="XL" style={{ background: '#333' }}>XL</option>
            <option value="XXL" style={{ background: '#333' }}>XXL</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '12px',
            background: 'var(--sidebar-bg)',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '4px',
            border: 'none',
            fontSize: '1rem'
          }}
        >
          Add to Wardrobe
        </button>
      </form>
      {status && <p style={{ marginTop: '20px', textAlign: 'center' }}>{status}</p>}
    </div>
  );
}
