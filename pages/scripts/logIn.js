function hasValue(input) {
  return input.value.trim() !== "";
}

const form = document.getElementById("myForm");
const submitBtn = document.getElementById("submitBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");

//   form.addEventListener("button", function (event) {
//     event.preventDefault();
//     window.location.replace("forget.html");
//   });
function goToPageForget() {
  window.location.replace("forget.html");
}

username.addEventListener("input", function (event) {
  if (hasValue(username) && hasValue(password)) {
    submitBtn.disabled = false;
  }
});

password.addEventListener("input", function (event) {
  if (hasValue(username) && hasValue(password)) {
    submitBtn.disabled = false;
  }
});

document.getElementById("username").addEventListener("input", function () {
  let inputValue = this.value.trim();

  if (inputValue === "") {
    showMessageUserRequired();
  } else {
    hideMessageUserRequired();
  }
});
document.getElementById("password").addEventListener("input", function () {
  let inputValue = this.value.trim();

  if (inputValue === "") {
    showMessagePasswordRequired();
  } else {
    hideMessagePasswordRequired();
  }
});

function showMessageUserRequired() {
  document.getElementById("errorMsgUser").style.display = "block";
}

function hideMessageUserRequired() {
  document.getElementById("errorMsgUser").style.display = "none";
}
function showMessagePasswordRequired() {
  document.getElementById("errorMsgPassword").style.display = "block";
}

function hideMessagePasswordRequired() {
  document.getElementById("errorMsgPassword").style.display = "none";
}
