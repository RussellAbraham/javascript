function extend(object, props){
	for(var prop in props){
		if(props[prop]){
			object[prop] = props[prop]
		}
	}
	return object;
}

function listen(object, events){
	for(var event in events){
		object.addEventListener(event, events[event])
	}
}

function extend(object, props){
	for(var prop in props){
		if(props[prop]){
			object[prop] = props[prop]
		}
	}
	return object;
}

function listen(object, events){
	for(var event in events){
		object.addEventListener(event, events[event])
	}
}

// 

function Ajax(){
	this.transport = new XMLHttpRequest();
	this.data = new FormData();
}

Ajax.prototype = {
	
	get : function(options){	
		
		var self = this;				
		
		this.options = extend({ url : '', responseType : '' }, options);		
		
		listen(this.transport, {			
			
			'readystatechange' : function(){
				if (this.readyState == this.HEADERS_RECEIVED) {			
					var headers = request.getAllResponseHeaders();			
					var arr = headers.trim().split(/[\r\n]+/);			
					var headerMap = {};			
					arr.forEach(function (line) {				
						var parts = line.split(': ');				
						var header = parts.shift();				
						var value = parts.join(': ');				
						headerMap[header] = value;			
					});		
				}				
			},
			
			'error' : function(event){},
			
			'load' : function(){						
				if(this.transport.status === 200){  
					// ok
				} else {
					// handle error
				}
			}	
			
		});
		
		this.transport.open('GET', self.options.url, true);
		this.transport.responseType = self.options.responseType;
		this.transport.send(null);
		
	},
	
	post : function(){
		this.data.append('', '');
		this.data.append('', '');
		this.data.append('', '');
		// 
		this.transport.open('POST', '');		
		this.transport.send(this.data);
	}
	
}

function Index(db){
	this.db = db;
}

Index.prototype = {
	
	// handle errors.. check how to handle upgrades and versions
	open : function(){},
	
	// create and add new object
	create : function(){},

	// iterate over key values
	read : function(){},

	// put new value then resolve
	update : function(){},
	
	// delete single item by UID
	destroy : function(){},
	
	// output a json file backup
	export : function(){},
	
	// json data from XHR
	import : function(){},
	
	// json data from file input
	upload : function(){}
	
}


var request, response, blob;


function getjson(url){
	// assing instance
	request = new XMLHttpRequest();      
	// open "GET" request
	request.open('GET', url);        
	// responseType text is for legacy with 'json' resopnse type
	request.responseType = 'text';        
	//
	request.onload = function(){        
		
		if(request.status === 200){                
			response = JSON.parse(request.response);                
			populate(response);            
		} else {
			console.warn('Network request failed ' + request.status + ':' + request.statusText);            
		}        
	}
	request.send();
}
    
function getjson2(url){
	
	request = new XMLHttpRequest();        
        request.open("GET", url);
        request.responseType = 'text';
	
	request.onreadystatechange = function(){
            if(this.readyState === this.HEADERS_RECEIVED){
                var headers = request.getAllResponseHeaders();
                console.log(headers);
            }
        }
	
        request.onload = function(){
            response = JSON.parse(request.response);
            populate(response);
        }
	

	request.send();
    
}

// GET request for Blob Data
function getimg(url){
        request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';
        request.onload = function(){
            if(request.status === 200){
                response = request.response;
                blob = window.URL.createObjectURL(response);
                populate(blob);
            } else {
                console.info('Network request failed ' + request.status + ':' + request.statusText);            
            }
        }
        request.send();
    }

    function populate(obj){
        //self.postMessage(obj);
    }

})();


// todo : 
// cleanup code, 
// add xhr function to handle arrayBuffer,
// add setup for Workers
