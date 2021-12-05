"use strict";

var gamesApp = gamesApp || {};

gamesApp.settings = {
    getPlayerName: function() {
        return sessionStorage.playerName || "";
    },

    setPlayerName: function(name) {
        sessionStorage.playerName = name
    },

    getNumberOfImages: function() {
        return parseInt(sessionStorage.numImages) || 24;
    },

    setNumOfImages: function(number) {
        sessionStorage.numImages = number || 24
    },

}