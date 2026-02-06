$(document).ready(function() {
	//console.log("auth: " + localStorage.getItem("access-token"));
	displayAllIssues();
});

function displayAllIssues() {
	$.ajax({
		url: "http://localhost:8080/api/issues",
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access-token'),
		},
		success: function (response) {
			generateTable(response);
		},
		error: function (response) {
			handleError(response);
		}
	});
}

function displayIssuesByTag(tagId){
	$.ajax({
		url: "http://localhost:8080/api/issues/tag/" + tagId,
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access-token'),
		},
		success: function(response) {
            generateTable(response);
		},
		error: function(response) {
			handleError(response);
		}
	});
}


function generateTable(response) {
	console.log(response);
	var $allLink = '<div align="right"><b><a href="#" onclick="displayAllIssues()">See All</a></b></div>';
	if (response.length > 0) {
		var $data = $('<table id="mytable" border="2" cellspacing="0" cellpadding="5" width="1400"></table>');
		var header = "<thead><tr><th>Id</th><th>Issue Type</th><th>Issue Description</th><th>Root Cause</th><th>Resolved</th><th>Resolution</th><th>Tags</th><th>Refs</th><th>CreatedAt</th><th>Action</th></tr></thead>";
		$data.append(header);
		$.each(response, function (i, row) {
			var $row = $('<tr align="center"/>');

			/*$row.append($('<td/>').html(++i));*/
			$hidden = $(' <input type="hidden" name="hid" id="userid" value= "' + row.userId + '">');
			$hidden = $(' <input type="hidden" name="hid" id="userid" value= "' + row.userId + '">');
			$row.append($hidden);
			$row.append($('<td/>').html(row.id));
			$hidden = $(' <input type="hidden" name="hid" id="issueDesc" value= "' + row.issueDesc + '">');
			$row.append($hidden);

			$row.append($('<td/>').html((row.issueType !== undefined && row.issueType !== '') ? row.issueType : 'N/A'));
			$hidden = $(' <input type="hidden" name="hid" id="issueType" value= "' + row.issueType + '">');
			$row.append($hidden);

			$row.append($('<td/>').html((row.issueDesc !== undefined && row.issueDesc !== '') ? row.issueDesc : 'N/A'));
			$hidden = $(' <input type="hidden" name="hid" id="issueDesc">');
			$row.append($hidden);


			$row.append($('<td/>').html((row.rootCause !== undefined && row.rootCause !== '') ? row.rootCause : 'N/A'));
			$hidden = $(' <input type="hidden" name="hid" id="cause">');
			$row.append($hidden);

			if (row.resolved) {
				$row.append($('<td/>').html('<input id="cb1" type="checkbox" onclick="return false;" checked=checked class="tick"/>'));
				$hidden = $(' <input type="hidden" name="hid" id="cb1" checked=checked>');
			} else {
				$row.append($('<td/>').html('<input id="cb1" type="checkbox" onclick="return false;" class="nontick"/>' +
					'<br><br><a href="https://www.google.com/search?q=' + row.issueDesc.trim() + '" target="_blank">Google</a>'));
				$hidden = $(' <input type="hidden" name="hid" id="cb1">');
			}
			$row.append($hidden);


			$row.append($('<td/>').html((row.resolution !== undefined && row.resolution !== '') ? row.resolution : 'N/A'));
			$hidden = $(' <input type="hidden" name="hid" id="resolution" value= "' + row.resolution + '">');
			$row.append($hidden);

			var tags = "";
			var anchor = "";
			if (row.tags != undefined && row.tags.length > 0) {
				$.each(row.tags, function (i, tag) {
					//href="#" onclick=\"displayIssuesByTag('"+ tag.id +"');
					console.log(tag.id);
					anchor += '<a style="color: '+tag.color+' " href="#" onclick="displayIssuesByTag('+tag.id+')">'+tag.name+'</a> ';
					//tags += '<span>' + anchor + tag.name + '</a><span>' + ", ";
				});
				$row.append($('<td/>').html(anchor));
			} else {
				$row.append($('<td/>').html("N/A"));
			}
			$hidden = $(' <input type="hidden" name="hid" id="tags" value= "' + row.tags + '">');
			$row.append($hidden);


			$row.append($('<td/>').html(row.refs));
			/*todo*/
			/*if (row.refs != undefined && row.refs.length > 0) {
				let refs = [];
				$.each(row.refs, function(i, ref) {
					refs[i] = '<a href="' + ref + '">' + "ref-" + (i + 1) + "\n" + '</a>';
				});
				$row.append($('<td/>').html(refs));
			} else {
				$row.append($('<td/>').html("N/A"));
			}*/
			$hidden = $(' <input type="hidden" name="hid" id="references" value= "' + row.refs + '">');
			$row.append($hidden);

			/*$row.append($('<td/>').html((row.id !== undefined && row.id !== '') ? row.id : 'N/A'));
			$hidden = $(' <input type="hidden" name="hid" id="id" value= "' + row.id + '">');
			$row.append($hidden);*/
			$row.append($('<td/>').html((row.createdAt !== undefined && row.createdAt !== '') ? row.createdAt : 'N/A'));
			$hidden = $(' <input type="hidden" name="hid" id="createdAt" value= "' + row.createdAt + '">');
			$row.append($hidden);

			$editDelButton = $("<td><button class='btn' id='editBtn' onclick=\"edit('" + row.id + "')\"><b>Edit</b></button> <br><br> <button class='btn' id='delbtn' onclick=\"deleteData('" + row.id + "')\"><b>Delete</b></button></td>");
			$row.append($editDelButton);
			$data.append($row);
		});
		$("#MyDiv").empty();
		$("#MyDiv").append($allLink);
		$("#MyDiv").append($data);
	}
	else {
		console.log("empty!!!");
		$("#MyDiv").append("No data found.");
	}
}

function handleError(response) {
	console.log("request failed: " + response.status);
	if (response.status == 401) {

		$.when(refreshToken()).done(function (result) {
			alert("Refreshing token: " + result);
			if (result) {
				location.href = "index.html";
				console.log("Access token refreshed!");
			} else {
				alert("Your session has Expired!! Please login");
				logout();
			}
		});
	}
}

function checkBox(isResolved) {
	$('#addCheckbox').click(function() {
		var text = $('#newCheckText').val();
		$('#checkboxes').append('<input type="checkbox" /> ' + text + '<br />');
	});
}

function edit(id) {
	console.log("Edit");
	window.location.href = 'updateIssueDetails.html?id=' + id;
}

function deleteData(id) {
	console.log("Delete");

	if (confirm("Are you sure, you want to delete id: " + id + " ?")) {
		$.ajax({
			type: "DELETE",
			url: "http://localhost:8080/api/issues/" + id,
			headers: {
				"Authorization": "Bearer " + localStorage.getItem('access-token'),
			},
			success: function(data) {

				alert("Deleted successfully!")
				location.href = "index.html";
				window.location.reload()
			},
			error: function(data) {
				console.log("request failed: " + response.status);
				if (response.status == 401) {
					location.href = "login.html";
				}
			}
		});
	}
}

function jsonArray(str) {
	arr = [];
	if (str.length > 1) {
		var tagArr = str.split(',');
		$.each(tagArr, function(index, value) {
			arr[index] = value;
		});
	}
	return arr;
}