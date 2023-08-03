function Header() {
  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Hospital management system
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/test">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/add">
                  add{" "}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/update/:id">
                  update
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;
