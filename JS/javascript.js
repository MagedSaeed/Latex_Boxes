// initialize a list of non-removable element with fake id 
var idList = ["id0"]
// this varialb is to control the transition of the main container
// when the latex symbols menu drops down
var firstClick = 1
//we need to maintain this for indexing
var idcnt = 1 
//get last focused text area and caret position
var curr_text = document.getElementById(idList[0]);
var curr_pos = 0;

//latex symobls array the key is the name and the value is the latex code 
var symbols = [];
symbols["int"] = "\\int^{}_{}";
symbols["sum"] = "\\sum^{}_{}";
symbols["prod"] = "\\prod^{}_{}";

function compile(id) {
	var divParent = document.getElementById(id);
	var children = divParent.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "TEXTAREA")
			var textArea = child;
		if (child.nodeName == "DIV")
			div = child 
	}

	var children = div.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.className == "panel-body")
			div = child;
	}
	div.innerHTML  = textArea.value;
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

//make a live preview 
function live(object, id){
	var divParent = document.getElementById(id);
	var children = divParent.children;
	var text_area = null;

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "TEXTAREA")
			text_area = child;
		if (child.className == "panel panel-default")
			var div = child 
	}

	var children = div.children;
	var div_preview = null;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.className == "panel-body")
			div_preview = child;
	}

//attach listeners on keyup
	if(object.className =="btn glyphicon glyphicon-eye-close"){
		object.className = "btn glyphicon glyphicon-eye-open";
		text_area.onkeyup = function (e){
			var isMobile = {
				Windows: function() {
					return /IEMobile/i.test(navigator.userAgent);
				},
				Android: function() {
					return /Android/i.test(navigator.userAgent);
				},
				BlackBerry: function() {
					return /BlackBerry/i.test(navigator.userAgent);
				},
				iOS: function() {
					return /iPhone|iPad|iPod/i.test(navigator.userAgent);
				},
				any: function() {
					return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
				}
			};
			//we have a bug in android devices using chrome 
			if(isMobile.Android()){
				div_preview.innerHTML  = text_area.value;
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			}else{
				//alert(e.keyCode);
				var keycode = e.keyCode;
				var getKeyCode = function (str) {
					return str.charCodeAt(str.length - 1);
			}

			if (keycode == 0 || keycode == 229) { //for android chrome keycode fix
				keycode = getKeyCode(this.value);
				}
				var valid = 
					(keycode > 47 && keycode < 58)   || // number keys
					(keycode > 64 && keycode < 91)   || // letter keys
					(keycode > 95 && keycode < 112)  || // numpad keys
					(keycode > 185 && keycode < 193) || // ;=,-./` (in order)
					(keycode > 218 && keycode < 223) ||  // [\]' (in order)
					(keycode == 8 ) ||//backspace
					(keycode == 46) ||//delete
					(keycode == 13) //enter
				//var valid = (event.key.length == 1);
				if (valid){
					div_preview.innerHTML  = text_area.value;
					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				}
			}
		};

	}
	else
	{
		object.className = "btn glyphicon glyphicon-eye-close";
		text_area.onkeyup = null;
	}


}

//once losing focus get the blinking caret position (|) and object selected 
function on_focus_out(object){
	curr_text = object;
	curr_pos = object.selectionStart;
}

//insert the current symbol to last focused text area
function insert_txt(symbol){
	if(curr_text.value)
		var text_str = curr_text.value;
	else
		var text_str ="";
	curr_text.value = text_str.substring(0, curr_pos)+" "+symbols[symbol]+" "+text_str.substring(curr_pos, text_str.length);
}

function add(text){
	var el = document.getElementById('mainContainer');
	el = el.firstChild;

	while (el && el.nodeType !== 1)
		el = el.nextSibling;

	var cln = el.cloneNode(true);
	var newId = "id".concat(idcnt);
	cln.id = newId;  
	idcnt = idcnt +1; 
	idList.push(newId);
	var children = cln.children;

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "TEXTAREA"){
			child.value = text;
			var tex_area = child
		}
		if (child.className == "panel panel-default")
			var div = child;
	}

	var children = div.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.className == "panel-body")
			child.innerHTML = "";
	}

	var children = cln.children;

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.className == "btn-group pull-right")
			var btn_grb = child;
	}

	var children = btn_grb.children;

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.className == "btn glyphicon glyphicon-eye-open")
			child.className = "btn glyphicon glyphicon-eye-close";
	}

	mainContainer.appendChild(cln);
	tex_area.focus(); // move the caret to the newly latex text area
	scrollToElement(newId);

}

// function to scroll down to the newly created form group
function scrollToElement(element) {
  var el = document.getElementById(element);
  var yPos = el.getClientRects()[0].top;
  var yScroll = window.scrollY;
  var interval = setInterval(function() {
    yScroll -= 10;
    window.scroll(0, yScroll);
    if (el.getClientRects()[0].top >= 0) {
      clearInterval(interval);
    }
  }, 5);
}

function remove(id){
	if(idList.length != 1){
		currentElement = document.getElementById(id);
		var index;
		for(var i = 0; i<idList.length; i++)
			if(idList[i] == currentElement.id)
				index = i;
			if(index>-1)
				idList.splice(index,1);
		document.getElementById(id).remove();
		idcnt = idcnt -1 ;
	}	
}

function moveUp(id){
	var currentElement = document.getElementById(id);
	//get the next non-text element node sibling 
	var previousElement = currentElement.previousElementSibling;
	//swap the current element with the previous one to move it up
	currentElement.parentNode.insertBefore(currentElement , previousElement);	
}

function moveDown(id){
	var currentElement = document.getElementById(id);
	//get the next non-text element node sibling 
	var laterElement = currentElement.nextElementSibling;
	//swap the current element with the later one to move it down 
	//stragenly we have to put the condition to check if the later element is not null
	// we don't have to do this in the moveup method !!!
	if (laterElement)
		currentElement.parentNode.insertBefore(laterElement , currentElement);
}

function get_all_text(){
	var all_text = "";
	var divNode = mainContainer.firstChild;
	while (divNode && divNode.nodeType !== 1)
		divNode = divNode.nextSibling;
	do{
		for(var i = 0; i<divNode.children.length; i++){
			child = divNode.children[i];
			if (child.nodeName == "TEXTAREA"){
				all_text = all_text.concat(child.value);
				all_text = all_text.concat("\n");
				break;
			}
		}
		divNode = divNode.nextElementSibling;
	}while(divNode != null);
	return all_text;
}

//maybe export to a page is better?
function preview_all(){
	//var new_window = window.open('file:exportToPDF.html');

	//document.write(all_text);
	//var url = 'http://localhost/preview.php/?q='+all_text;
	//window.open(url);
	send_form(get_all_text());
	//post('preview.php', {name: "hello there"});


}

function send_form(text) {
	document.getElementById("in_form").value=text;
	document.getElementById("myForm").submit();
}

function post(path, params, method) {
	method = method || "post"; // Set method to post by default if not specified.

	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);

	for(var key in params) {
		if(params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
}

function copyToClipboard() {

	/*
	This part "part #1 " could work only when textareas and inputs are visible!!
	*/

	//part #1

	// var hidden_text_area = document.getElementById("hidden-text-area");
	// hidden_text_area.value = all_text;
	// var range = document.createRange();
	// range.selectNode(hidden_text_area);
	// window.getSelection().addRange(range);
	// document.execCommand('copy');

	/*
	This part "part #2 " works fine. However, it is a little bit inefficient because it create a new div and immediately delete it. the reason for this creation is to make the selection for the window object possible!!
	*/

	//part #2 

	var tempInput = document.createElement("TEXTAREA");
	tempInput.style = "position: absolute; left: -1000px; top: -1000px";
	tempInput.value = get_all_text();
	document.body.appendChild(tempInput);
	tempInput.select();
	try{
		copied = document.execCommand("copy");
		if(copied)
			alert("Copied to Clipboard !");
		else
			alert("Oops, problems on copying. Text is not copied!!");
	}catch(err){
		alret("Fatal error happend."+ err.message);
	}
	document.body.removeChild(tempInput);



	/*
	This part "part #3 " this is a simple solution. but it is not gurenteed to work on all platforms! it is getting supported by the new versions of browsers. I am not sure by the way ::))) ^_^
	*/

	//part #3 

	// var hidden_text_area = document.getElementById('ctc');
	// hidden_text_area.value = text;
	// console.log(hidden_text_area.value);
	// document.execCommand('copy');

	/*
	for this part "part #4" I think it is as the first part "part #1" but simpler.
		*/

	//part #4

	// var ref = document.getElementById("ctc");
	// ref.addEventListener("click",function(){
	// 	var hidden_text_area = document.getElementById("hidden-text-area");
	// 	hidden_text_area.value = text;
	// 	hidden_text_area.select();
	// 	document.execCommand('copy');


	/*
	for this part "part #5" It is the first solution I come up with. and we chatted on it.
	do not get angry please, it is just the last part ::::)))) ^_^ ^^
*/

	//part #5	
	// 		// this code below is the first method we discussed
	// 	  // window.prompt("Copy to clipboard: Ctrl+C, Enter", text);

	// 	  try {
	// 	    var successful = document.execCommand('copy');
	// 	    var msg = successful ? 'successful' : 'unsuccessful';
	// 	    console.log('Copying text command was ' + msg);
	// 	  } catch (err) {
	// 	    console.log('Oops, unable to copy');
	// 	  }
	// });

	/*This scrept was imported from online. Tt is aliged to be cross-browsers. I rely on that claim. you see, it just very SIMPLE !!*/

	// 	var all_text = get_all_text();
	// 	var clipboard = new Clipboard('.ctc', {
	//         text: function() {
	//       		alert("Copied to Clipboard !");

	//             return get_all_text();
	//         }
	//     });

	// 	//called too many times !!	
	//     clipboard.on('success', function(e) {
	//         //alert("Copied to Clipboard !");
	// 	});

	//     clipboard.on('error', function(e) {
	//         console.log(e);
	//     });    


}

//download code as text file
//might not work for all browsers 
function download_text() {
	filename ="code.txt"
	text = get_all_text();
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

//download code as xml file
//might not work for all browsers 
function download_xml() {
	filename ="code.xml"
	var all_text = "<?xml version='1.0' encoding='UTF-8'?>";
	all_text = all_text.concat("\n<body>\n");
	var divNode = mainContainer.firstChild;
	while (divNode && divNode.nodeType !== 1)
		divNode = divNode.nextSibling;
	do{
		for(var i = 0; i<divNode.children.length; i++){
			child = divNode.children[i];
			if (child.nodeName == "TEXTAREA"){
				all_text = all_text.concat("\n<box>");
				all_text = all_text.concat(child.value);
				var match = /\r|\n/.exec(child.value);
				if (match) {
				    alert('found new line');
				}
				all_text = all_text.concat("</box>\n");
				break;
			}
		}
		divNode = divNode.nextElementSibling;
	}while(divNode != null);
	all_text = all_text.concat("\n</body>\n");
	text = all_text;
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}


				//upload file 
				//will it work on all browsers ?!
function upload(object){
	var txt = "";
	if ('files' in object) {
		if (object.files.length == 0) {
			txt = "Select one or more files.";
		} else {
			for (var i = 0; i < object.files.length; i++) {
				var file = object.files[i];

				//initialize a file reader to read the of the file as text
				var fr = new FileReader();
				fr.onload = function(e) {
					txt = e.target.result;
					if(txt)
					{
						parser = new DOMParser();
						try
						{
							xmlDoc = parser.parseFromString(txt,"text/xml");

							//copy the current list of containers to remove them after upload is done
							rmList = idList.slice(0);
							for (i = 0; i < xmlDoc.getElementsByTagName("box").length ; i++) { 
								value = xmlDoc.getElementsByTagName("box")[i].firstChild.nodeValue;
								add(value);
							}
							//once it is done remove all the current elements 
							//should we remove the current boxes ?!
							//for(i=0 ; i< rmList.length ; i++)
							//	remove(rmList[i]);
						}catch(e)
						{
							alert('This format is not allowed !');
						}
					}
				};
				fr.readAsText(file);
			}
		}
	}

	
}

// a function to show the symobls panel on a button click
function panel_transition() {
    var main_cont = document.getElementById('mainContainer');
    var sym_tab = document.getElementById('symbols_table');
    if (firstClick == 1) {
    	firstClick = 0;
    	main_cont.style.transition = "margin-top 2s"
    	main_cont.style.marginTop = '165px';
    } else {
  		firstClick = 1;
        main_cont.style.marginTop = '75px';
        main_cont.style.transition = "margin-top 2s"
	}
	curr_text.focus();
	scrollToElement(curr_text);
}

// to shrink the width of all elements when
// hovering over the side bar
function shrink_width(){
	main = document.getElementById('main');
	main.style.marginLeft='20px';
	//main.style.width='95%';
}
function reset_width(){
	main = document.getElementById('main');
	main.style.marginLeft='0px'
	main.style.width='100%';
}
