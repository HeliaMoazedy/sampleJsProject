const form = document.getElementById("myForm");
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMsgUser = document.getElementById("errorMsgUser");
const errorMsgPassword = document.getElementById("errorMsgPassword");

username?.addEventListener("input", function (event) {
  if (checkInputHasValue(username) && checkInputHasValue(password)) {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }

  if (!checkInputHasValue(username)) {
    showMessageUserRequired();
  } else {
    hideMessageUserRequired();
  }
});

password?.addEventListener("input", function (value) {
  if (checkInputHasValue(username) && checkInputHasValue(password)) {
    submitBtn.disabled = false;
  }

  if (!checkInputHasValue(password)) {
    showMessagePasswordRequired();
  } else {
    hideMessagePasswordRequired();
  }
});

function showMessageUserRequired(): void {
  if (errorMsgUser) errorMsgUser.style.display = "block";
}

function hideMessageUserRequired(): void {
  if (errorMsgUser) errorMsgUser.style.display = "none";
}
function showMessagePasswordRequired(): void {
  if (errorMsgPassword) errorMsgPassword.style.display = "block";
}

function hideMessagePasswordRequired(): void {
  if (errorMsgPassword) errorMsgPassword.style.display = "none";
}

function checkInputHasValue(input): boolean {
  return input.value.trim() !== "";
}

function goToPageForget(): void {
  window.location.replace("forget.html");
}
