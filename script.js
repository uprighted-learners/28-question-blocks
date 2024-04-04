const placeholderQuestions = [
    { category: 'Nature', question: 'The human heart has how many chambers?', answer: '4', },
    { category: 'Animals', question: 'The Kakapo is a large, flightless, nocturnal parrot native to which country?', answer: 'New Zealand', },
    { category: 'Computers', question: 'What does GHz stand for?', answer: 'Gigahertz', },
    { category: 'Mythology', question: 'Who was the only god from Greece who did not get a name change in Rome?', answer: 'Apollo', },
    { category: 'History', question: 'The original Roman alphabet lacked the following letters EXCEPT:', answer: 'X', },
    { category: 'General', question: 'What is the French word for "hat"?', answer: 'Chapeau', },
];

// initialize variables for the current player and their scores
let currentPlayer = 1;
let scores = { player1: 0, player2: 0 };

// function to display category boxes for all questions
function displayCategories() {
    const categoryContainer = document.getElementById('categories');
    placeholderQuestions.forEach((item, index) => {
        // create a div for each category
        const categoryBox = document.createElement('div');
        categoryBox.className = 'category-box';
        categoryBox.innerText = item.category;
        categoryBox.onclick = () => displayQuestion(index);
        categoryContainer.appendChild(categoryBox);
    })
};

// function to display questions when a category is clicked
function displayQuestion(index) {
    const question = placeholderQuestions[index];

    // show the question container and set the question text
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('question').innerText = question.question;

    // hide the categories to focus on the question
    document.getElementById('categories').style.display = 'none';

    // disable the clicked category box
    document.getElementsByClassName("category-box")[index].style.pointerEvents = "none";
    document.getElementsByClassName('category-box')[index].style.opacity = "0.5";
}

// function to handle the submission of an answer
function submitAnswer() {
    // grab the user's answer
    const userAnswer = document.getElementById('answer').value.toLowerCase();

    /* This line of code is finding the correct answer for the current question being displayed. Here's a
    breakdown of what it does: */
    // 1. find the question that matches the current question text
    // 2. find the answer for the question
    // 3. store the answer in a variable
    // 4. convert the answer to lowercase
    // 5. compare the user's answer to the correct answer
    const correctAnswer = placeholderQuestions.find(q => q.question.toLowerCase() === document.getElementById("question").innerText.toLowerCase()).answer.toLowerCase();

    // check if the user's answer matches the correct answer
    if (userAnswer === correctAnswer) {
        // give an alert for a correct answer
        alert('Correct Answer');

        // increment the score of the current player
        scores[`player${currentPlayer}`] += 1;

        // update the displayed score
        document.getElementById("player" + currentPlayer + "-score").innerText = scores["player" + currentPlayer];

    } else {
        // give alert for an incorrect answer
        alert('Incorrect Answer');
    }

    // after answer, clear the answer field, hide the question, and show the categories again
    document.getElementById('answer').value = '';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('categories').style.display = 'flex';
    switchPlayer();
}

//function to handle passing the question
function passQuestion() {
    // hide the question and show the categories again
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('categories').style.display = 'flex';

    // switch to the next player
    switchPlayer();
}

// function to switch the current player and update the display to show who is player
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('player-turn').innerText = `Player ${currentPlayer}'s Turn`;
}


displayCategories();