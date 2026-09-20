
// FRESHMART LOGIN & SIGN UP //

// SHOW LOGIN
function showLogin() {
    document.getElementById("loginSection")
        .classList.remove("hidden");
    document.getElementById("signupSection")
        .classList.add("hidden");
}
// SHOW SIGN UP
function showSignup() {
    document.getElementById("loginSection")
        .classList.add("hidden");
    document.getElementById("signupSection")
        .classList.remove("hidden");
}
// PASSWORD SHOW / HIDE //
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
// SIGN UP // 
document.getElementById("signupForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        const name =
            document.getElementById("signupName").value.trim();
        const email =
            document.getElementById("signupEmail").value.trim().toLowerCase();
        const password =
            document.getElementById("signupPassword").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;
        const message =
            document.getElementById("signupMessage");
        // Check password
        if (password !== confirmPassword) {
            message.innerHTML =
                '<div class="error-message">Passwords do not match.</div>';
            return;
        }
        if (password.length < 6) {
            message.innerHTML =
                '<div class="error-message">Password must contain at least 6 characters.</div>';
            return;
        }
        // Get existing users
        let users =
            JSON.parse(localStorage.getItem("freshMartUsers")) || [];
        // Check existing email
        const existingUser =
            users.find(user => user.email === email);
        if (existingUser) {
            message.innerHTML =
                '<div class="error-message">An account with this email already exists.</div>';
            return;
        }
        // Create user
        const newUser = {
            name: name,
            email: email,
            password: password
        };
        users.push(newUser);
        // Save users
        localStorage.setItem(
            "freshMartUsers",
            JSON.stringify(users)
        );
        message.innerHTML =
            '<div class="success-message">Account created successfully!</div>';
        // Clear form
        document.getElementById("signupForm").reset();
        // Switch to login
        setTimeout(function() {
            showLogin();
            document.getElementById("loginEmail").value = email;
        }, 1200);
});
// LOGIN //
document.getElementById("loginForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        const email =
            document.getElementById("loginEmail").value.trim().toLowerCase();
        const password =
            document.getElementById("loginPassword").value;
        const message =
            document.getElementById("loginMessage");
        // Get users
        const users =
            JSON.parse(localStorage.getItem("freshMartUsers")) || [];
        // Find user
        const user =
            users.find(
                user =>
                    user.email === email &&
                    user.password === password
            );
        if (!user) {
            message.innerHTML =
                '<div class="error-message">Invalid email or password.</div>';
            return;
        }
        // Save login status
        localStorage.setItem(
            "freshMartLoggedIn",
            "true"
        );
        localStorage.setItem(
            "freshMartCurrentUser",
            JSON.stringify(user)
        );
        message.innerHTML =
            '<div class="success-message">Login successful! Opening FreshMart...</div>';
        // Redirect
        setTimeout(function() {
            window.location.href = "index.html";
        }, 800);
});
// FORGOT PASSWORD // 
function showForgotMessage(event) {
    event.preventDefault();
    alert(
        "For this demo website, password recovery is not connected yet. " +
        "We can add email-based password reset later when the Python/Django backend is connected."
    );
}