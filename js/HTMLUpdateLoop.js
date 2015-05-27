var updateHTML = 
{

	outputs:[],
	
	init:function()
		{
			this.outputs = document.getElementsByClassName("clockOutput");
            this.update();
		},
    update: function(){
        this.outputs.forEach(function(i){
            i.innerHTML = gameClocks[i].ms;
        })
    }
};
    
                             
                             
                    

                             
            
