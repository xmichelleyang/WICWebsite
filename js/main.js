
//google analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45993841-1', 'ucsd.edu');
  ga('send', 'pageview');


/* populates a table ('id') with xml data ('file')
 * if displayUpcoming, don't display expired events
 */

function populateEventsTable(id, file, displayUpcoming) {
		$(document).ready( function() {
			$.ajax({
				type: "GET",
				url: file,
				dataType: "xml",
				success: function(data) {
				  var table = $("#" + id + " tbody");
				  $(data).find("event").each(function () {
				  	  var isExpired = parseInt($(this).find("expire").text()) < (getTodaysDate() - 3);
					  if( (displayUpcoming && !isExpired) || (!displayUpcoming && isExpired) ) {
						var row = document.createElement('tr');
						var td1 = document.createElement('td');
						var td2 = document.createElement('td');
						var td3 = document.createElement('td');
					
						td1.setAttribute('class', 'desc');
						td2.setAttribute('class', 'date');
						td3.setAttribute('class', 'location');
						td1.innerHTML = "<h4><span class='see-more-arrow'>&#9662;</span> " + $(this).find("title").text() + "</h4><div class='desc-content'>" +  $(this).find("desc").text() + "</div>";
						td2.innerHTML = $(this).find("date").text();
						td3.innerHTML = $(this).find("location").text();
					
						row.appendChild(td1);
						row.appendChild(td2);
						row.appendChild(td3);
						table.append(row);   
					  }       
				  });
				  
			  
				  //selectable table
				  $("#" + id + " tr").mousedown(function(e) {
					//don't override clicking on links 
				  	if(e.target.nodeName.toLowerCase() == 'a') return;
					
					if($(this).hasClass("selected")) 
						$(this).removeClass("selected");
					else 
						$(this).addClass("selected");
				  });
			  
				}
			});
		});
	}
	
/* returns today's date as an int */
function getTodaysDate() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	if( month < 10 ) month = "0" + month;
	if( date  < 10 ) date  = "0" + date;
	
	var stringDate = year + "" + month + "" + date;
	
	return parseInt(stringDate);
}