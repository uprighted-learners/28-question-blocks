// Initialize variables for the current player and their scores.
let currentPlayer = 1;
let scores = { player1: 0, player2: 0 };
let questions = []; // This will hold the questions fetched from the API

// Function to fetch questions from the API and initialize the game
function fetchQuestions() {
    fetch('https://jeopardy-placeholder-questions.onrender.com/api/questions')
        .then(response => response.json())
        .then(data => {
            questions = data; // Store the fetched questions
            displayCategories(); // Display categories after fetching
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            alert('Failed to load questions. Please try again later.');
        });
}

// Function to display category boxes for all questions.
function displayCategories() {
    const categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = ''; // Clear previous categories (if any)
    questions.forEach((item, index) => {
        // Create a div for each category.
        const categoryBox = document.createElement("div");
        categoryBox.className = "category-box";
        categoryBox.innerText = item.category;
        // Set an onclick event to display the question when the category is clicked.
        categoryBox.onclick = () => displayQuestion(index);
        categoriesContainer.appendChild(categoryBox);
    });
}

// Function to display the question when a category is clicked.
function displayQuestion(index) {
    const question = questions[index]; // Use 'questions' fetched from API
    // Show the question container and set the question text.
    document.getElementById("question-container").style.display = "block";
    document.getElementById("question").innerText = question.question;
    // Hide the categories to focus on the question.
    document.getElementById("categories").style.display = "none";

    // Disable the clicked category box to prevent re-selection during this turn.
    document.getElementsByClassName("category-box")[index].style.pointerEvents = "none";
    document.getElementsByClassName("category-box")[index].style.opacity = "0.5";
}

// Function to handle the submission of an answer.
function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.toLowerCase();
    const currentQuestionText = document.getElementById("question").innerText.toLowerCase();
    // Find the correct answer based on the current question displayed.
    const correctAnswer = questions.find(q => q.question.toLowerCase() === currentQuestionText).answer.toLowerCase();

    // Check if the user's answer matches the correct answer.
    if (userAnswer === correctAnswer) {
        // Increment the score of the current player.
        scores["player" + currentPlayer]++;
        // Update the displayed score.
        document.getElementById("player" + currentPlayer + "-score").innerText = scores["player" + currentPlayer];
        alert("Correct!");
    } else {
        alert("Incorrect!");
    }

    // After answering, clear the answer field, hide the question, show categories, and switch player.
    document.getElementById("answer").value = '';
    document.getElementById("question-container").style.display = "none";
    document.getElementById("categories").style.display = "flex";
    switchPlayer();
}

// Function to handle passing on a question.
function passQuestion() {
    // Hide the question and show the categories again without changing the score.
    document.getElementById("question-container").style.display = "none";
    document.getElementById("categories").style.display = "flex";
    // Switch to the next player.
    switchPlayer();
}

// Function to switch the current player and update the display to show whose turn it is.
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById("player-turn").innerText = `Player ${currentPlayer}'s turn`;
}

// When the page loads, display the category boxes for the game to start.
window.onload = function () {
    fetchQuestions(); // Fetch questions and start the game setup
};
