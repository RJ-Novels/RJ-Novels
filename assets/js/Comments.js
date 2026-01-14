import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeqw9avQxBNGtp_32_iUYR6cCnRiiBAkg",
  authDomain: "rj-comments.firebaseapp.com",
  projectId: "rj-comments",
  storageBucket: "rj-comments.firebasestorage.app",
  messagingSenderId: "726533414006",
  appId: "1:726533414006:web:602418b61f785728cb5357"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const pageId = location.pathname;
const commentsRef = collection(db, "comments");

document.getElementById("c-send").addEventListener("click", async () => {
  const name = document.getElementById("c-name").value || "Anonymous";
  const text = document.getElementById("c-text").value.trim();
  if (!text) return;

  await addDoc(commentsRef, {
    page: pageId,
    name,
    text,
    created: Date.now()
  });

  document.getElementById("c-text").value = "";
});

const q = query(
  commentsRef,
  where("page", "==", pageId),
  orderBy("created", "asc")
);

onSnapshot(q, snap => {
  const list = document.getElementById("comments-list");
  list.innerHTML = "";

  snap.forEach(doc => {
    const c = doc.data();
    list.innerHTML += `
      <div class="comment">
        <strong>${c.name}</strong>
        <p>${c.text}</p>
      </div>
    `;
  });
});
