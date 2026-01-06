const cards = document.querySelectorAll('.novel-card');
const buttons = document.querySelectorAll('.cat-btn');
const searchInput = document.getElementById('searchInput');

/* SIDEBAR */
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

/* ONLY RUN SEARCH IF ELEMENT EXISTS */
if (searchInput && buttons.length > 0) {

    function filterNovels() {
        const term = searchInput.value.toLowerCase();
        const activeCat = document.querySelector('.cat-btn.active').dataset.category;

        cards.forEach(card => {
            const title = card.dataset.searchTitle.toLowerCase();
            const cat = card.dataset.category;

            const matchSearch = title.includes(term);
            const matchCat = activeCat === 'all' || activeCat === cat;

            card.style.display = (matchSearch && matchCat) ? 'block' : 'none';
        });
    }

    searchInput.addEventListener('keyup', filterNovels);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterNovels();
        });
    });
}

/* OPEN POST */
cards.forEach(card => {
    card.addEventListener('click', () => {
        window.location.href = card.dataset.link;
    });
});
/* SCROLL TO TOP (INDEX PAGE ONLY) */
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
                }
/* SAVED POST */
function getSaved() {
  return JSON.parse(localStorage.getItem("savedNovels")) || [];
}

function toggleSave(novel) {
  let saved = getSaved();
  const exists = saved.find(n => n.id === novel.id);

  if (exists) {
    saved = saved.filter(n => n.id !== novel.id);
  } else {
    saved.push(novel);
  }

  localStorage.setItem("savedNovels", JSON.stringify(saved));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      e.preventDefault();

      toggleSave({
        id: btn.dataset.id,
        title: btn.dataset.title,
        url: btn.dataset.url,
        img: btn.dataset.img
      });

      btn.classList.toggle("saved");
    });
  });
});
