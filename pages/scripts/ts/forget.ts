const phoneNum = document.getElementById("phoneNum");
const submitBtnPhoneNum = document.getElementById("submitBtn") as HTMLButtonElement;
const errorMsgPhoneNum = document.getElementById("errorMsgPhone")

phoneNum?.addEventListener("input", function (event) {
  if (checkInputHasValuePhoneNum(phoneNum)) {
    if(submitBtnPhoneNum) submitBtnPhoneNum.disabled = false;
  }

  if (!checkInputHasValuePhoneNum(phoneNum)) {
    showMessagePhoneRequired();
  } else {
    hideMessagePhoneRequired();
  }
});

function showMessagePhoneRequired():void {
  if(errorMsgPhoneNum) errorMsgPhoneNum.style.display = "block";
}
function hideMessagePhoneRequired():void {
  if(errorMsgPhoneNum) errorMsgPhoneNum.style.display = "none";
}
function checkInputHasValuePhoneNum(input) :boolean{
  return input.value.trim() !== "";
}