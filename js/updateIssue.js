$(document).ready(function() {

	var queryParams = location.search;
	var id = queryParams.substring(queryParams.indexOf('=') + 1);
	$.ajax({
		url: "http://localhost:8080/api/issues/" + id,
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access-token'),
		},
		success: function(response) {

			$("#id").val(response.id);
			$("#userid").val(response.userId);
			$("#issueDesc").val(response.issueDesc);
			$("#issueType").val(response.issueType);
			$("#rootCause").val(response.rootCause);
			$("#resolution").val(response.resolution);
			$("#createdAt").val(response.createdAt);

			var isResolved = response.resolved;
			$("#resolved").prop('checked', isResolved)

			jsonArray($("#references").val(response.refs));

            var tags = response.tags;
            var tagMkr = '';
            if (tags != undefined && tags.length > 0) {
        	$.each(tags, function(i, tag) {
            	tagMkr = tagMkr + tag.name + ", ";
        	});
            }
            $("#tags").val(tagMkr);

		},
		error: function(response) {
			console.log("request failed: " + response.status);
			if (response.status == 401) {
				alert("Your session has Expired!! Please login");
				location.href = "login.html";
			}
		}
	});

	//call for update issue details
	$("#editFormId").submit(function(e) {

		e.preventDefault();

		var obj = new Object();
		obj.id = $("#id").val();
		obj.issueDesc = $("#issueDesc").val();
		obj.issueType = $("#issueType").val();
		obj.rootCause = $("#rootCause").val();
		obj.resolution = $("#resolution").val();
		obj.createdAt = $("#createdAt").val();
        obj.userId = $("#userid").val();

		var isResolved = $("#resolved").is(":checked");
		obj.resolved = isResolved;
		console.log(obj.resolved);
		obj.references = jsonArray($("#references").val());
		obj.tagsStr = $("#tags").val()

		var jsonData = JSON.stringify(obj);
		console.log(jsonData);

		$.ajax({
			type: "POST",
			url: "http://localhost:8080/api/issues/",
			data: jsonData,
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			headers: {
				"Authorization": "Bearer " + localStorage.getItem('access-token'),
			},
			success: function(response) {
				alert("Updated successfully!")
				location.href = "index.html"
			},
			error: function(response) {
				console.log("request failed: " + response.status);
			if (response.status == 401) {
				alert("Your session has Expired!! Please login");
				location.href = "login.html";
			}
			}
		});
	});
});
