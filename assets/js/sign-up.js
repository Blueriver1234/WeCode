import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmEuRloY4yc9yvKyQ9U2iK8Ob91_zxNkI",
  authDomain: "wecode-a7354.firebaseapp.com",
  databaseURL: "https://wecode-a7354-default-rtdb.firebaseio.com/", // double-check this in Firebase console
  projectId: "wecode-a7354",
  storageBucket: "wecode-a7354.appspot.com",
  messagingSenderId: "6754148212",
  appId: "1:6754148212:web:bc228ac7650b666ef75621",
  measurementId: "G-8948KFPN92"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let userNameInput = document.getElementById("user-name-input");
let emailRegisterInput = document.getElementById("email-input");
let passwordRegisterInput = document.getElementById("password-input");
let passwordRepeatInput = document.getElementById("repeat-password-input");
let signUpForm = document.querySelector(".sign-up-form");
let errorMessageDisplay = document.getElementById("error-message");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailRegisterInput.value.trim();
  const password = passwordRegisterInput.value;
  const passwordRepeat = passwordRepeatInput.value;
  const username = userNameInput.value.trim();
  const currentTime = new Date().toISOString();

  errorMessageDisplay.textContent = "";

  if (!username) {
    errorMessageDisplay.textContent = "Please enter a username.";
    return;
  }
  if (password !== passwordRepeat) {
    errorMessageDisplay.textContent = "Passwords do not match.";
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: username });

    // Write to Realtime Database
    await set(ref(database, "users/" + user.uid), {
      displayName: username,
      email: email,
      role: "user",
      author_post: {},
      lastLogin: currentTime
    });

    console.log("Account created successfully. Redirecting to homepage...");
    window.location.href = "./index.html"; // Redirect AFTER DB write finishes

  } catch (error) {
    console.error("Error during registration:", error.code, error.message);
    let userFacingMessage = "Registration failed. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        userFacingMessage = "This email address is already in use.";
        break;
      case "auth/invalid-email":
        userFacingMessage = "The email address is not valid.";
        break;
      case "auth/operation-not-allowed":
        userFacingMessage = "Email/password sign-up is not enabled.";
        break;
      case "auth/weak-password":
        userFacingMessage = "The password is too weak. Please choose a stronger password.";
        break;
      case "PERMISSION_DENIED":
        userFacingMessage = "Database write denied. Check Firebase Realtime Database rules.";
        break;
      default:
        userFacingMessage = "Unexpected error: " + error.message;
    }
    errorMessageDisplay.textContent = userFacingMessage;
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is already signed in:", user.email, user.uid);
    window.location.href = "./index.html";
  } else {
    console.log("No user signed in.");
  }
});
