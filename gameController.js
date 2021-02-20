;(function() {

    this.GameController = (function() {

        function GameController() {
            this.containerId = 'gameStepId';
            this.currentPage = null;
            this.showHomepage();

            this.diceContainer = new DiceDialog(this, 'dialogId', {diceNumber: 6});
        }

        GameController.prototype.showHomepage = function(){
            this.currentPage = new Homepage(this, this.containerId);
        }


        // ------------------------------------------------------------
        // Homepage callbacks
        // ------------------------------------------------------------
        GameController.prototype.singlePlayerButtonClicked = function() {
            this.currentPage.destroy();
            this.startSinglePlayerGame({
                playerNames: [''],
                dice: false
            });
        }

        GameController.prototype.multiPlayerButtonClicked = function(data) {
            this.currentPage.destroy();
            this.showGameModePage(data);
        }


        // ------------------------------------------------------------
        // Single Player
        // ------------------------------------------------------------
        GameController.prototype.startSinglePlayerGame = function(data) {
            // this.currentPage = new SinglePlayer(this, data);
            this.currentPage.destroy();
            this.currentPage = new Multiplayer(this, this.containerId, data);
        }


        // ------------------------------------------------------------
        // Multi Player
        // ------------------------------------------------------------
        GameController.prototype.showGameModePage = function() {
            this.currentPage = new GameMode(this, this.containerId);
        }

        GameController.prototype.startMultiPlayerButtonClicked = function(data) {
            this.currentPage.destroy();
            this.currentPage = new Multiplayer(this, this.containerId, data);
        }
        // ------------------------------------------------------------
        // Game Over
        // ------------------------------------------------------------
        GameController.prototype.gameOver = function(data) {
            this.currentPage.destroy();
            this.showGameOverPage(data);
        }

        GameController.prototype.startNewGame = function() {
            this.currentPage.destroy();
            this.currentPage = new Homepage(this, this.containerId);
        }

        // ------------------------------------------------------------
        // Game Results
        // ------------------------------------------------------------
        GameController.prototype.showGameOverPage = function(data) {
            this.currentPage = new GameOver(this, this.containerId, data);
        }


        GameController.prototype.gameRulesButtonClicked =  function() {
            this.currentPage = new RulesDialog(this, this.containerId)
        }

        return GameController;
    })();

    window.GameController = new GameController();
}).call(this);