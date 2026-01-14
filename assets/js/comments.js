alert("comments.js loaded");

firebase.initializeApp({
  apiKey: "AIzaSyBeqw9avQxBNGtp_32_iUYR6cCnRiiBAkg",
  authDomain: "rj-comments.firebaseapp.com",
  projectId: "rj-comments"
});

alert("Firebase initialized");

const db = firebase.firestore();
alert("Firestore ready");

const pageId = window.location.pathname;
alert("Page ID: " + pageId);

const list = document.getElementById("comments-list");
const postBtn = document.getElementById("postComment");

if (!list || !postBtn) {
  alert("❌ HTML elements missing");
}

db.collection("comments")
  .where("page", "==", pageId)
  .orderBy("time", "asc")
  .onSnapshot(
    snapshot => {
      alert("Snapshot loaded");
      list.innerHTML = "";

      snapshot.forEach(doc => {
        const c = doc.data();
        list.innerHTML += `<p>${c.name}: ${c.text}</p>`;
      });
    },
    err => {
      alert("🔥 Firestore error: " + err.message);
    }
  );

postBtn.onclick = () => {
  alert("Post button clicked");

  const name = document.getElementById("name").value;
  const text = document.getElementById("comment").value;

  db.collection("comments").add({
    page: pageId,
    name,
    text,
    time: Date.now()
  }).then(() => {
    alert("✅ Comment posted");
  }).catch(e => {
    alert("❌ Write failed: " + e.message);
  });
};
