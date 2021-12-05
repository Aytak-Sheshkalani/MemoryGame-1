"use strict";

var gamesApp = gamesApp || {};

gamesApp.Card = function (id, cardImage, coverImage, cardTurned) {
  // holds the card html object
  var card;
  var image;
  var cardIsLocked = false;
  return {
    cardImage,
    cardIsReturned: false,
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
        if (cardIsLocked) return;
        $(image).fadeOut(500, () => {
          image.src = cardImage;
          $(image).fadeIn(500, () => {
            cardTurned(id);
          });
        });
      };
      return card;
    },
    returnTheCard: () => {
      cardIsLocked = true;
      setTimeout(() => {
        $(image).fadeOut(500, () => {
          image.src = coverImage;
          $(image).fadeIn(500, () => {
            cardIsLocked = false;
          });
        });
      }, 2000);
    },
  };
};
