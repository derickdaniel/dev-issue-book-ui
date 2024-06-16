$(document).ready(function() {

	$("#userFormId").submit(function(e) {

		e.preventDefault();

		var obj = new Object();
		obj.username = $("#username").val();
		obj.email = $("#email").val();
		obj.password = $("#password").val();
		obj.roles = userRole();

		var jsonData = JSON.stringify(obj);
		console.log(jsonData);

		$.ajax({
			type: "POST",
			url: "http://localhost:8080/authenticate/signup",
			data: jsonData,
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			headers: {
				"Authorization": "Bearer " + localStorage.getItem('access-token'),
			},
			success: function(response) {
				alert("Created successfully!")
				location.href = "login.html"
			},
			error: function(response) {
				alert(response.status + " " + response.responseJSON.message);
				console.log("request failed: " + response.status);
			}
		});
	});
});


function userRole() {
	arr = [];
	arr[0] = "ROLE_USER";
	return arr;
}