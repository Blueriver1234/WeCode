import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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