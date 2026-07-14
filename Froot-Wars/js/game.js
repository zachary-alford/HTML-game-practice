let game = {
  // Start initializing objects, preloading assets and display start screen
  init: function() {
    // Get handler for game canvas and context
    game.canvas = document.getElementById("gamecanvas");
    game.context = game.canvas.getContext("2d");

    // Initialize objects
    levels.init();
    loader.init();

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
    
    // Declare a new currentLevel object
    game.currentLevel = {number: number};
    game.score = 0;

    document.getElementById("score").innerHTML = "Score: " + game.score;
    let level = levels.data[number];

    // Load the background, foreground, and slingshot images
    game.currentLevel.backgroundImage = loader.loadImage("images/backgrounds/" + level.background + ".png");
    game.currentLevel.foregroundImage = loader.loadImage("images/backgrounds/" + level.foreground + ".png");
    game.slingshotImage = loader.loadImage("images/slingshot.png");
    game.slingshotFrontImage = loader.loadImage = ("images/ slingshot-front.png");

    // Call game.start() once the assets have loaded
    loader.onload = game.start;
  }
};

let loader = {
  loaded: true,
  loadedCount: 0, // Assets that have been loaded so far
  totalCount: 0, // Total number of assets that need lading

  init: function() {
    // Check sound support
    let mp3Support, oggSupport;
    let audio = document.createElement("audio");

    if (audio.canPlayType) {
      // Currently canPlayType() returns: "", "maybe" or "probably"
      mp3Support = "" !== audio.canPlayType("audio/mpeg");
      oggSupport = "" !== audio.canPlayType("audio/ogg"; codecs=\"vorbis\"");
    } else {
      // The audio tag is not supported
      mp3Support = false;
      oggSupport = false;
    }

    // Check for ogg, then mp3, and finally set soundFileExtn to undefined
    loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
  },

  loadImage: function(url) {
    this.loaded = false;
    this.totalCount++;

    game.showScreen("loadingscreen");

    let image = new Image();

    image.addEventListener("load", loader.itemLoaded, false);
    image.src = url;

    return image;
  },

  soundFileExtn: ".ogg",

  loadSound: function(url) {
    this.loaded = false;
    this.totalCount++;

    game.showScreen("loadingscreen");

    let audio = new Audio();

    audio.addEventListener("canplaythrough", loader.itemLoaded, false);
    audio.src = url + loader.soundFileExtn;

    return audio;
  }, 

  itemLoaded: function(ev) {
    // Stop listening for event type (load or canplaythrough) for this item now that it has been loaded
    ev.target.removeEventListener(ev.type, loader.itemLoaded, false);

    loader.loadedCount++;

    document.getElementById("loadingmessage").innerHTML = "Loaded " + loader.loadedCount + " of " + loader.totalCount;

    if (loader.loadedCount === loader.totalCount) {
      // Loader has loaded completely...
      // Reset and clear the loader
      loader.loaded = true;
      loader.loadedCount = 0;
      loader.totalCount = 0;

      // Hide the loading screen
      game.hideScreen("loadingscreen");

      // and call the loader.onload method if it exists
      if (loader.onload) {
        loader.onload();
        loader.onload = undefined;
      }
    }
  }
};

// Initialize game once page has fully loaded
window.addEventListener("load", function() {
  game.init();
});

