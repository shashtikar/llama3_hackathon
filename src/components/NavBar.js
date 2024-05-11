import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/projects">Projects</Link> |
      <Link to="/analytics">Analytics</Link> |
      <Link to="/search">Search</Link> |
      <Link to="/settings">Settings</Link>
    </nav>
  );
}

export default NavBar;
