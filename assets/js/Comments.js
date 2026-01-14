// Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyBeqw9avQxBNGtp_32_iUYR6cCnRiiBAkg",
  projectId: "rj-comments",
});

const db = firebase.firestore();
const pageId = location.pathname;

// Load comments
db.collection("comments")
  .where("page", "==", pageId)
  .orderBy("time", "asc")
  .onSnapshot(snap => {
    const box = document.getElementById("comments-list");
    box.innerHTML = "";
    snap.forEach(doc => {
      const c = doc.data();
      box.innerHTML += `
        <div class="comment">
          <strong>${c.name}</strong>
          <time>${new Date(c.time).toLocaleString()}</time>
          <p>${c.text}</p>
        </div>
      `;
    });
  });

// Post comment
window.postComment = () => {
  const name = name.value.trim();
  const text = comment.value.trim();
  if (!name || !text) return alert("Fill all fields");

  db.collection("comments").add({
    page: pageId,
    name,
    text,
    time: Date.now()
  });

  comment.value = "";
};
