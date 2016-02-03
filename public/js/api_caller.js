$(document).ready(function(){
	loadTopTen();			// Load top ten once document is ready
	$("#loadTopTen").click(function(e){
		loadTopTen();		// reload, when button is clicked
	});
});

function loadTopTen(){
	// irrelevant at the moment (post data is ignored) - but here we could pass in parameters (Argos, 10results)
	var post_data = {"topTen":"Please give me top 10"};
	$.ajax({
		type: "POST",
		url: "/",
		data: post_data,
		success: function(data){
			console.log("req was successful")
		},
		error: function(e){
			alert('failed to reach server!');
			console.log(e.message);
		}
	}).done(function(data){
		displayTopTen(data);
	});
}

function displayTopTen(deals){
	// render our items into the #deals list
	console.log(deals);	// or just log them for now
}
