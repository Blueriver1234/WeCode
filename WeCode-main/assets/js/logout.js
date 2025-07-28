console.log("Simple logout.js loaded");

function logout() {
    // Remove saved user data
    localStorage.removeItem("userInfo");
    // Go back to homepage
    window.location.href = "./index.html";
}

window.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem("userInfo");
    const userInfoDiv = document.getElementById("userInfo");
    const logoutContainer = document.getElementById("logoutContainer");

    console.log("userData is", userData);

    logoutContainer.innerHTML = "";

    if (userData) {
        const user = JSON.parse(userData);
        userInfoDiv.textContent = `${user.username}`;

        // Hide sign links
        document.querySelectorAll(".sign-links").forEach(link => {
            link.style.display = "none";
        });

        // Create a logout button
        const btn = document.createElement("button");
        btn.textContent = "Log out";
        btn.style.marginLeft = "10px";
        btn.addEventListener("click", logout);
        logoutContainer.appendChild(btn);
        btn.style.background = "transparent";
        btn.style.color = "white"; // or your nav text color
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "20px";
    }
});