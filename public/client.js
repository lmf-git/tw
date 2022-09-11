
(function () {

	requirejs.config({
	    enforceDefine: true,
    	config: {
		    text: { 
		        useXhr: function (url, protocol, hostname, port) { 
		            //return true if you want to allow this url, given that the 
		            //text plugin thinks the request is coming from protocol, hostname, port. 
		            return true;
		        } 
		    }
    	},
	    shim: {
	    	'ko': {
	    		deps: [],
	    		exports: 'ko'
	    	}
	    },
	    paths: {
            'ko': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min',
			'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min'
	    },
	    baseUrl: 'http://127.0.0.1:3000'
	});

	// Include scripts menu.
	require(['Menu'], function(menu) {
        console.log(menu);
		menu.open();
	});	

})();