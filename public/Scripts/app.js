//IIFE - Immediately Invoked Function expression

(function(){
    function Start(){

        console.log("Our express App Started");
        let deletedButtons = document.querySelectorAll('.btn.btn-outline-light');
        for(button of deletedButtons){
            button.addEventListener('click', (event)=>{
                if(!confirm('Are you sure you want to delete this object? It looks important'))
            {   
                    event.preventDefault();
                    window.location.assign('/contact-list');
            }
            })
        }
    }
    window.addEventListener("load",Start);

})();