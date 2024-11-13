// URL Web App Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbzB0S7-VIZzsd-sdfQyZT93xZbMwEgynQ1YsgdQd5EMuMPZ_Dw/exec'; // Ganti dengan URL yang kamu dapatkan

// Ambil data dari Google Sheets dan tampilkan di tabel serta grafik
async function fetchData() {
    const response = await fetch(scriptURL + "?action=getData");
    const data = await response.json();

    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    data.forEach(entry => {
        const row = dataTable.insertRow();
        const namaCell = row.insertCell(0);
        const nimCell = row.insertCell(1);
        const jawabanCell = row.insertCell(2);
        namaCell.innerText = entry.name;
        nimCell.innerText = entry.nim;
        jawabanCell.innerText = entry.answer;
    });

    // Menyiapkan data untuk grafik
    const labels = [];
    const values = [];
    data.forEach(entry => {
        labels.push(entry.nim); // NIM sebagai label
        values.push(parseInt(entry.answer)); // Jawaban sebagai nilai (asumsi angka)
    });

    // Membuat grafik menggunakan Chart.js
    const ctx = document.getElementById('kuesionerChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Jenis grafik
        data: {
            labels: labels,
            datasets: [{
                label: 'Jawaban Kuesioner',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Kirim data ke Google Sheets
document.getElementById('surveyForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const nim = document.getElementById('nim').value;
    const answer = document.getElementById('answer').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('nim', nim);
    formData.append('answer', answer);

    await fetch(scriptURL, {
        method: 'POST',
        body: formData
    });

    alert('Data berhasil dikirim!');
    document.getElementById('surveyForm').reset();
    fetchData(); // Update data setelah pengiriman
});

// Panggil fungsi untuk fetch data ketika halaman dimuat
fetchData();
