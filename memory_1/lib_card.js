"use strict";

var gamesApp = gamesApp || {};

gamesApp.Card = function(
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
    return {
        cardImage,
        id,
        createInstance: () => {
            // create the div tag and assign it to card
            card = document.createElement("div");
            let anchor = document.createElement("a");
            anchor.href = "#";
            anchor.id = coverImage;

            // create the image tag
            image = document.createElement("img");
            // assign the default back value to the card
            image.src = coverImage;
            image.alt = "";
            // append image to card
            anchor.appendChild(image);
            card.appendChild(anchor);
            // give card and image class name for css styling
            card.className = "game_card";
            image.className = "game_card_image";
            // add on click event for card
            card.onclick = (e) => {
                if (cardIsTurned || boardIsLocked()) return;
                changeBoardLock(true);
                $(image).fadeOut(100, () => {
                    if (image.src == cardImage) return;
                    image.src = cardImage;
                    $(image).fadeIn(100, () => {
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
                $(image).fadeOut(100, () => {
                    image.src = coverImage;
                    $(image).fadeIn(100, () => {
                        cardIsTurned = false;
                        changeBoardLock(false);
                    });
                });
            }, 800);
        },
        remove: () => {
            setTimeout(() => {
                $(image).slideUp(100, () => {
                    cardIsTurned = false;
                    changeBoardLock(false);
                    cardIsRemoved(id);
                });
            }, 1000);
        },
    };
};