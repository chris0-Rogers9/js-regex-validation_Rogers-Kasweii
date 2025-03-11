(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("validationForm");
        const fields = {
            fullName: document.getElementById("fullName"),
            email: document.getElementById("email"),
            phone: document.getElementById("phone"),
            password: document.getElementById("password")
        };
        const errors = {
            fullName: document.getElementById("fullNameError"),
            email: document.getElementById("emailError"),
            phone: document.getElementById("phoneError"),
            password: document.getElementById("passwordError")
        };
        const successMessage = document.getElementById("successMessage");

        const validators = {
            fullName: value => /^[A-Za-z ]+$/.test(value) || "Only alphabetic characters and spaces allowed.",
            email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address.",
            phone: value => /^\d{10,15}$/.test(value) || "Enter a valid phone number (10-15 digits).",
            password: value => /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/.test(value) || "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number."
        };

        function validateField(field) {
            const value = fields[field].value;
            const validation = validators[field](value);
            if (validation === true) {
                errors[field].textContent = "";
                fields[field].style.border = "2px solid green";
                return true;
            } else {
                errors[field].textContent = validation;
                fields[field].style.border = "2px solid red";
                return false;
            }
        }

        Object.keys(fields).forEach(field => {
            fields[field].addEventListener("input", () => validateField(field));
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const isValid = Object.keys(fields).map(validateField).every(Boolean);
            if (isValid) {
                successMessage.textContent = "Form submitted successfully!";
                successMessage.style.color = "green";
                successMessage.style.display = "block";
            } else {
                successMessage.textContent = "Please fix the errors above.";
                successMessage.style.color = "red";
                successMessage.style.display = "block";
            }
        });
    });
})();