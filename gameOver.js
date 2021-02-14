;(function() {

    this.GameOver = (function() {

        function GameOver(parentContext, containerId, data) {
            this.parentContext = parentContext;
            document.getElementById(containerId).innerHTML = this.getHTML(data);

            document.addEventListener('click', this.clickEventHandler.bind(this));
        }

        GameOver.prototype.destroy = function() {
            document.removeEventListener('click', this.clickEventHandler.bind(this));
        }

        GameOver.prototype.clickEventHandler = function(event) {

            element = event.target;

            if (element.closest('.start--new--game')) {
                this.parentContext.startNewGame();
            }
        }

        GameOver.prototype.getHTML = function(players) {

            players = players.sort((player1, player2) => player2.score - player1.score);
            
            html = '';
            if (players.length == 1) {
                html = `<span style='padding-top: 50px; font-size: 3rem;'>SCORE ${players[0].score}</span>`;
            } else {
                html = "<table class='w100 mediumText'><th class='alignLeft'>Ime</th><th class='alignRight'>Rezultat</th>";
                for (i = 0; i < players.length; i++) {
                    html += `<tr><td class='alignLeft pTop10'>${players[i].name}</td><td class='alignRight pTop10'>${players[i].score}</td></tr>`
                }
                html += '</table>';
            }

            return `<div flow-step="gameOver">
                        <div class="w100 pTop10 alignCenter">
                            <span class="textSize_4">Jamb</span>
                            <div style=" position: relative; padding-bottom: 50px;">
                                <div style=" position: absolute; right: 0; top: -20px;">
                                    <br>
                                    <span class="pTop10">Powered by Davor</span>
                                    <br>
                                    <span>Co-creator Mila</span>
                                </div>
                            </div>
                        </div>

                        <div class="w100 pTop10 alignCenter">
                            ${html}
                            <div style=" text-align: center; height: 70px; padding-top: 50px;">
                                <input type="button" class='start--new--game' value="Zapocni igru" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                            </div>
                        </div>
                    </div>`;
        }

        return GameOver;
    })();
}).call(this);