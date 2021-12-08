"use strict";

var gamesApp = gamesApp || {};

gamesApp.cards = function () {
  var cardNo = 0;
  var cards = [];
  var clickedImages = [];
  var maxImageNo = 24;
  var gameBoard = document;
  var boardLock = false;
  var imageList = range(1, maxImageNo + 1).map(
    (num) => `./images/card_${Math.ceil(num / 2)}.png`
  );
  var totalMoves = 0;
  var correctMoves = 0;
  function cardIsRemoved(id) {
    cards = cards.filter((card) => card.id != id);
    if (cards.length == 0) {
        console.log("CM:",correctMoves)
        console.log("TM:",totalMoves)
      gamesApp.finishTheGame((100 * correctMoves) / totalMoves);
    }
  }
  function boardIsLocked() {
    return boardLock;
  }
  function changeBoardLock(value) {
    boardLock = value;
  }

  function range(start, end) {
    var array = new Array();
    for (var i = start; i < end; i++) {
      array.push(i);
    }
    return array;
  }
  function shuffle(oldArray) {
    var j, x, i;
    var newArray = oldArray;
    for (i = newArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = x;
    }
    return newArray;
  }
  function refreshTheboard() {
    gameBoard.html("");
    for (let index = 0; index < cards.length; index++) {
      gameBoard.append(cards[index].createInstance());
    }
  }
  function cardTurned(id) {
    if (clickedImages.length == 0) {
      clickedImages.push(id);
    } else if (clickedImages == id) {
      return;
    } else {
      totalMoves++;
      boardLock = true;
      let selectedCards = cards.filter(
        (item) => item.id == clickedImages[0] || item.id == id
      );
      if (selectedCards[0].cardImage == selectedCards[1].cardImage) {
        selectedCards.forEach((card) => {
          card.remove();
        });
        correctMoves++;
        document.querySelector('#correct_tiles').innerHTML = correctMoves;
      } else {
        selectedCards.forEach((card) => {
          card.returnTheCard();
        });
      }
      clickedImages = [];
    }
  }
  return {
    setCorrectMoves: () => {
      correctMoves = 0;
      totalMoves = 0;
      document.querySelector('#correct_tiles').innerHTML = 0;
    },
    setCardNumber: (num) => {
      cardNo = num;
    },
    drawGameBoard: (board) => {
      let selectedImages = shuffle(imageList).slice(0, cardNo);
      let images = shuffle([...selectedImages, ...selectedImages]);

      cards = [];
      gameBoard = board;
      for (let index = 0; index < images.length; index++) {
        cards.push(
          gamesApp.Card(
            index,
            images[index],
            "./images/back.png",
            cardTurned,
            boardIsLocked,
            changeBoardLock,
            cardIsRemoved
          )
        );
      }
      refreshTheboard();
    },
  };
};
