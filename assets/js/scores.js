var playerList = document.querySelector("#highscores1");
// var clearBtn = document.querySelector("#clear");
    
    
  

  function renderInit() {
      var storedPlayer = JSON.parse(localStorage.getItem("player"));
    for (var i = 0; i < storedPlayer.length; i++) {
       user = storedPlayer[i];
  
      h2El = document.createElement("h2");
      h2El.textContent = user.initials + "-" + user.score ;
      playerList.appendChild(h2El);
    }
  }

//   clearBtn.addEventListener("click", function(){
//       localStorage.removeItem("player")
//       playerList.textContent = "";
//   })



  renderInit();