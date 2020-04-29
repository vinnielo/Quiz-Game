function init() {
    
   JSON.parse(localStorage.getItem("player"));
  
    
    // Render todos to the DOM
    renderInit();
  }

  function renderInit() {
      
    // Render a new li for each todo
    for (var i = 0; i < player.length; i++) {
      var play = player[i];
  
      var li = document.createElement("li");
      li.textContent = player;
      li.setAttribute("data-index", i);
  
     
    
  
     
      player.appendChild(li);
    }
  }