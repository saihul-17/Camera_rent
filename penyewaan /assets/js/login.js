// assets/js/login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('formError');

    // Fungsi untuk menampilkan pesan error
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Fungsi untuk menyembunyikan pesan error
    function hideError() {
        errorMessage.style.display = 'none';
    }

    // Fungsi untuk validasi format email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Fungsi untuk melakukan login
    function performLogin(email, password) {
        // Kredensial admin (hardcoded untuk contoh ini)
        const adminCredentials = {
            email: 'admin10@gmail.com',
            password: 'admin123'
        };

        // Cek apakah user adalah admin
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Login berhasil sebagai admin
            console.log('Login berhasil sebagai admin');
            
            // Simpan status login, role, dan email ke localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('userEmail', email); // Simpan email admin
            
            // Redirect ke halaman admin
            window.location.href = 'admin.html';
            return true;
        } else {
            // Untuk user biasa, bisa ditambahkan validasi database atau API di sini
            // Untuk sementara, jika bukan admin dan input valid, anggap berhasil login sebagai user biasa
            if (isValidEmail(email) && password.length >= 6) {
                console.log('Login berhasil sebagai user biasa');
                
                // Simpan status login, role, dan email ke localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'user');
                localStorage.setItem('userEmail', email); // Simpan email user
                
                // Redirect ke halaman utama (index.html)
                window.location.href = 'index.html';
                return true;
            } else {
                // Login gagal (karena kredensial tidak cocok dengan admin, dan bukan user biasa yang valid)
                showError('Email atau password salah. Silakan coba lagi.');
                return false;
            }
        }
    }

    // Event listener untuk form submit
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form submit default (refresh halaman)
        hideError(); // Sembunyikan error sebelumnya

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validasi input kosong
        if (!email || !password) {
            showError('Email dan password harus diisi.');
            return;
        }

        // Validasi format email
        if (!isValidEmail(email)) {
            showError('Format email tidak valid.');
            return;
        }

        // Validasi panjang password
        // Di sini kita hanya melakukan validasi panjang minimal
        // Validasi kecocokan password akan dilakukan di performLogin
        if (password.length < 6) {
            showError('Password minimal harus 6 karakter.');
            return;
        }

        // Lakukan proses login
        performLogin(email, password);
    });

    // Event listener untuk input fields (menghilangkan error saat user mulai mengetik)
    emailInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
});