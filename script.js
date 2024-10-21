function filterData(event) {
  event.preventDefault(); // Corrected the spelling from 'preventDefult' to 'preventDefault'
  
  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  
  // Get all rows in the table
  var rows = document.querySelectorAll("#data-table tr");
  
  // Loop through rows and hide/show based on date range
  rows.forEach((row, index) => {
      // Skip the header row
      if (index === 0) return;

      // Get the date from the row (assumed to be in the 4th column)
      var dateCell = row.cells[3].textContent; // Adjust index if needed
      var rowDate = new Date(dateCell);

      // Check if the row date is within the range
      if (rowDate >= startdate && rowDate <= enddate) {
          row.style.display = ""; // Show row
      } else {
          row.style.display = "none"; // Hide row
      }
  });
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