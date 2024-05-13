$(document).ready(function() {
	$.ajax({
		url: "http://localhost:8082/issue",
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		success: function(response) {

			if (response.length > 0) {
				console.log(response);
				var $data = $('<table id="mytable" border="1" cellspacing="0" cellpadding="3" width="1000"> </table>');
				var header = "<thead><tr><th>Seq.</th><th>Issue Type</th><th>Issue Description</th><th>Cause</th><th>Resolved</th><th>Resolution</th><th>Tags</th><th>Refs</th><th>Id</th><th>Action</th></tr></thead>";
				$data.append(header);
				$.each(response, function(i, row) {
					var $row = $('<tr align="center"/>');
					$row.append($('<td/>').html(i));
					$hidden = $(' <input type="hidden" name="hid" value= "' + row.issueDesc + '">');
					$row.append($hidden);

					$row.append($('<td/>').html((row.issueType !== undefined && row.issueType !== '') ? row.issueType : 'NA'));
					$row.append($('<td/>').html((row.issueDesc !== undefined && row.issueDesc !== '') ? row.issueDesc : 'NA'));
					$row.append($('<td/>').html((row.cause !== undefined && row.cause !== '') ? row.cause : 'NA'));
					$row.append($('<td/>').html((row.resolved !== undefined && row.resolved !== '') ? row.resolved + "" : 'NA'));
					$row.append($('<td/>').html((row.resolution !== undefined && row.resolution !== '') ? row.resolution : 'NA'));

					var tags = "";
					$.each(row.tags, function(i, tag) {
						tags += tag + ", ";
					});
					$row.append($('<td/>').html(tags));


					if (row.references != undefined && row.references.length > 0) {
						let refs = [];
						$.each(row.references, function(i, ref) {
							refs[i] = '<a href="' + ref + '">' + "reference-link-" + (i + 1) + "\n" + '</a>';
						});
						$row.append($('<td/>').html(refs));
					} else {
						$row.append($('<td/>').html("NA"));
					}

					$row.append($('<td/>').html((row.id !== undefined && row.id !== '') ? row.id : 'NA'));


					$editButton = $("<button class='editbtn' id='mybtn'>Edit</button>");
					$row.append($editButton);
					$deleteButton = $("<button class='deletebtn' id='delbtn'>Delete</button>");
					$row.append($deleteButton);
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
});