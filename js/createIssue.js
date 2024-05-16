$(document).ready(function() {

	$("#formId").submit(function(e) {

		e.preventDefault();

		var obj = new Object();
		obj.issueDesc = $("#issueDesc").val();
		obj.issueType = $("#issueType").val();
		obj.cause = $("#rootCause").val();
		obj.resolution = $("#resolution").val();;
		obj.resolved = $("#resolved").val();
		obj.references = $("#references").val();
		obj.tags = $("#tags").val();
		var jsonData = JSON.stringify(obj);

		console.log(jsonData);

		$.ajax({
			type: "POST",
			url: "http://localhost:8082/issue",
			data: jsonData,
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			success: function(data) {

				// Ajax call completed successfully
				alert("Form Submited Successfully");
			},
			error: function(data) {

				// Some error in ajax call
				alert("some Error");
			}
		});
	});
});