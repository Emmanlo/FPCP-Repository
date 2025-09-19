import { NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import PropTypes from 'prop-types'; // ✅ Added for prop validation


function NavBar({ sidebarOpen }) { 
  const currentUser = { name: 'John Doe' };

  return (
    <aside className={`side-nav ${sidebarOpen ? 'open' : ''}`}> {/* ✅ Dynamic class */}
      <div className="logo">MyApp</div>
      <div className="username">Welcome, {currentUser.name}</div>
      <nav className="nav-links">
      <NavLink to="/" className="nav-button"><FaHome /> Home</NavLink>
<NavLink to="/Leaders" className="nav-button"><FaInfoCircle /> Leaders</NavLink>
<NavLink to="/FirstTimers" className="nav-button"><FaEnvelope /> First Timers</NavLink>
<NavLink to="/Calendar" className="nav-button"><FaEnvelope /> Calendar</NavLink>
      </nav>
    </aside>
  );
}

// ✅ Prop validation to fix ESLint warning
NavBar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
};

export default NavBar;
