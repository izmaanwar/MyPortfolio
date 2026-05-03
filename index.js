const header    = document.querySelector("header");
const menuButton = document.querySelector(".hamburger-icon");
const navLink   = document.querySelector(".nav-links");
const navIcon   = document.getElementById("nav-icon");
const navLinkItems = document.querySelectorAll(".nav-links-item");

let showMenu = false;

function closeNav() {
  setTimeout(() => {
    showMenu = false;
    navLink.classList.remove("show-nav-links");
    changeIcon();
  }, 200);
}

function headerColor() {
  if (window.scrollY >= 10 || showMenu) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

function changeIcon() {
  navIcon.setAttribute("src", showMenu ? "assets/x.svg" : "assets/hamburger.svg");
}

menuButton.addEventListener("click", () => {
  navLink.classList.toggle("show-nav-links");
  showMenu = !showMenu;
  headerColor();
  changeIcon();
});

window.addEventListener("scroll", headerColor);
navLink.addEventListener("click", closeNav);

// Experience Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const experiencePanels = document.querySelectorAll('.experience-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    experiencePanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// GitHub Repos
(function loadGitHubRepos() {
  const container = document.getElementById('github-repos');
  if (!container) return;
  fetch('https://api.github.com/users/izmaanwar/repos?sort=updated&per_page=6&type=public')
    .then(r => r.json())
    .then(repos => {
      if (!Array.isArray(repos) || repos.length === 0) {
        container.innerHTML = '';
        return;
      }
      const langColors = { JavaScript:'#f1e05a', TypeScript:'#3178c6', 'C#':'#178600', Python:'#3572A5', HTML:'#e34c26', CSS:'#563d7c' };
      container.innerHTML = repos.slice(0, 6).map(r => `
        <a class="repo-card" href="${r.html_url}" target="_blank">
          <span class="repo-name"><i class="fas fa-code-branch"></i> ${r.name}</span>
          ${r.description ? `<span class="repo-desc">${r.description}</span>` : ''}
          <div class="repo-meta">
            ${r.language ? `<span><i class="fas fa-circle" style="color:${langColors[r.language]||'#8892b0'}"></i>${r.language}</span>` : ''}
            <span><i class="fas fa-star"></i>${r.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i>${r.forks_count}</span>
          </div>
        </a>`).join('');
    })
    .catch(() => { container.innerHTML = ''; });
})();

// Carousel
function carouselGo(trackId, idx) {
  const track = document.getElementById(trackId);
  const total = track.querySelectorAll('.carousel-slide').length;
  const next = ((idx % total) + total) % total;
  track.dataset.current = next;
  track.style.transform = `translateX(-${next * 100}%)`;
  document.querySelectorAll(`[data-track="${trackId}"]`).forEach((dot, i) => {
    dot.classList.toggle('active', i === next);
  });
}

function carouselMove(trackId, dir) {
  const track = document.getElementById(trackId);
  carouselGo(trackId, parseInt(track.dataset.current || '0') + dir);
}
