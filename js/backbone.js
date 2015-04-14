$('body').click(function() {
	$('#resaults').css('display', 'none');
});
  // Fetch Facebook Data
  function searchFacebookData() {
    var imgArray = [];
    var MyQ = $("#HDiscoveryFbSearch").val();

    $.ajax({      
        type: "GET",
        dataType: "json",
        url: 'https://graph.facebook.com/' + MyQ,
        data: {
            access_token: "511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8",
            fields: "name,description,category,location,phone,website,category_list"    
        },
        success: function (data) {	        	 
		 	 var fbdata = JSON.stringify(data);
      	 $('#jname').val(data.name);
      	 $('#jdesc').val(data.description);
      	 $('#jcat').val(data.category);
      	 $('#jloc').val(data.location.street + "," + data.location.city);
		 $('#jlink').val(data.website);
        }
    });
  }  
	// Fetch Facebook Albums
  function searchFacebookUrl1() {
  	var imgArray = [];
    	var fnaArray = [];
    	var MyQ = $("#HDiscoveryFbSearch").val();
	    var imgcount = 0;
	    
    	$.ajax({    
    		async: false,
    		type: "GET",
        	dataType: "json",
        	url: 'https://graph.facebook.com/' + MyQ,
        	data: {
          	access_token: "511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8",
            	fields: "cover,picture,albums"    
        	},
        	success: function (data) {

        		try{
        			if(data.cover.source != null){
	            		imgArray[imgcount] = data.cover.source;
         	 			imgcount++;
	            	}
	            	if(data.picture.data.url != null){
	            		imgArray[imgcount] = data.picture.data.url;
         	 			imgcount++;
	            	}
	        		for (var i = 0; i < data.albums.data.length; i++) {
	                	var albumid = data.albums.data[i].id;
	                	var albumname = data.albums.data[i].name;

	                	$.ajax({     
	                		async: false,
	                  		type: "GET",
	                  		dataType: "json",
	                  		url: 'https://graph.facebook.com/' + albumid,
	                  		data: {
	                      		access_token: "511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8",
	                      		fields: "photos"    
	                  		},
	                  		success: function (data) {
	                  			
	                  			for (var i = 0; i < data.photos.data.length; i++) {
	                    			var images = data.photos.data[i].images;
	                      			for(var k = 0; k < images.length; k++){
	                            		var srcImg = images[k].source;

	                            		if(srcImg!=null){
	                              			var fileNameIndex = srcImg.lastIndexOf("/") + 1;
	                             			var filename = srcImg.substr(fileNameIndex);  
	                              		
	                             			if($.inArray(filename, fnaArray) == -1){
	                             				if(imgcount < 124){			                            				
		                            				imgArray[imgcount] = srcImg
		                                			fnaArray[imgcount] = filename;
		                               	 			imgcount++;
	                             				}
	                             				else{
	                             					break;
	                             				}	                                				                                
	                              			}  
	                        			}                                          
	                      			}
	                      			if(imgcount>=124) break;
	            				}                   
	                  		}
	                	});
	                	if(imgcount>=124) break;
	        		}
		    	}catch(e){     		    		

		    	}
        	}
    	});
  	
    	/*if(imgcount>=1 && imgcount<124){
  		var noiter = 124 / imgcount;
  		var itersize = imgcount;
  		try{
	    		for(var iter = 1; iter < noiter; iter++){
	        		for(var newx = 0; newx < itersize; newx++){
	        			imgcount++;
	        			
	        			if(imgcount == 124){
	        				break;
	        			}
	        		}
	    		}	    			
  		}catch(e){}
    	}*/
      $('#fbalbum').val(JSON.stringify(imgArray));

  }
  // Fetch Facebook Albums
  function searchFacebookAlbums() {
    searchFacebookUrl1();
    searchFacebookData();
  }
	function getMapData(placeJSON){
		var obj = jQuery.parseJSON(placeJSON);
		$('#pljson').val(placeJSON);
	}

///////////////////////////Index Registration JS Zone//////////////////////////////////////////////////