var redmineIssueHistoryPlugin = {
	arrayUnique: function(a) {
		return a.reduce(function(p, c) {
			if (p.indexOf(c) < 0) p.push(c);
			return p;
		}, []);
	},
	
	updateFilter: function() {
		var match = $("#issue_search_history_text").val().toLowerCase();
		var user = $("#issue_search_history_user option:selected").text();
		var attr = $("#issue_search_history_attribute option:selected").text();
		var showNotes = $("#issue_search_history_show_comments").prop("checked");
		var showDetails = $("#issue_search_history_show_details").prop("checked");

		if (match == "" && user == "" && attr == "" && showNotes && showDetails) {
			$("#issue_search_history_magnifier").addClass("issue_search_history_not_applied");
		} else {
			$("#issue_search_history_magnifier").removeClass("issue_search_history_not_applied");
		}

		if (showNotes) {
			$(".journal .wiki").fadeIn();
		} else {
			$(".journal .wiki").fadeOut();
		}
		
		if (showDetails) {
			$(".journal .details").fadeIn();
		} else {
			$(".journal .details").fadeOut();
		}
		
		$(".journal").each(
			function(i, e){
				var el = $(e);
				var forceHide = false;
				var hasDetails = el.hasClass('has-details');
				var hasNotes = el.hasClass('has-notes');
				if (showDetails) {
					if (showNotes) {
						forceHide = false;
					} else {
						forceHide = ! hasDetails;
					}
				} else {
					if (showNotes) {
						forceHide = ! hasNotes;
					} else {
						forceHide = true;
					}
				}
				var notText = match != "" && el.text().toLowerCase().indexOf(match) <= -1;
				var notUser = user != "" && el.find("h4:first .user").text() != user;
				var notAttr = attr != "" && el.find(".details strong").text() != attr;
				if (notText || notUser || notAttr || forceHide)
					el.fadeOut();
				else
					el.fadeIn();
			}
		)
	},
	
	addMagnifier: function() {
		$("div#history h3:first").append(
				"<img src='../images/magnifier.png' id='issue_search_history_magnifier' class='issue_search_history_not_applied'/>"
		);
		$("#issue_search_history_magnifier")
		.click(
			function(){
				var dialog = $("#issue_search_history");
				if (dialog.dialog("isOpen")) {
					dialog.dialog("close");
				} else {
					dialog.dialog("open");
				}
			}
		);
	},

	collectUsers: function() {
		var activeUsers = $(".journal .user").map(
			function(i, e){
				return e.textContent;
			}
		);
		return $(this.arrayUnique(activeUsers.toArray())).sort().toArray();
	},

	collectAttributes: function() {
		var usedAttributes = $(".journal .details strong").map(
			function(i, e){
				return e.textContent;
			}
		);
		return $(this.arrayUnique(usedAttributes.toArray())).sort().toArray();
	},

	clearFilter: function() {
		$("#issue_search_history_user").val("");
		$("#issue_search_history_attribute").val("");
		$("#issue_search_history_text").val("");
		$("#issue_search_history_show_comments").prop("checked", true);
		$("#issue_search_history_show_details").prop("checked", true);
		window.redmineIssueHistoryPlugin.updateFilter();
	},

	process: function() {
		try {
			var usersOptions =
				this.collectUsers()
				.reduce(
					function(p, c) {
						return p + "<option>" + c + "</option>"
					},
					"<option></option>"
				);
			var attrsOptions =
				this.collectAttributes()
				.reduce(
					function(p, c){
						return p + "<option>" + c + "</option>"
					},
					"<option></option>"
				);
		
			var filterForm =
				"<div id='issue_search_history'>" +
					"<form>" +
						"<label>Find in comment" +
							"<input type='text' id='issue_search_history_text'/>" +
						"</label>" +
						"<label>User" +
							"<select id='issue_search_history_user'>" +
								usersOptions +
							"</select>" +
						"</label>" +
						"<label>Modified attribute" +
							"<select id='issue_search_history_attribute'>" +
								attrsOptions +
							"</select>" +
						"</label>" +
						"<label>" +
							"<input id='issue_search_history_show_details' type='checkbox' checked/>" +
							"Display changed attributes" +
						"</label>" +
						"<label>" +
							"<input id='issue_search_history_show_comments' type='checkbox' checked/>" +
							"Display comment" +
						"</label>" +
						"<div align='right'>" +
							"<button onclick='redmineIssueHistoryPlugin.clearFilter();return false;'>Clear</button>" +
							"<button onclick='$(\"#issue_search_history\").dialog(\"close\");return false'>Close</button>" +
						"</div>" +
					"</form>" +
				"</div>";
			$("div#history h3:first").after(filterForm);
			$("#issue_search_history")
			.dialog({
				autoOpen: false,
				closeOnEscape: true,
				position: {
					my: "left bottom",
					at: "right bottom",
					of: "#issue_search_history_magnifier"
				},
				draggable: false,
				resizable: false,
				width: 223,
			});
			$("#issue_search_history").parent().find(".ui-dialog-titlebar").remove();
			
			this.addMagnifier();
			
			$("#issue_search_history_user").change(this.updateFilter);
			$("#issue_search_history_attribute").change(this.updateFilter);
			$("#issue_search_history_text").change(this.updateFilter);
			$("#issue_search_history_text").keyup(this.updateFilter);
			$("#issue_search_history_show_comments").change(this.updateFilter);
			$("#issue_search_history_show_details").change(this.updateFilter);
		} catch (e) {
			console.log(e);
		}
	}
}

redmineIssueHistoryPlugin.process();

window.redmineIssueHistoryPlugin = redmineIssueHistoryPlugin;