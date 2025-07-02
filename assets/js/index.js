document.addEventListener('DOMContentLoaded', () => {
    // === Bagian untuk Modal Booking ===
    const bookingModal = document.getElementById('bookingModal');
    const closeButton = bookingModal.querySelector('.close');
    const rentButtons = document.querySelectorAll('.btn-rent-now'); 
    
    const selectedProductSpan = document.getElementById('selectedProduct');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const rentalDurationSpan = document.getElementById('rentalDuration');
    const totalPriceSpan = document.getElementById('totalPrice');

    let currentProductPrice = 0; 

    function openModal(productName, productPrice) {
        selectedProductSpan.textContent = productName; 
        currentProductPrice = productPrice; 
        
        startDateInput.value = '';
        endDateInput.value = '';
        rentalDurationSpan.textContent = '0 hari';
        totalPriceSpan.textContent = 'Rp 0';
        
        bookingModal.style.display = 'block'; 
    }

    function closeModal() {
        bookingModal.style.display = 'none'; 
    }

    rentButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.productName; 
            const productPrice = parseFloat(event.target.dataset.productPrice); 
            openModal(productName, productPrice); 
        });
    });

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === bookingModal) {
            closeModal();
        }
    });

    function calculateRentalDetails() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        // Memastikan tanggal mulai dan selesai dipilih dan valid
        if (startDate && endDate && startDate <= endDate) {
            const timeDiff = endDate.getTime() - startDate.getTime();
            // Menghitung selisih hari, +1 untuk menyertakan hari mulai dan berakhir
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 

            rentalDurationSpan.textContent = `${daysDiff} hari`;
            const total = daysDiff * currentProductPrice;
            totalPriceSpan.textContent = `Rp ${total.toLocaleString('id-ID')}`; 
        } else {
            rentalDurationSpan.textContent = '0 hari';
            totalPriceSpan.textContent = 'Rp 0';
        }
    }

    startDateInput.addEventListener('change', calculateRentalDetails);
    endDateInput.addEventListener('change', calculateRentalDetails);

    const bookingForm = bookingModal.querySelector('.booking-form');
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah refresh halaman

        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const notes = document.getElementById('notes').value;
        const selectedProduct = selectedProductSpan.textContent;
        const rentalDuration = rentalDurationSpan.textContent;
        const totalPrice = totalPriceSpan.textContent;

        // Data yang siap dikirim ke backend (misalnya via fetch API)
        console.log({
            product: selectedProduct,
            startDate: startDate,
            endDate: endDate,
            duration: rentalDuration,
            totalPrice: totalPrice,
            fullName: fullName,
            phone: phone,
            notes: notes
        });

        alert('Booking Anda telah dikonfirmasi! Silakan cek konsol browser Anda untuk detail (F12 > Console).'); 
        
        closeModal(); 
        bookingForm.reset(); 
    });


    // --- Bagian untuk Fungsionalitas Filter Kategori ---

    // Dapatkan referensi ke semua tombol filter kategori
    const filterTabs = document.querySelectorAll('.filter-tab');
    // Dapatkan referensi ke semua kartu produk
    const productCards = document.querySelectorAll('.product-card');

    // Tambahkan event listener ke setiap tombol filter
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua tab untuk mereset tampilan
            filterTabs.forEach(t => t.classList.remove('active'));
            // Tambahkan kelas 'active' ke tab yang baru diklik untuk menyorotinya
            tab.classList.add('active');

            // Ambil kategori dari atribut data-category pada tab yang diklik
            const category = tab.dataset.category;

            // Iterasi (ulang) setiap kartu produk
            productCards.forEach(card => {
                // Ambil kategori dari atribut data-category pada kartu produk
                const cardCategory = card.dataset.category; 

                // Logika untuk menampilkan atau menyembunyikan kartu
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block'; // Tampilkan kartu
                } else {
                    card.style.display = 'none'; // Sembunyikan kartu
                }
            });
        });
    });
});