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

symbols["1"] = ["\\alpha",6,2];
symbols["2"] = ["\\beta",5,2];
symbols["3"] = ["\\Gamma",6,2];
symbols["4"] = ["\\gamma",6,2];
symbols["5"] = ["\\Delta",6,2];
symbols["6"] = ["\\delta",6,2];
symbols["7"] = ["\\epsilon",8,2];
symbols["8"] = ["\\zeta",5,2];
symbols["9"] = ["\\eta",4,2];
symbols["10"] = ["\\Theta",6,2];
symbols["11"] = ["\\theta",6,2];
symbols["12"] = ["\\vartheta",9,2];
symbols["13"] = ["\\kappa",6,2];
symbols["14"] = ["\\Lambda",7,2];
symbols["15"] = ["\\lambda",7,2];
symbols["16"] = ["\\mu",3,2];
symbols["17"] = ["\\nu",3,2];
symbols["18"] = ["\\Xi",3,2];
symbols["19"] = ["\\xi",3,2];
symbols["20"] = ["\\omicron",8,2];
symbols["21"] = ["\\Pi",3,2];
symbols["22"] = ["\\pi",3,2];
symbols["23"] = ["\\rho",4,2];
symbols["24"] = ["\\Sigma",6,2];
symbols["25"] = ["\\sigma",6,2];
symbols["26"] = ["\\tau",4,2];
symbols["27"] = ["\\Upsilon",8,2];
symbols["28"] = ["\\upsilon",8,2];
symbols["29"] = ["\\Phi",4,2];
symbols["30"] = ["\\phi",4,2];
symbols["31"] = ["\\chi",4,2];
symbols["32"] = ["\\Psi",4,2];
symbols["33"] = ["\\psi",4,2];
symbols["34"] = ["\\Omega",6,2];
symbols["35"] = ["\\omega",6,2];


symbols["101"] = ["\\sum_{}^{}",6,3];
symbols["102"] = ["\\int_{}^{}",6,3];
symbols["103"] = ["\\oint_{}^{}",7,3];
symbols["104"] = ["\\prod_{}^{}",7,3];
symbols["105"] = ["\\coprod_{}^{}",9,3];


symbols["201"] = ["\\infty",6,2];
symbols["202"] = ["\\aleph",6,2];
symbols["203"] = ["\\jmath",6,2];
symbols["204"] = ["\\imath",6,2];
symbols["205"] = ["\\Re",3,2];
symbols["206"] = ["\\prime",6,2];
symbols["207"] = ["\\surd",5,2];
symbols["208"] = ["\\S",2,2];
symbols["209"] = ["\\hbar",5,2];
symbols["210"] = ["\\ell",4,2];
symbols["211"] = ["\\partial",8,2];
symbols["212"] = ["\\angle",6,2];
symbols["213"] = ["\\$",2,2];
symbols["214"] = ["\\&",2,2];
symbols["215"] = ["\\%",2,2];
symbols["216"] = ["\\#",2,2];
symbols["217"] = ["\\_",2,2];
symbols["218"] = ["\\{",2,2];
symbols["219"] = ["\\}",2,2];
symbols["220"] = ["\\backslash",10,2];


symbols["301"] = ["\\nless",6,2]; 
symbols["302"] = ["\\ngtr",5,2];
symbols["303"] = ["\\leq",4,2];
symbols["304"] = ["\\geq",4,2];
symbols["305"] = ["\\leqslant",9,2];
symbols["306"] = ["\\geqslant",9,2];
symbols["307"] = ["\\nleq",5,2];
symbols["308"] = ["\\ngeq",5,2];
symbols["309"] = ["\\nleqslant",10,2];
symbols["310"] = ["\\ngeqslant",10,2];
symbols["311"] = ["\\lneq",5,2];
symbols["312"] = ["\\gneq",5,2];
symbols["313"] = ["\\lneqq",6,2];
symbols["314"] = ["\\gneqq",6,2];
symbols["315"] = ["\\prec",5,2];
symbols["316"] = ["\\succ",5,2];
symbols["317"] = ["\\nprec",6,2];
symbols["318"] = ["\\nsucc",6,2];
symbols["319"] = ["\\preceq",7,2];
symbols["320"] = ["\\succeq",7,2];
symbols["321"] = ["\\npreceq",8,2];
symbols["322"] = ["\\nsucceq",8,2];
symbols["323"] = ["\\ll",3,2];
symbols["324"] = ["\\gg",3,2];
symbols["325"] = ["\\lll",4,2];
symbols["326"] = ["\\ggg",4,2];
symbols["327"] = ["\\emptyset",9,2];
symbols["328"] = ["\\subset",7,2];
symbols["329"] = ["\\supset",7,2];
symbols["330"] = ["\\not\\subset",11,2];
symbols["331"] = ["\\not\\supset",11,2];
symbols["332"] = ["\\nsubseteq",10,2];
symbols["333"] = ["\\nsupseteq",10,2];
symbols["334"] = ["\\sqsubset",9,2];
symbols["335"] = ["\\sqsupset",9,2];
symbols["336"] = ["\\sqsubseteq",11,2];
symbols["337"] = ["\\sqsupseteq",11,2];
symbols["338"] = ["\\cap",4,2];
symbols["339"] = ["\\cup",4,2];
symbols["340"] = ["\\uplus",6,2];
symbols["341"] = ["\\vee",4,2];
symbols["342"] = ["\\wedge",6,2];
symbols["343"] = ["\\equiv",6,2];
symbols["344"] = ["\\not\\equiv",10,2];
symbols["345"] = ["\\doteq",6,2];
symbols["346"] = ["\\approx",7,2];
symbols["347"] = ["\\not\\approx",11,2];
symbols["348"] = ["\\cong",5,2];
symbols["349"] = ["\\not\\cong",9,2];
symbols["350"] = ["\\simeq",6,2];
symbols["351"] = ["\\bumpeq",7,2];
symbols["352"] = ["\\sim",4,2];
symbols["353"] = ["\\nsim",5,2];
symbols["354"] = ["\\not\\sim",8,2];
symbols["355"] = ["\\lnsim",6,2];
symbols["356"] = ["\\propto",7,2];
symbols["357"] = ["\\bowtie",7,2];
symbols["358"] = ["\\neq",4,2];
symbols["359"] = ["\\perp",5,2];
symbols["360"] = ["\\not\\perp",9,2];
symbols["361"] = ["\\parallel",9,2];
symbols["362"] = ["\\nparallel",10,2];
symbols["363"] = ["\\models",7,2];
symbols["364"] = ["\\dashv",6,2];
symbols["365"] = ["\\vdash",6,2];
symbols["366"] = ["\\rhd",4,2];
symbols["367"] = ["\\lhd",4,2];
symbols["368"] = ["\\unlhd",6,2];
symbols["369"] = ["\\unrhd",6,2];
symbols["370"] = ["\\asymp",6,2];
symbols["371"] = ["\\in",3,2];
symbols["372"] = ["\\forall",7,2];
symbols["373"] = ["\\exists",7,2];
symbols["374"] = ["\\smile",6,2];
symbols["375"] = ["\\frown",6,2];
symbols["376"] = ["\\amalg",6,2];
symbols["377"] = ["\\oslash",7,2];
symbols["378"] = ["\\mid",4,2];
symbols["379"] = ["\\nmid",5,2];


symbols["401"] = ["\\uparrow",8,2];
symbols["402"] = ["\\Uparrow",8,2];
symbols["403"] = ["\\downarrow",10,2];
symbols["404"] = ["\\Downarrow",10,2];
symbols["405"] = ["\\updownarrow",12,2];
symbols["406"] = ["\\Updownarrow",12,2];
symbols["407"] = ["\\nearrow",8,2];
symbols["408"] = ["\\searrow",8,2];
symbols["409"] = ["\\swarrow",8,2];
symbols["410"] = ["\\nwarrow",8,2];
symbols["411"] = ["\\leftarrow",10,2];
symbols["412"] = ["\\Leftarrow",10,2];
symbols["413"] = ["\\rightarrow",11,2];
symbols["414"] = ["\\Rightarrow",11,2];
symbols["415"] = ["\\leftrightarrow",15,2];
symbols["416"] = ["\\Leftrightarrow",15,2];
symbols["417"] = ["\\mapsto",7,2];
symbols["418"] = ["\\hookleftarrow",14,2];
symbols["419"] = ["\\hookrightarrow",15,2];
symbols["420"] = ["\\leftharpoonup",14,2];
symbols["421"] = ["\\leftharpoondown",16,2];
symbols["422"] = ["\\rightleftharpoons",18,2];
symbols["423"] = ["\\rightharpoonup",15,2];
symbols["424"] = ["\\rightharpoondown",17,2];
symbols["425"] = ["\\leadsto",8,2];
symbols["426"] = ["\\longrightarrow",15,2];
symbols["427"] = ["\\longleftarrow",14,2];
symbols["428"] = ["\\Longleftarrow",14,2];
symbols["429"] = ["\\Longrightarrow",15,2];
symbols["430"] = ["\\longleftrightarrow",19,2];
symbols["431"] = ["\\Longleftrightarrow",19,2];
symbols["432"] = ["\\ ",5];
symbols["433"] = ["\\ ",5];


symbols["901"] = ["\\sum_{}^{}",7,3];
symbols["902"] = ["\\int_{}^{}",7,3];
symbols["903"] = ["\\oint_{}^{}",8,3];
symbols["904"] = ["\\prod_{}^{}",8,3];
symbols["905"] = ["\\lim_{}{}",7,2];
symbols["906"] = ["\\frac{d}{dx}",12,2];
symbols["907"] = ["\\int\\int_{}^{}",10,3];
symbols["908"] = ["\\mathrm{d}",10,2];
symbols["909"] = ["\\frac{\\partial}{\\partial x}",27,2];
symbols["910"] = ["\\infty",7,2];


symbols["501"] = ["\\forall",7,2];
symbols["502"] = ["\\exists",7,2];
symbols["503"] = ["\\subset",7,2];
symbols["504"] = ["\\supset",7,2];
symbols["505"] = ["\\cap",4,2];
symbols["506"] = ["\\cup",4,2];
symbols["507"] = ["\\vee",4,2];
symbols["508"] = ["\\wedge",6,2],2;
symbols["509"] = ["\\phi",4,2];
symbols["510"] = ["\\in",3,2];


symbols["601"] = ["\\frac{}{}",7,2];
symbols["602"] = ["\\sqrt[]{}",9,2];
symbols["603"] = ["{}^{}",2,3];
symbols["604"] = ["\\pi",3,2];
symbols["605"] = ["\\geq",5,2];
symbols["606"] = ["\\leq",5,2];
symbols["607"] = ["{}_{}",2,3];
symbols["608"] = ["| |",2,2];
symbols["609"] = ["\\left( \\right)",7,2];
symbols["610"] = ["\\{ \\}",2,2];


symbols["701"] = ["\\sin ",5,2];
symbols["702"] = ["\\cos ",5,2];
symbols["703"] = ["\\tan ",5,2];
symbols["704"] = ["\\cot ",5,2];
symbols["705"] = ["\\sec ",5,2];
symbols["706"] = ["\\csc ",5,2];
symbols["707"] = ["\\log ",5,2];
symbols["708"] = ["\\exp ",5,2];
symbols["709"] = ["\\ln ",4,2];
symbols["710"] = ["\\mathrm{sign}",13,2];

symbols["801"] = ["\\alpha ",7,2];
symbols["802"] = ["\\delta ",7,2];
symbols["803"] = ["\\epsilon ",9,2];
symbols["804"] = ["\\zeta ",6,2];
symbols["805"] = ["\\theta ",7,2];
symbols["806"] = ["\\lambda ",8,2];
symbols["807"] = ["\\rho ",5,2];
symbols["808"] = ["\\omega ",7,2];
symbols["809"] = ["\\beta ",6,2];
symbols["810"] = ["\\gamma ",7,2];

defaultTab = 2;



function get_unique_symbols()
{
	var set = new Set();

	symbols.forEach( function (symbol)
	{
	    if(symbol)
	    {
	    	if (symbol[0].charAt(0) == '\\')
	    		set.add(symbol[0].substring(1).trim())
		}
	});
	list = [];
	set.forEach(v => list.push(v));
	return list
}
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

function erase(id) {
	var divParent = document.getElementById(id);
	var children = divParent.children;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.nodeName == "TEXTAREA")
			var textArea = child;
		if (child.nodeName == "DIV")
			div = child 
	}

	textArea.value = "";
	textArea.focus();
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
		/*
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
				//MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				//typejax.updater.init(latex, latex.length, result);
				typejax.updater.init(text_area.value, text_area.value.length, div_preview);

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
					//MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
					 typejax.updater.init(text_area.value, text_area.value.length, div_preview);

				}
			}
		};

	}
	else
	{
		object.className = "btn glyphicon glyphicon-eye-close";
		text_area.onkeyup = null;
	}*/

		$(text_area).on('input selectionchange propertychange', function() {
			if(object.className =="btn glyphicon glyphicon-eye-open")
				typejax.updater.init(text_area.value, text_area.value.length, div_preview);
		});
	}else
	{
		object.className = "btn glyphicon glyphicon-eye-close";
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
	curr_text.value = text_str.substring(0, curr_pos)+" "+symbols[symbol][0]+" "+text_str.substring(curr_pos, text_str.length);
	setCaretPosition(curr_text,curr_pos+symbols[symbol][1]);
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function find_caret_pos(symbol)
{
	var pos = 0;
	symbols.forEach( function (s)
	{
	    if(s[0].trim() == symbol.trim())
	    {
	    	pos = s[1];
	    	if(s[2] == 3)
	    	{
	    		defaultTab = 3;
	    	}else
	    	{
	    		defaultTab = 2;
	    	}
		}
	});

	return pos
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

}

function trigger_autocomplete()
{
	//alert(get_unique_symbols());
	$('textarea').textcomplete([
    { // tech companies
        words: get_unique_symbols(),
        match: /\B\\(\w*)$/,
        search: function (term, callback) {
            callback($.map(this.words, function (word) {
                return word.indexOf(term) === 0 ? word : null;
            }));
        },
        index: 1,
        replace: function (word) {
            return '\\'+word + ' ';
        }
    }
]);

	$(document).delegate('textarea', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // put caret at right position again
    $(this).get(0).selectionStart =
    $(this).get(0).selectionEnd = start + defaultTab;
  }
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
	if(idList.length != 1){
		currentElement = document.getElementById(id);
		var index;
		for(var i = 0; i<idList.length; i++)
			if(idList[i] == currentElement.id)
				index = i;
			if(index>-1)
				idList.splice(index,1);
		//this code is to add transition effect to the removed elemnet.
		//window.getComputedStyle(currentElement).opacity;
		//currentElement.style.opacity=0;
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

	//part #2 could work only when textareas and inputs are visible!!

	// var hidden_text_area = document.getElementById("hidden-text-area");
	// hidden_text_area.value = all_text;
	// var range = document.createRange();
	// range.selectNode(hidden_text_area);
	// window.getSelection().addRange(range);
	// document.execCommand('copy');

	/*
	This part "part #2 " works fine. However, it is a little bit inefficient because it create a new div and immediately delete it. the reason for this creation is to make the selection for the window object possible!!
	*/



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






