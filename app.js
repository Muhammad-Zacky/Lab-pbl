
const scriptURL = 'https://script.google.com/macros/s/AKfycbzB0S7-VIZzsd-sdfQyZT93xZbMwEgynQ1YsgdQd5EMuMPZ_Dw/exec'; /


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


ner('submit', async function(event) {
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


fetchData();
