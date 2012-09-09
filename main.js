//Jeremy orr
// VFW 1209
//Project 2
//09/07/2012




//check to make sure the DOM is ready

window.addEventListener("DOMContentLoaded", function(){
	// Get element by Id function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;	
	}
	// create select field and populate with options
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "types");
		for (var i=0, j=constructionTypes.length; i<j; i++){
			var makeOption = document.createElement("option");
			var	optText = constructionTypes[i];
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedCheckbox(){
		var checkBox = document.forms[0].projectLocation;
		for (var i=0; i<checkBox.length; i++){
			if (checkBox[i].checked){
				locationValue = checkBox[i].value;
			}
		}
	}
	getSelectedCheckbox();
	
	function toggleControls(n){
		switch(n){
			case "on":
				$("projectForm").style.display = "none";
				$("clearData").style.display = "inline";
				$("displayData").style.display = "none";
				$("addItem").style.display = "inline";
				break;
			case "off":
				$("projectForm").style.display = "block";
				$("clearData").style.display = "inline";
				$("displayData").style.display = "inline";
				$("addItem").style.display = "none";
				$("item").style.display = "none";
			
				break;
				default:
			return false;
		}
	}
	
	function storeData(){
		var id = Math.floor(Math.random() * 100000101);
		var item = {};
		item.types = ["Construction Type:", $("types").value];
		item.projectName = ["Project Name:", $("projectName").value];
		item.projectBudget = ["Project Budget:", $("projectBudget").value];
		item.projectLocation = ["Project Location:", locationValue];
		item.startDate = ["Start Date:", $("date").value];
		item.supplyList = ["Supply List:", $("supplyList").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Project Has Been Added");
		
	}
	
	function getData(){
		toggleControls("on");
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "Project List");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for (var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement("li")
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var objSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = objSubText;
			
			}
		}
	};
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear!");
		} else{ 
			localStorage.clear();
			alert("Your data has been cleared");
			window.location.reload();
			return false;
		}
	};
	
	
	// Construction types array for drop down menu
	var constructionTypes = ["--Choose A Type--", "Industrial", "Commercial", "Residential", "Multi-Family Residential"];
	var	locationValue;
	makeCats();
	
	//set link and submit click events
	var submit = $("submit");
	submit.addEventListener("click", storeData);
	var displayData = $("displayData");
	displayData.addEventListener("click", getData);
	var clearData = $("clearData");
	clearData.addEventListener("click", clearLocal);
	



































});