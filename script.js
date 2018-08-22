(function() {
	var questions = [{
		question: "What is This",
		choices: ["A lemon", "A peach", "Bread", "Soda", "A Pepper"],
 	 	correctAnswer: 1,
		photo: "https://example.com/images.lemon.png"
	},
	{
		question: "What is This",
		choices: ["A lemon", "A peach", "Bread", "Soda", "A Pepper"],
 	 	correctAnswer: 0,
		photo: "https://example.com/images/lemon.png"
	},
	{
		question: "What is This",
		choices: ["A lemon", "A peach", "Bread", "Soda", "A Pepper"],
 	 	correctAnswer: 1,
		photo: "https://example.com/images/lemon.png"
	},
	{
		question: "What is This",
		choices: ["A lemon", "A peach", "Bread", "Soda", "A Pepper"],
 	 	correctAnswer: 0,
		photo: "https://example.com/images/lemon.png"
	}];

	var questionCounter = 0; //tracks question number
	var selections = []; //array containing answer
	var quiz = $('#quiz');//quiz div

	//display initial question
	displayNext();

	//click handler for 'next' button
	$('#next').on('click', function(e) {
		e.preventDefault();

		//suspend during fade animation
		if(quiz.is(':animated')) {
			return false
		}
			choose();

			//if no selection, progress is stopped
			if(isNaN(selections[questionCounter])) {
				alert('Please Make a Selection!');
			} else {
				questionCounter++;
				displayNext();
			}
	});

	//click handler for 'previous' button
	$('#prev').on('click', function(e) {
		e.preventDefault();

		if(quiz.is(':animated')) {
			return false
		}
		choose();
		questionCounter--;
		displayNext();
	})

	//click handler for 'start over' button
	$('#start').on('click', function(e) {
		e.preventDefault();

		if(quiz.is(':animated')) {
			return false;
		}
		questionCounter = 0
		selections = []
		displayNext();
		$('#start').hide();
	})

	$('.button').on('mouseenter', function() {
		$(this).addClass('active');
	});
	$('.button').on('mouseleave', function() {
		$(this).removeClass('active');
	});

	function createQuestionElement(index) {
		var qElement = $('<div>', {
			id: 'question'
		});

		var header = $('<h2>Question '+ (index + 1) + ":</h2>");
		qElement.append(header);

		var photo = $('<div>', {
			id: 'photo'
		}).css('background:', 'url(' + questions[index].photo + ')')

		var radioButtons = createRadios(index);
		qElement.append(radioButtons);

		return qElement;
	}

	function createRadios(index) {
		var radioList = $('<ul>');
		var item;
		var input = '';
		for (var i = 0; i < questions[index].choices.length; i++) {
			item = $('<li>');
			input = '<input type="radio" name="answer" value =' + i + ' />';
			input += questions[index].choices[i];
			item.append(input);
			radioList.append(item);
		}
		return radioList;
	}

	function choose() {
		selections[questionCounter] = +$('input[name="answer"]:checked').val()
	}

	function displayNext() {
		quiz.fadeOut(function() {
			$('#question').remove();

			if(questionCounter < questions.length) {
				var nextQuestion = createQuestionElement(questionCounter);
				quiz.append(nextQuestion).fadeIn();
				if(!(isNaN(selections[questionCounter]))) {
					$('input[value='+selections[questionCounter]+']')
				}

				//controls idsplay of the "prev" button
				if(questionCounter === 1){
					$('#prev').show();
				} else if(questionCounter === 0){
					$('#prev').hide();
					$('#next').show();
				}
			} else {
				var scoreElem = displayScore();
				quiz.append(scoreElem).fadeIn();
				$('#prev').hide();
				$('#next').hide();
				$('#start').show();
			}
		});
		}

	function displayScore() {
		var score = $('<p>', {id: 'question'});

		var numCorrect = 0;
		for (var i = 0; i < selections.length; i++) {
			if(selections[i] === questions [i].correctAnswer) {
				numCorrect++;
			}
		}

		score.append('You got ' + numCorrect + ' questions out of '
				 + questions.length + ' right!!!');
		return score;
	}

	})();