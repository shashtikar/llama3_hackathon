import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/tips">Tips</Link> |
      <Link to="/analytics">Analytics</Link> |
      <Link to="/resources">Resources</Link>
    </nav>
  );
}

export default NavBar;
