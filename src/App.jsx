import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './Navbar';
import ProjectForm from './ProjectForm';






function App() {

    
  //delete
  
  const handleDelete = async (id) => {
    try {
      
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
};

 



 return (
 <BrowserRouter>
    

 <Navbar></Navbar>

 


 
 
 

 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/projects" element={<Projects handleDelete={handleDelete} />} />
 <Route path="/contacts" element={<Contact />} />

 
 
 </Routes>


 </BrowserRouter>

    
    

   

    


 );
}
export default App;