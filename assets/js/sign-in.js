// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js"; // Added 'get'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"; // Added 'onAuthStateChanged'

// Your Firebase configuration
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
const auth = getAuth(app); // Pass 'app' to getAuth for consistent initialization

// Get references to HTML elements
const signInForm = document.querySelector(".sign-in-form"); // Selecting the form directly
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessageDisplay = document.getElementById("error-message"); // New element for errors

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    errorMessageDisplay.textContent = "";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const currentTime = new Date().toISOString();
        await update(ref(database, "users/" + user.uid), {
            lastLogin: currentTime
        });

        const userSnapshot = await get(ref(database, "users/" + user.uid));
        let username = "User";
        if (userSnapshot.exists()) {
            username = userSnapshot.val().username || "User";
        }

        alert("Signed in successfully!"); 
        window.location.href = "./index.html";

    } catch (error) {
        console.error("Sign in failed:", error.code, error.message);
        let userFacingMessage = "Sign in failed. Please try again.";

        switch (error.code) {
            case "auth/invalid-email":
                userFacingMessage = "The email address is not valid.";
                break;
            case "auth/user-disabled":
                userFacingMessage = "This user account has been disabled.";
                break;
            case "auth/user-not-found":
            case "auth/wrong-password": // It's a good practice to combine these for security, not revealing if user exists
                userFacingMessage = "Incorrect email or password.";
                break;
            case "auth/too-many-requests":
                userFacingMessage = "Too many failed sign-in attempts. Please try again later.";
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
