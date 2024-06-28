$(document).ready(function() {
	//$("#headerId").load("pages/header.html");
	//$("#footerId").load("pages/footer.html");

	displayUserName();
});

function refreshToken() {

	var obj = new Object();
	obj.refreshToken = localStorage.getItem("refresh-token");
	var jsonData = JSON.stringify(obj);
	console.log(jsonData);

	return $.ajax({
		type: "POST",
		url: "http://localhost:8080/authenticate/refreshtoken",
		crossDomain: true,
		data: jsonData,
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		success: function(data) {
			alert("Refresh token call success " + data.status);

			localStorage.setItem("access-token", data.accessToken);
			localStorage.setItem("refresh-token", data.refreshToken);
			console.log(localStorage);
			
			return true
		},
		error: function(data) {
			alert("Refresh token call failed " + data.status);
			
			alert("Your session has Expired!! Please login");
			logout();
		}
	});
}

function home() {
	location.href = "index.html";
}

function displayUserName() {

	var name = localStorage.getItem("user-name");
	if (name != null) {
		$("#userNameId").html("Welcome, " + name);
	}
}

function logout() {
	clearUser();
	location.href = "login.html";
}

function login() {
	location.href = "login.html";
}

function createAccount() {
	location.href = "registerUser.html";
}

function clearUser() {
	$("#userNameId").html("");
	localStorage.removeItem("access-token");
	localStorage.removeItem("refresh-token");
	localStorage.removeItem("user-name");
	localStorage.removeItem("role");
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