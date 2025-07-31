import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const signInForm = document.querySelector(".sign-in-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessageDisplay = document.getElementById("error-message");

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    errorMessageDisplay.textContent = "";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Cập nhật lastLogin
        const currentTime = new Date().toISOString();
        await update(ref(database, "users/" + user.uid), {
            lastLogin: currentTime
        });

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
        const userInfo = {
            username: username,
            uid: user.uid,
            email: user.email,
            role: role
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("User info stored in localStorage:", userInfo);

        alert("Signed in successfully!");

        // Điều hướng theo role
        if (role === "admin") {
            window.location.href = "./admin.html";
        } else {
            window.location.href = "./index.html";
        }

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
            case "auth/wrong-password":
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
