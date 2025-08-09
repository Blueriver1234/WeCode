import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  update,
  push,
  onValue
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
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes === 0 ? "Just now" : `${minutes}m ago`;
    }
    return `${hours}h ago`;
  }
  return `${days}d ago`;
}

// Load post by ID
const params = new URLSearchParams(window.location.search);
const postID = params.get("id");
const mainContainer = document.querySelector(".main");

function renderPost(post, views) {
  const {
    title = "",
    author = "",
    timestamp = Date.now(),
    description = "",
    image = ""
  } = post;

  // Render post
  return `
    <div class="post-detail-container">
      <h1 class="post-title">${escapeHTML(title)}</h1>
      <div class="post-meta">
        <span class="post-author"><i class="fa-solid fa-user"></i> ${escapeHTML(author)}</span>
        <span class="post-date">${timeAgo(timestamp)}</span>
        <span class="post-views"><i class="fa-solid fa-eye"></i> ${views} views</span>
      </div>
      ${image ? `<div class="post-image"><img src="${image}" alt="Post image" /></div>` : ""}
      <div class="post-description">
        <p>${escapeHTML(description)}</p>
      </div>
      <div class="reply_section" style="margin-top:32px;">
        <div class="reply_header">
          <p><span id="reply_section_reply_number">0</span> Comments</p>
        </div>
        <div class="reply_assistance">
          <button type="button" id="sort_by_button">
            <i class="fa-solid fa-filter"></i>
            Sort by
          </button>
        </div>
        <form id="commentForm" style="margin-top: 20px;">
          <textarea id="commentInput" rows="3" placeholder="Write a comment..." required style="width:100%;"></textarea>
          <button type="submit" style="margin-top: 5px;">Post Comment</button>
        </form>
        <ul id="commentsList" style="list-style:none; padding:0; margin-top:15px;"></ul>
      </div>
    </div>
  `;
}

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
      views = 0
    } = post;

    update(postRef, { views: views + 1 });

    mainContainer.innerHTML = renderPost(post, views + 1);

    setupComments();
  }).catch((error) => {
    console.error("Error loading post:", error);
    mainContainer.innerHTML = "<p>Failed to load post.</p>";
  });
}

// Comment 

function setupComments() {
  const commentForm = document.getElementById('commentForm');
  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');
  const replyNumber = document.getElementById('reply_section_reply_number');


  function renderComment(comment, commentId) {
    const likedComments = JSON.parse(localStorage.getItem('likedComments') || '{}');
    const isLiked = likedComments[commentId];

    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong>${escapeHTML(comment.author || "Anonymous")}</strong>
          <span style="color:#888;font-size:12px;margin-left:8px;">
            ${new Date(comment.timestamp).toLocaleString()}
          </span>
        </div>
        <button class="like-comment-btn" data-id="${commentId}" style="background:none;border:none;cursor:pointer;">
          <i class="fa${isLiked ? 's' : 'r'} fa-thumbs-up" style="color:${isLiked ? '#e83e8c' : '#888'}"></i>
          <span class="like-count">${comment.likes || 0}</span>
        </button>
      </div>
      <div style="margin-top:4px;">${escapeHTML(comment.text)}</div>
    `;
    li.style.borderBottom = '1px solid #eee';
    li.style.padding = '8px 0';
    return li;
  }

  function loadComments() {
    if (!postID) return;
    const commentsRef = ref(db, `comments/${postID}`);
    onValue(commentsRef, (snapshot) => {
      const comments = [];
      snapshot.forEach(child => {
        comments.push({ ...child.val(), _id: child.key });
      });
      commentsList.innerHTML = '';
      comments.reverse().forEach(comment => {
        commentsList.appendChild(renderComment(comment, comment._id));
      });
      replyNumber.textContent = comments.length;

      // Add like event listeners
      document.querySelectorAll('.like-comment-btn').forEach(btn => {
        btn.onclick = function () {
          const commentId = btn.getAttribute('data-id');
          const likedComments = JSON.parse(localStorage.getItem('likedComments') || '{}');
          if (likedComments[commentId]) return; 

          // Update like in Firebase
          const commentRef = ref(db, `comments/${postID}/${commentId}`);
          get(commentRef).then(snap => {
            const data = snap.val();
            const newLikes = (data.likes || 0) + 1;
            update(commentRef, { likes: newLikes }).then(() => {
              likedComments[commentId] = true;
              localStorage.setItem('likedComments', JSON.stringify(likedComments));
            });
          });
        };
      });
    });
  }

  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const text = commentInput.value.trim();
      if (!text) return;
      const comment = {
        text,
        author: localStorage.getItem("displayName") || "Anonymous",
        timestamp: Date.now(),
        likes: 0
      };
      const commentsRef = ref(db, `comments/${postID}`);
      push(commentsRef, comment).then(() => {
        commentInput.value = '';
      });
    });
    loadComments();
  }
}

// Like button logic
const like_button = document.querySelector("#like_button");
const like_icon = document.querySelector("#like_icon");
const liked_icon = document.querySelector("#liked_icon");

if (like_button && like_icon && liked_icon) {
  like_button.addEventListener("click", function () {
    if (getComputedStyle(like_icon).display === "block") {
      like_icon.style.display = "none";
      liked_icon.style.display = "block";
    }
    else {
      like_icon.style.display = "block";
      liked_icon.style.display = "none";
    }
  });
}