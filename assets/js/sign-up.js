// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"; // Added onAuthStateChanged

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmEuRloY4yc9yvKyQ9U2iK8Ob91_zxNkI",
  authDomain: "wecode-a7354.firebaseapp.com",
  databaseURL: "https://wecode-a7354-default-rtdb.firebaseio.com/", // Ensure trailing slash for consistency
  projectId: "wecode-a7354",
  storageBucket: "wecode-a7354.firebasestorage.app",
  messagingSenderId: "6754148212",
  appId: "1:6754148212:web:bc228ac7650b666ef75621",
  measurementId: "G-8948KFPN92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Pass 'app' to getDatabase
const auth = getAuth(app); // Pass 'app' to getAuth

// Get references to HTML elements
let userNameInput = document.getElementById("user-name-input");
let emailRegisterInput = document.getElementById("email-input");
let passwordRegisterInput = document.getElementById("password-input");
let passwordRepeatInput = document.getElementById("repeat-password-input");
let signUpForm = document.querySelector(".sign-up-form"); // Selecting the form directly
let errorMessageDisplay = document.getElementById("error-message"); // New element for errors

signUpForm.addEventListener("submit", async (e) => { // Mark the function as async!
  e.preventDefault();

  const email = emailRegisterInput.value;
  const password = passwordRegisterInput.value;
  const passwordRepeat = passwordRepeatInput.value;
  const username = userNameInput.value;

  errorMessageDisplay.textContent = "";

  if (password !== passwordRepeat) {
    errorMessageDisplay.textContent = "Passwords do not match. Please re-enter.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const currentTime = new Date().toISOString();

    await updateProfile(user, {
      displayName: username
    });

    await set(ref(database, "users/" + user.uid), {
      displayName: username,
      email: email,
      author_post: [],
      lastLogin: currentTime
    });
  
    console.log("Account created successfully. Redirecting to homepage.");
    window.location.href = "./index.html";
  } catch (error) {
    console.error("Registration failed:", error.code, error.message);
    let userFacingMessage = "Registration failed. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        userFacingMessage = "This email address is already in use.";
        break;
      case "auth/invalid-email":
        userFacingMessage = "The email address is not valid.";
        break;
      case "auth/operation-not-allowed":
        userFacingMessage = "Email/password sign-up is not enabled. Please check Firebase project settings.";
        break;
      case "auth/weak-password":
        userFacingMessage = "The password is too weak. Please choose a stronger password.";
        break;
      default:
        userFacingMessage = "An unexpected error occurred: " + error.message;
    }
    errorMessageDisplay.textContent = userFacingMessage;
  }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is already signed in:", user.email, user.uid);
        window.location.href = "./index.html"
    } else {
        console.log("No user signed in.");
    }
});
