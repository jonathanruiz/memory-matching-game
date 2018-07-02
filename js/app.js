/*
 * Create a list that holds all of your cards
 */
let cards = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];

cards = cards.concat(cards);

// Creates a templete for the HTML
let generateCard = card => {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

let generateStars = (starTwo, starThree) => {
  return `<li><i class="fa fa-star"></i></li> 
          <li><i class="fa fa-star${starTwo}"></i></li> 
          <li><i class="fa fa-star${starThree}"></i></li>`;
}

// Congratulations Modal
let modal = () => {
  swal({
    type: "success",
    title: "Congratulations! You won!",
    text: "With " + moves + " moves and " + numStars + " stars.",
    confirmButtonText: "Play Again?"
  }).then(result => {
    if (result.value) {
      startGame();
    }
  });
};

let numStars = 3;
let match = 0;
let moves = 0;

// Query Selectors for classes
const deck = document.querySelector(".deck");
const moveCounter = document.querySelector(".moves");
const stars = document.querySelector(".stars");
const restartButton = document.querySelector(".restart");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// Function that starts the game
let startGame = () => {

  // Randomly creates an HTML element for each card, using shuffle function.
  let cardHTML = shuffle(cards).map(card => {
    return generateCard(card);
  });

  numStars = 3;
  match = 0;
  moves = 0;
  moveCounter.innerHTML = moves;

  // Add the stars to the board
  stars.innerHTML = generateStars("", "");

  // Join the HTML elements together
  deck.innerHTML = cardHTML.join("");
};

// Function that flips the cards
let flipCards = () => {
  if (openCards.length == 2) {
    // If the two cards do match, match them
    if (openCards[0].dataset.card == openCards[1].dataset.card) {
      matchCards();
      match++;
    } else {
      // If the two cards don't match, hide them
      mismatchCards();
    }

    moves += 1;
    moveCounter.innerHTML = moves;
  }
};

// Function that recognizes a matche
let matchCards = () => {
  openCards[0].classList.add("match", "show", "open");
  openCards[1].classList.add("match", "show", "open");
  openCards = [];
};

// Function that recognizes a mismatch
let mismatchCards = () => {
  setTimeout(() => {
    openCards.forEach(card => {
      card.classList.remove("open", "show");
    });

    // Empty the array of open cards
    openCards = [];
  }, 1000);
};

startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const allCards = document.querySelectorAll(".card");
let openCards = [];

allCards.forEach(card => {
  card.addEventListener("click", () => {
    // When clicked, add the card to the array of open cards and flip the card to show it
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      openCards.push(card);
      card.classList.add("open", "show");

      // Flips the cards
      flipCards();

      if (moves <= 10) {
    
      }
      else if (moves <= 14) {
        numStars = 2;
        stars.innerHTML = generateStars("", "-o");
      }
      else if (moves <= 18) {
        numStars = 1;
        stars.innerHTML = generateStars("-o", "-o");
      }

      // If the game is won, show the congratulations screen
      if (match == 8) {
        modal();
      }
    }
  });
});

// Restarts the game when called
restartButton.addEventListener("click", () => {
  startGame();
});
