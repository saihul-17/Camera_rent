// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Simulasi Status Login ---
    // Dalam aplikasi nyata, nilai ini akan didapatkan dari status autentikasi pengguna (misalnya, dari cookie, local storage, atau respons server).
    let isLoggedIn = false; // Ubah ke `true` untuk menguji fungsionalitas setelah login

    // --- 1. Fungsionalitas Hamburger Menu (untuk tampilan mobile) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active'); // Opsional: Tambahkan gaya X pada hamburger
        });
    }

    // --- 2. Fungsionalitas Modal Booking ---
    const bookingButtons = document.querySelectorAll('.btn-rent');
    const modal = document.getElementById('bookingModal');
    const closeButton = modal.querySelector('.close');
    const selectedProductSpan = document.getElementById('selectedProduct');
    const rentalDurationSpan = document.getElementById('rentalDuration');
    const totalPriceSpan = document.getElementById('totalPrice');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    // Fungsi untuk menghitung durasi dan total harga
    function calculateRentalDetails() {
        const startDate = startDateInput.value ? new Date(startDateInput.value) : null;
        const endDate = endDateInput.value ? new Date(endDateInput.value) : null;
        const pricePerDayText = totalPriceSpan.dataset.pricePerDay || '0'; // Ambil harga per hari dari dataset

        let durationDays = 0;
        let totalCalculatedPrice = 0;

        if (startDate && endDate && endDate >= startDate) {
            const timeDiff = endDate.getTime() - startDate.getTime();
            durationDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 untuk menghitung hari mulai dan selesai
            rentalDurationSpan.textContent = `${durationDays} hari`;

            // Konversi harga per hari ke angka
            // Mengatasi format Rupiah: menghapus "Rp ", titik, dan koma diganti titik
            const priceValue = parseFloat(pricePerDayText.replace('Rp ', '').replace(/\./g, '').replace(',', '.'));

            totalCalculatedPrice = priceValue * durationDays;
            totalPriceSpan.textContent = `Rp ${new Intl.NumberFormat('id-ID').format(totalCalculatedPrice)}`;
        } else {
            rentalDurationSpan.textContent = '0 hari';
            totalPriceSpan.textContent = `Rp ${new Intl.NumberFormat('id-ID').format(0)}`;
        }
    }

    // Tambahkan event listener untuk input tanggal
    startDateInput.addEventListener('change', calculateRentalDetails);
    endDateInput.addEventListener('change', calculateRentalDetails);

    bookingButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // START: Perubahan - Cek status login
            if (!isLoggedIn) {
                alert('Anda wajib login terlebih dahulu untuk menyewa.');
                // Opsional: Redirect ke halaman login
                // window.location.href = 'login.html';
                return; // Hentikan eksekusi jika belum login
            }
            // END: Perubahan

            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;

            // Bersihkan harga dari format Rupiah dan ambil angkanya saja
            const priceValueOnly = productPriceText.replace('Rp ', '').replace(/\./g, ''); // Menghapus "Rp " dan titik pemisah ribuan
            
            selectedProductSpan.textContent = productName;
            totalPriceSpan.textContent = productPriceText; // Tampilkan harga awal produk yang dipilih
            totalPriceSpan.dataset.pricePerDay = priceValueOnly; // Simpan harga per hari di dataset untuk perhitungan

            // Reset tanggal di modal
            startDateInput.value = '';
            endDateInput.value = '';
            rentalDurationSpan.textContent = '1 hari'; // Reset durasi default
            
            modal.style.display = 'flex'; // Tampilkan modal
            calculateRentalDetails(); // Panggil untuk inisialisasi perhitungan dengan 1 hari
        });
    });

    // Menutup modal saat tombol 'x' diklik
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Menutup modal saat area abu-abu di luar modal diklik
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    const bookingForm = modal.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Mencegah reload halaman
            
            const formData = new FormData(bookingForm);
            const bookingDetails = {};
            for (let [key, value] of formData.entries()) {
                bookingDetails[key] = value;
            }
            bookingDetails.product = selectedProductSpan.textContent;
            bookingDetails.duration = rentalDurationSpan.textContent;
            bookingDetails.totalPrice = totalPriceSpan.textContent;

            console.log('Booking Details:', bookingDetails); // Log data ke console

            // Anda bisa mengirim data ini ke backend menggunakan Fetch API
            // fetch('/api/book', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(bookingDetails)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Booking Anda telah dikonfirmasi!');
            //     modal.style.display = 'none';
            //     bookingForm.reset(); // Reset form
            // })
            // .catch(error => {
            //     console.error('Error booking:', error);
            //     alert('Terjadi kesalahan saat booking. Silakan coba lagi.');
            // });

            alert('Booking Anda telah dikonfirmasi!'); // Contoh pesan sukses
            modal.style.display = 'none'; // Tutup modal setelah submit
            bookingForm.reset(); // Reset form setelah submit
        });
    }

    // --- 3. Fungsionalitas Filter Kategori Produk ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Hapus kelas 'active' dari tab yang saat ini aktif
            const currentActiveTab = document.querySelector('.filter-tab.active');
            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }

            // Tambahkan kelas 'active' ke tab yang baru saja diklik
            tab.classList.add('active');

            // Dapatkan kategori dari atribut data-category tombol yang diklik
            const category = tab.dataset.category;

            // Iterasi melalui setiap kartu produk
            productCards.forEach(card => {
                const cardCategory = card.dataset.category; // Dapatkan kategori dari kartu produk

                // Tampilkan atau sembunyikan kartu produk berdasarkan kategori yang dipilih
                // Jika kategori adalah 'all' ATAU kategori kartu cocok dengan kategori yang dipilih
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex'; // Tampilkan produk (gunakan 'flex' karena product-card adalah flex item)
                } else {
                    card.style.display = 'none'; // Sembunyikan produk
                }
            });
        });
    });

    // --- Opsional: Smooth Scrolling untuk Navigasi ---
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Tutup menu hamburger jika terbuka setelah klik
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Gunakan scrollIntoView dengan behavior smooth
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});