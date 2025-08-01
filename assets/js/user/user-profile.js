// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase(app);

// Populate user info
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "../sign-in.html";
    return;
  }

  const uid = user.uid;
  const emailDisplay = document.querySelector(".author-info p:nth-child(3)");

  emailDisplay.innerHTML = `<span>Email:</span> ${user.email}`;

  // Fetch additional info from database
  const userRef = ref(db, 'users/' + uid);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    document.querySelector(".author-info p:nth-child(2)").innerHTML = `<span>User name:</span> ${user.displayName || "N/A"}`;
    document.querySelector(".author-info p:nth-child(4)").innerHTML = `<span>Friends:</span> ${data.friends || 0}`;
    const postCount = Array.isArray(data.author_post) ? data.author_post.length : 0;
    document.querySelector(".author-info p:nth-child(5)").innerHTML = `<span>Post number:</span> ${postCount}`;
    document.querySelector(".author-info p:nth-child(6)").innerHTML = `<span>Likes gained:</span> ${data.likes || 0}`;
    document.querySelector(".author-info p:nth-child(7)").innerHTML = `<span>Replies gained:</span> ${data.replies || 0}`;
    document.querySelector(".author-info p:nth-child(8)").innerHTML = `<span>Joined in:</span> ${data.joinDate || "Unknown"}`;
  }
});

// Handle submit
document.getElementById("submit_button").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  const newUsername = document.getElementById("change_user_name_input").value.trim();
  const newEmail = document.getElementById("change_email_input").value.trim();
  const newPassword = document.getElementById("change_password_input").value;
  const newPasswordAgain = document.getElementById("change_password_again_input").value;

  try {
    if (newUsername) {
      await updateProfile(user, { displayName: newUsername });
    }

    if (newEmail) {
      await updateEmail(user, newEmail);
    }

    if (newPassword) {
      if (newPassword !== newPasswordAgain) {
        alert("Passwords do not match.");
        return;
      }
      await updatePassword(user, newPassword);
    }

    alert("Profile updated successfully.");
    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Update failed: " + error.message);
  }
});

// Handle cancel
document.getElementById("cancel_button").addEventListener("click", () => {
  document.getElementById("change_user_name_input").value = "";
  document.getElementById("change_email_input").value = "";
  document.getElementById("change_password_input").value = "";
  document.getElementById("change_password_again_input").value = "";
});

// Toggle input field visibility when a button is clicked
const nameInput = document.getElementById("change_user_name_input");
const emailInput = document.getElementById("change_email_input");
const passInput1 = document.getElementById("change_password_input");
const passInput2 = document.getElementById("change_password_again_input");
const submitBtn = document.getElementById("submit_button");
const cancelBtn = document.getElementById("cancel_button");

// Hide all inputs initially
function hideAllInputs() {
  nameInput.style.display = "none";
  emailInput.style.display = "none";
  passInput1.style.display = "none";
  passInput2.style.display = "none";
  submitBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

hideAllInputs(); // Call initially

// Show only relevant inputs
document.getElementById("change_user_name_button").addEventListener("click", () => {
  hideAllInputs();
  nameInput.style.display = "block";
  submitBtn.style.display = "inline-block";
  cancelBtn.style.display = "inline-block";
});

document.getElementById("change_email_button").addEventListener("click", () => {
  hideAllInputs();
  emailInput.style.display = "block";
  submitBtn.style.display = "inline-block";
  cancelBtn.style.display = "inline-block";
});

document.getElementById("change_password_button").addEventListener("click", () => {
  hideAllInputs();
  passInput1.style.display = "block";
  passInput2.style.display = "block";
  submitBtn.style.display = "inline-block";
  cancelBtn.style.display = "inline-block";
});

// Cancel button resets inputs
cancelBtn.addEventListener("click", () => {
  nameInput.value = "";
  emailInput.value = "";
  passInput1.value = "";
  passInput2.value = "";
  hideAllInputs();
});
