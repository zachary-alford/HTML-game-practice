let game = {
  // Start initializing objects, preloading assets and display start screen
  init: function() {
    // Get handler for game canvas and context
    game.canvas = document.getElementById("gamecanvas");
    game.context = game.canvas.getContext("2d");

    // Hide all game layers and display the start screen
    game.hideScreens();
    game.showScreen("gamestartscreen");
  },

  hideScreens: function() {
    let screens = document.getElementsByClassName("gamelayer");

    // iterate through all game layers and set there display to none
    for (let i = screens.length - 1; i>= 0; i--) {
      let screen = screens[i];

      screen.style.display = "none";
    }
  },

  hideScreen: function(id) {
    let screen = document.getElementById(id);

    screen.style.display = "none"; 
  },

  showScreen: function(id) {
    let screen = document.getElementById(id);

    screen.style.display = "block";
  },
};

// Initialize game once page has fully loaded
window.addEventListener("load", function() {
  game.init();
});

