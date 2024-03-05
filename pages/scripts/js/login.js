var form = document.getElementById("myForm");
var submitBtn = document.getElementById("submitBtn");
var username = document.getElementById("username");
var password = document.getElementById("password");
var errorMsgUser = document.getElementById("errorMsgUser");
var errorMsgPassword = document.getElementById("errorMsgPassword");
username === null || username === void 0 ? void 0 : username.addEventListener("input", function (event) {
    if (checkInputHasValue(username) && checkInputHasValue(password)) {
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }
    if (!checkInputHasValue(username)) {
        showMessageUserRequired();
    }
    else {
        hideMessageUserRequired();
    }
});
password === null || password === void 0 ? void 0 : password.addEventListener("input", function (value) {
    if (checkInputHasValue(username) && checkInputHasValue(password)) {
        submitBtn.disabled = false;
    }
    if (!checkInputHasValue(password)) {
        showMessagePasswordRequired();
    }
    else {
        hideMessagePasswordRequired();
    }
});
function showMessageUserRequired() {
    if (errorMsgUser)
        errorMsgUser.style.display = "block";
}
function hideMessageUserRequired() {
    if (errorMsgUser)
        errorMsgUser.style.display = "none";
}
function showMessagePasswordRequired() {
    if (errorMsgPassword)
        errorMsgPassword.style.display = "block";
}
function hideMessagePasswordRequired() {
    if (errorMsgPassword)
        errorMsgPassword.style.display = "none";
}
function checkInputHasValue(input) {
    return input.value.trim() !== "";
}
function goToPageForget() {
    window.location.replace("forget.html");
}
