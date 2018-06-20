/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond", "fa-diamond", 
             "fa-paper-plane-o", "fa-paper-plane-o",
             "fa-anchor", "fa-anchor",
             "fa-bolt", "fa-bolt",
             "fa-cube", "fa-cube",
             "fa-leaf", "fa-leaf",
             "fa-bicycle", "fa-bicycle",
             "fa-bomb", "fa-bomb"];

// Creates a templete for the HTML
let generateCard = card => {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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
}

let startGame = () => {
  let deck = document.querySelector(".deck");

  // Randomly creates an HTML element for each card, using shuffle function.
  let cardHTML = shuffle(cards).map((card) => {
    return generateCard(card);
  });
  moves = 0;
  moveCounter.innerHTML = moves;

  // Join the HTML elements together
  deck.innerHTML = cardHTML.join('');
}

let moves = 0;
let moveCounter = document.querySelector(".moves");

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

allCards.forEach((card) => {
  card.addEventListener("click", (event) => {

    // When clicked, add the card to the array of open cards and flip the card to show it
    if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")) {
      openCards.push(card);
      card.classList.add("open", "show");
      
      if (openCards.length == 2) {
        // If the two cards do match, match them
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add("match", "show", "open");
          openCards[1].classList.add("match", "show", "open");
          openCards = [];
        } else {
          // If the two cards don't match, hide them
          setTimeout(() => {
            openCards.forEach((card) => {
              card.classList.remove("open", "show");
            });

            // Empty the array of open cards
            openCards = [];
          }, 1000);
        }

        moves += 1;
        moveCounter.innerHTML = moves;
      }
    }
  });
});

let restartButton = document.querySelector(".restart");

restartButton.addEventListener("click", () => {
  console.log("Restart the game");
  // startGame();
});