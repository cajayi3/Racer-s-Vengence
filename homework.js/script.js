var selectedRow = null

function OnFormSubmit() {
    if (validate) {
        var formData = ReadFormSubmit();
        if (selectedRow == null)
            insertnewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }    
}

function ReadFormSubmit() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["Car Type"] = document.getElementById("Car Type").value;
    formData["Birth City"] = document.getElementById("Birth City").value;
    formData["Birth Date"] = document.getElementById("Birth Date").value;
    formData["Miles Per Hour"] = document.getElementById("Miles Per Hour").value;
    formData["Birth State"] = document.getElementById("Birth State").value;
    formData["Time"] = document.getElementById("Time").value;
    return formData;
}

function insertnewRecord(data) {
    var table = document.getElementById("DriverList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.CarType;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.BirthCity;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.BirthDate;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.MilesPerHour;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.BirthState;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.Time;
    cell7.innerHTML = `<a onClick="OnEdit(this)">Edit</a>
                       <a>Delete</a>`;  
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("Car Type").value = "";
    document.getElementById("Birth City").value = "";
    document.getElementById("Birth Date").value = "";
    document.getElementById("Miles Per Hour").value = "";
    document.getElementById("BirthState").value = "";
    document.getElementById("Time").value = "";
    selectedRow = null;
}

function OnEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Car Type").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Birth City").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Birth Date").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Miles Per Hour").value = selectedRow.cells[4].innerHTML;
    document.getElementById("Birth State").value = selectedRow.cells[5].innerHTML;
    document.getElementById("Time").value = selectedRow.cells[6].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[0].innerHTML = formData.CarType;
    selectedRow.cells[0].innerHTML = formData.BirthCity;
    selectedRow.cells[0].innerHTML = formData.BirthDate;
    selectedRow.cells[0].innerHTML = formData.MilesPerHour;
    selectedRow.cells[0].innerHTML = formData.BirthState;
    selectedRow.cells[0].innerHTML = formData.Time;
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("DriverList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidatorError").classList.remove("hide");
    }else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;

}

axios.get("https://ergast.com/api/f1/2020/1/driverStandings.json")
  .then(response => console.log(response.data));