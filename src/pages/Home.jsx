import { useState, useEffect } from 'react';

function Home() {
  // Setăm un state inițial cu valori pe zero
  const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('http://localhost:3000/api/stats');
        
        if (!response.ok) {
          throw new Error('Eroare la preluarea statisticilor de la server');
        }
        
        const data = await response.json();
        setStats(data); // Salvăm datele primite în state
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Oprim starea de încărcare indiferent de rezultat
      }
    }

    fetchStats();
  }, []); // Array-ul gol este esențial pentru a nu rula fetch-ul la infinit

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Pagina Principală (Dashboard)</h2>
      <p>Bine ai venit! Această aplicație gestionează proiectele tale.</p>

      {/* Afișăm loading, eroare sau statisticile efective */}
      {loading ? (
        <p>Se încarcă statisticile de pe server...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Eroare: {error}</p>
      ) : (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '10px', 
          borderLeft: '10px solid #007bff',
          maxWidth: '350px'
        }}>
          <h3 style={{ marginTop: 0, color: '#0056b3' }}>Statistici live server:</h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '18px', lineHeight: '1.6' }}>
            <li>Total proiecte: <strong>{stats.total}</strong></li>
            <li>Finalizate: <strong style={{ color: 'green' }}>{stats.done}</strong></li>
            <li>În lucru: <strong style={{ color: 'orange' }}>{stats.inProgress}</strong></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;