function parseNames() {
    const namesInput = document.getElementById("nameInput").value.trim();
    if (!namesInput) {
        alert("Please enter at least one name.");
        return;
    }
 
    const names = namesInput.split(",");
    const namesList = document.getElementById("namesList");
 
    namesList.innerHTML = "";
    names.forEach(name => {
        const row = document.createElement("tr");
        row.id = name.trim();
 
        const colName = document.createElement("td");
        colName.innerText = name.trim();
 
        const colActions = document.createElement("td");
        colActions.innerHTML = '<button onclick="editName(\'' + name.trim() + '\')">Edit</button> <button onclick="deleteName(\'' + name.trim() + '\')">Delete</button>';
 
        row.appendChild(colName);
        row.appendChild(colActions);
        namesList.appendChild(row);
    });
 }
 
 function editName(name) {
    const newName = prompt("Enter new name:", name);
    if (newName === "" || newName === null) {
        alert("Invalid name.");
    } else {
        const row = document.getElementById(name.trim());
        row.id = newName.trim();
        row.children[0].innerText = newName.trim();
    }
 }
 
 function deleteName(name) {
    const ok = confirm("Are you sure you want to delete " + name.trim() + "?");
    if (ok) {
        const row = document.getElementById(name.trim());
        row.remove();
    }
 }