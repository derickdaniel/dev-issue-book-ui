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
		obj.tags = jsonArray($("#tags").val());

		var jsonData = JSON.stringify(obj);
		console.log(jsonData);

		$.ajax({
			type: "POST",
			url: "http://localhost:8082/issue",
			data: jsonData,
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			success: function(data) {

				alert("Created successfully!")
				location.href = "index.html"
			},
			error: function(data) {

				// Some error in ajax call
				alert("some Error");
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