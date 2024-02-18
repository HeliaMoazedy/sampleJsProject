function hasValue(input) {
  return input.value.trim() !== "";
}
const form = document.getElementById("myForm");
const phoneNum = document.getElementById("phoneNum");
const submitBtn = document.getElementById("submitBtn");

phoneNum.addEventListener("input", function (event) {
  if (hasValue(phoneNum)) {
    submitBtn.disabled = false;
  }
});
document.getElementById("phoneNum").addEventListener("input", function () {
  let inputValue = this.value.trim();
  if (inputValue === "") {
    showMessagePhoneRequired();
  } else {
    hideMessagePhoneRequired();
  }
});
function showMessagePhoneRequired() {
  document.getElementById("errorMsgPhone").style.display = "block";
}
function hideMessagePhoneRequired() {
  document.getElementById("errorMsgPhone").style.display = "none";
}
