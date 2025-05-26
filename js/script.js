const form = document.getElementById("contactForm");
const dialog = document.getElementById("confirmationDialog");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

let lastFocusedElement = null;
let isValidated = false; // Pour différencier les soumissions validées ou non

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!isValidated) {
    // VALIDATION AVEC REGEX
    const errors = [];
    const lastname = document.getElementById("lastname");
    const firstname = document.getElementById("firstname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");
    const timeslot = document.getElementById("timeslot");

    const nameRegex = /^[A-Za-zÀ-ÿ\- ]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^(\+33|0)[\s.-]?([1-9][\s.-]?){8}[0-9]$/;

    function setError(input, message) {
      input.setAttribute("aria-invalid", "true");
      input.classList.add("error");
      let errorMsg = input.nextElementSibling;
      if (!errorMsg || !errorMsg.classList.contains("error-message")) {
        errorMsg = document.createElement("p");
        errorMsg.classList.add("error-message");
        errorMsg.setAttribute("role", "alert");
        input.parentNode.insertBefore(errorMsg, input.nextSibling);
      }
      errorMsg.innerText = message;
    }

    function clearError(input) {
      input.setAttribute("aria-invalid", "false");
      input.classList.remove("error");
      let errorMsg = input.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains("error-message")) {
        errorMsg.remove();
      }
    }

    if (!nameRegex.test(lastname.value)) {
      setError(lastname, "Nom invalide. Minimum 2 lettres.");
      errors.push("lastname");
    } else clearError(lastname);

    if (!nameRegex.test(firstname.value)) {
      setError(firstname, "Prénom invalide. Minimum 2 lettres.");
      errors.push("firstname");
    } else clearError(firstname);

    if (!emailRegex.test(email.value)) {
      setError(email, "Adresse email invalide.");
      errors.push("email");
    } else clearError(email);

    if (!phoneRegex.test(phone.value)) {
        setError(phone, "Numéro de téléphone invalide. Exemple : 0612345678 ou +33 6 12 34 56 78.");
        errors.push("phone");
      } else clearError(phone);

    if (message.value.trim().length < 10) {
      setError(message, "Message trop court.");
      errors.push("message");
    } else clearError(message);

    if (!timeslot.value) {
      setError(timeslot, "Veuillez choisir une plage horaire.");
      errors.push("timeslot");
    } else clearError(timeslot);

    if (errors.length === 0) {
      lastFocusedElement = document.activeElement;
      dialog.classList.remove("hidden");
      dialog.focus();
      confirmBtn.focus();
    }
  }
});

// Confirmation après modal
confirmBtn.addEventListener("click", function () {
  isValidated = true;
  dialog.classList.add("hidden");
  form.submit();
});

// Annuler
cancelBtn.addEventListener("click", function () {
  dialog.classList.add("hidden");
  if (lastFocusedElement) lastFocusedElement.focus();
});

// Accessibilité clavier
dialog.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    isValidated = true;
    dialog.classList.add("hidden");
    form.submit();
  } else if (e.key === "Escape") {
    e.preventDefault();
    dialog.classList.add("hidden");
    if (lastFocusedElement) lastFocusedElement.focus();
  }
});
