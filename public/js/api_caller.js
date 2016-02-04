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

function displayTopTen(theDeals){
	// render our items into the #deals list
	$('#deals').empty();
	for (var i=0;i<10;i++){
		var temp = theDeals.deals.items[i].temperature;
		temp = Math.round(temp);	// rounded temperature, because it looks much nicer
		var price = theDeals.deals.items[i].price;
		var url_deal = theDeals.deals.items[i].deal_link;
		var image_url = theDeals.deals.items[i].deal_image;
		// "http://static.hotukdeals.com/images/threads/2388148_1.jpg"
		// First 44 are always the same & remove the file type (any length)
		var image_id = image_url.substring(44).split('.')[0];	// hacky way to get image id
		var argos_link = "http://www.hotukdeals.com/visit?m=5&q=" + image_id;
		var desc = theDeals.deals.items[i].description;

		$('#deals').append(
			'<li class="ind_deal">' +
				'<span class="temp">' + temp + '&deg;</span>' +
				'<span class="price">&pound;' + price + '</span>' +
				'<div class="deal_wrap">' +
					'<img class="product_image" src="' + image_url +  '"/>' +
					'<p class="desc">' + desc.substr(0, 50) + ' <a class="more" href="#more">more...</a></p>' +
					'<a class="argos_link" href="' + argos_link + '">Argos</a>' +
				'</div>' +
			'</li>'
		);
	}
	console.log(theDeals);
}
