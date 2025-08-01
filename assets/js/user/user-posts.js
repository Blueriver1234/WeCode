import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const postsContainer = document.querySelector(".posts");

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

function renderPost(post) {
  const { title, author, timestamp, views = 0, comments = 0 } = post;

  return `
    <a href="post_detail.html?id=${post.postID}" class="post-link">
      <div class="container">
        <div class="title-posts"><h1>${escapeHTML(title)}</h1></div>
        <div class="author-name"><h1>${escapeHTML(author)}</h1></div>
        <div class="infor-posts">
          <span><strong>Views:</strong> ${views}</span>
          <span><strong>Replies:</strong> ${comments}</span>
          <span><strong>Posted:</strong> ${timeAgo(timestamp)}</span>
        </div>
      </div>
    </a>
  `;
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../../sign-in.html";
    return;
  }

  const userPostsRef = ref(db, "posts");

  get(userPostsRef).then(snapshot => {
    const postsData = snapshot.val();
    if (!postsData) {
      postsContainer.innerHTML = "<p>You haven’t created any posts yet.</p>";
      return;
    }

    const posts = Object.values(postsData).filter(post => post.ownerID === user.uid);

    if (posts.length === 0) {
      postsContainer.innerHTML = "<p>You haven’t created any posts yet.</p>";
      return;
    }

    postsContainer.innerHTML = posts.map(renderPost).join("");
  });
});
