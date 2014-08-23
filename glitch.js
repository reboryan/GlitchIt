  var previous_src_states = [];
  var initial_state;

$(document).ready(function(){


  //SHOW 'INSTRUCTIONS' ONCE PER BROWSER SESH

  $('.instructions').show(function() {

    $('.instructions').delay(3500).fadeOut();  

  }); 
  
  


  // CODE THAT LOADS IN IMAGE AND CONVERTS TO BASE 64


  var files_el = document.getElementById("imgLoader");
  files_el.addEventListener("change", handleFileSelect);

  function handleFileSelect(evt) {

    var files = event.target.files;
    var file = files[0];
    console.log(file);

    
    var reader = new FileReader();
    
    reader.addEventListener('load', function() {
        var contents = reader.result;
        console.log(contents);
        $('#imageToGlitch').attr('src', contents);

        initial_state = contents; /// to reload to orginal state. TODO: add 'start over btn'

    });

    reader.readAsDataURL(file);

  } // /Image uploader




  // CODE THAT GLITCHIFIES THE IMAGE SRC
  function modifyImgSrcAtPos(origStr, pos, modification) {
    var modLength = modification.length;
    var beforePos = origStr.substring(0, pos)
    var afterPos = origStr.substring(pos + modLength, origStr.length)
    return beforePos + modification + afterPos;
  }



  $('#glitch_button').on('click', function(){

      // SHOW UNDO BUTTON and SAVE BUTTON

      $("#undo_button").show();

      //



      function randomInsertPoint(start, end) {
        return Math.floor(Math.random() * (end - start))
      }

      var generateBaseSixtyFour = function() {
        return _.sample(characters, 16).join('');

      }
      
  
      var src = $('img').attr('src');
        
      var notGlitchableHeader = src.substring(0,500);

      var glitchable = src.substring(500, src.length - 1000);

      var notGlitchableTrailer = src.substring(src.length - 1000, src.length);

      
      var newChars = generateBaseSixtyFour(); //
                     console.log(newChars);   // this is just to view generated Base64 code
                     
    
      var updatedSrc = notGlitchableHeader + modifyImgSrcAtPos(glitchable, 
                       randomInsertPoint(500, src.length - 1000), generateBaseSixtyFour())
                       + notGlitchableTrailer;

     
      // UNDO FUNCTIONALITY

      previous_src_states.push(updatedSrc);
        
        console.log(previous_src_states.length);

      
      if (previous_src_states.length > 20 - 1) {
        previous_src_states.shift();
      } // stores previous state in array


    $('img').attr('src', updatedSrc); // changes image
      

  }); // /glitch button on click




  $('#undo_button').on('click', function(ev) {
    var last_state = previous_src_states[last_state];
    
    if (previous_src_states.length === 1) {
      alert("Sorry. You can only have 20 undo's, my friend");
    };
    
    var last_state = previous_src_states.pop();
    
    $('#imageToGlitch').attr('src', last_state);
  
    console.log("Prev state array length is: " + last_state.length);

  }); // /undo button on click

  var characters = [

    '0', '1', '2', '3', '4', 
    '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '/', '+'
  ];


});
