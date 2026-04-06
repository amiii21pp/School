import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#">Heeralal Ramnivas Inter College</a>
      </div>

      <ul className="navbar-nav">
        <li><a href="#home">Home</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Nav;