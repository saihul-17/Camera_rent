// register.js
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthLevel = document.getElementById('strengthLevel');

    const requirements = {
        length: document.getElementById('lengthReq'),
        lowercase: document.getElementById('lowercaseReq'),
        uppercase: document.getElementById('uppercaseReq'),
        number: document.getElementById('numberReq')
    };

    function validateFullName(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    }

    function validateEmail(email) {
        return email.endsWith('@gmail.com');
    }

    function validatePassword(password) {
        return {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            isValid: password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)
        };
    }

    function getPasswordStrength(password) {
        const validation = validatePassword(password);
        let score = 0;

        if (validation.length) score++;
        if (validation.lowercase) score++;
        if (validation.uppercase) score++;
        if (validation.number) score++;

        return score;
    }

    function updatePasswordStrength(password) {
        const validation = validatePassword(password);
        const score = getPasswordStrength(password);

        requirements.length.classList.toggle('valid', validation.length);
        requirements.lowercase.classList.toggle('valid', validation.lowercase);
        requirements.uppercase.classList.toggle('valid', validation.uppercase);
        requirements.number.classList.toggle('valid', validation.number);

        strengthFill.className = 'strength-fill';
        let strengthText = 'Lemah';

        if (score === 0) {
            strengthFill.classList.add('weak');
            strengthText = 'Lemah';
        } else if (score === 1 || score === 2) {
            strengthFill.classList.add('fair');
            strengthText = 'Cukup';
        } else if (score === 3) {
            strengthFill.classList.add('good');
            strengthText = 'Baik';
        } else if (score === 4) {
            strengthFill.classList.add('strong');
            strengthText = 'Kuat';
        }

        strengthLevel.textContent = strengthText;
    }

    function updateInputValidation(input, isValid) {
        const formGroup = input.parentElement;

        formGroup.classList.remove('valid', 'invalid');
        input.classList.remove('success', 'error');

        if (input.value.trim()) {
            if (isValid) {
                formGroup.classList.add('valid');
                input.classList.add('success');
            } else {
                formGroup.classList.add('invalid');
                input.classList.add('error');
            }
        }
    }

    function showMessage(element, message, isError = true) {
        element.textContent = message;
        element.classList.add('show');

        if (!isError) {
            setTimeout(() => {
                element.classList.remove('show');
            }, 5000);
        }
    }

    function hideMessages() {
        formError.classList.remove('show');
        formSuccess.classList.remove('show');
    }

    function showLoading() {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }

    function hideLoading() {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }

    // Event listeners
    fullNameInput.addEventListener('input', function() {
        hideMessages();
        const isValid = validateFullName(this.value);
        updateInputValidation(this, isValid);
    });

    emailInput.addEventListener('input', function() {
        hideMessages();
        const isValid = validateEmail(this.value);
        updateInputValidation(this, isValid);
    });

    passwordInput.addEventListener('input', function() {
        hideMessages();
        const validation = validatePassword(this.value);
        updateInputValidation(this, validation.isValid);
        updatePasswordStrength(this.value);

        if (this.value) {
            passwordStrength.classList.add('show');
        } else {
            passwordStrength.classList.remove('show');
        }

        if (confirmPasswordInput.value) {
            const isMatch = this.value === confirmPasswordInput.value;
            updateInputValidation(confirmPasswordInput, isMatch);
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        hideMessages();
        const isMatch = this.value === passwordInput.value;
        updateInputValidation(this, isMatch);
    });

    // Form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        hideMessages();

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        let isValid = true;
        let errorMessage = '';

        if (!fullName) {
            errorMessage = 'Nama lengkap harus diisi';
            isValid = false;
        } else if (!validateFullName(fullName)) {
            errorMessage = 'Nama lengkap hanya boleh berisi huruf dan spasi';
            isValid = false;
        } else if (!email) {
            errorMessage = 'Email harus diisi';
            isValid = false;
        } else if (!validateEmail(email)) {
            errorMessage = 'Email harus berakhiran @gmail.com';
            isValid = false;
        } else if (!password) {
            errorMessage = 'Password harus diisi';
            isValid = false;
        } else if (!validatePassword(password).isValid) {
            errorMessage = 'Password tidak memenuhi persyaratan';
            isValid = false;
        } else if (!confirmPassword) {
            errorMessage = 'Konfirmasi password harus diisi';
            isValid = false;
        } else if (password !== confirmPassword) {
            errorMessage = 'Konfirmasi password tidak cocok';
            isValid = false;
        }

        if (!isValid) {
            showMessage(formError, errorMessage);
            return;
        }

        showLoading();

        // Simulasi Registrasi
        setTimeout(() => {
            hideLoading();
            showMessage(formSuccess, `Akun berhasil dibuat untuk ${email}! Anda sekarang bisa login.`, false);

            setTimeout(() => {
                registerForm.reset();
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('valid', 'invalid');
                });
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('success', 'error');
                });
                passwordStrength.classList.remove('show');
                hideMessages();
                window.location.href = 'login.html';
            }, 2000);
        }, 2000);
    });

    // Fungsionalitas tombol kembali
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            if (window.history.length > 1) {
                e.preventDefault();
                window.history.back();
            }
        });
    }
});