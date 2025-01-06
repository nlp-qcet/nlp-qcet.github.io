const element_h = {
	'Q': 'quality',
	'C': 'correctness',
	'G': 'goodness',
	'F': 'feature',
	'O': 'in_own_right',
	'I': 'relative_to_input',
	'E': 'relative_to_external',
	'f': 'form',
	'c': 'content',
	'b': 'both'
};

const URL = "http://nlgtest.ddns.net:35241"





function toggleDetails(element_id) {
	var toggle_element = document.getElementById(element_id + "_toggle");

	var details_element = document.getElementById(element_id + "_details");
	

	if (toggle_element.innerHTML == "show details") {
		toggle_element.innerHTML = "hide details";
		toggle_element.title = "Hide the details of this node."
		details_element.style.display = "block";
	} else {
		toggle_element.innerHTML = "show details";
		toggle_element.title = "Show the details of this node below."
		details_element.style.display = "none";
	}
	
}




function toggleCollapse(element_id){
	var element = document.getElementById(element_id);
	var span_children = element.children;

	var img_element = document.getElementById(element_id + "_button");

	if (img_element.src == URL + "/static/img/plus.png") {
		img_element.src = URL + "/static/img/minus.png";
		img_element.title = "Collapse subtree."
	} else {
		img_element.src = URL + "/static/img/plus.png";
		img_element.title = "Show child nodes."
	}

	// Find out if we are showing or hiding
	if (span_children.length > 0) {
		var value = null;

		for (var i = 0; i < span_children.length; i++) {
		  	var span_child = span_children[i];
		  	var div_children = span_child.children;

		  	if (div_children.length > 0) {

			  	var div_child = div_children[0];

			  	// alert(div_child.id + div_child.classList);
		  	
			  	if (div_child.classList.contains("taxonomy_search_node")) {

			  		if (value == null) {
			  			if (div_child.style.display == "block") {
			  				value = "none";
			  			} else {
			  				value = "block";
			  			}
			  		}
			  		toggleCollapseHelper(div_child, value, true);
			  	}
			  }
		}
	}
}
	
	

function toggleCollapseHelper(element, value, recursive){
	element.style.display = value;

	if (recursive == true && value == "none") {
		var span_children = element.children;

		for (var i = 0; i < span_children.length; i++) {
		  	var span_child = span_children[i];
		  	var div_children = span_child.children;

		  	if (div_children.length > 0) {

		  		var div_child = div_children[0];

			  	if (div_child.classList.contains("taxonomy_search_node")) {
			  		toggleCollapseHelper(div_child, value, recursive);
			  	}
			}
		}

		var img_element = document.getElementById(element.id + "_button");
		if (img_element != null) {
			img_element.src = URL + "/static/img/plus.png";
		}

		var toggle_element = document.getElementById(element.id + "_toggle");
		toggle_element.innerHTML = "show details";

		var details_element = document.getElementById(element.id + "_details");
		details_element.style.display = "none"
	}
}

// FIXME - do not display invalid combinations
function updatePrune(){

	var h = { 
	    "a":0, 
	    "b":1, 
	    "c":2
	};
	
	var elements = document.getElementsByClassName('taxonomy_span');
	for (let i = 0; i < elements.length; i++) {
		let element = elements[i];
		let search_key = element.getAttribute("prune_key");

		if (search_key == "Q") {
			continue;
		}


		let hide = false;

		for (let i = 0; i < search_key.length; i++) {
		  	let c = search_key.charAt(i);
			for (var x in h) {
				var search_select = document.getElementById("select_"+x);
				let v = search_select.value;
				if (v != "."){
					if (search_key.includes(v) == false) {
						hide = true;
					}
				}
				
			};

		}

		if (hide == true) {
			element.style.display = "none"
		} else {
			element.style.display = "block"
		}
	}
};