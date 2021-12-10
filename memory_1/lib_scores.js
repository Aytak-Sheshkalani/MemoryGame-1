"use strict";

var gamesApp = gamesApp || {};

gamesApp.scores = {
    setScore: function(score) {
        sessionStorage.scores = score;
    },

    getScore: function() {
        return sessionStorage.scores || 0;
    }
}