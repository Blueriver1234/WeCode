 import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
        const auth = getAuth();

        document.getElementById("logout-btn").addEventListener("click", () => {
            signOut(auth).then(() => {
                localStorage.removeItem("userInfo");
                window.location.href = "sign-in.html";
            }).catch((error) => {
                console.error("Lỗi khi đăng xuất:", error);
            });
        });