"use strict";

var gamesApp = gamesApp || {};

gamesApp.cards = function () {
  var cardNo = 0;
  var cards = [];
  var clickedImages = [];
  var maxImageNo = 24;
  var gameBoard = document;
  var imageList = range(1, maxImageNo * 2 + 1).map(
    (num) => `./images/card_${Math.ceil(num / 2)}.png`
  );
  function range(start, end) {
    var array = new Array();
    for (var i = start; i < end; i++) {
      array.push(i);
    }
    return array;
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
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
    } else {
        console.log(clickedImages,id)
      let selectedCards = cards.filter(
        (item) => item.id == clickedImages[0] || item.id == id
      );
      console.log(selectedCards)
      if (selectedCards[0].cardImage == selectedCards[1].cardImage) {
        selectedCards.forEach((card) => {
          card.remove();
        });
      } else {
        selectedCards.forEach((card) => {
          card.returnTheCard();
        });
      }
      clickedImages = [];

      //   if (clickedImages[0] == cardImage) {
      //     cards = cards.filter((item) => item.cardImage != clickedImages[0] && item.cardImage != cardImage);
      //   } else {
      //     var selectedCards = cards.filter((item) => {
      //         return item.cardImage == clickedImages[0]|| item.cardImage == cardImage;
      //     });
      //     selectedCards.forEach((card)=>{
      //         card.returnTheCard();
      //     })

      //   }
    }
  }
  return {
    setCardNumber: (num) => {
      cardNo = num;
    },
    drawGameBoard: (board) => {
      imageList = shuffle(imageList);
      cards = [];
      gameBoard = board;
      for (let index = 0; index < cardNo * 2; index++) {
        cards.push(
          gamesApp.Card(
            index,
            imageList[index],
            "./images/back.png",
            cardTurned
          )
        );
      }
      refreshTheboard();
      console.log(imageList);
    },
  };
};
