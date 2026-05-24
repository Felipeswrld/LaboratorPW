import { useState, useEffect } from 'react';

import './index.css';


function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTech, setEditTech] = useState('');

  const handleToggle = async (id, currentDone) => {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: !currentDone })
      });

      if (!response.ok) {
        throw new Error('Eroare la actualizarea proiectului');
      }

      const updatedProject = await response.json();
      
      // Actualizăm state-ul conform indicațiilor: înlocuim doar proiectul modificat
      setProjects(projects.map(p => p._id === id ? updatedProject : p));
      
    } catch (error) {
      console.error("A apărut o eroare:", error);
    }
  };

  async function handleDelete(id) {
    // Adăugăm confirmarea fix aici, la începutul funcției
    if (window.confirm('Avertisment de Securitate: Sigur doriți să ștergeți acest proiect?')) {
      try {
        const response = await fetch('http://localhost:3000/api/projects/' + id, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Actualizăm starea eliminând proiectul șters doar dacă am primit OK de la server
          setProjects(projects.filter(p => p._id !== id));
        }
      } catch (err) {
        console.error('Eroare la ștergere:', err);
      }
    }
  }
  
  useEffect(function () {
    fetch('http://localhost:3000/api/projects')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function (data) {
        setProjects(data); 
        setLoading(false);
      })
      .catch(function (err) {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
        console.error(err); 
      });
  }, []); 

  if (loading) {
    return <p className="loading-text">Se incarca datele...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  // Exercițiul 3: Filtrarea proiectelor (NU modifică array-ul original)
  const filteredProjects = projects.filter(function(p) {
    return p.title.toLowerCase().includes(search.toLowerCase());
  });

  // Exercițiul 4: Calcularea statisticilor
  const totalProjects = projects.length;
  const doneProjects = projects.filter(p => p.done).length;
  const inProgressProjects = projects.filter(p => !p.done).length;

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        // Trimitem noile valori din state-urile de editare
        body: JSON.stringify({ title: editTitle, tech: editTech }) 
      });

      if (!response.ok) {
        throw new Error('Eroare la salvarea modificărilor');
      }

      const updatedProject = await response.json();
      
      // 1. Actualizăm proiectul în listă (la fel ca la toggle)
      setProjects(projects.map(p => p._id === id ? updatedProject : p));
      
      // 2. Închidem modul de editare
      setEditingId(null); 
      
    } catch (error) {
      console.error("A apărut o eroare:", error);
    }
  };

  return (
    <div className="projects-section">
      <h3>Proiecte Active</h3>

      {/* Input-ul pentru Exercițiul 3 */}
      <input
        type="text"
        placeholder="CAUTĂ PROIECT..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-input search-input"
      />

      {/* Randarea listei filtrate */}
      <div className="projects-grid">
        {filteredProjects.map(function(project) {
          return (
            <div key={project._id} className="project-card">
              
              {/* VERIFICĂM: Dacă suntem în modul de editare */}
              {editingId === project._id ? (
                <div className="edit-mode-container">
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                    className="form-input edit-input"
                  />
                  <input 
                    type="text" 
                    value={editTech} 
                    onChange={(e) => setEditTech(e.target.value)} 
                    className="form-input edit-input"
                  />
                  
                  <div className="card-actions-row">
                    <button 
                      onClick={() => handleSaveEdit(project._id)} 
                      className="btn-cyber btn-save"
                    >
                      Salvează
                    </button>
                    <button 
                      onClick={() => setEditingId(null)} 
                      className="btn-cyber btn-cancel"
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              ) : (
              //sectiunea cu containerul de proiecte
                <div className="view-mode-container">
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-detail"><strong>Tech:</strong> {project.tech}</p>
                  <p className="project-detail">
                    <strong>Status:</strong> {project.done ? <span className="status-done">Finalizat</span> : <span className="status-progress">În lucru</span>}
                  </p>
                  
                  <div className="card-actions-col">
                    <button 
                      onClick={() => handleToggle(project._id, project.done)}
                      className="btn-cyber btn-toggle"
                    >
                     {project.done ? 'Setează: În lucru' : 'Setează: Finalizat'}
                    </button>
                    
                    <button 
                      onClick={() => {
                        setEditingId(project._id);
                        setEditTitle(project.title);
                        setEditTech(project.tech);
                      }}
                      className="btn-cyber btn-edit"
                    >
                      Editează
                    </button>

                    <button 
                      onClick={() => handleDelete(project._id)}
                      className="btn-cyber btn-delete"
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Div-ul pentru Exercițiul 4 (Statistici) */}
      <div className="stats-container">
        <h4 className="stats-title">Sistem de Analiză // Statistici</h4>
        <ul className="stats-list">
          <li>Total proiecte: <strong>{totalProjects}</strong></li>
          <li>Finalizate: <strong className="highlight-green">{doneProjects}</strong></li>
          <li>În lucru: <strong className="highlight-yellow">{inProgressProjects}</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectList;