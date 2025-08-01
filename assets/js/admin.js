import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth(app);
let role = null;

// Protect page from non-admins
onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "../sign-in.html";
      return;
    }
  
    const uid = user.uid;
    const userRef = ref(database, 'users/' + uid);
    const snapshot = await get(userRef);
  
    if (snapshot.exists()) {
      const data = snapshot.val();
      const role = data.role;
  
      if (role !== "admin") {
        alert("Access denied. Admins only!");
        window.location.href = "./index.html";
        return;
      }

      loadDashboard();
    } else {
      alert("User data not found.");
      window.location.href = "./index.html";
    }
  });
  

// Load dashboard data
async function loadDashboard() {
  const usersSnap = await get(ref(database, "users"));
  const postsSnap = await get(ref(database, "posts"));

  const users = usersSnap.exists() ? usersSnap.val() : {};
  const posts = postsSnap.exists() ? postsSnap.val() : {};

  // Update stats
  document.getElementById("total-users").textContent = Object.keys(users).length;
  document.getElementById("total-posts").textContent = Object.keys(posts).length;

  // Fill user table
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  Object.values(users).forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${u.displayName || "Unknown"}</td>
                    <td>${u.email || ""}</td>
                    <td>${u.role || "user"}</td>`;
    userList.appendChild(tr);
  });

  // Fill post table
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";
  Object.values(posts).forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.title || ""}</td>
                    <td>${p.author || ""}</td>
                    <td>${p.views || 0}</td>`;
    postList.appendChild(tr);
  });
}

loadDashboard();
