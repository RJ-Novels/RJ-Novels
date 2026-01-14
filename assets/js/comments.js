// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBeqw9avQxBNGtp_32_iUYR6cCnRiiBAkg",
  authDomain: "rj-comments.firebaseapp.com",
  projectId: "rj-comments",
  storageBucket: "rj-comments.firebasestorage.app",
  messagingSenderId: "726533414006",
  appId: "1:726533414006:web:602418b61f785728cb5357"
});

const db = firebase.firestore();

// Unique page ID (separate comments per page)
const pageId = window.location.pathname;

// Elements
const list = document.getElementById("comments-list");
const postBtn = document.getElementById("postComment");
if (!postBtn) return;

// Load comments (LIVE)
db.collection("comments")
  .where("page", "==", pageId)
  .orderBy("time", "asc")
  .onSnapshot(snapshot => {
    list.innerHTML = "";

    if (snapshot.empty) {
      list.innerHTML = `<p class="no-comments">No comments yet.</p>`;
      return;
    }

    snapshot.forEach(doc => {
      const c = doc.data();
      list.innerHTML += `
        <div class="comment">
          <div class="comment-head">
            <strong>${escapeHTML(c.name)}</strong>
            <span>${new Date(c.time).toLocaleString()}</span>
          </div>
          <div class="comment-body">${escapeHTML(c.text)}</div>
        </div>
      `;
    });
  });

// Post comment
postBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("comment").value.trim();

  if (!name || !text) {
    alert("Name and comment required");
    return;
  }

  postBtn.disabled = true;
  postBtn.innerText = "Posting...";

  db.collection("comments").add({
    page: pageId,
    name: name,
    text: text,
    time: Date.now()
  }).then(() => {
    document.getElementById("comment").value = "";
    postBtn.innerText = "Post Comment";
    postBtn.disabled = false;
  }).catch(err => {
    alert("Error posting comment");
    console.error(err);
    postBtn.innerText = "Post Comment";
    postBtn.disabled = false;
  });
});

// XSS protection
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
  }
