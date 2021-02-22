;(function() {

    this.GameMode = (function() {

        function GameMode(parentContext, containerId) {
            playerIndex = 3;
            this.parentContext = parentContext;
            this.container = document.getElementById(containerId);
            this.container.innerHTML = this.getHTML();

            this.clickEvent = this.clickEventHandler.bind(this)
            this.container.addEventListener('click', this.clickEvent)
        }

        GameMode.prototype.destroy = function() {
            delete playerIndex
            this.container.removeEventListener('click', this.clickEvent)
            clickEvent = null
            clickEventHandler = null

            delete this.container
        }

        GameMode.prototype.clickEventHandler = function(event) {

            element = event.target;

            if (element.closest('.add--player--button')) {
                this.addPlayerButtonClicked(event);
                return;
            }
            
            if (element.closest('.remove--player--button')) {
                this.removePlayerButtonClicked(event);
                return;
            }

            if (element.closest('.exit--button')) {
                this.parentContext.backToHomePage()
                return
            }

            if (element.closest('.start--game--button')) {
                event.preventDefault()
                this.parentContext.startMultiPlayerButtonClicked(this.getPageInfo());
                return
            }
        }

        GameMode.prototype.addPlayerButtonClicked = function(event) {
            container = document.getElementById("addPlayerContainerId");
            html = `<div class='add--player flex pTop10 itemAlignCenter'>
                        <input type='text' min='2' placeholder='Igrac ${playerIndex++}' class='player--name--input' style=' width: 90%; position: relative; height: 50px; font-size: 1.3rem;'>
                        <div style='margin-top: 5px; width: 40px; margin-left: 5px; height: 40px;'>
                            <input type='button' value='−' class='remove--player--button' style='border-radius: 100%;width: 100%;height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;'>
                        </div>
                    </div>`;
            container.insertAdjacentHTML('beforeend', html);
        }

        GameMode.prototype.removePlayerButtonClicked = function(event) {
            event.target.closest('.add--player').remove();
            playerIndex = 0;
            elements = document.getElementsByClassName('add--player')
            while (playerIndex < elements.length) {
                el = elements[playerIndex].querySelector('.player--name--input')
                el.setAttribute('placeholder', 'Igrac ' + (playerIndex + 1))
                playerIndex++;
            }
            playerIndex++;
        }

        GameMode.prototype.getPageInfo = function() {
            playerNameInputs = document.getElementsByClassName('player--name--input');
            playerNames = [];
            for (i = 0; i < playerNameInputs.length; i++) {
                playerNames[i] = playerNameInputs[i].value.trim() == '' ? playerNameInputs[i].getAttribute('placeholder') : playerNameInputs[i].value.trim();
            }

            return playerNames
        }

        GameMode.prototype.getHTML = function() {
            return `<div>
                        <div>
                            <input class='exitButton exit--button' type='button' value='X'>
                        </div>
                        
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
                            <div id="addPlayerContainerId" class="flex pTop10 itemAlignCenter flex" style="flex-direction: column;">
                                <div class="add--player flex pTop10 itemAlignCenter">
                                    <input type="text" min="2" placeholder="Igrac 1" class="player--name--input" style=" width: 90%; position: relative; height: 50px; font-size: 1.3rem;">
                                    <div style="margin-top: 5px; width: 40px; margin-left: 5px; height: 40px;">
                                        <input type="button" value="−" disabled style="border-radius: 100%;width: 100%;height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                    </div>
                                </div>
                                <div class="add--player flex pTop10 itemAlignCenter">
                                    <input type="text" min="2" placeholder="Igrac 2" class="player--name--input" style=" width: 90%; position: relative; height: 50px; font-size: 1.3rem;">
                                    <div style="margin-top: 5px; width: 40px; margin-left: 5px; height: 40px;">
                                        <input type="button" value="−" disabled style="border-radius: 100%; width: 100%;height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                    </div>
                                </div>
                            </div>
                            <div class="flex itemAlignStart pTop10">
                                <input type="button" value="+" class="add--player--button" style="width: calc(90% - 10px);height: 50px;background: #6ebcff;cursor: pointer;border-radius: 16px;font-size: 2rem;padding: 0px;margin: 0;">
                            </div>
                        </div>
                        <div class="itemAlignCenter" style=" text-align: center; padding-top: 50px; position: relative;">
                            <input type="button" value="Zapocni igru" class="start--game--button" style=" width: 90%; height: 50px; background: #6ebcff; border-radius: 16px; cursor: pointer; position: absolute; left: 0; font-size: 1.3rem; width: calc(90% - 10px)">
                        </div>
                    </div>`;
        }

        return GameMode;
    })();
}).call(this);
