var screenshot = {
    content : document.createElement("canvas"),
    data : '',
    
    init : function(){
        this.initEvents();
    },
    
    saveScreenshot : function() {
        var image = new Image();
        image.onload = function() {
            var canvas = screenshot.content;
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);
            
            var link = document.createElement('a');
            link.download = "download.png";
            link.href = screenshot.content.toDataURL();
            link.click();
            screenshot.data = '';
        };        
        image.src = screenshot.data; 
    },
    
    initEvents : function() {
		chrome.browserAction.onClicked.addListener(function(tab) {
			chrome.tabs.captureVisibleTab(null, {format : "png", quality : 100}, function(data) {
				screenshot.data = data;

                chrome.tabs.query({active : true, currentWindow : true}, 
                function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {working : "working"}, function(response) {
						if (response.takeScreenshot === "takeScreenshot") {
                            var r=confirm("Do you want to take a screenshot?")
                            if (r==true){
                                screenshot.saveScreenshot();
                            }else{
                                screenshot.data = '';
                            }                            
						}
					});
				}); 

			});
		});
	}
};

screenshot.init();