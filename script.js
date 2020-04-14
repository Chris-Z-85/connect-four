(function () {
    var diagonalWins = [
        [0, 7, 14, 21],
        [7, 14, 21, 28],
        [14, 21, 28, 35],
        [1, 8, 15, 22],
        [8, 15, 22, 29],
        [2, 9, 16, 23],
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        [20, 27, 34, 41],
        [12, 19, 26, 33],
        [19, 26, 33, 40],
        [18, 25, 32, 39],
        [24, 19, 14, 9],
        [19, 14, 9, 4],
        [24, 19, 14, 9],
        [19, 14, 9, 4],
        [30, 25, 20, 15],
        [25, 20, 15, 10],
        [20, 15, 10, 5],
        [36, 31, 26, 21],
        [26, 21, 16, 11],
        [37, 32, 27, 22],
        [32, 27, 22, 17],
        [38, 33, 28, 23]
    ];

    var gameBlocked = false;

    var currentPlayer = "player1";
    $(".column").on("click", function (e) {
        if (gameBlocked) return;
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        var slotsInRow = $(".row" + i);
        if (i == -1) {
            return;
        }

        if (checkForVictory(slotsInCol)) {
            gameBlocked = true;
            if (currentPlayer === "player1") {
                var winner = "Player 1";
            } else {
                var winner = "Player 2";
            }

            showPopup(winner + " wins!");
        } else if (checkForVictory(slotsInRow)) {

            gameBlocked = true;

            if (currentPlayer === "player1") {
                var winner = "Player 1";
            } else {
                var winner = "Player 2";
            }

            showPopup(winner + " wins!");
        } else if (checkDiagonal()) {

            gameBlocked = true;

            if (currentPlayer === "player1") {
                var winner = "Player 1";
            } else {
                var winner = "Player 2";
            }

            showPopup(winner + " wins!");
        } else {
            switchPlayer();
        }
    });

    $("#popup button").on("click", function () {
        hidePopup();
        restartGame();
    });

    function checkDiagonal() {

        var found = false;
        var playerArray = [];

        for (var cell = 0; cell < $(".slot").length; cell++) {
            if (
                $(".slot")
                    .eq(cell)
                    .hasClass(`${currentPlayer}`)
            ) {
                playerArray.push(cell);
            }
        }

        for (var i = 0; i < diagonalWins.length; i++) {
            if (playerArray.length > 3) {
                console.log(isTrue(playerArray, diagonalWins[i]));
                found = isTrue(playerArray, diagonalWins[i]);
                if (found) {
                    return found;
                }
            }
        }
    }

    function isTrue(arr, arr2) {
        return arr2.every(i => arr.includes(i));
    }

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }

        var currentPlayerH2 = $("#current_player h2");
        if (currentPlayer == "player1") {
            currentPlayerH2.text("Player 1");
        } else {
            currentPlayerH2.text("Player 2");
        }

        var playerHole = $("#current_player .player_hole");
        playerHole.attr("class", currentPlayer + " player_hole");
    }

    function showPopup(text) {
        var popupDiv = $("#popup");
        var popupH2 = $("#popup h2");
        popupDiv.css({ top: "-200px", display: "" });

        popupH2.text(text);
        popupDiv.animate({ top: "300px" }, "slow");
    }

    function hidePopup() {
        var popupDiv = $("#popup");

        popupDiv.fadeOut("slow");
    }

    function restartGame() {
        var currentPlayer = "player1";
        $("#current_player h2").text("Player 1");
        $("#current_player .player_hole").attr(
            "class",
            currentPlayer + " player_hole"
        );

        var slots = $(".slot");

        var columns = $(".column");

        for (var i = 0; i < columns.length; i++) {
            var slots = columns.eq(i).children();
            console.log(slots);

            for (var j = 0; j < slots.length; j++) {
                slots.eq(j).attr("class", "slot row" + j);
            }
        }

        gameBlocked = false;
    }
})();
