$(document).ready(function() {
	$("#header").load("pages/header.html");
	$("#footer").load("pages/footer.html");
});

function home() {
	location.href = "index.html";
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