$(document).ready(function() {

	$("#formId").submit(function(e) {

		e.preventDefault();

		var obj = new Object();
		obj.issueDesc = $("#issueDesc").val();
		obj.issueType = $("#issueType").val();
		obj.cause = $("#rootCause").val();
		obj.resolution = $("#resolution").val();;

		var isResolved = $("#resolved").is(":checked");
		obj.resolved = isResolved;
		console.log(obj.resolved);
		obj.references = jsonArray($("#references").val());
		obj.tagsStr = jsonArray($("#tags").val());

		var jsonData = JSON.stringify(obj);
		console.log(jsonData);

		$.ajax({
			type: "POST",
			url: "http://localhost:8080/dib/issue",
			data: jsonData,
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			headers: {
				"Authorization": "Bearer " + localStorage.getItem('access-token'),
			},
			success: function(response) {
				alert("Created successfully!")
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