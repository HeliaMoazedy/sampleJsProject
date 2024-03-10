var phoneNum = document.getElementById("phoneNum");
var submitBtnPhoneNum = document.getElementById("submitBtn");
var errorMsgPhoneNum = document.getElementById("errorMsgPhone");
phoneNum === null || phoneNum === void 0 ? void 0 : phoneNum.addEventListener("input", function (event) {
    if (checkInputHasValuePhoneNum(phoneNum)) {
        if (submitBtnPhoneNum)
            submitBtnPhoneNum.disabled = false;
    }
    if (!checkInputHasValuePhoneNum(phoneNum)) {
        showMessagePhoneRequired();
    }
    else {
        hideMessagePhoneRequired();
    }
});
function showMessagePhoneRequired() {
    if (errorMsgPhoneNum)
        errorMsgPhoneNum.style.display = "block";
}
function hideMessagePhoneRequired() {
    if (errorMsgPhoneNum)
        errorMsgPhoneNum.style.display = "none";
}
function checkInputHasValuePhoneNum(input) {
    return input.value.trim() !== "";
}
