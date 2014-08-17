var randomtwitch = function() { $.ajax({											//jQuery ajax call
	type: "GET",
	dataType: "jsonp",
	url: 'https://api.twitch.tv/kraken/search/streams?limit=100&q=starcraft',		//calling API, limit currently is 100 and querying for, in my case, StarCraft channels, can also add &offset=xx to offset the search
	success: function(result) {														//on success get our result
		var data = result;
		var filtered = [];															//creating an array for results
		for (var i = 0;i < data.streams.length;i++) {								
			if (data.streams[i].viewers < 10) {										//choosing channels that have less than 10 users and pushing them to the array created
				filtered.push(data.streams[i].channel.name);
			}
		}
		var picked = Math.floor(Math.random()*filtered.length + 1);					//picking a random channel from 'filtered' array
		var winner = data.streams[picked].channel.display_name;						//variable for display name for anchor result
		var name = data.streams[picked].channel.name;								//variable for channel name for anchor result
		var randomized = '<a href="http://twitch.tv/' + name + '" target="_blank" class="ulookpretty">' + winner + '</a>';	//variable for the result html code		
		$('main > a').fadeOut(function(){											//fading out the RANDOMIZE button
			$('main').append(randomized);											//appending code to target element
		});		
	},
	error: function() {
		alert('Something went wrong. Please, try again later.');					//on error default javascript alert
	}
});
};