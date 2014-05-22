exports.niceDate = function(datestr)
{
	var date = new Date(datestr);
	var d = date.getDate().length < 2 ? "0" + date.getDate() : date.getDate();
	var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	var m = monthNames[date.getMonth()];
	var y = date.getFullYear();
	return d+' '+m+' '+y;
}