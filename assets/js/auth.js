import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Dùng config của bạn
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
const auth = getAuth(app);
const database = getDatabase(app);

// Kiểm tra người dùng khi mở trang admin
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // chưa đăng nhập
        window.location.href = "sign-in.html";
        return;
    }

    // Kiểm tra role
    const roleRef = ref(database, "users/" + user.uid + "/role");
    get(roleRef).then((snapshot) => {
        if (!snapshot.exists() || snapshot.val() !== "admin") {
            alert("Bạn không có quyền truy cập trang này.");
            window.location.href = "index.html";
        }
    }).catch((error) => {
        console.error("Lỗi khi kiểm tra role:", error);
        window.location.href = "index.html";
    });
});
