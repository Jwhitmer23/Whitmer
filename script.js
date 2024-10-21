function filterData() {
  event.preventDefult();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  fetch("https://compute.samford.edu/zohauth/clients/data");
}

const url = 'https://compute.samford.edu/zohauth/clients/datajson';

async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function populateTable(data) {
    const table = document.getElementById('data-table');

    data.forEach(item => {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
        
        const speedCell = document.createElement('td');
        speedCell.textContent = item.speed || '--';
        
        const resultCell = document.createElement('td');
        resultCell.textContent = item.result || '--';
        
        const datetimeCell = document.createElement('td');
        datetimeCell.textContent = item.datetime || '--';

        row.appendChild(idCell);
        row.appendChild(speedCell);
        row.appendChild(resultCell);
        row.appendChild(datetimeCell);

        table.appendChild(row);
    });
}

fetchData();