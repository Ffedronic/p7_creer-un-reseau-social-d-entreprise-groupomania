import logo from '../icon-left-font-monochrome-black.png';
import './Banner.scss';

function Banner() {
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/groupomania-app/public/index.html"><img src={logo} alt="logo" /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#0">Se connecter</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#0">S'inscrire</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Banner;
