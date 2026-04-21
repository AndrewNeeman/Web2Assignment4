import { type JSX, useEffect, useState } from "react";

interface ClothingPiece {
  type: string;
  colour: string;
  size: string;
}

export default function ReadAll(): JSX.Element {
  const [clothes, setClothes] = useState<ClothingPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/clothing/all")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch clothing");
        return res.json();
      })
      .then(data => {
        setClothes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Wardrobe</h1>
      
      {loading && <p style={{ textAlign: 'center' }}>Loading your clothes...</p>}
      {error && <p style={{ textAlign: 'center', color: '#ff6b6b' }}>Error: {error}</p>}
      
      {!loading && !error && clothes.length === 0 && (
        <p style={{ textAlign: 'center' }}>Your wardrobe is empty. Go to 'Create Clothing' to add something!</p>
      )}

      {clothes.length > 0 && (
        <div style={{ overflowX: 'auto', maxWidth: '800px', margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255,255,255,0.2)' }}>
            <thead style={{ background: 'rgba(0,0,0,0.3)' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid var(--sidebar-bg)' }}>Type</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid var(--sidebar-bg)' }}>Colour</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid var(--sidebar-bg)' }}>Size</th>
              </tr>
            </thead>
            <tbody>
              {clothes.map((piece, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                  <td style={{ padding: '12px 15px' }}>{piece.type}</td>
                  <td style={{ padding: '12px 15px' }}>{piece.colour}</td>
                  <td style={{ padding: '12px 15px' }}>{piece.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
