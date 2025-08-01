import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  update
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmEuRloY4yc9yvKyQ9U2iK8Ob91_zxNkI",
  authDomain: "wecode-a7354.firebaseapp.com",
  databaseURL: "https://wecode-a7354-default-rtdb.firebaseio.com/",
  projectId: "wecode-a7354",
  storageBucket: "wecode-a7354.appspot.com",
  messagingSenderId: "6754148212",
  appId: "1:6754148212:web:bc228ac7650b666ef75621",
  measurementId: "G-8948KFPN92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Helpers
function escapeHTML(str = "") {
  return str.replace(/[&<>'"]/g, (tag) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[tag])
  );
}

function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days === 0 ? "Today" : `${days}d ago`;
}

// Load post by ID
const params = new URLSearchParams(window.location.search);
const postID = params.get("id");
const mainContainer = document.querySelector(".main");

if (!postID) {
  mainContainer.innerHTML = "<p>Post not found. No ID specified.</p>";
} else {
  const postRef = ref(db, "posts/" + postID);

  get(postRef).then((snapshot) => {
    if (!snapshot.exists()) {
      mainContainer.innerHTML = "<p>Post not found.</p>";
      return;
    }

    const post = snapshot.val();
    const {
      title,
      author,
      timestamp,
      description = "",
      image = "",
      views = 0
    } = post;

    // Increment views
    update(postRef, { views: views + 1 });

    // Render post
    mainContainer.innerHTML = `
      <div class="post-detail-container">
        <h1 class="post-title">${escapeHTML(title)}</h1>
        <div class="post-meta">
          <span class="post-author"><i class="fa-solid fa-user"></i> ${escapeHTML(author)}</span>
          <span class="post-date">${timeAgo(timestamp)}</span>
          <span class="post-views"><i class="fa-solid fa-eye"></i> ${views + 1} views</span>
        </div>
        ${image ? `<div class="post-image"><img src="${image}" alt="Post image" /></div>` : ""}
        <div class="post-description">
          <p>${escapeHTML(description)}</p>
        </div>
      </div>
    `;
  }).catch((error) => {
    console.error("Error loading post:", error);
    mainContainer.innerHTML = "<p>Failed to load post.</p>";
  });
}

const like_button = document.querySelector("#like_button")
const reply_button = document.querySelector("#reply_button")
const like_icon = document.querySelector("#like_icon")
const liked_icon = document.querySelector("#liked_icon")

like_button.addEventListener("click", function () {
    if (getComputedStyle(like_icon).display === "block") {
        like_icon.style.display = "none";
        liked_icon.style.display = "block";
    }
    else {
        like_icon.style.display = "block";
        liked_icon.style.display = "none";
    }
})