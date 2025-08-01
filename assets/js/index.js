import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

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
const database = getDatabase(app);

// Global to cache all posts for filtering
let allPosts = [];

// DOM elements
const postsContainer = document.querySelector(".posts");
const newPostBtn = document.getElementById("new_post_button");

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

function createPostElement(post, query = "") {
  const { title, author, timestamp, views = 0, comments = 0 } = post;

  let highlightedTitle = escapeHTML(title);
  if (query) {
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape regex
    const regex = new RegExp(safeQuery, "gi");
    highlightedTitle = highlightedTitle.replace(regex, (match) => `<mark>${match}</mark>`);
  }


  return `
  <a href="post_detail.html?id=${post.postID}" class="post-link">
    <div class="container">
      <div class="overlay"></div>
      <div class="member1">
        <div class="title-posts"><h1>${highlightedTitle}</h1></div>
        <div class="infor-posts">
          <div class="author-posts">
            <div class="author-avatar"><i class="fa-solid fa-user"></i></div>
            <div class="author-name"><h1>${escapeHTML(author)}</h1></div>
            <div class="time-posts"><h1>${timeAgo(timestamp)}</h1></div>
          </div>
        </div>
      </div>
      <div class="member2 view-number"><h1>${views}</h1><h1>View</h1></div>
      <div class="member2 reply-number"><h1>${comments}</h1><h1>Reply</h1></div>
    </div>
  </a>
`;
}

function renderPosts(posts, query = "") {
  postsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = createPostElement(post, query);
    fragment.appendChild(wrapper);
  });

  postsContainer.appendChild(fragment);
}

function loadPosts() {
  const postsRef = ref(database, "posts");
  onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    const posts = data ? Object.values(data).sort((a, b) => b.timestamp - a.timestamp) : [];
    allPosts = posts;
    renderPosts(allPosts);
  });
}

// Search handler
const searchInput = document.getElementById("searching-input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderPosts(allPosts, "");
      return;
    }

    const filtered = allPosts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const author = post.author?.toLowerCase() || "";
      return title.includes(query) || author.includes(query);
    });

    renderPosts(filtered, query);
  });
}


// Page load
document.addEventListener("DOMContentLoaded", () => {
  if (newPostBtn) {
    newPostBtn.addEventListener("click", () => {
      window.location.href = "./add.html";
    });
  }

  loadPosts();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userSpan = document.getElementById("userInfo");
  if (userSpan && userInfo.username) {
    userSpan.textContent = userInfo.username;
  }
});
