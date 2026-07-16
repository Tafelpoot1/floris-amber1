const wedding = new Date("2027-09-18T15:00:00+02:00");

function updateCountdown(){
  const diff = Math.max(0, wedding - new Date());
  document.getElementById("days").textContent = Math.floor(diff / 86400000);
  document.getElementById("hours").textContent = Math.floor(diff / 3600000) % 24;
  document.getElementById("minutes").textContent = Math.floor(diff / 60000) % 60;
  document.getElementById("seconds").textContent = Math.floor(diff / 1000) % 60;
}
updateCountdown();
setInterval(updateCountdown, 1000);

const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const attendance = document.getElementById("attendance").value;
  const partner = document.getElementById("partner").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`RSVP trouwweekend - ${name}`);
  const body = encodeURIComponent(
`Naam: ${name}
E-mailadres: ${email}
Aanwezig: ${attendance}
Partner: ${partner || "-"}
Dieetwensen/opmerkingen: ${message || "-"}`
  );

  window.location.href = `mailto:fbcdevree@gmail.com,ambervanderhorst@hotmail.com?subject=${subject}&body=${body}`;
});
