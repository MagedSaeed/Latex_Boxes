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




function compile(id) {
	var divParent = document.getElementById(id);
	var children = divParent.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "PRE")
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
	editor = ace.edit(textArea);
	div.innerHTML  = editor.getValue();
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function erase(id) {
	var divParent = document.getElementById(id);
	var children = divParent.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "PRE")
			var textArea = child;
		if (child.nodeName == "DIV")
			div = child 
	}
	editor = ace.edit(textArea);
	editor.setValue("");
	textArea.focus();
}

//make a live preview 
function live(object, id){
	var divParent = document.getElementById(id);
	var children = divParent.children;
	var text_area = null;

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "PRE")
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

		$(text_area).on('keyup selectionchange propertychange', function() {
			if(object.className =="btn glyphicon glyphicon-eye-open")
				var editor = ace.edit(text_area);
				var value = editor.getValue();
				typejax.updater.init(value, value.length, div_preview);
		});

	}else
	{
		object.className = "btn glyphicon glyphicon-eye-close";
	}


}



//check if th live preview is on 

function is_live_on(divParent)
{
	var children = divParent.children;
	var text_area = null;

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "PRE")
			text_area = child;
		if (child.className == "btn-group pull-right")
			var div = child 
	}

	var children = div.children;
	var div_preview = null;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.id == "live_preview")
			if(child.className =="btn glyphicon glyphicon-eye-open")
				return true
	}
	return false 
}
//once losing focus get the blinking caret position (|) and object selected 
function on_focus_out(object){
	curr_text = object;
	var editor = ace.edit(object);
	//var curr_pos = editor.getCursorPosition()
	//alert(curr_pos.column);
}


//insert the current symbol to last focused text area
function insert_txt(symbol){
	editor = ace.edit(curr_text);
	if(editor.getValue())
		var text_str = editor.getValue();
	else
		var text_str ="";
	editor.focus();
	var snippetManager = ace.require("ace/snippets").snippetManager;
	snippetManager.insertSnippet(editor, symbol);

	if(is_live_on(curr_text.parentElement))
	{
		compile(id);
	}
	
	//MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
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
		if (child.nodeName == "PRE"){
			var editor = ace.edit(child);
			editor.setValue(text);
			var tex_area = child
		}
		if (child.className == "panel panel-default")
			var div = child;
	}

	var children = div.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.className == "preview-latex panel-body")
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
	cln.style.opacity=0;
	//cln.style.transition = "opacity 0.5s";
	//cln.style.marginTop='20px';
	//window.getComputedStyle(cln).opacity;
	cln.style.opacity=1;
	tex_area.focus(); // move the caret to the newly latex text area
	scrollToElement(document.getElementById(newId));
	trigger_autocomplete(editor);

}

//insert snippet of code 
function insert_snippet(editor , snippet)
{
	var snippetManager = ace.require("ace/snippets").snippetManager;
	snippetManager.insertSnippet(editor, snippet);
}

function trigger_autocomplete(editor)
{
	 // trigger extension
    ace.require("ace/ext/language_tools");
    editor.session.setMode("ace/mode/latex");
    editor.setTheme("ace/theme/textmate");

    //remove vertical line
    editor.setShowPrintMargin(false);
    //remove active line marker
    editor.setOption("highlightActiveLine", false);
    // enable autocompletion and snippets
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
	
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
	
	if (idList.length != 1) {
		var r = confirm("Do you want to remove this box ?");
		if(r)
		{
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
			if (child.nodeName == "PRE"){
				var editor = ace.edit(child);
				all_text = all_text.concat(editor.getValue());
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

//toggle the panel 
function toggle(ele,id)
{
	var divParent = document.getElementById(id);
	var children = divParent.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "PRE")
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
	$(div).slideToggle();
	if(ele.className == "btn glyphicon glyphicon-chevron-up")
	{
		ele.className = "btn glyphicon glyphicon-chevron-down";
	}else
	{
		ele.className = "btn glyphicon glyphicon-chevron-up";
	}
}

//read a text file
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}


function copyToClipboard() {

	/*
	This part "part #1" working fine.
	*/

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
			if (child.nodeName == "PRE"){
				var editor = ace.edit(child);
				all_text = all_text.concat("\n<box>");
				all_text = all_text.concat(editor.getValue());
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
					try
					{
					if(txt)
					{
						parser = new DOMParser();
						
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
						
					}
					}
					catch(e)
					{
						alert('This format is not allowed !');
					}
				};
				fr.readAsText(file);
			}
		}
	}

	
}

// a function to show the symobls panel on a button click

// function panel_transition() {
//     var main_cont = document.getElementsByClassName('form-group')[0];
//     var sym_tab = document.getElementsByClassName('choose_buttons_panel')[0];
//     if (firstClick == 1) {
//     	firstClick = 0;
//     	//main_cont.style.transition = "margin-top 1s"
//     	main_cont.style.marginTop = '-75px';
//     	sym_tab.style.display = "none";
//     } else {
//   		firstClick = 1;
//         main_cont.style.marginTop = '-45px';
//         main_cont.style.transition = "margin-top 2s";
//         sym_tab.style.display = "inline-flex";
// 	}
// 	curr_text.focus();
// 	scrollToElement(curr_text);
// }


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    //document.getElementById("mainContainer").style.backgroundColor = "rgba(0,0,0,0.4)";
    document.getElementById("mainContainer").style.opacity = 0.15;
   //latex_textareas = document.getElementsByClassName("form-control");
   //panels = document.getElementsByClassName('preview-latex');
   //headings = document.getElementsByClassName("panel-heading");
    // for (var i = 0 ; i<latex_textareas.length; i++){
    // 	latex_textareas[i].style.backgroundColor = "rgba(0,0,0,0.4)";
    //    	panels[i].style.backgroundColor = "rgba(0,0,0,0.4)";
    //   	headings[i].style.backgroundColor = "rgba(0,0,0,0.4)";
    //  }
}


/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mainContainer").style.opacity = 1;
    document.body.style.backgroundColor = "#eceff1";
    // document.body.style.backgroundColor = "#eceff1";
    // latex_textareas = document.getElementsByClassName("form-control");
   	// panels = document.getElementsByClassName("preview-latex");
   	// headings = document.getElementsByClassName("panel-heading");
    // for (var i = 0 ; i<latex_textareas.length; i++){
    // 	latex_textareas[i].style.backgroundColor = "white";
    //    	panels[i].style.backgroundColor = "white"
    //   	headings[i].style.backgroundColor = "#F5F5F5"
    //  }
}
function iconBarFunctions(icon_bar) {
    document.getElementById(icon_bar).classList.toggle("change");
    if(firstClick==1){
    	openNav();
    	firstClick=0;
    }
    else{
    	closeNav();
    	firstClick = 1;
    }
}

function onClickToggle(icon_bar)
{
    if(firstClick==0){
    	closeNav();
    	document.getElementById(icon_bar).classList.toggle("change");
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

document.getElementById.onclick = function(event) {
  if (!event.target.matches('.symb-tab-dropbtn') && !event.target.matches('.symb-tab-dropbtn')) {
    //document.getElementById('myDropdown').style.display='none';
    //closeNav();
  }

}


var current_table = 'LaTeX';
function show_symbol_tables(chec_ob, new_table){
	// current_showed_table = document.getElementById(current_table);
	// new_table_style = document.getElementById(new_table).style.display;
	// if(new_table_style =='none' || new_table_style==''){
	// 	current_showed_table.style.display='none';
	// 	new_showed_table = document.getElementById(new_table);
	// 	new_showed_table.style.display='flex';
	// 	new_showed_table.style.marginTop="5px";
	// 	//document.getElementById("mainContainer").style.marginTop = '105px';
	// 	//current_table = new_table;
	// 	//marginTopInc(document.getElementById('mainContainer'), 10);
	// 	document.getElementsByClassName('symb-tab-dropbtn')[0].innerHTML = new_table.concat("<span class=\"caret\"></span>");
	// 	document.getElementById('myDropdown').style.display="none";
	// }
	// else{
	// 	document.getElementById(new_table).style.display="none";
	// 	//marginTopDec(document.getElementById("mainContainer"), 10);
	// }
	if(chec_ob.checked){
		document.getElementById(new_table).style.display="flex";
		//typejax.updater.init(text_area.value, text_area.value.length, div_preview);
		
		
		marginTopInc(document.getElementById(idList[0]),35);
		if(new_table=="Others"){
			marginTopInc(document.getElementById(idList[0]),50);
		}
	}
	else{
		document.getElementById(new_table).style.display="none";
		marginTopDec(document.getElementById(idList[0]),35);
		if(new_table=="Others")
			marginTopDec(document.getElementById(idList[0]),50);
	}

}


function marginTopInc(elem, inc_mar) {

  var marginTop=inc_mar;
  marginTop += parseInt(window.getComputedStyle(elem).marginTop);
  elem.style.marginTop = marginTop + 'px';
  
}

function marginTopDec(elem,dec_mar){

var marginTop=0;
marginTop += parseInt(window.getComputedStyle(elem).marginTop) - dec_mar;
elem.style.marginTop = marginTop + 'px';

}


// code to add keyboard shortcuts..,,
function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.keyCode == 78 && e.altKey) {
        // call your function to do the thing
        add('');
    }

    else if (e.keyCode == 88 && e.altKey) {
        // call your function to do the thing
        download_xml();
    }
    else if (e.keyCode == 84 && e.altKey) {
        // call your function to do the thing
        download_text();
    }
    else if (e.keyCode == 85 && e.altKey) {
        // call your function to do the thing
      document.getElementById('myFile').click();
    }

    else if (e.keyCode == 67 && e.altKey) {
        // call your function to do the thing
      copyToClipboard();
    }

    else if (e.keyCode == 80 && e.altKey) {
        // call your function to do the thing
      preview_all();
    }
}
// register the handler 
document.onkeyup = doc_keyUp ;






