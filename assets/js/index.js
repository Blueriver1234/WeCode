let user_name = document.getElementById("username");

user_name.innerText = JSON.parse(localStorage.getItem("userInfo")).username;