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
