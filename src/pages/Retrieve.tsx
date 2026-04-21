import { type JSX, useState } from "react";

export default function Retrieve(): JSX.Element {
  const [type, setType] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`http://localhost:3000/clothing/one?type=${type}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const msg = await response.text();
        setError(msg);
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Retrieve Clothing Piece</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter clothing type (e.g. T-Shirt)..."
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '2px solid #ccc', background: 'rgba(255,255,255,0.1)', color: 'white' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '12px 24px', background: 'var(--sidebar-bg)', color: 'black', fontWeight: 'bold', borderRadius: '4px' }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

      {result && (
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '30px', borderRadius: '8px', border: '1px solid var(--sidebar-bg)' }}>
          <h2 style={{ marginBottom: '20px' }}>Item Found:</h2>
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Colour:</strong> {result.colour}</p>
          <p><strong>Size:</strong> {result.size}</p>
        </div>
      )}
    </div>
  );
}
