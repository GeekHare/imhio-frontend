var backendDomain = "https://b-imhio.geekhare.me";
var messages  = document.getElementById("messages");

/**
 * Processing response a validateEmail() function
 *
 * @function
 * @version 1.0.0
 * @param {object} response - response from validateEmail()
 * @see validateEmail()
 */
function processingResponse(response) {

  var message = "";

  if (typeof response.validation !== "undefined") {
    message = "Email valid";
  }

  if (typeof response.err !== "undefined") {
    message = (response.err === "EMAIL_BAD") ? "Email invalid" : "Sorry, an error occurred";
  }

  var p = document.createElement('p');
  p.innerHTML = message;
  messages.append(p);
}

/**
 * Function for validate a input email
 *
 * @function
 * @version 1.0.0
 * @param {string} email
 */
function validateEmail(email) {
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  xhr.open("POST", backendDomain + "/email/check", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    var response = JSON.parse(xhr.responseText);
    processingResponse(response);
  };
  xhr.send(JSON.stringify({email:email}));
}

/**
 * Processing action "submit form"
 *
 * @function
 * @version 1.0.0
 * @param {object} e - The event object
 */
document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();

  // Clear messages block
  messages.innerHTML = "";

  validateEmail(document.getElementById("input").value);
};