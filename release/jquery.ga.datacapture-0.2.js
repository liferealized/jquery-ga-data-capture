// JavaScript Document
(function($) {

	$.fn.gaDataCapture = function(options) {
		
		var defaults = {  keywords: 'keywords', searchType: 'searchType', searchEngine: 'searchEngine' };
		
		options = $.extend(defaults, options);
		
		var readCookie = function (name) {
			var nameEQ = name + "=",
				ca = document.cookie.split(';');
			
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			
			return null;
		};
		
		var extractUmtzData = function(data) {
			
			var i = 0,
				splitStore = "",
				nameStore = "",
				returnObject = {};
				
			data = data.split('|');
				
			for (var i=0; i < data.length; i++) {
				
				splitStore = data[i].split("=");
				
				if (splitStore.length == 2) {
					
					if (splitStore[0].indexOf('.') != -1) {
						
						// we have a variables name with . in it so grab the very last item	
						nameStore = splitStore[0].split('.');
						splitStore[0] = nameStore[nameStore.length - 1];
					}
					
					returnObject[splitStore[0]] = splitStore[1];
				}
			}
				
			return returnObject;
		};
		
		this.each(function(i) {
						   
			var $this = $(this),
				umtzData = readCookie('__utmz'),
				tagName = $this[0].tagName.toLowerCase(),
				$keyInput = $('<input type="hidden" name="' + options.keywords + '" />'),
				$typInput = $('<input type="hidden" name="' + options.searchType + '" />'),
				$engInput = $('<input type="hidden" name="' + options.searchEngine + '" />');
				
			// only allow the plugin to work on form and if the __umtz cookie is available
			if (tagName === 'form' && umtzData) {
				
				// get the data from our cookie and do the proper manapulation to get a nice object
				umtzData = extractUmtzData(umtzData);
				
				if ($this.find('[name=' + options.keywords + ']').length) {
					$this.find('[name=' + options.keywords + ']').val(unescape(umtzData.utmctr));
				} else {
					$keyInput.val(unescape(umtzData.utmctr));
					$this.prepend($keyInput);
				}
				
				if ($this.find('[name=' + options.searchType + ']').length) {
					$this.find('[name=' + options.searchType + ']').val(unescape(umtzData.utmcmd));
				} else {
					$typInput.val(unescape(umtzData.utmcmd));
					$this.prepend($typInput);
				}
				
				if ($this.find('[name=' + options.searchEngine + ']').length) {
					$this.find('[name=' + options.searchEngine + ']').val(unescape(umtzData.utmcsr));
				} else {
					$engInput.val(unescape(umtzData.utmcsr));
					$this.prepend($engInput);
				}
			}
		});
	};

})(jQuery);

