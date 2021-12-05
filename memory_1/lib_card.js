"use strict";

var gamesApp = gamesApp || {};

gamesApp.Card = function (
  id,
  cardImage,
  coverImage,
  cardTurned,
  boardIsLocked,
  changeBoardLock,
  cardIsRemoved
) {
  // holds the card html object
  var card;
  var image;
  var cardIsTurned = false;
  //   var cardIsLocked = false;
  return {
    cardImage,
    id,
    createInstance: () => {
      // create the div tag and assign it to card
      card = document.createElement("div");
      // create the image tag
      image = document.createElement("img");
      // assign the default back value to the card
      image.src = coverImage;
      // append image to card
      card.appendChild(image);
      // give card and image class name for css styling
      card.className = "game_card";
      image.className = "game_card_image";
      // add on click event for card
      card.onclick = (e) => {
        if (cardIsTurned || boardIsLocked()) return;
        changeBoardLock(true);
        $(image).fadeOut(500, () => {
          if (image.src == cardImage) return;
          image.src = cardImage;
          $(image).fadeIn(500, () => {
            cardIsTurned = true;
            changeBoardLock(false);
            cardTurned(id);
          });
        });
      };
      return card;
    },
    returnTheCard: () => {
      setTimeout(() => {
        $(image).fadeOut(500, () => {
          image.src = coverImage;
          $(image).fadeIn(500, () => {
            cardIsTurned = false;
            changeBoardLock(false);
          });
        });
      }, 2000);
    },
    remove: () => {
      setTimeout(() => {
        $(image).slideUp(500, () => {
          cardIsTurned = false;
          changeBoardLock(false);
          cardIsRemoved(id);
        });
      }, 1000);
    },
  };
};
