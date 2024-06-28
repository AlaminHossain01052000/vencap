import { Link } from "react-router-dom";

const HomeNavbar1 = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div className="container">
    <a className="navbar-brand" href="#">Logo</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="\">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/projects">My Projects</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/projects">My Investments</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/projects">Explore Projects</Link>
        </li>
        

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User Image
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">My Profile</a></li>
            <li><Link className="dropdown-item" to="/addNewProject">Add New Project</Link></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    );
};

export default HomeNavbar1;