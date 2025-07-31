<<<<<<< HEAD
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmEuRloY4yc9yvKyQ9U2iK8Ob91_zxNkI",
  authDomain: "wecode-a7354.firebaseapp.com",
  databaseURL: "https://wecode-a7354-default-rtdb.firebaseio.com/",
=======
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"; // Added onAuthStateChanged

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmEuRloY4yc9yvKyQ9U2iK8Ob91_zxNkI",
  authDomain: "wecode-a7354.firebaseapp.com",
  databaseURL: "https://wecode-a7354-default-rtdb.firebaseio.com/", // Ensure trailing slash for consistency
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
  projectId: "wecode-a7354",
  storageBucket: "wecode-a7354.firebasestorage.app",
  messagingSenderId: "6754148212",
  appId: "1:6754148212:web:bc228ac7650b666ef75621",
  measurementId: "G-8948KFPN92"
};

<<<<<<< HEAD
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

=======
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Pass 'app' to getDatabase
const auth = getAuth(app); // Pass 'app' to getAuth

// Get references to HTML elements
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
let userNameInput = document.getElementById("user-name-input");
let emailRegisterInput = document.getElementById("email-input");
let passwordRegisterInput = document.getElementById("password-input");
let passwordRepeatInput = document.getElementById("repeat-password-input");
<<<<<<< HEAD
let signUpForm = document.querySelector(".sign-up-form");
let errorMessageDisplay = document.getElementById("error-message");

signUpForm.addEventListener("submit", async (e) => {
=======
let signUpForm = document.querySelector(".sign-up-form"); // Selecting the form directly
let errorMessageDisplay = document.getElementById("error-message"); // New element for errors

signUpForm.addEventListener("submit", async (e) => { // Mark the function as async!
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
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

<<<<<<< HEAD
    // Xác định role: admin@gmail.com -> admin, còn lại user
    const role = (email === "admin@gmail.com") ? "admin" : "user";

    await set(ref(database, "users/" + user.uid), {
      username: username,
      email: email,
      role: role,           // thêm role
=======
    await set(ref(database, "users/" + user.uid), {
      username: username,
      email: email,
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
      author_post: [],
      lastLogin: "",
    });

    console.log("Account created successfully. Redirecting to sign-in page.");
    window.location.href = "./sign-in.html";

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
    } else {
        console.log("No user signed in.");
    }
});
