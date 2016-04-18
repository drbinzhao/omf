///////////////////////////////////////////
// ORIGINAL OMF.JS
///////////////////////////////////////////
function post_to_url(path, params, method) {
	method = method || 'post' // Set method to post by default, if not specified.
	var form = document.createElement('form')
	form.setAttribute('method', method)
	form.setAttribute('action', path)
	for(var key in params) {
		if(params.hasOwnProperty(key)) {
			var hiddenField = document.createElement('input')
			hiddenField.setAttribute('type', 'hidden')
			hiddenField.setAttribute('name', key)
			hiddenField.setAttribute('value', params[key])
			form.appendChild(hiddenField)
		}
	}
	document.body.appendChild(form)
	form.submit()
}

function ajaxReq(requestType, URL, asynch) {
	var xmlhttp
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest()
	}
	else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
	}
	xmlhttp.open(requestType, URL, asynch)
	xmlhttp.send()
	return xmlhttp.responseText
}

function gebi(id) {
	// Shorten a much-used method name:
	return document.getElementById(id)
}

function clone(obj) {
	// Deep copy of a given obj.
	if (null == obj || "object" != typeof obj) return obj;
	var copy = obj.constructor();
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	}
	return copy;
}

function tableClear(table) {
	try {
		while (table.rows.length>0) table.deleteRow(table.rows.length-1)
	}
	catch (err) {
		// Catch: we didn't have any rows.
	}
}

function getRadioSetting (className) {
	// Get which radio button is set for a group with a given className.
	value='';
	radios = document.getElementsByClassName(className);
	for (x in radios) {if (radios[x].checked) value = radios[x].value}
	return value
}

function time(func) {
	// How long does func take to execute?
	var start = +new Date()
	func()
	var end =  +new Date()
	return end - start
}

function showProgressDialog(dialogMessage) {
	// Make the elements.
	background = document.createElement('div')
	background.id = 'progressBackground'
	background.style.zIndex = '9998'
	progContent = document.createElement('div')
	progContent.id = 'progressContent'
	progContent.style.zIndex = '9999'
	spinner = document.createElement('img')
	spinner.src = '/static/spinner.gif'
	progressText = document.createElement('h2')
	progressText.id = 'progressText'
	progressText.textContent = dialogMessage
	// Insert the elements.
	document.body.appendChild(background)
	document.body.appendChild(progContent)
	progContent.appendChild(spinner)
	progContent.appendChild(progressText)
}

function removeProgressDialog() {
	if (gebi('progressBackground')!=null)
		document.body.removeChild(gebi('progressBackground'))
	if (gebi('progressContent')!=null)
		document.body.removeChild(gebi('progressContent'))
}

function showProgressBar(dialogMessage) {
	// Make the elements.
	background = document.createElement('div')
	background.id = 'progressBackground'
	background.style.zIndex = '9998'
	progContent = document.createElement('div')
	progContent.id = 'progressContent'
	progContent.style.zIndex = '9999'
	progBar = document.createElement('div')
	progBar.id = 'progBar'
	progColor = document.createElement('div')
	progColor.id = 'progColor'
	progressText = document.createElement('h2')
	progressText.id = 'progressText'
	progressText.textContent = dialogMessage
	// Insert the elements.
	document.body.appendChild(background)
	document.body.appendChild(progContent)
	progBar.appendChild(progColor)
	progContent.appendChild(progBar)
	progContent.appendChild(progressText)
}

function removeProgressBar() {
	if (gebi('progressBackground')!=null)
		document.body.removeChild(gebi('progressBackground'))
	if (gebi('progressContent')!=null)
		document.body.removeChild(gebi('progressContent'))
}

function round(number,precision) {
	return parseFloat(number.toPrecision(precision))
}

function randomGaussian() {
  // Get a Gaussian from a uniform(0,1) via the Box-Muller transform.
  do {
    x1 = 2 * Math.random() - 1
    x2 = 2 * Math.random() - 1
    rad = x1 * x1 + x2 * x2
  } while (rad >= 1 || rad == 0)
  c = Math.sqrt(-2 * Math.log(rad) / rad);
  return x1 * c
}

function randomChoice(inList) {
	return inList[Math.floor(Math.random() * inList.length)]
}

function randomInt(min,max) {
	return Math.floor(Math.random()*(max - min + 1) + min)
}

function zip(arrays) {
	// Take in two arrays as [A,B], return [[a1,b1],[a2,b2,],...]
	return arrays[0].map(function(_,i){
		return arrays.map(function(array){return array[i]})
	})
}

function partition(inL, eqRel) {
	// Group inL as compared by eqRel. Make sure the eqRel is an equivalence relation, or your brain will hurt.
	if (inL.length == 0) {return inL}
	if (inL.length == 1) {return [inL]}
	accum = []
	work = [inL[0]]
	for (i=1;i<inL.length;i++) {
		if (eqRel(inL[i], work[0])) {
			work.push(inL[i])
		}
		else {
			accum.push(work)
			work = [inL[i]]
		}
	}
	accum.push(work)
	return accum
}

function flatten1(matrix) {
	// Take [A1,A2,...An] and return an in-order list of the items in each Ai.
	accum = []
	for (i=0;i<matrix.length;i++) {
		if (typeof matrix[i] == 'object') {
			for (j=0;j<matrix[i].length;j++) {
				accum.push(matrix[i][j])
			}
		} else {
			accum.push(matrix[i])
		}
	}
	return accum
}

function arrMax(arr) {
	// Get max of an array.
	return Math.max.apply(null,arr)
}

function arrSum(arr) {
	// Sum an array.
	return arr.reduce(function(x,y){return x+y})
}

function indexFind(arr, fun) {
	// Given an array of objects, return the first one where fun(arr[i]) is true.
	for (i=0;i<arr.length;i++) {
		if (fun(arr[i])) {return i}
	}
	return -1
}
function dropPill(thisButton, name) {
	thisButton.style.color= 'black'
	thisButton.style.background= '#F8F8F8'
	thisButton.style.textAlign = 'left'
	thisButton.nextSibling.nextSibling.style.display = 'inline-block'
	thisButton.innerHTML = name + ' ▴'
	function clickCloseEvent() {
		thisButton.nextSibling.nextSibling.style.display = 'none'
		thisButton.innerHTML = name + ' ▾'
		this.removeEventListener('click', arguments.callee, true)
		thisButton.style.color= 'white'
		thisButton.style.background= 'transparent'
		if (window.event.toElement==thisButton) {event.stopPropagation()}
	}
	document.body.addEventListener('click', clickCloseEvent, true)
}
function clickCloseEvent(labelName, buttonName) {
	var thisButton = document.getElementById(buttonName);
	thisButton.nextSibling.nextSibling.style.display = 'none'
	thisButton.innerHTML = labelName + ' ▾'
	this.removeEventListener('click', arguments.callee, true)
	if (window.event.toElement==thisButton) {event.stopPropagation()}
}
function dropPillAndStay(thisButton, name) {
	thisButton.style.color= 'black'
	thisButton.style.background= '#F8F8F8'
	thisButton.style.textAlign = 'left'
	if (typeof this.currentState == 'undefined' || this.currentState == 'raised') {
		thisButton.nextSibling.nextSibling.style.display = 'inline-block'
		thisButton.innerHTML = name + ' &times;'
		this.currentState = 'dropped'
	} else {
		thisButton.nextSibling.nextSibling.style.display = 'none'
		thisButton.innerHTML = name + ' ▾'
		this.currentState = 'raised'
		thisButton.style.color= 'white'
		thisButton.style.background= 'transparent'
	}
}

///////////////////////////////////////////
// ORIGINAL MODELS.JS
///////////////////////////////////////////

function init() {
	// If we have input, put it back.
	if (allInputData != null) {
		restoreInputs()
		$("#modelName").prop("readonly", true)
	}
	// Depending on status, show different things.
	if (modelStatus == "finished") {
		console.log("FINISHED")
		$(".postRun").css('display', 'block')
		$(".postRunInline").css('display', 'inline-block')
	} else if (modelStatus == "running") {
		console.log("RUNNING")
		$(".running").css('display', 'block')
		$(".runningInline").css('display', 'inline-block')
		$("input").prop("readonly", true)
		$("select").prop("disabled", true)
	} else /* Stopped */ {
		if (allInputData != null) {
			$(".stopped").show()
			$(".stoppedInline").show()
		} else {
			console.log("PRERUN")
			$(".preRun").css('display', 'inline-block')
		}
	}
	// Hide buttons we don't use:
	modelUser = allInputData["user"]
	if (modelUser == "public" && currentUser != "admin") {
		$("button#deleteButton").hide();
		$("button#publishButton").hide();
		$("button#rerunButton").hide();
	}
}

function restoreInputs() {
	// Restore all the input values that were used and stored in allInputData.json
	gebi("titleText").innerHTML = allInputData.modelName
	for (index in allInputData) {
		try {document.querySelector("#" + index).value = allInputData[index]}
		catch(err){}
	}
}

function delimitNumbers(nStr) {
	// Add commas to numbers and round to a decent length.
	nStr += ''
	x = nStr.split('.')
	x1 = x[0]
	x2 = x.length > 1 ? '.' + x[1] : ''
	rgx = /(\d+)(\d{3})/
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2')
	}
	return x1 + x2
}

function cancelModel() {
	params = {user:allInputData.user,
		modelName:allInputData.modelName,
		modelType:allInputData.modelType}
	post_to_url("/cancelModel/", params, "POST")
}

function deleteModel() {
	if (confirm("Deleting this model cannot be undone. Continue?")){
		post_to_url("/delete/Model/"+allInputData.user+"/"+allInputData.modelName, {}, "POST")
	} else {
		return false
	}
}

function publishModel() {
	newName = prompt("Publish a copy with name", allInputData.modelName)
	while (! /^[\w\s]+$/.test(newName)){
		newName = prompt("Public a copy with new name, only letters, digits and underscore are allowed in the model name.\nPlease rename your new model", allInputData.modelName)
	}
	if (newName) {
		$.ajax({url:"/uniqObjName/Model/public/" + newName}).done(function(data) {
			if (data.exists) {
				alert("There is already a public Model named " + newName)
				publishModel()
			} else {
				post_to_url("/publishModel/" + allInputData.user + "/" + allInputData.modelName+"/", {"newName":newName})
			}
		})
	}
}

function duplicateModel() {
	newName = prompt("Create a duplicate with name", allInputData.modelName)
	while (! /^[\w\s]+$/.test(newName)){
		newName = prompt("Public a copy with new name, only letters, digits and underscore are allowed in the model name.\nPlease rename your new model", allInputData.modelName)
	}
	if (newName) {
		$.ajax({url:"/uniqObjName/Model/" + allInputData.user + "/" + newName}).done(function(data) {
			if (data.exists) {
				alert("There is already a model named " + newName)
				duplicateModel()
			} else {
				post_to_url("/duplicateModel/" + allInputData.user + "/" + allInputData.modelName+"/", {"newName":newName})
			}
		})
	}
}

function checkModelName() {
	var newName = document.getElementById('modelName').value

	// Safari Form Validation workaround, manual check
	// if (newName == '') {
	// 	document.getElementById('errorMessage').innerHTML = "Model name cannot be blank"
	// 	document.getElementById('modelName').focus()
	// 	return false
	// }
	checkSafariInputs()

	$.ajax({
		url: "/uniqObjName/Model/" + currentUser + "/" + newName
	}).done(function (data) {
		if (data.exists) {
			alert("You already have a Model named '" + newName + "', please choose a different name.")
		}
		else {
			inputForm.submit()
		}
	})
}

///////////////////////////////////////////
// Safari Form Validation Check
///////////////////////////////////////////

function checkSafariInputs() {
	var inputs = document.getElementsByTagName('input')
	for (var i = 0;i < inputs.length;i++) {
		if (inputs[i].value == '') {
			alert("Something is not right")
			inputs[i].focus()
			return false;
		}

	}

}