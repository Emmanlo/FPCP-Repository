import PropTypes from 'prop-types';

function TopNav({ toggleSidebar }) { // ✅ Receive prop
  return (
    <header className="top-nav">
      <button className="toggle-btn mobile-only" onClick={toggleSidebar}>☰</button> {/* ✅ Toggle button */}
      <div>Dashboard</div>
    </header>
  );
}

TopNav.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default TopNav;
