$(document).ready(function() {
	$("#saveBtn").hide();
	
	$("#add").on("click", function() { //hadle click and "Enter" event
		var val = $("input").val(); //get user input value

		if (val !== '') {
			var elem = $("<li></li>").text(val); //create new element
			$(elem).append("<button class='rem'>X</button>"); //add x button to new element
			$("#mylist").append(elem); //add new element at the end of my list
			$("input").val(""); //clear the input
			$(".rem").on("click", function() { //handle click on x button
				$(this).parent().remove(); //remove "current => this" object
				if ($("#mylist li").length == 0) {
					$("#saveBtn").hide();
				}
			});
			$("#saveBtn").show();
		}
	});

	$('#value').keypress(function(e) {
		if (e.which == 13) {//Enter key pressed
			$('#add').click();//Trigger Add button click event
		}
	});
});