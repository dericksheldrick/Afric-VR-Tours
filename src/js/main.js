// Import only the required Bootstrap modules
import { Modal } from "bootstrap";

// Utility function to handle modal forms
function handleFormSubmission(formId, modalId, successMessage) {
  document.getElementById(formId).addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const allFieldsFilled = [...formData.values()].every((value) =>
      value.trim()
    );

    if (!allFieldsFilled) {
      alert("Please fill in all fields.");
      return;
    }

    // Placeholder for actual form logic
    alert(successMessage(formData));

    // Close the associated modal
    const modal = Modal.getInstance(document.getElementById(modalId));
    modal.hide();
  });
}

// Register form handlers
handleFormSubmission(
  "signupForm",
  "signupModal",
  (formData) => `Sign up successful for ${formData.get("signupEmail")}!`
);

handleFormSubmission(
  "forgotPasswordForm",
  "forgotPasswordModal",
  (formData) => `Password reset link sent to ${formData.get("forgotEmail")}!`
);

handleFormSubmission(
  "registrationForm",
  "registrationModal",
  (formData) =>
    `Registration successful for ${formData.get(
      "registrationName"
    )} (${formData.get("registrationEmail")}) for the ${formData.get(
      "registrationPackage"
    )} package!`
);

// Handle Package Selection
document
  .getElementById("packageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedPackage = document.getElementById("packageSelect").value;
    if (!selectedPackage) {
      alert("Please select a package.");
      return;
    }

    // Pass selected package to registration modal
    document.getElementById("registrationPackage").value = selectedPackage;

    // Close the package selection modal
    const packageSelectionModal = Modal.getInstance(
      document.getElementById("packageSelectionModal")
    );
    packageSelectionModal.hide();

    // Open the registration modal
    const registrationModal = new Modal(
      document.getElementById("registrationModal")
    );
    registrationModal.show();
  });

// Capture package selection and populate the registration modal
document.querySelectorAll('[data-bs-toggle="modal"]').forEach((button) => {
  button.addEventListener("click", function () {
    const packageName = this.getAttribute("data-package");
    document.getElementById("registrationPackage").value = packageName;
  });
});
