$(document).ready(function() {
	loadTasks();
	$("#saveBtn").hide();

	$("#add").on("click", function() { //hadle click and "Enter" event
		var val = $("input").val(); //get user input value

		if (val !== '') {
			addNewTaskToList(null, val, false);
			$("#saveBtn").show();
		}
	});

	$('#value').keypress(function(e) {
		if (e.which == 13) {//Enter key pressed
			$('#add').click();//Trigger Add button click event
		}
	});

	$(document).on('click', "#xid", function() { //handle click on x button
		$(this).parent().parent().remove(); //remove "current => this" object
		if ($("#mylist li").length == 0) {
			$("#saveBtn").hide();
		}
	});
	
	$(document).on("click", ".tick", function() {
		if ($(this).parent().parent().attr('class') == 'compl') {
			$(this).parent().parent().removeClass();
			$("#doneVal").val(false);
		} else {
			$(this).parent().parent().addClass("compl");
			$("#doneVal").val(true);			
		}
	});

	//save to db
	$("#saveAllId").on("click", function() {
		var jsonData = JSON.stringify(createTaskJson());
		console.log(jsonData);
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/dib/task",
			data: jsonData,
			contentType: "application/json; charset=UTF-8",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem('access-token'),
			},
			success: function(response) {
				getTasks();
			},
			error: function(response, error) {
				console.log("request failed: " + response.status);
				if (response.status == 401) {
					location.href = "login.html";
				}
			}
		});
	});
});

function getTasks() {
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/dib/tasks",
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access-token'),
		},
		success: function(response) {
			console.log(response);
			var elem = "";
			$.each(response, function(k, v) {
				elem += "<h3>" + k + "</h3>";
				elem += "<ul class='tasklist'>"
				v.forEach(function(task, index) {
					elem += '<li id="'+ task.taskId +'">' + task.taskDesc + '</li>';
					elem += '<input id="doneVal" type="hidden" value="' + task.completed + '"/>';
					elem +=
 '<div style="display: inline-flex;"><input id="cb1" type="checkbox" onclick="return false" checked=checked class="tick"/> <button onclick=delTask("'+task.taskId +'") class="rem">X</button></div>';
				});
				elem += "</ul>"
			});
			$("#taskResult").html(elem);
		},
		error: function(response, error) {
			console.log("request failed: " + response.status);
			if (response.status == 401) {
				location.href = "login.html";
			}
		}
	});
}

function getTodaysTasks() {
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/dib/tasks/today",
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access-token'),
		},
		success: function(response) {
			console.log(response);
			if (response.length > 0) {
				$("#saveBtn").show();
				$("#mylist").empty();
				response.forEach(function(task, index) {
					addNewTaskToList(task.taskId, task.taskDesc, task.completed);
				});
			} else {
				$("#mylist").empty();
				$("#saveBtn").hide();
			}
		},
		error: function(response, error) {
			console.log("request failed: " + response.status);
			if (response.status == 401) {
				location.href = "login.html";
			}
		}
	});
}

function createTaskJson() {
	noteArr = [];
	var listItems = $("#mylist li");
	if (listItems.length > 0) {
		listItems.each(function(idx, li) {
			noteArr[idx] = {
				taskDesc: $(li).children().first().text().trim(),
				completed: ($(li).children().first().next().val() === 'true'),
				taskId: $(li).attr('id')
			};
		});
	}
	return { tasks: noteArr };
}

function addNewTaskToList(id, val, isDone) {
	var elem = createTaskList(id, val, isDone);
	$("#mylist").append(elem); //add new element at the end of my list
	$("input").val("");
}

function createTaskList(id, val, isDone) {
    var elem = $('<li id="' + id + '"></li>'); //create new element
    $(elem).append("<span>" + val + " </span>");
    $(elem).append('<input id="doneVal" type="hidden" value="' + isDone + '"/>');
    $(elem).append('<div style="display: inline-flex;"><input id="cb1" type="checkbox" onclick="return false" checked=checked class="tick"/> <button id="xid" class="rem">X</button></div>');
    return elem;
}

function delTask(taskId) {
	debugger;
	$.ajax({
		type: "DELETE",
		url: "http://localhost:8080/dib/tasks/" + taskId,
		contentType: "application/json; charset=UTF-8",
		/*		dataType: 'json',*/
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('access-token'),
		},
		success: function(response) {
			loadTasks();
		},
		error: function(response, error) {
			console.log("request failed: " + response.status);
			if (response.status == 401) {
				location.href = "login.html";
			}
		}
	});
}

function loadTasks() {
	getTasks();
	getTodaysTasks();
}
