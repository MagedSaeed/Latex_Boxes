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
symbols["1"] = ["\\alpha",5];
symbols["2"] = ["\\beta",4];
symbols["3"] = ["\\Gamma",5];
symbols["4"] = ["\\gamma",5];
symbols["5"] = ["\\Delta",5];
symbols["6"] = ["\\delta",5];
symbols["7"] = ["\\epsilon",7];
symbols["8"] = ["\\zeta",4];
symbols["9"] = ["\\eta",3];
symbols["10"] = ["\\Theta",5];
symbols["11"] = ["\\theta",5];
symbols["12"] = ["\\vartheta",8];
symbols["13"] = ["\\kappa",5];
symbols["14"] = ["\\Lambda",6];
symbols["15"] = ["\\lambda",6];
symbols["16"] = ["\\mu",2];
symbols["17"] = ["\\nu",2];
symbols["18"] = ["\\Xi",2];
symbols["19"] = ["\\xi",2];
symbols["20"] = ["\\omicron",7];
symbols["21"] = ["\\Pi",2];
symbols["22"] = ["\\pi",2];
symbols["23"] = ["\\rho",3];
symbols["24"] = ["\\Sigma",5];
symbols["25"] = ["\\sigma",5];
symbols["26"] = ["\\tau",3];
symbols["27"] = ["\\Upsilon",7];
symbols["28"] = ["\\upsilon",7];
symbols["29"] = ["\\Phi",3];
symbols["30"] = ["\\phi",3];
symbols["31"] = ["\\chi",3];
symbols["32"] = ["\\Psi",3];
symbols["33"] = ["\\Psi",3];
symbols["34"] = ["\\Omega",5];
symbols["35"] = ["\\omega",5];



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
		if (child.className == "preview-latex panel-body")
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
		if (child.className == "preview-latex panel-body")
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
	curr_text.value = text_str.substring(0, curr_pos)+symbols[symbol][0]+" "+text_str.substring(curr_pos, text_str.length);
	setCaretPosition(curr_text,curr_pos+symbols[symbol][1]+1)
}

function setCaretPosition(elem, caretPos) {

    if(elem != null) {
        if(elem.createTextRange) {
        	console.log('yes')
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}


function add(text){
	var el = document.getElementById('mainContainer');
	el = el.firstChild;

	// This line is edited to get the form group more efficiently!!
	el = document.getElementsByClassName("form-group")[0];

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
	cln.style.opacity=0;
	mainContainer.appendChild(cln);
	window.getComputedStyle(cln).opacity;
	cln.style.opacity=1;
	tex_area.focus(); // move the caret to the newly latex text area
	scrollToElement(document.getElementById(newId));

}

// function to scroll down to the newly created form group
function scrollToElement(element) {
  var el = element;
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
		//this code is to add transition effect to the removed elemnet.
		window.getComputedStyle(currentElement).opacity;
		currentElement.style.opacity=0;
		setTimeout(function(){document.getElementById(id).remove();}, 600);
		idcnt = idcnt -1 ;
	}	
}

function moveUp(id){
	var currentElement = document.getElementById(id);
	//get the next non-text element node sibling 
	var previousElement = currentElement.previousElementSibling;
	//swap the current element with the previous one to move it up
	currentElement.parentNode.insertBefore(currentElement , previousElement);	
	currentElement.getElementsByClassName("form-control")[0].focus();
	scrollToElement(currentElement);
}

function moveDown(id){
	var currentElement = document.getElementById(id);
	//get the next non-text element node sibling 
	var laterElement = currentElement.nextElementSibling;
	//swap the current element with the later one to move it down 
	//stragenly we have to put the condition to check if the later element is not null
	// we don't have to do this in the moveup method !!!
	if (laterElement){
		currentElement.parentNode.insertBefore(laterElement , currentElement);
		currentElement.getElementsByClassName("form-control")[0].focus();
		scrollToElement(currentElement);
	}
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


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
   latex_textareas = document.getElementsByClassName("form-control");
   panels = document.getElementsByClassName('preview-latex');
   headings = document.getElementsByClassName("panel-heading");
    for (var i = 0 ; i<latex_textareas.length; i++){
    	latex_textareas[i].style.backgroundColor = "#999999";
       	panels[i].style.backgroundColor = "#999999";
      	headings[i].style.backgroundColor = "#999999";
     }
}


/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "#eceff1";
    latex_textareas = document.getElementsByClassName("form-control");
   	panels = document.getElementsByClassName("preview-latex");
   	headings = document.getElementsByClassName("panel-heading");
    for (var i = 0 ; i<latex_textareas.length; i++){
    	latex_textareas[i].style.backgroundColor = "white";
       	panels[i].style.backgroundColor = "white"
      	headings[i].style.backgroundColor = "#F5F5F5"
     }
}
function iconBarFunctions(icon_bar) {
    icon_bar.classList.toggle("change");
    if(firstClick==1){
    	openNav();
    	firstClick=0;
    }
    else{
    	closeNav();
    	firstClick = 1;
    }
}


// uncompleted code to hide the sidebar\
// automaticlly when clicking any place\
//on the page.

// $(window).click(function() {
// 	$("#mySidenav").hide();
// });

// $('#menucontainer').click(function(event){
//     event.stopPropagation();
// });

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function drop_down_control() {
	style = document.getElementById('myDropdown').style.display;
	if(style=='none' || style =='')
		document.getElementById('myDropdown').style.display = 'block'
	else{
		document.getElementById('myDropdown').style.display='none'
	}
}

	// Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.symb-tab-dropbtn')) {
//     document.getElementById('myDropdown').style.display='none';
//   }
// }

var current_table = 'LaTeX';
function show_symbol_tables(new_table){
	current_showed_table = document.getElementById(current_table);
	new_table_style = document.getElementById(new_table).style.display;
	if(new_table_style =='none' || new_table_style==''){
		current_showed_table.style.display='none';
		new_showed_table = document.getElementById(new_table);
		new_showed_table.style.display='flex';
		new_showed_table.style.marginTop="5px"
		//document.getElementById("mainContainer").style.marginTop = '105px';
		//current_table = new_table;
		marginTopInc(document.getElementById('mainContainer'), 42);
		document.getElementsByClassName('symb-tab-dropbtn')[0].innerHTML = new_table.concat("<span class=\"caret\"></span>");
		document.getElementById('myDropdown').style.display="none";
	}
	else{
		document.getElementById(new_table).style.display="none";
		marginTopDec(document.getElementById("mainContainer"), 35);
	}
}

function marginTopInc(elem, inc_mar) {

  var marginTop=0;
  marginTop += parseInt(window.getComputedStyle(elem).marginTop) + inc_mar;
  elem.style.marginTop = marginTop + 'px';
  
}

function marginTopDec(elem,dec_mar){

var marginTop=0;
marginTop += parseInt(window.getComputedStyle(elem).marginTop) - dec_mar;
elem.style.marginTop = marginTop + 'px';

}


