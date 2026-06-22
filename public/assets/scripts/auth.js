// ─── Autenticación / Login ────────────────────────────────────────────────────
// Responsable: Miguel Andre Casos Torre
// Propiedad exclusiva. No editar fuera de esta rama.

const credentialsByRole = {
  student: {
    email: "demo@gmail.com",
    password: "demo",
    redirectTo: "dashboard-estudiante.html",
  },
  advisor: {
    email: "demo@gmail.com",
    password: "demo",
    redirectTo: "dashboard-asesor.html",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const authAlert = document.querySelector("#auth-alert");

const forgotPasswordButton = document.querySelector("#forgot-password-button");
const recoveryModal = document.querySelector("#recovery-modal");
const closeRecoveryButton = document.querySelector("#close-recovery");
const recoveryForm = document.querySelector("#recovery-form");
const recoveryEmailInput = document.querySelector("#recovery-email");
const recoveryAlert = document.querySelector("#recovery-alert");

const setFieldError = (input, message) => {
  const field = input.closest(".form-field");
  const error = document.querySelector(`#${input.getAttribute("aria-describedby")}`);

  field.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  error.textContent = message;
};

const clearAlert = (alertElement) => {
  alertElement.hidden = true;
  alertElement.textContent = "";
};

const showAlert = (alertElement, message) => {
  alertElement.textContent = message;
  alertElement.hidden = false;
};

const validateEmail = (input) => {
  const value = input.value.trim();

  if (!value) {
    setFieldError(input, "Ingresa tu correo electrónico.");
    return false;
  }

  if (!emailPattern.test(value)) {
    setFieldError(input, "Ingresa un correo con formato válido.");
    return false;
  }

  setFieldError(input, "");
  return true;
};

const validatePassword = () => {
  if (!passwordInput.value.trim()) {
    setFieldError(passwordInput, "Ingresa tu contraseña.");
    return false;
  }

  setFieldError(passwordInput, "");
  return true;
};

const getSelectedRole = () => {
  const selectedRole = loginForm.querySelector('input[name="role"]:checked');
  return selectedRole.value;
};

const handleLoginSubmit = (event) => {
  event.preventDefault();
  clearAlert(authAlert);

  const isEmailValid = validateEmail(emailInput);
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  const role = getSelectedRole();
  const credentials = credentialsByRole[role];
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (email === credentials.email && password === credentials.password) {
    showAlert(authAlert, "Credenciales validadas. Redirigiendo al dashboard...");
    authAlert.classList.add("auth-alert--success");
    window.setTimeout(() => {
      window.location.href = credentials.redirectTo;
    }, 650);
    return;
  }

  authAlert.classList.remove("auth-alert--success");
  showAlert(authAlert, "Correo, contraseña o rol incorrectos. Revisa los datos e intenta nuevamente.");
};

const openRecoveryModal = () => {
  recoveryModal.classList.add("is-open");
  recoveryModal.setAttribute("aria-hidden", "false");
  clearAlert(recoveryAlert);
  setFieldError(recoveryEmailInput, "");
  recoveryEmailInput.focus();
};

const closeRecoveryModal = () => {
  recoveryModal.classList.remove("is-open");
  recoveryModal.setAttribute("aria-hidden", "true");
  forgotPasswordButton.focus();
};

const handleRecoverySubmit = (event) => {
  event.preventDefault();
  clearAlert(recoveryAlert);

  if (!validateEmail(recoveryEmailInput)) {
    return;
  }

  showAlert(
    recoveryAlert,
    "Solicitud registrada. Te enviamos una simulación de recuperación al correo indicado."
  );
};

loginForm.addEventListener("submit", handleLoginSubmit);
emailInput.addEventListener("input", () => setFieldError(emailInput, ""));
passwordInput.addEventListener("input", () => setFieldError(passwordInput, ""));

forgotPasswordButton.addEventListener("click", openRecoveryModal);
closeRecoveryButton.addEventListener("click", closeRecoveryModal);
recoveryForm.addEventListener("submit", handleRecoverySubmit);
recoveryEmailInput.addEventListener("input", () => setFieldError(recoveryEmailInput, ""));

recoveryModal.addEventListener("click", (event) => {
  if (event.target === recoveryModal) {
    closeRecoveryModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && recoveryModal.classList.contains("is-open")) {
    closeRecoveryModal();
  }
});
