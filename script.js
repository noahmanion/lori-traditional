(function() {
  var questions = [{
    question: "What is this?",
    choices: ["Impossible Balls", "Salmon Romseco"],
    correctAnswer: 0,
    photo: "images/balls.jpg"
  }, {
    question: "What is this?",
    choices: ["Impossible Balls", "Salmon Romseco"],
    correctAnswer: 1,
    photo: "images/salmon.jpg"
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  //display quiz intro 
  displayIntro();

    //click handler for begin button
  $('#begin').on('click', function(e) {
    e.preventDefault();
    if(quiz.is(':animated')) {
      return false;
    }

    questionCounter = 0;
    selections = [];
    displayNext();
    
  });
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

    //creates an intro text element
  function createIntroElement() {
    var iElement = $('<div>', {
      id: 'intro'
    });

    var logo  = $('<img src="" id="logo"/>');
    iElement.append(logo);

    var introText = $('<p>Lorem ipsum dolor amet helvetica photo booth jianbing drinking vinegar. Keytar tote bag activated charcoal, butcher edison bulb green juice tumblr hammock meditation kickstarter unicorn DIY waistcoat pitchfork single-origin coffee. </p>');
    iElement.append(introText);

    return iElement;

  }
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var photo = $('<img src="' + questions[index].question + '" />');
    qElement.append(question);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input id="radio" type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

    //function to create intro element and hides progress buttons
  function displayIntro() {
    var intro = createIntroElement();
    quiz.append(intro).fadeIn();

    $('#prev').hide()
    $('#next').hide()
    $('#start').hide()
    $('#begin').show()
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      $('#intro').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
          $('#begin').hide();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
          $('#begin').hide();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#begin').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();