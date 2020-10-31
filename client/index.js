document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}


const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const zeroInput = document.querySelector('#zero-input');
    const oneInput = document.querySelector('#one-input');
    const twoInput = document.querySelector('#two-input');
    const threeInput = document.querySelector('#three-input');
    const fourInput = document.querySelector('#four-input');
    const fiveInput = document.querySelector('#five-input');
    const sixInput = document.querySelector('#six-input');
    const sevenInput = document.querySelector('#seven-input');
    const eightInput = document.querySelector('#eight-input');
    const nineInput = document.querySelector('#nine-input');
    const tenInput = document.querySelector('#ten-input');

    const name = nameInput.value;
    const zero = zeroInput.value;
    const one = oneInput.value;
    const two = twoInput.value;
    const three = threeInput.value;
    const four = fourInput.value;
    const five = fiveInput.value;
    const six = sixInput.value;
    const seven = sevenInput.value;
    const eight = eightInput.value;
    const nine = nineInput.value;
    const ten = tenInput.value;
    
    nameInput.value = "";
    zeroInput.value = "";
    oneInput.value = "";
    twoInput.value = "";
    threeInput.value = "";
    fourInput.value = "";
    fiveInput.value = "";
    sixInput.value = "";
    sevenInput.value = "";
    eightInput.value = "";
    nineInput.value = "";
    tenInput.value = "";


    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name, zero : zero,one : one, two: two, three : three, four: four, five: five, six: six, seven: seven, eight: eight, nine: nine, ten: ten})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            if(key === 'id')
            continue;
            else
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='14'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, zero, one, two, three, four, five, six, seven, eight, nine, ten}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${zero}</td>`;
        tableHtml += `<td>${one}</td>`;
        tableHtml += `<td>${two}</td>`;
        tableHtml += `<td>${three}</td>`;
        tableHtml += `<td>${four}</td>`;
        tableHtml += `<td>${five}</td>`;
        tableHtml += `<td>${six}</td>`;
        tableHtml += `<td>${seven}</td>`;
        tableHtml += `<td>${eight}</td>`;
        tableHtml += `<td>${nine}</td>`;
        tableHtml += `<td>${ten}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}