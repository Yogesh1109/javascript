
function myFunction() {
	var numRegex = /[0-9]/;
	var alphaRegex = /[a-zA-Z]/;
	var phoneNumRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
	var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var eId = document.getElementById("eId").value;
	var eName = document.getElementById("ename").value;
	var phNum = document.getElementById("phoneNumber").value;
	var email = document.getElementById("emailId").value;
	if(!numRegex.test(eId)){
		alert("Please enter valid Id");
		return;
	}
	if(!alphaRegex.test(ename)){
		alert("Please enter valid Employee Name");
		return;
	}
	if(!phoneNumRegex.test(phNum)){
		alert("Please enter valid Phone Number");
		return;
	}
	if(!emailRegex.test(email)){
		alert("Please enter valid Email");
		return;
	}


	var tableRef = document.getElementById('eTable').getElementsByTagName('tbody')[0];

	// Insert a row in the table at the last row
	var newRow   = tableRef.insertRow();

	// Insert a cell in the row at index 0
	var newCell1  = newRow.insertCell(0);
	var newCell2  = newRow.insertCell(1);
	var newCell3  = newRow.insertCell(2);
	var newCell4  = newRow.insertCell(3);
	var newCell5 = newRow.insertCell(4);
	var newCell6 = newRow.insertCell(5);

	// Append a text node to the cell
	newCell1.appendChild(document.createTextNode(eId));

	newCell2.appendChild(document.createTextNode(eName));

	newCell3.appendChild(document.createTextNode(phNum));

	newCell4.appendChild(document.createTextNode(email));

	var btn = document.createElement('input');
	btn.type = "button";
	btn.className = "btn";
	btn.value = 'Edit';
	//btn.onclick = update();
	btn.addEventListener("click", update);
	newCell5.appendChild(btn);

	var btn = document.createElement('input');
	btn.type = "button";
	btn.className = "btn";
	btn.value = 'Delete';
	btn.addEventListener("click", deleteData);
	//btn.onclick = deleteData();
	newCell6.appendChild(btn);
	

	
	/*
	Three things remaining:
	1. Check for duplicate eID in table
	2. add option of edit, update and delete.
	3. add a button Send Employee Data - prints the array containing all employee objects present in table.
	*/
	
}

function deleteData(e){
		alert('delete the row'+ e.className);
	}

function update(e){
	alert('update row' + e.className);
}