(function() {
  'use strict';
  var Player = function() {
    // Define audio information and load
    var audio;
    var createAudio = function() {
      audio = new Audio();
      audio.loop = options.loop;
      audio.autoplay = options.autoplay;
      audio.crossOrigin = options.origin;
    };

    // Define variables for analyser
    var audioContext, analyser, source, fbc_array;
    // Define Audio Analyser Helpers
    var createAudioContext = function() {
      // Creating the context and pluging the stream to api node
      audioContext = new (window.AudioContext || window.webkitAudioContext);
      console.log(audioContext);
      source = audioContext.createMediaElementSource(audio);

      // Creating the analyser and defining the frequency array
      analyser = audioContext.createAnalyser();
      fbc_array = new Uint8Array(analyser.frequencyBinCount);

      // Connect the output of the source to the input of the analyser
      source.connect(analyser);

      // Connect the output of the analyser to the destination
      analyser.connect(audioContext.destination);
    };

    // Define controls handler
    var volume, volval, value, controls;
    var handlerControls = function() {
      // Select vol controls
      volume = element.querySelector('input[name="volume"]');
      volval = element.querySelector('input[name="volval"]');
      // Display first volume value
      volval.value = volume.value;
      // Listening volume change
      volume.addEventListener('change', function(e) {
        value = e.target.value;
        volval.value = value;
        audio.volume = value;
      }, false);
      // Select action controls
      controls = element.querySelectorAll('button[data-control]');
      // Finding right action
      controls.forEach(function(control) {
        // Listening action click
        control.addEventListener('click', function() {
          audio[control.getAttribute('data-control')]();
        }, false);
      });
    };

    // Create sounds list
    var list, option;
    var createList = function() {
      list = element.querySelector('select[name="list"]');
      // Populate songs list
      options.musics.forEach(function(m) {
        option = document.createElement('option');
        option.value = m.value;
        option.innerHTML = m.label;
        list.appendChild(option);
      });
      // Listening double click
      list.addEventListener('dblclick', function(e) {
        setMusic(e.target.value);
      }, false);
    };
    // Set music to play
    var setMusic = function(music) {
      audio.src = music;
    };
    // Check autoplay for play first sound
    var checkAutoplay = function() {
      if (options.autoplay != 'false' && options.musics.length > 0) {
        setMusic(options.musics[0].value);
      }
    };

    // Define main variables for canvas start
    var canvas, canvasCtx;
    // Define Canvas helpers
    var createCanvas = function() {
      canvas = document.getElementById('analyser');
      canvasCtx = canvas.getContext('2d');
    };
    // Define sizes canvas (self explanatory)
    var defineSizesCanvas = function() {
      canvas.width = 200;
      canvas.height = 300;
    };
    
    // Define variables to draw
    var bars, bar_x, bar_width, bar_height;
    // Create the animation
    var frameLooper = function() {
      // Recursive to create our animation
      window.requestAnimationFrame(frameLooper);
      // Get the new frequency data
      analyser.getByteFrequencyData(fbc_array);
      // Udpate the visualization
      render();
    };

    // Draw analyser
    var render = function() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = 'red';
      bars = 200;
      for (var i = 0; i < bars; i++) {
        bar_width = canvas.width / bars;
        bar_x = i * (bar_width + 2);
        bar_height = -(fbc_array[i]);
        canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    };

    // Get options player
    var element, options;
    var getOptions = function(id, musics) {
      element = document.getElementById(id);
      options = {
        loop: element.getAttribute('data-loop') || true,
        autoplay: element.getAttribute('data-autoplay') || false,
        origin: element.getAttribute('data-origin') || 'anonymous',
        musics: musics || []
      }
    };

    // Init player
    var init = function(id, musics) {
      if (!id) return console.error('Missing id param in init.');
      if (!musics) musics = [];
      getOptions(id, musics);
      createList();
      createAudio();
      handlerControls();
      createAudioContext();
      createCanvas();
      defineSizesCanvas();
      frameLooper();
      checkAutoplay();
    };

    // Export init function
    return {
      init
    }
  };
  window.Player = Player;
})();
