/**
 * @author Phull, Raghuveer
 */

var contacts = [ ];

function displayAddMenu( ) {
	var addMenu = document.getElementById( 'add-menu' );
	addMenu.style.display = 'block';
}

function removeFromJSON( input ) {
	var length = contacts.length;
	var newJson = [ ];

	for ( var i = 0; i < length; i++ ) {
		if ( i !== input ) {
			newJson.push( contacts[ i ] );
		}
	}

	printTable( newJson );
	contacts = newJson;
	hideAll( );
}

function printTable( input ) {
	var length = input.length;

	var myTable = "<thead> ";
	myTable += "<th>First Name</th>";
	myTable += "<th>Last Name</th>";
	myTable += "<th>Contact Number</th>";
	myTable += "<th>Remove</th>";
	myTable += "</thead>";
	myTable += "<tbody>";

	for ( var i = 0; i < length; i++ ) {
		myTable += "<tr>";
		myTable += "<td>" + input[ i ].first_name + "</td>";
		myTable += "<td>" + input[ i ].last_name + "</td>";
		myTable += "<td>" + input[ i ].contact_number + "</td>";
		myTable += "<td> <input type='button' value='remove' onclick='removeFromJSON(" + i + ")' /></td>";
		myTable += "</tr>";
	}

	myTable += "</tbody>";

	var table = document.getElementById( 'contact' );
	table.innerHTML = myTable;
	return true;
}

function validate( input, type ) {

	console.log( input + " " + type );
	if ( input.length < 0 ) {
		return false;
	}

	var valid = {
		"number" : function( input ) {
			var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
			// Copy pasted reg ex from google.com
			if ( input.match( phoneno ) ) { 
				return input;
			} else {
				var newprompt = prompt ('The input is not like phone number. Please enter phone number again..');
				return validate(newprompt, 'number');
			}

		},
		"text" : function( input ) {
			var letters = /^[a-zA-Z]+$/;
			//console.log (input.match(letters));
			if ( input.match( letters ) ) { 
				return input;
			} else {
				var newprompt = prompt ('The input is not text. Please enter text value again..');
				return validate(newprompt, 'text');
			}
		},
		"default" : function( ) {
			alert( 'Invalid input type..' );
			return false;
		}
	};

	return valid[type]( input );
}

function addContact( ) {
	var first = validate ( document.getElementById( 'first-name' ).value, 'text');
	var last = validate (document.getElementById( 'last-name' ).value, 'text');
	var contactNumber = validate (document.getElementById( 'contact-number' ).value, 'number');

	contacts.push( {
		first_name : first,
		last_name : last,
		contact_number : contactNumber
	} );

	document.getElementById( 'first-name' ).value = '';
	document.getElementById( 'last-name' ).value = '';
	document.getElementById( 'contact-number' ).value = '';

	hideAll( );
}

function exportContacts( ) {
	var textArea = document.getElementById( 'text-area' );
	var json = JSON.stringify( contacts );
	textArea.value = json;
}

function importContacts( ) {
	var textArea = document.getElementById( 'import-area' );
	var json = JSON.parse( textArea.value );
	contacts = json;
	printTable( contacts );
}

function hideAll( ) {
	var addMenu = document.getElementById( 'add-menu' );
	addMenu.style.display = 'none';
	printTable( contacts );
}
