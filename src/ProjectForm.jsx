import { useState } from 'react';
import './index.css'; 

function ProjectForm({ projects, setProjects }) {
  // 1. Input-uri controlate folosind stări (state)
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  
  const ProjectCard = ({ project, onDelete }) => {
    return (
      <div className="project-card">
        <h3>{project.title}</h3>
        <button className="btn-delete" onClick={() => onDelete(project._id)}>
          Șterge
        </button>
      </div>
    );
  };

  

  // 2. Funcția de trimitere a datelor
  async function handleSubmit(e) {
    // Prevenim reîmprospătarea implicită a paginii la submit-ul formularului
    e.preventDefault(); 

    // O mică validare să nu trimitem câmpuri goale
    if (!title.trim() || !tech.trim()) {
      alert('Te rog completează toate câmpurile!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, tech: tech }),
      });

      if (!response.ok) {
        throw new Error('Eroare la salvarea proiectului pe server.');
      }

      const newProject = await response.json();
      
      // Actualizăm lista de proiecte din ecran adăugând proiectul nou primit de la server
      setProjects([...projects, newProject]);
      
      // Golește input-urile din interfață după succes
      setTitle(''); 
      setTech('');
    } catch (err) {
      console.error('Eroare:', err);
    }
  }

  return (
    <form className="project-form-container" onSubmit={handleSubmit}>
      <h3>Adaugă un Proiect Nou</h3>
      
      <div className="form-group">
        <label className="form-label">Titlu Proiect:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Ex: Aplicație IoT"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tehnologii folosite:</label>
        <input 
          type="text" 
          value={tech} 
          onChange={(e) => setTech(e.target.value)} 
          placeholder="Ex: React, Node.js, MQTT"
          className="form-input"
        />
      </div>

      <button type="submit" className="btn-submit">
        Salvează Proiectul
      </button>
    </form>
  );
}

export default ProjectForm;