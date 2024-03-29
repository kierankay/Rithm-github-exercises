var suits = ['<i class="fas fa-heart"></i>'];
var unusedSuits = ['<i class="fas fa-diamond"></i>', '<i class="fas fa-club"></i>', '<i class="fas fa-spade"></i>'];
var values = [ '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'];
var unusedValues = ['2', '3', '4', '5',]
var cardValues = [];
var matchedCards = [];
var cardCount;
var correctCount = 0;
var score = 0;
var cardsArea = document.getElementById('cards-area');
var startButton = document.getElementById('start');
var scoreArea = document.getElementById('score');
var highScoreArea = document.getElementById('highscore');
document.addEventListener('DOMContentLoaded', function() {
    highScoreArea.innerHTML = window.localStorage.getItem('highscore');
});

function createCard(cardVal) {
    var cardContainer  = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardHead = document.createElement('h2');
    var cardArea = document.createElement('div');

    console.log(cardVal);
    cardHead.innerHTML = cardVal[0][0] + '<br>' + cardVal[0][1];
    cardHead.classList.add('card-head', 'hide')
    cardBody.classList.add('card-body')
    cardBody.appendChild(cardHead);
    cardContainer.appendChild(cardBody);
    cardContainer.classList.add('card', 'text-center')
    cardContainer.addEventListener('click', function() {
        if (matchedCards.length < 2) {
            revealCard(cardHead, matchedCards)
        }
    });
    cardArea.appendChild(cardContainer);
    cardArea.classList.add('col-lg-2', 'col-md-3', 'col-sm-4', 'col-5');
    
    return cardArea;
}

function revealCard(card, list) {
    card.classList.remove('hide');
    list.push(card);
    checkCards(list);
}

function checkCards(matchedCards) {
    if (matchedCards.length === 2) {
        if (matchedCards[0].innerHTML === matchedCards[1].innerHTML) {
            matchedCards.length = 0;
            correctCount += 2;
            if (correctCount === cardCount) {
                cacheScore();
                alertWon();
            }
        } else {
            setTimeout (function() {
                matchedCards[0].classList.add('hide');
                matchedCards[1].classList.add('hide');
                matchedCards.length = 0;
                score++;
                scoreArea.innerHTML = score;
            }, 1000);
        }
    }
}

function cacheScore() {
    if (window.localStorage.getItem('highscore') > score || window.localStorage.getItem('highscore') === null) {
        window.localStorage.setItem('highscore', score);
        highScoreArea.innerHTML = score;
    }
}

function alertWon() {
    alert('YOU WON!')
}

startButton.addEventListener('click', function () {
    // reset score to 0 and add highest score to local storage
    correctCount = 0;
    score = 0;
    scoreArea.innerHTML = score;
    highScoreArea.innerHTML = window.localStorage.getItem('highscore');

    // clear card area
    for (var i = 0, len = cardsArea.childNodes.length; i < len; i++) {
        cardsArea.removeChild(cardsArea.childNodes[0]);
    }
    
    // repopulate card values
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
            cardValues.push([values[j], suits[i]]);
            cardValues.push([values[j], suits[i]]);
        }
    }

    // randomly place cards
    while (cardValues.length > 0) {
        var card = cardValues.splice(Math.floor(Math.random()*cardValues.length),1);
        cardsArea.appendChild(createCard(card));
    }
    cardCount = document.getElementsByClassName('card').length;
});

