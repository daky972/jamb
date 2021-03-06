;(function() {

    this.Homepage = (function() {

        function Homepage(parentContext, containerId) {
            this.parentContext = parentContext;
            this.container = document.getElementById(containerId);

            this.container.innerHTML = this.getHTML();
            this.clickEvent = this.clickEventHandler.bind(this)
            this.container.addEventListener('click', this.clickEvent)
        }

        Homepage.prototype.destroy = function() {
            this.container.removeEventListener('click', this.clickEvent)
            delete this.clickEvent
        }

        Homepage.prototype.clickEventHandler = function(event) {
            
            element = event.target;

            if (element.closest('.single--player--button')) {
                this.parentContext.singlePlayerButtonClicked();
                return;
            }

            if (element.closest('.multi--player--button')) {
                this.parentContext.multiPlayerButtonClicked();
                return;
            }

            if (element.closest('.game--rules--button')) {
                this.parentContext.gameRulesButtonClicked();
                return;
            }
        }

        Homepage.prototype.getHTML = function() {
            return `<div flow-step="gameMode">
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

                        <div class="w100 selectModeContainer alignCenter">
                            <div id="addPlayerContainerId" class="flex pTop10 itemAlignCenter flex" style="flex-direction: column;">
                                <div class="flex pTop10 itemAlignCenter" style="height: 50px">
                                    <input type="button" value="Jedan igrač" class="single--player--button"style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                </div>
                                <div class="flex pTop10 itemAlignCenter" style="height: 50px">
                                    <input type="button" value="Više igrača" class="multi--player--button" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                </div>
                                <div class="flex pTop10 itemAlignCenter" style="height: 50px">
                                    <input type="button" value="Pravila igre" class="game--rules--button" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                </div>
                            </div>
                        </div>
                    </div>`
        }

        return Homepage;
    })();
}).call(this);
