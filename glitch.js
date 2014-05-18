$(document).ready(function(){

  function modifyImgSrcAtPos(origStr, pos, modification) {
    var modLength = modification.length;
    var beforePos = origStr.substring(0, pos)
    var afterPos = origStr.substring(pos + modLength, origStr.length)
    return beforePos + modification + afterPos;
  }



  $('#glitch_button').on('click', function(){


      function randomInsertPoint(start, end) {
        return Math.floor(Math.random() * (end - start))
      }

      var generateBaseSixtyFour = function() {
        return _.sample(characters, 16).join('');

      }
      
  
      var src = $('img').attr('src');
        
      var notGlitchableHeader = src.substring(0,2000);

      var glitchable = src.substring(2000, src.length - 1000);

      var notGlitchableTrailer = src.substring(src.length - 1000, src.length);

      
      var newChars = generateBaseSixtyFour(); //
                     console.log(newChars);   // this is just to view generated Base64 code
                     

    
      var updatedSrc = notGlitchableHeader + modifyImgSrcAtPos(glitchable, 
                       randomInsertPoint(2000, src.length - 1000), generateBaseSixtyFour()) + notGlitchableTrailer;


  $('img').attr('src', updatedSrc);
      

  })



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
