	var questions = [{
    question: "What is this?",
    choices: ["Impossible Balls", "Salmon Romseco"],
    correctAnswer: 0,
    photo: "images/balls.jpg",
    answerText: "Lorem Ipsum text about the answer"
  }, {
    question: "What is this?",
    choices: ["Impossible Balls", "Salmon Romseco"],
    correctAnswer: 1,
    photo: "images/salmon.jpg",
    answerText: "Lorem Ipsum text about the answer"
  }];

  var questionsCounter = 0; //Tracks question number
  var selections = []; //Empty Array containing user choices
  var quiz = document.getElementById('quiz');
  var next = document.getElementById('next');
  var final = document.getElementById('final');
  var begin = document.getElementById('begin');

  //display quiz intro
  displayIntro();
  
  function createIntroElement() {
    var iElement = document.createElement('div');
    iElement.setAttribute('id', 'intro');
    var logo = document.createElement('img');
    logo.setAttribute('src', '/images/Logo.png');
    logo.setAttribute('id', 'logo');
    //var introText = document.createElement('p');
    //introText = document.createTextNode('Test your knowledge about Eat Purely and get');
    iElement.appendChild(logo);
    //iElement.appendChild(introText);
    console.log(iElement)
  }

  function displayIntro() {
    //var intro = createIntroElement();
    var iElement = document.createElement('div');
    iElement.setAttribute('id', 'intro');
    var logo = document.createElement('img');
    logo.setAttribute('src', '/images/Logo.png');
    logo.setAttribute('id', 'logo');
    //var introText = document.createElement('p');
    //introText = document.createTextNode('Test your knowledge about Eat Purely and get');
    iElement.appendChild(logo);
    console.log(iElement)
    quiz.appendChild(iElement); 
    //var displayedIntro = quiz.appendChild(intro);
    quiz.setAttribute('class', 'show');
    quiz.setAttribute('class', 'hide');

    next.style.display = 'none';
    final.style.display = 'none';
    begin.style.display = '';
  }
