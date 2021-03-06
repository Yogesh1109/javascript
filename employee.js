var numRegex = /[0-9]/;
var alphaRegex = /[a-zA-Z]/;
var phoneNumRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var employeeData = [];
function myFunction() {
	var eId = document.getElementById("eId").value;
	var eName = document.getElementById("ename").value;
	var phNum = document.getElementById("phoneNumber").value;
	var email = document.getElementById("emailId").value;
	if(!numRegex.test(eId)){
		displayMessage("Please enter valid Id");
		return;
	}
	if(!alphaRegex.test(ename)){
		displayMessage("Please enter valid Employee Name");
		return;
	}
	if(!phoneNumRegex.test(phNum)){
		displayMessage("Please enter valid Phone Number of 10 digits");
		return;
	}
	if(!emailRegex.test(email)){
		//alert("Please enter valid Email");
		displayMessage("Please enter valid Email");
		return;
	}

	//check for duplicates
	var oTable = document.getElementById('eTable');

	//gets rows of table
	var rowLength = oTable.rows.length;

	//loops through rows    
	for (i = 0; i < rowLength; i++){

	   //gets cells of current row
	   var oCells = oTable.rows.item(i).cells;
	   var cellVal = oCells.item(0).innerHTML;
	   if(cellVal == eId){
	   		displayMessage('Employee already added.');
	   		return;
	   } 
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
	btn.id='edit' + rowLength;
	//btn.onclick = update();
	btn.addEventListener("click", update);
	newCell5.appendChild(btn);

	var btn = document.createElement('input');
	btn.type = "button";
	btn.className = "btn";
	btn.value = 'Delete';
	btn.id='delete'+ rowLength;
	btn.addEventListener("click", deleteData);
	//btn.onclick = deleteData();
	newCell6.appendChild(btn);

	document.getElementById("eId").value = '';
	document.getElementById("ename").value = '';
	document.getElementById("phoneNumber").value = '';
	document.getElementById("emailId").value = '';
	

	
	/*
	Three things remaining:
	1. Check for duplicate eID in table
	2. add option of edit, update and delete.
	3. add a button Send Employee Data - prints the array containing all employee objects present in table.
	*/
	
}

function deleteData(e){
		
		var id = e.target.id;
		var rowId = parseInt(id.substring(6, id.length));

		var oTable = document.getElementById('eTable');
		var rowLength = oTable.rows.length-1;

		if(rowLength>rowId){
			for(i=rowId+1; i <= rowLength; i++){
				var updatedIndex = i-1;
				document.getElementById('delete'+i).id = 'delete' + updatedIndex;
				document.getElementById('edit'+i).id = 'edit' + updatedIndex;
			}
		}

		oTable.deleteRow(rowId);

		displayMessage('Row deleted successfully');


	}

function update(e){
	//alert('update row' + e.target.className);
	openPopup(e.target.id);
}

function openPopup(id){

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById(id);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//get the rowId
var rowId = id.substring(4, id.length);

populateEditData(rowId);

// When the user clicks the button, open the modal 
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  clearEditData();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    clearEditData();
  }
}

}

function populateEditData(rowId){
	//gets rows of table
var oTable = document.getElementById('eTable');
	var rowLength = oTable.rows.length;

	//loops through rows    
	if(rowId<=rowLength){

	   //gets cells of current row
	   var oCells = oTable.rows.item(rowId).cells;
	   var tableRef = document.getElementById('editTable').getElementsByTagName('tbody')[0];
	   var newRow   = tableRef.insertRow();
	   	var newCell1  = newRow.insertCell(0);

			// Append a text node to the cell

	   	var cellVal = oCells.item(0).innerHTML;
		newCell1.appendChild(document.createTextNode(cellVal));

		// Insert a row in the table at the last row
		
	   for(i=1; i<oCells.length-2; i++){
	   		var cellVal = oCells.item(i).innerHTML;
	   		var newCell1  = newRow.insertCell(i);

			// Append a text node to the cell
			var textField = document.createElement('input');
			textField.value = cellVal;
			textField.className = 'editableFields';
			if(i==1){
				textField.type = "text";
				textField.id = 'editEname' + rowId;
			} else if (i==2){
				textField.type = "number";
				textField.id = 'editPhNum' + rowId;
			} else if (i==3){
				textField.type = "email";
				textField.id = 'editEmail' + rowId;
			}
			textField.addEventListener("change", enableUpdate);
			newCell1.appendChild(textField);
			//newCell1.appendChild(document.createTextNode(cellVal));
	   }

	   var updateCell = newRow.insertCell(4);
	   var btn = document.createElement('input');
		btn.type = "button";
		btn.className = "update";
		btn.value = 'Update';
		btn.id='update' + rowId;
		//btn.onclick = update();
		btn.addEventListener("click", updateData);
		btn.disabled = true;
		updateCell.appendChild(btn);
	   	
	}
}

function clearEditData(){
	document.getElementById("editTable").deleteRow(1);
}

function updateData(e){
	//alert(e.target.id);
	var id = e.target.id;
	var rowId = id.substring(6, id.length);

	var editEname = document.getElementById("editEname" + rowId);
	var editPhNum = document.getElementById("editPhNum" + rowId);
	var editEmail = document.getElementById("editEmail" + rowId);
	var isDataValid = validateEditableData(editEname, editPhNum, editEmail);
	if(isDataValid){
		//alert('Updating data!');
		var oTable = document.getElementById('eTable');

		//gets rows of table
		var rowLength = oTable.rows.length;

		//loops through rows    
		if(rowId<=rowLength){

		   //gets cells of current row
		   var oCells = oTable.rows.item(rowId).cells;
		   oCells.item(1).innerHTML =  editEname.value;
		   oCells.item(2).innerHTML =  editPhNum.value;
		   oCells.item(3).innerHTML =  editEmail.value;
		   var modal = document.getElementById("myModal");
		   modal.style.display = "none";
		   clearEditData();
		  displayMessage('values updated successfully');

		}
	}
	//var editableFields = document.getElementsByClassName('editableFields');
}

function enableUpdate(e){
	//alert(e.target.id);
	var id = e.target.id;
	var rowId = id.substring(9, id.length);
	document.getElementById("update" + rowId).disabled = false;
}

function validateEditableData(nameObj, numObj, mailObj){
	if(!alphaRegex.test(nameObj.value)){
		displayMessage("Please enter valid Employee Name");
		return false;
	}
	if(!phoneNumRegex.test(numObj.value)){
		displayMessage("Please enter valid Phone Number of 10 digits");
		return false;
	}
	if(!emailRegex.test(mailObj.value)){
		displayMessage("Please enter valid Email");
		return false;
	}
	return true;
}

function displayMessage(message){

// Get the modal
var modal = document.getElementById("displayMessage");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

document.getElementById('dialogueMessage').innerHTML = message;

// When the user clicks the button, open the modal 
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

}

function sendData(){
	//employeeData= [];
	employeeData= [];
	var oTable = document.getElementById('eTable');

	//gets rows of table
	var rowLength = oTable.rows.length;

	//loops through rows    
	for (i = 1; i < rowLength; i++){

	   //gets cells of current row
	   var oCells = oTable.rows.item(i).cells;
	   var employee = {};
		employee.id = oCells.item(0).innerHTML;
		employee.name = oCells.item(1).innerHTML;
		employee.phoneNumber = oCells.item(2).innerHTML;
		employee.email = oCells.item(3).innerHTML;
		employeeData.push(employee);
	}
	console.log("Employee Data: ");
	console.log(employeeData);
	displayMessage("Please check console for data.");
}

