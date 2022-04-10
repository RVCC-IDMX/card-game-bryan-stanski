/* eslint-disable linebreak-style */
/* app.js */

import Deck from './deck';
import { select, listen } from './util';
import './style.css';

const computerCardSlot = select('.computer-card-slot');
const computerDeckElement = select('.computer-deck');
const text = select('.text');

let computerDeck;
let score;

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
}

function cleanBeforeRound() {
  computerCardSlot.innerHTML = '';
  text.innerHTML = '';

  updateDeckCount();
}

function startGame() {
  score = 0;
  computerDeck = new Deck();
  computerDeck.shuffle();
  console.log(computerDeck.cards[0].suit);

  cleanBeforeRound();
}

function isRoundWinner(computerCard, suit) {
  if (suit === computerCard.suit) {
    score += 4;
    text.innerText = `You win ${score}`;
  } else {
    score -= 1;
    text.innerText = `You lose ${score}`;
  }

  if (computerDeck.numberOfCards === 0) {
    startGame();
  }

  console.log(computerDeck.cards[0].suit);
}

function flipCards(suit) {
  computerCardSlot.innerHTML = '';
  const computerCard = computerDeck.pop();

  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

  isRoundWinner(computerCard, suit);
}

const game = select('.new-game');
listen(game, 'click', () => {
  startGame();
});

const diamonds = select('.diamonds');
listen(diamonds, 'click', () => {
  flipCards('♦');
});

const clubs = select('.clubs');
listen(clubs, 'click', () => {
  flipCards('♣');
});

const hearts = select('.hearts');
listen(hearts, 'click', () => {
  flipCards('♥');
});

const spades = select('.spades');
listen(spades, 'click', () => {
  flipCards('♠');
});

startGame();
