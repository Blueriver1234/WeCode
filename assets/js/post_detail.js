const like_button = document.querySelector("#like_button")
const reply_button = document.querySelector("#reply_button")
const like_icon = document.querySelector("#like_icon")
const liked_icon = document.querySelector("#liked_icon")

like_button.addEventListener("click", function () {
    if (getComputedStyle(like_icon).display === "block") {
        like_icon.style.display = "none";
        liked_icon.style.display = "block";
    }
    else {
        like_icon.style.display = "block";
        liked_icon.style.display = "none";
    }
})