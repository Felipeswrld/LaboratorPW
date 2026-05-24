const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Project = require('./models/Project');
//const projects = require('../public/Data/Projects.json').projects;

const app = express();
const PORT = 3000;

// Middleware-uri
app.use(cors());
app.use(express.json());

// Conectare la MongoDB
mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
    console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
    console.error('Eroare conectare MongoDB:', err);
 });

// RUTA BAZA: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});

// GET /api/projects - returnează toate proiectele
app.get('/api/projects', async function(req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});

//returneaza statistici


//stats
/*  app.get('/api/stats', function(req, res) {
  const total = projects.length;
  const doneCount = projects.filter(p => p.done === true).length;
  const inProgressCount = total - doneCount;
  
  res.json({
    total: total,
    done: doneCount,
    inProgress: inProgressCount
  });
});
*/

app.get('/api/stats', async function(req, res) {
  try {
    
    const total = await Project.countDocuments();
    const doneCount = await Project.countDocuments({ done: true });
    const inProgressCount = total - doneCount;

    res.json({
      total: total,
      done: doneCount,
      inProgress: inProgressCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Eroare la statistici: ' + err });
  }
});

// GET /api/projects/:id - returnează un proiect după ID
app.get('/api/projects/:id', async function(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(404).json({ error: 'Not found' });
  }
});

// POST /api/projects - adaugă un proiect nou
app.post('/api/projects', async function(req, res) {
    try {
        const newProject = new Project({
            title: req.body.title,
            tech: req.body.tech,
            done: req.body.done || false,
        });
        const saved = await newProject.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/projects/:id', async function(req, res) {
  try {
  const updated = await Project.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true } // returneaza documentul DUPA actualizare
  );
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
  } catch (err) {
  res.status(400).json({ error: err.message });
  }
});



// DELETE /api/projects/:id - șterge un proiect
app.delete('/api/projects/:id', async function(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Not found' });
  }
});

// PORNIRE SERVER (O singură dată, la final)
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});


//functie de summit
async function handleSubmit() {
  try {
    const response = await fetch('http://localhost:3000/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, tech: tech }),
    });
    const newProject = await response.json();
    setProjects([...projects, newProject]);
    setTitle(''); // Goleste input-urile
    setTech('');
    } catch (err) {
    console.error('Eroare:', err);
  }
}

const handleDelete = async (id) => {
  // Un mesaj de confirmare simplu este mereu o idee bună pentru a preveni ștergerile accidentale
  const confirmDelete = window.confirm("Sigur dorești să ștergi acest proiect?");
  if (!confirmDelete) return;

  try {
    const response = await fetch('http://localhost:3000/api/projects/' + id, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Actualizăm starea locală: eliminăm proiectul cu id-ul respectiv
      setProjects(projects.filter(p => p._id !== id));
      alert("Proiectul a fost șters cu succes!");
    } else {
      alert("A apărut o eroare la ștergerea proiectului de pe server.");
    }
  } catch (error) {
    console.error("Eroare la rețea:", error);
    alert("Nu s-a putut contacta serverul.");
  }
};



