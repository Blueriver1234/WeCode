const change_user_name_button = document.querySelector("#change_user_name_button")
const change_email_button = document.querySelector("#change_email_button")
const change_password_button = document.querySelector("#change_password_button")
const change_user_name_input = document.querySelector("#change_user_name_input")
const change_email_input = document.querySelector("#change_email_input")
const change_password_input = document.querySelector("#change_password_input")
const change_password_again_input = document.querySelector("#change_password_again_input")
const submit_button = document.querySelector("#submit_button")
const cancel_button = document.querySelector("#cancel_button")

change_user_name_button.addEventListener("click", function () {
    change_email_input.style.display = 'none';
    change_password_input.style.display = 'none';
    change_password_again_input.style.display = 'none';
    change_user_name_input.style.display = 'inline-block';
    submit_button.style.display = 'inline-block';
    cancel_button.style.display = 'inline-block';
})

change_email_button.addEventListener("click", function () {
    change_user_name_input.style.display = 'none';
    change_password_input.style.display = 'none';
    change_password_again_input.style.display = 'none';
    change_email_input.style.display = 'inline-block';
    submit_button.style.display = 'inline-block';
    cancel_button.style.display = 'inline-block';
})

change_password_button.addEventListener("click", function () {
    change_user_name_input.style.display = 'none';
    change_email_input.style.display = 'none';
    change_password_input.style.display = 'inline-block';
    change_password_again_input.style.display = 'inline-block';
    submit_button.style.display = 'inline-block';
    cancel_button.style.display = 'inline-block';
})

submit_button.addEventListener("click", function () {
    change_user_name_input.style.display = 'none';
    change_email_input.style.display = 'none';
    change_password_input.style.display = 'none';
    change_password_again_input.style.display = 'none';
    submit_button.style.display = 'none';
    cancel_button.style.display = 'none';
})

cancel_button.addEventListener("click", function () {
    change_user_name_input.style.display = 'none';
    change_email_input.style.display = 'none';
    change_password_input.style.display = 'none';
    change_password_again_input.style.display = 'none';
    submit_button.style.display = 'none';
    cancel_button.style.display = 'none';
})

