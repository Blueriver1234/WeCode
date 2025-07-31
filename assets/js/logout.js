<<<<<<< HEAD

function logout() {

    localStorage.removeItem("userInfo");
 
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

        document.querySelectorAll(".sign-links").forEach(link => {
            link.style.display = "none";
        });

        const btn = document.createElement("button");
        btn.textContent = "Logout";
        btn.style.marginLeft = "10px";
        btn.addEventListener("click", logout);
        logoutContainer.appendChild(btn);
        btn.style.background = "transparent";
        btn.style.color = "white"; 
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "20px";
    }
});
=======

function logout() {

    localStorage.removeItem("userInfo");
 
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

        document.querySelectorAll(".sign-links").forEach(link => {
            link.style.display = "none";
        });

        const btn = document.createElement("button");
        btn.textContent = "Logout";
        btn.style.marginLeft = "10px";
        btn.addEventListener("click", logout);
        logoutContainer.appendChild(btn);
        btn.style.background = "transparent";
        btn.style.color = "white"; 
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "20px";
    }
});
>>>>>>> ae0e8e52c0c5ea6ec59ede020262daa21b1fd28b
