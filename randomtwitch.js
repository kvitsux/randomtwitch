var randomtwitch = function() { $.ajax({										//jQuery ajax call
	type: "GET",
	dataType: "jsonp",
	url: 'https://api.twitch.tv/kraken/search/streams?limit=100&q=starcraft',	//calling API, limit currently is 100 and querying for, in my case, StarCraft channels, can also add &offset=xx to offset the search
	success: function(result) {													//on success get our result
		var data = result;
		var filtered = [];														//creating an array for results (less than 10 users)
		for (var i = 0;i < data.streams.length;i++) {
			if (data.streams[i].viewers < 10) {									//picking channels that have less than 10 users
				filtered.push(data.streams[i].channel.name);					//adding them to 'filtered' array
			}
		}
		var picked = Math.floor(Math.random()*filtered.length + 1);				//picking a random channel from 'filtered' array
		var winner = data.streams[picked].channel.name;							//variable of the winner
		$('.result').fadeIn('fast', function() {
			$('.result').wrap('<a target="blank" href="http://twitch.tv/' + winner + '" </a>');	//putting winner in an anchor to open
		});
		
	},
	error: function() {
		alert("Sorry, no server response. Please, try again later.");			//on error default javascript alert
	}
});
};