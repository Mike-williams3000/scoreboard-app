var upDownClick = function(target, intAmount)
				{
                    var json = {};
                    json.target = target;
                    json.intAmount = intAmount;
					$.post(window.location.origin + "/timeChange", json).success( function(data)
                                                {
                                                    console.log("time updated " + data);
                                                    
                                                    
                                                }).
                                                error(function(data, status, headers, config) {
                                                    console.log(data, status, headers, config)
    
                                                });
				};
