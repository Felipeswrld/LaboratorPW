import { NavLink } from 'react-router'; 

function Navbar() {
  return (
    <nav className="cyber-navbar">
      
      
      <div className="nav-links-container">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/projects" className="nav-link">
          Proiecte
        </NavLink>
        <NavLink to="/contacts" className="nav-link">
          Contacte
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar