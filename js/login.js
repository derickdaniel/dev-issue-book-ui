$(document).ready(function() {

	$("#loginFormId").submit(function(e) {

		e.preventDefault();

		var obj = new Object();
		obj.username = $("#userName").val();
		obj.password = $("#password").val();

		var jsonData = JSON.stringify(obj);
		console.log(jsonData);

		$.ajax({
			type: "POST",
			url: "http://localhost:8080/authenticate/login",
			crossDomain: true,
			data: jsonData,
			contentType: "application/json; charset=UTF-8",
			dataType: 'json',
			success: function(data) {

				localStorage.setItem("access-token", data.token);
				localStorage.setItem("refresh-token", data.refreshToken);
				localStorage.setItem("user-name", data.username);
				localStorage.setItem("role", data.roles);
				console.log(localStorage);
				
				alert("Welcome back! " + localStorage.getItem("user-name"));
				location.href = "index.html";
			},
			error: function(data) {

				// Some error in ajax call
				alert("some Error: " +data.error());
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