// Header/Footer injection
document.getElementById("header").innerHTML = `
<header>
  <div class="logo"><img class="logo-icon" src="logo.png"><div class="logo-text">DotsChat</div></div>
  <nav><ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="features.html">Features</a></li>
    <li><a href="version-log.html">Version Log</a></li>
    <li><a href="team.html">Team</a></li>
  </ul></nav>
</header>`;

document.getElementById("footer").innerHTML = `
<footer><div class="container">
  <div class="footer-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Support</a><a href="#">Contact Us</a></div>
  <div class="copyright">&copy; 2025 DotsChat. All rights reserved.</div>
</div></footer>`;

// Server status check (only if elements exist)
async function checkServerStatus() {
  const circle = document.getElementById("status-circle");
  const text = document.getElementById("status-text");
  if (!circle || !text) return;
  try {
    const res = await fetch("https://aaayme.zapto.org");
    if (res.ok) { circle.style.background="green"; text.textContent="Server is UP"; text.style.color="green"; }
    else { circle.style.background="orange"; text.textContent="Server error"; text.style.color="orange"; }
  } catch { circle.style.background="red"; text.textContent="Server is DOWN"; text.style.color="red"; }
}
checkServerStatus(); setInterval(checkServerStatus,30000);

// Feature card animation
const cards = document.querySelectorAll('.feature-card');
if(cards.length>0){
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='translateY(0)';}})});
  cards.forEach(c=>{c.style.opacity=0;c.style.transform='translateY(20px)';c.style.transition='0.5s';obs.observe(c);});
}
