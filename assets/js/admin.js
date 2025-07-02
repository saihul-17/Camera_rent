document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Navigation Logic
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    const contentSections = document.querySelectorAll('.content-section');

    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah perilaku tautan default

            // Hapus kelas 'active' dari semua item sidebar
            sidebarMenuItems.forEach(li => li.classList.remove('active'));
            // Tambahkan kelas 'active' ke item yang diklik
            item.classList.add('active');

            // Sembunyikan semua bagian konten
            contentSections.forEach(section => section.classList.remove('active'));

            // Tampilkan bagian konten yang sesuai
            const targetSectionId = item.dataset.section + '-section';
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Chart.js untuk Performa Penjualan (Dashboard)
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Pendapatan Bulanan (Rp)',
                    data: [5000000, 7000000, 6000000, 9000000, 8000000, 11000000, 10000000],
                    backgroundColor: 'rgba(76, 175, 80, 0.2)', // Hijau muda
                    borderColor: 'rgba(76, 175, 80, 1)', // Hijau
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Pendapatan (Rp)'
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                return 'Rp ' + value.toLocaleString('id-ID'); // Format sebagai Rupiah Indonesia
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Bulan'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': Rp ' + context.parsed.y.toLocaleString('id-ID');
                            }
                        }
                    }
                }
            }
        });
    }

    // Contoh penanganan tombol aksi tabel (untuk demonstrasi)
    document.querySelectorAll('.btn-action.edit').forEach(button => {
        button.addEventListener('click', () => {
            alert('Fungsi edit (belum diimplementasikan)');
            // Dalam aplikasi nyata, Anda akan membuka modal atau menavigasi ke halaman edit
        });
    });

    document.querySelectorAll('.btn-action.delete').forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin menghapus ini?')) {
                alert('Dihapus (belum diimplementasikan)');
                // Dalam aplikasi nyata, Anda akan mengirim permintaan ke backend Anda
            }
        });
    });

    document.querySelectorAll('.btn-action.view').forEach(button => {
        button.addEventListener('click', () => {
            alert('Fungsi lihat detail (belum diimplementasikan)');
        });
    });

    document.querySelectorAll('.btn-action.confirm').forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Tandai pesanan ini sebagai dikonfirmasi?')) {
                alert('Pesanan dikonfirmasi (belum diimplementasikan)');
                // Perbarui status di UI dan backend
            }
        });
    });

    document.querySelectorAll('.btn-action.return').forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Tandai pesanan ini sebagai dikembalikan?')) {
                alert('Pesanan dikembalikan (belum diimplementasikan)');
                // Perbarui status di UI dan backend
            }
        });
    });

    // Tangani tombol "Tambah Produk Baru"
    const addNewProductBtn = document.querySelector('#products-section .btn-primary-admin');
    if (addNewProductBtn) {
        addNewProductBtn.addEventListener('click', () => {
            alert('Membuka form untuk menambahkan produk baru (belum diimplementasikan)');
        });
    }

    // Tangani tombol "Tambah Pengguna Baru"
    const addNewUserBtn = document.querySelector('#users-section .btn-primary-admin');
    if (addNewUserBtn) {
        addNewUserBtn.addEventListener('click', () => {
            alert('Membuka form untuk menambahkan pengguna baru (belum diimplementasikan)');
        });
    }

    // Tangani tombol "Simpan Pengaturan"
    const saveSettingsBtn = document.querySelector('#settings-section .btn-primary-admin');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            alert('Pengaturan disimpan (belum diimplementasikan)');
            // Dalam aplikasi nyata, Anda akan mengumpulkan data form dan mengirimkannya ke backend Anda
        });
    }
});