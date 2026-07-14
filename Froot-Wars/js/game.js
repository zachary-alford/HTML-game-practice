let game = {
  // Start initializing objects, preloading assets and display start screen
  init: function() {
    // Get handler for game canvas and context
    game.canvas = document.getElementById("gamecanvas");
    game.context = game.canvas.getContext("2d");

    // Initialize objects
    levels.init();

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

  showLevelScreen: function() {
    game.hideScreens();
    game.showScreen("levelselectscreen");
  },
};

let levels = {
  //Level data
  data: [{ // First level
    foreground: "desert-foreground",
    backgroud: "clouds-background",
    entities: []
  }, { // Second level
    foreground: "desert-foreground",
    background: "clouds-background",
    entities: []
  }],

  // Initialize level selection screen
  init: function() {
    let levelSelectScreen = document.getElementById("levelselectscreen");

    // An event handler to call
    let buttonClickHandler = function() {
      game.hideScreen("levelselectscreen");

      // Level label values are 1, 2. Levels are 0, 1
      levels.load(this.value - 1);
    };

    for (let i = 0; i < levels.data.length; i++) {
      let button = document.createElement("input");

      button.type = "button";
      button.value = (i + 1); // Level labels are 1, 2
      button.addEventListener("click", buttonClickHandler);

      levelSelectScreen.appendChild(button);
    }
  },
  // Load all data and images for a specific level
  load: function(number) {
  }
};

// Initialize game once page has fully loaded
window.addEventListener("load", function() {
  game.init();
});

