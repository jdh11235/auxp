var util = {
	randomInRange: function(min, max) {
		return Math.round( Math.random() * (max - min) + min );
	}
};

window.addEventListener('load', function() {
	FastClick.attach(document.body);
}, false);
