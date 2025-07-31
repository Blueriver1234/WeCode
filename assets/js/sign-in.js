<<<<<<< HEAD
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

=======
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js"; // Added 'get'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"; // Added 'onAuthStateChanged'

// Your Firebase configuration
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
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

<<<<<<< HEAD
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const signInForm = document.querySelector(".sign-in-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessageDisplay = document.getElementById("error-message");
=======
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Pass 'app' to getAuth for consistent initialization

// Get references to HTML elements
const signInForm = document.querySelector(".sign-in-form"); // Selecting the form directly
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessageDisplay = document.getElementById("error-message"); // New element for errors
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
<<<<<<< HEAD
=======

>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
    errorMessageDisplay.textContent = "";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

<<<<<<< HEAD
        // Cập nhật lastLogin
=======
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
        const currentTime = new Date().toISOString();
        await update(ref(database, "users/" + user.uid), {
            lastLogin: currentTime
        });

<<<<<<< HEAD
        // Lấy dữ liệu người dùng
        const userSnapshot = await get(ref(database, "users/" + user.uid));
        let username = "User";
        let role = "user";
        if (userSnapshot.exists()) {
            const data = userSnapshot.val();
            username = data.username || "User";
            role = data.role || "user";
        }

        // Lưu thông tin user vào localStorage
=======
        const userSnapshot = await get(ref(database, "users/" + user.uid));
        let username = "User"; // Default username
        if (userSnapshot.exists()) {
            username = userSnapshot.val().username || "User";
        }

>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
        const userInfo = {
            username: username,
            uid: user.uid,
            email: user.email,
<<<<<<< HEAD
            role: role
=======
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("User info stored in localStorage:", userInfo);

<<<<<<< HEAD
        alert("Signed in successfully!");

        // Điều hướng theo role
        if (role === "admin") {
            window.location.href = "./admin.html";
        } else {
            window.location.href = "./index.html";
        }
=======
        alert("Signed in successfully!"); 
        window.location.href = "./index.html";
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b

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
<<<<<<< HEAD
            case "auth/wrong-password":
=======
            case "auth/wrong-password": // It's a good practice to combine these for security, not revealing if user exists
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
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
    } else {
        console.log("No user signed in.");
    }
});
