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
/* =========================
   SAVE / UNSAVE SYSTEM
========================= */

function getSavedNovels() {
  return JSON.parse(localStorage.getItem("savedNovels")) || [];
}

function setSavedNovels(data) {
  localStorage.setItem("savedNovels", JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = getSavedNovels();

  document.querySelectorAll(".save-btn").forEach(btn => {
    const id = btn.dataset.id;

    /* restore saved state */
    if (saved.some(novel => novel.id === id)) {
      btn.classList.add("saved");
    }

    btn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      let savedNow = getSavedNovels();
      const index = savedNow.findIndex(novel => novel.id === id);

      if (index !== -1) {
        savedNow.splice(index, 1);
        btn.classList.remove("saved");
      } else {
        savedNow.push({
          id: btn.dataset.id,
          title: btn.dataset.title,
          url: btn.dataset.url,
          img: btn.dataset.img,
          category: btn.dataset.category   // 🔥 TAGS
        });
        btn.classList.add("saved");
      }

      setSavedNovels(savedNow);
    });
  });
});
/*hot badge*/
document.querySelectorAll(".time-badge").forEach(badge => {
  const dateStr = badge.dataset.date;
  if (!dateStr) return;

  const postDate = new Date(dateStr);
  const now = new Date();

  const days = Math.floor(
    (now - postDate) / (1000 * 60 * 60 * 24)
  );

  if (days <= 5) {
    badge.classList.add("&nbsp;hot");
  } else if (days <= 15) {
    badge.classList.add("&nbsp;new");
  } else {
    badge.remove();
  }
});
