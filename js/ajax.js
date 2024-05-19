$(document).ready(function() {
	$.ajax({
		url: "http://localhost:8082/issue",
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		success: function(response) {

			if (response.length > 0) {
				console.log(response);
				var $data = $('<table id="mytable" border="2" cellspacing="" cellpadding="4" width="1300"> </table>');
				var header = "<thead><tr><th>Seq.</th><th>Issue Type</th><th>Issue Description</th><th>Cause</th><th>Resolved</th><th>Resolution</th><th>Tags</th><th>Refs</th><th>Id</th><th>Action</th></tr></thead>";
				$data.append(header);
				$.each(response, function(i, row) {
					var $row = $('<tr align="center"/>');

					$row.append($('<td/>').html(++i));
					$hidden = $(' <input type="hidden" name="hid" id="issueDesc" value= "' + row.issueDesc + '">');
					$row.append($hidden);

					$row.append($('<td/>').html((row.issueType !== undefined && row.issueType !== '') ? row.issueType : 'NA'));
					$hidden = $(' <input type="hidden" name="hid" id="issueType" value= "' + row.issueType + '">');
					$row.append($hidden);

					$row.append($('<td/>').html((row.issueDesc !== undefined && row.issueDesc !== '') ? row.issueDesc : 'NA'));
					$row.append($('<td/>').html((row.cause !== undefined && row.cause !== '') ? row.cause : 'NA'));


					if (row.resolved) {
						$row.append($('<td/>').html('<input id="" type="checkbox" onclick="return false;" checked=checked class="tick"/>'));
						$hidden = $(' <input type="hidden" name="hid" id="issueDesc" checked=checked>');
					} else {
						$row.append($('<td/>').html('<input id="" type="checkbox" onclick="return false;" class="nontick"/>' +
							'<br><br><a href="https://www.google.com/search?q="' + row.issueType + ">Google</a>"));
						$hidden = $(' <input type="hidden" name="hid" id="issueDesc">');
					}
					$row.append($hidden);


					$row.append($('<td/>').html((row.resolution !== undefined && row.resolution !== '') ? row.resolution : 'NA'));
					$hidden = $(' <input type="hidden" name="hid" id="resolution" value= "' + row.resolution + '">');
					$row.append($hidden);

					var tags = "";
					if (row.tags != undefined && row.tags.length > 0) {
						$.each(row.tags, function(i, tag) {
							tags += tag + ", ";
						});
						$row.append($('<td/>').html(tags));
					} else {
						$row.append($('<td/>').html("NA"));
					}
					$hidden = $(' <input type="hidden" name="hid" id="tags" value= "' + row.tags + '">');
					$row.append($hidden);


					if (row.references != undefined && row.references.length > 0) {
						let refs = [];
						$.each(row.references, function(i, ref) {
							refs[i] = '<a href="' + ref + '">' + "reference-link-" + (i + 1) + "\n" + '</a>';
						});
						$row.append($('<td/>').html(refs));
					} else {
						$row.append($('<td/>').html("NA"));
					}
					$hidden = $(' <input type="hidden" name="hid" id="references" value= "' + row.references + '">');
					$row.append($hidden);

					$row.append($('<td/>').html((row.id !== undefined && row.id !== '') ? row.id : 'NA'));
					$hidden = $(' <input type="hidden" name="hid" id="id" value= "' + row.id + '">');
					$row.append($hidden);

					$editDelButton = $("<td><button class='btn' id='editBtn' onclick=\"edit('" + row.id + "')\"><b>Edit</b></button> <br><br> <button class='btn' id='delbtn' onclick=\"deleteData('" + row.id + "')\"><b>Delete</b></button></td>");
					$row.append($editDelButton);
					$data.append($row);
				});
				$("#MyDiv").empty();
				$("#MyDiv").append($data);
			}
			else {
				console.log("empty!!!")
			}
		}
	});

	/*	if ($('#staticTbl tr').length > 0) {
	
			//$('#input-1').trigger('change');
		}

	$("#staticTbl tr:gt(0)").each(function() {
		$(this).find('input').trigger('change');
		console.log("trigger");
	});*/

});

function checkBox(isResolved) {
	$('#addCheckbox').click(function() {
		var text = $('#newCheckText').val();
		$('#checkboxes').append('<input type="checkbox" /> ' + text + '<br />');
	});
}

function edit(id) {
	console.log("Edit");
	//$("#id").val()
	window.location.href = 'editIssueDetails.html?id=' + id;
}

function deleteData(id) {
	console.log("Delete");

	//call for delete issue data by id
	if (confirm("Are you sure, you want to delete id: " + id + " ?")) {
		$.ajax({
			type: "DELETE",
			url: "http://localhost:8082/issue/" + id,
			success: function(data) {

				alert("Deleted successfully!")
				location.href = "index.html";
				window.location.reload()
			},
			error: function(data) {

				alert("some Error");
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