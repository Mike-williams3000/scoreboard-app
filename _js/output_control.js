var OUTPUT_CONTROL =
    {
        ticker:null,
        outputs:{},
        fullscreen:function()
        {
                var element = document.body; // Make the body go full screen.
                var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

                 if (requestMethod) 
                    { // Native full screen.
                    requestMethod.call(element);
                    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                    var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }}
            element.style.backgroundImage="url('/uploads/background.jpg')";
            element.style.backgroundSize="cover";
        },
        

        init: function()
            {

                this.collectDomElementsByTag("div", "OutputL", this.outputs);
                OUTPUT_CONTROL.ticker = setInterval(function()
                                                            {
                                                                OUTPUT_CONTROL.update();
                                                            },100);
                
            },
    
        collectDomElementsByTag:function(tagName, strToMatch, objStore)
            {
                var arrTags = document.getElementsByTagName(tagName);
                for (var i=0; i< arrTags.length; i++)
                    {
                        var intIndex = arrTags[i].id.indexOf(strToMatch)
                        if (intIndex != -1)
                            {
                                var strId = arrTags[i].id.slice(0, intIndex);
                                objStore[strId] = arrTags[i];
                                objStore[strId].strId = strId;
                            }
                    }
            },
            
        update: function ()
            {
                for (var i in OUTPUT_CONTROL.outputs)
                    {
                        if (localStorage.getItem(OUTPUT_CONTROL.outputs[i].strId) !==null)
                        {
                            OUTPUT_CONTROL.outputs[i].innerHTML = localStorage.getItem(OUTPUT_CONTROL.outputs[i].strId);
                        }
                    }
            }

        
    }
