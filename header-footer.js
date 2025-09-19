// Function to load header and footer
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header>
        <div class="container">
          <div class="logo">
            <img class="logo-icon" src="logo.png" alt="DotsChat Logo">
            <div class="logo-text">DotsChat</div>
          </div>
          <nav>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="index.html#features">Features</a></li>
              <li><a href="index.html#download">Download</a></li>
              <li><a href="version-log.html">Version Log</a></li>
              <li><a href="team.html">Team</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  // Load footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer>
        <div class="container">
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Support</a>
            <a href="#">Contact Us</a>
          </div>
          <div class="copyright">
            &copy; 2023 DotsChat. All rights reserved.
          </div>
        </div>
      </footer>
    `;
  }
});