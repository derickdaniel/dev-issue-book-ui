$(document).ready(function() {
	$("#headerId").load("pages/header.html");
	$("#footerId").load("pages/footer.html");
	
	displayUserName();
});

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