chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	
	if (request.working === "working") {		
		sendResponse({takeScreenshot : "takeScreenshot"});		
	}
		
}); 