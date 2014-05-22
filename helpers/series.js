var Series = require("../models/series.js")

setCurrent = function(series_id, callback)
{
	if(series_id != null)
	{
		Series.find({where: {id: series_id}})
		.complete(function(err, series) {
			if(!err && series)
			{
				callback(series);
			}

			if (err || !series)
			{
				getCurrent(callback)
			}
		});
	}
	else
	{
		getCurrent(callback);
	}

}
getCurrent = function(callback)
{
	Series.find(
		{where: 
			{start_date:
				{
					lte: new Date(),
				}
			},
		sort: 'start_date DESC'})
	.complete(function(err, series) {
		if(!error && series)
			setCurrentCallback(series.id, callback);
		else
		{
			callback(null);
		}
	});
}
module.exports.setCurrent = setCurrent;