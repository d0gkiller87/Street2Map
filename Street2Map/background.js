chrome.browserAction.onClicked.addListener(tab => {
	var url = tab.url;
	if (!url.includes('/place/') && url.includes('@')) {
		var coord = url.split('/')[4].substr(1).split(',');
		var combine = cDMS(coord[0], coord[1]) + '/@' + coord[0] + ',' + coord[1];
		chrome.tabs.update(null, {url: 'https://www.google.com.tw/maps/place/' + combine + '?hl=zh-TW'});
	}
});

//https://www.google.com.tw/maps/place/22°36'29.9"N+120°33'35.1"E/@22.6083056,120.5575613
//https://www.google.com.tw/maps/@22.6083076,120.559742,3a,75y,202.77h,90t/data=!3m6!1e1!3m4!1s5e-X6air93u5KBPS0ebzYA!2e0!7i13312!8i6656?hl=zh-TW

function toDMS(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees_i = Math.floor(absolute);
    var minutes_f = (absolute - degrees_i) * 60;
    var minutes_i = Math.floor(minutes_f);
    var seconds = ((minutes_f - minutes_i) * 60).toFixed(1);
    return degrees_i + "°" + minutes_i + "'" + seconds;
}

function cDMS(lat, lng) {
    var latitude = toDMS(lat);
    var latitudeNS = lat >= 0 ? "N" : "S";
    var longitude = toDMS(lng);
    var longitudeEW = lng >= 0 ? "E" : "W";
    return latitude + '\"' + latitudeNS + '+' + longitude + '\"' + longitudeEW;
}