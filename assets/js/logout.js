<<<<<<< HEAD
<<<<<<< HEAD

function logout() {

    localStorage.removeItem("userInfo");
 
    window.location.href = "./index.html";
}

window.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem("userInfo");
    const userInfoDiv = document.getElementById("userInfo");
    const logoutContainer = document.getElementById("logoutContainer");

    console.log("userData is", userData);

    logoutContainer.innerHTML = "";

    if (userData) {
        const user = JSON.parse(userData);
        userInfoDiv.textContent = `${user.username}`;

        document.querySelectorAll(".sign-links").forEach(link => {
            link.style.display = "none";
        });

        const btn = document.createElement("button");
        btn.textContent = "Logout";
        btn.style.marginLeft = "10px";
        btn.addEventListener("click", logout);
        logoutContainer.appendChild(btn);
        btn.style.background = "transparent";
        btn.style.color = "white"; 
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "20px";
    }
});
=======

function logout() {

    localStorage.removeItem("userInfo");
 
    window.location.href = "./index.html";
}

window.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem("userInfo");
    const userInfoDiv = document.getElementById("userInfo");
    const logoutContainer = document.getElementById("logoutContainer");

    console.log("userData is", userData);

    logoutContainer.innerHTML = "";

    if (userData) {
        const user = JSON.parse(userData);
        userInfoDiv.textContent = `${user.username}`;

        document.querySelectorAll(".sign-links").forEach(link => {
            link.style.display = "none";
        });

        const btn = document.createElement("button");
        btn.textContent = "Logout";
        btn.style.marginLeft = "10px";
        btn.addEventListener("click", logout);
        logoutContainer.appendChild(btn);
        btn.style.background = "transparent";
        btn.style.color = "white"; 
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "20px";
    }
});
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
=======
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmEuRloY4yc9yvKyQ9U2iK8Ob91_zxNkI",
  authDomain: "wecode-a7354.firebaseapp.com",
  databaseURL: "https://wecode-a7354-default-rtdb.firebaseio.com/",
  projectId: "wecode-a7354",
  storageBucket: "wecode-a7354.firebasestorage.app",
  messagingSenderId: "6754148212",
  appId: "1:6754148212:web:bc228ac7650b666ef75621",
  measurementId: "G-8948KFPN92"
};

const auth = getAuth();

function logout() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

window.addEventListener('DOMContentLoaded', () => {
  const userInfoDiv = document.getElementById("userInfo");
  const logoutContainer = document.getElementById("logoutContainer");

  // Clear previous content
  logoutContainer.innerHTML = "";
  userInfoDiv.textContent = "";

  // Use Firebase to watch auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log("Firebase user is signed in:", user);

      // Show user info
      userInfoDiv.textContent = user.displayName || "Logged in";

      // Hide sign-in/sign-up links
      document.querySelectorAll(".sign-links").forEach(link => {
        link.style.display = "none";
      });

      // Add logout button
      const btn = document.createElement("button");
      btn.textContent = "Logout";
      btn.style.marginLeft = "10px";
      btn.addEventListener("click", logout);
      logoutContainer.appendChild(btn);
      btn.style.background = "transparent";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "20px";
      btn.addEventListener("click", logout);
      logoutContainer.appendChild(btn);

    } else {
      // User is signed out
      console.log("Firebase user is signed out.");

      userInfoDiv.textContent = "";

      // Show sign-in/sign-up links
      document.querySelectorAll(".sign-links").forEach(link => {
        link.style.display = "";
      });

      // Clear logout container
      logoutContainer.innerHTML = "";
    }
  });
});
>>>>>>> 8853f414d26cc404f685cdf2460911d1f8fa7b89
