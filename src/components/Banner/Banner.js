import logo from '../icon-left-font-monochrome-black.png';
import './Banner.scss';

function Banner() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/groupomania-app/public/index.html"><img src={logo} alt="logo" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center justify-content-lg-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#0"><span className="btn btn-info rounded-pill fw-bold text-white">Se connecter</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#0"><span className="btn btn-success rounded-pill fw-bold text-white">S'inscrire</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Banner;
