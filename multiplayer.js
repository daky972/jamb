;(function() {

    this.Multiplayer = (function() {

        MAX_COL = 6;
        MAX_ROW = 16;
        SUM_ROW_INDEICES = [6, 9, 15];

        rowHeaders = [1, 2, 3, 4, 5, 6, 'Σ', 'Max', 'Min', 'Σ', 'Kenta', 'Triling', 'Ful', 'Kare', 'Jamb', 'Σ']
        columnHeaders = ['↓', '↕', '↑', 'N', 'R', 'D']

        function Multiplayer(parentContext, containerId, data) {
            this.parentContext = parentContext;
            this.containerId = containerId;
            isMultiplayer = data.playerNames.length > 1;

            document.getElementById(containerId).innerHTML = this.getHTML();

            players = [];
            currentPlayerId = 0;
            tabIndex = 1;
            playerIndex = 3;

            lastEditedCell = null;
            previousSelectedInputId = null;
            currentEditedInput = null;
            currentCellId = 0;
            processing = false;

            this.inputChangeEvent = this.inputChangeEventHandler.bind(this);
            this.keyUpEvent = this.keyUpEventHandler.bind(this);
            this.clickEvent = this.clickEventHandler.bind(this);
            document.addEventListener("change", this.inputChangeEvent);
            document.addEventListener("keyup", this.keyUpEvent);
            document.addEventListener("click", this.clickEvent);

            this.createPlayers(data.playerNames);
            this.focusCurrentCell();
        }

        Multiplayer.prototype.destroy = function(){
            delete players;
            delete currentPlayerId;
            delete tabIndex;
            delete playerIndex;

            delete lastEditedCell;
            delete previousSelectedInputId;
            delete currentEditedInput;
            delete currentCellId;
            delete processing;

            delete this.inputChangeEvent;
            delete this.keyUpEvent;
            delete this.clickEvent;
        }

        Multiplayer.prototype.removeEvents = function(){
            document.removeEventListener("change", this.inputChangeEvent);
            document.removeEventListener("keyup", this.keyUpEvent);
            document.removeEventListener("click", this.clickEvent);
        }
        // ------------------------------------------------------------
        // Event handlers
        // ------------------------------------------------------------
        Multiplayer.prototype.inputChangeEventHandler = function(event) {

            if (processing) {
                return;
            }

            previousSelectedInputId = players[currentPlayerId].table[currentCellId].id;

            currentCellId = this.getId(event.target);

            if (players[currentPlayerId].lastFocusedCellId != null) {
                if (players[currentPlayerId].lastFocusedCellId != players[currentPlayerId].table[currentCellId].id) {
                    document.getElementById(this.createId(previousSelectedInputId)).value = '';
                }
            }
        }

        Multiplayer.prototype.keyUpEventHandler = function(event) {
            if (event.keyCode == 13 || event.code == 'Enter') {
                this.enterNumber();
                return;
            }
        }

        Multiplayer.prototype.clickEventHandler = function(event) {

            element = event.target;
            
            if (element.closest('#enterButtonId')) {
                this.enterNumber();
                return;
            }
        }

        // ------------------------------------------------------------
        // Initialization
        // ------------------------------------------------------------

        Multiplayer.prototype.createPlayers = function(playerNames) {
            for (i = 0; i < playerNames.length; i++) {
                
                players[i] = {
                    id: i,
                    name: playerNames[i],
                    score: 0,
                    wins: 0,
                    loses: 0,
                    finishedGame: false,
                    lastFocusedCellId: 0,
                    table: {}
                }

                this.createUsersTable(players[i]);
            }
        }

        Multiplayer.prototype.createUsersTable = function(player) {
            playerTable = this.createRowHeaders(player);
            element = document.getElementById('gameTablesId');

            element.insertAdjacentHTML('beforeend', playerTable);
        }

        Multiplayer.prototype.createRowHeaders = function(player) {
            hideClass = player.id == 0 ? '' : 'hide';
            table = `<div id="player_${player.id}" class="${hideClass}">
                        <div style="height: 30px; padding-top: 30px; font-size: 2rem; display: block; padding-bottom: 30px;">
                            <span style="display: block; text-align: center;">
                                ${player.name}
                            </span>
                        </div>
                        <table class='gameTable'>`;

            columnHeaderIndex = 0;

            table += "<tr><td class='game_td'>JAMB</td><td class='game_td'>↓</td><td class='game_td'>↕</td><td class='game_td'>↑</td><td class='game_td'>N</td><td class='game_td'>R</td><td class='game_td'>D</td></tr>";
            for (rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
                table += `<tr><td class='game_td'>${rowHeaders[rowIndex]}</td>`;
                table += this._getRowHTML(rowIndex, player.id);
                table += '</tr>';
            }
            table += '</div><table>';
            
            return table;
        }

        Multiplayer.prototype._getRowHTML = function(rowIndex, playerId) {

            html = '';
            for (columnIndex = 0; columnIndex < MAX_COL; columnIndex++) {
                html += this._getCellHTML(rowIndex, columnIndex, playerId);
            }
            return html;
        }

        Multiplayer.prototype._getCellHTML = function(rowIndex, columnIndex, playerId) {

            order = this.getOrderByColumnIndex(columnIndex);
            color = '';
            size = 2;
            attributes = '';
            isAutoField = 'auto-calculated=false';
            isSum = false;

            itemId = MAX_ROW * columnIndex + rowIndex;
            if (rowHeaders[rowIndex] == 'Σ') {
                color = 'rowColor';
                isAutoField = true;
                size = 3;
                isAutoField = 'auto-calculated=true';
                attributes = `sum-index=${SUM_ROW_INDEICES.indexOf(rowIndex)} disabled`;
                tabIndexAttr = 'tabindex=-1';
                isSum = true;
            } else {
                tabIndexAttr = `tabindex=${itemId}`;
            }

            cellAttributes = `x-position=${rowIndex} y-position=${columnIndex}`;
            cellIndex = columnIndex;
            disabled = ((columnIndex == 0 && rowIndex != 0) || (columnIndex == 2 && rowIndex != MAX_ROW - 2));

            players[playerId].table[itemId] = {
                id: itemId,
                isSum: isSum,
                processed: false,
                value: null,
                order: order,
                score: 0
            }

            if (isSum) {
                disabledCss = '';
            } else {
                disabledCss = disabled ? 'disabled' : 'avaliable-input';
                attributes = disabled ? 'disabled' : '';
            }
            
            return `<td class='game_td'>
                        <input id=cellId_${playerId}_${itemId} ${tabIndexAttr} class='nmb_input ${color} ${disabledCss}' type='number' pattern="[0-9]*" maxlength='${size}' size='${size}' ${isAutoField} ${attributes} next-step=${order}>
                    </td>`;
        }

        Multiplayer.prototype.getOrderByColumnIndex = function(columnIndex) {
            columnHeader = columnHeaders[columnIndex];
            switch (columnHeader) {
                case '↓':
                    return 'down'
                case '↑':
                    return 'up'
                default:
                    return 'random'
            }
        }

        // ------------------------------------------------------------
        // Game control
        // ------------------------------------------------------------

        Multiplayer.prototype.enterNumber = function() {

            if (processing) {
                return;
            }

            processing = true;
            
            input = this.getCurrentPlayerItem(currentCellId).value.trim();
            if (input == '' || isNaN(Number(input)) || Number(input) < 0) {
                processing = false;
                return;
            }

            players[currentPlayerId].table[currentCellId].value = Number(input);
            lastEditedCellHolder = input;
            this.disableCurrentCell();

            this.calculateSum();
            nextCell = this.selectNextCell();
            if (this.isCurrentCellSum()) {
                nextCell = this.selectNextCell();
            }
            
            if (nextCell) {
                this.enableCurrentCell();
                this.focusCurrentCell();
                lastEditedCell = lastEditedCellHolder;
                players[currentPlayerId].table[currentCellId].nextCell = nextCell;
            } else {
                players[currentPlayerId].finishedGame = true;
                
                if (this.checkIsGameOver()) {
                    this.removeEvents();
                    return this.parentContext.gameOver(players);
                    
                }
            }

            if (isMultiplayer) {
                this.currentPlayerEndTurn();
            }
            
            processing = false;
        }

        Multiplayer.prototype.disableCurrentCell = function() {
            players[currentPlayerId].table[currentCellId].processed = true;
            item = this.getCurrentPlayerItem(currentCellId);
            item.classList.add('disabled');
            item.classList.remove('avaliable-input');
            item.setAttribute('disabled', true);
        }

        Multiplayer.prototype.getCurrentPlayerItem = function(itemId) {
            return document.getElementById(this.createId(players[currentPlayerId].table[itemId].id));
        }

        Multiplayer.prototype.addToCurrentPlayerSum = function(sum) {
            players[currentPlayerId].score += sum;
        }

        Multiplayer.prototype.getNextInColumn = function(columnIndex) {

            from = columnIndex * MAX_ROW;
            to = from + MAX_ROW - 1;

            if (players[currentPlayerId].table[from].order == 'up') {
                start = to;
                end = from;

                while (start >= end) {
                    if (!players[currentPlayerId].table[start].processed && !players[currentPlayerId].table[start].isSum) {
                        currentCellId = start;
                        return players[currentPlayerId].table[start].id;
                    }
                    start--;
                }
            }

            start = from;
            end = to;

            while (start <= end) {
                if (!players[currentPlayerId].table[start].processed && !players[currentPlayerId].table[start].isSum) {
                    currentCellId = start;
                    return players[currentPlayerId].table[start].id;
                }
                start++;
            }

            return null;
        }

        Multiplayer.prototype.selectNextCell = function() {
            order = players[currentPlayerId].table[currentCellId].order;

            nextCellId = null;
            currentColumnIndex = Math.floor(currentCellId / MAX_ROW);
            originalCurrentIndex = currentColumnIndex;
            while (currentColumnIndex < MAX_COL && nextCellId == null) {
                nextCellId = this.getNextInColumn(currentColumnIndex++);
            }

            if (nextCellId == null) {
                index = 0;
                while (index < originalCurrentIndex && nextCellId == null) {
                    nextCellId = this.getNextInColumn(index++);
                }
            }

            if (nextCellId == null) {
                return null;
            }

            currentCellId = nextCellId;
            return players[currentPlayerId].table[nextCellId];
        }

        Multiplayer.prototype.getId = function(element) {
            return Number(element.id.replace(`cellId_${currentPlayerId}_`, ''));
        }

        Multiplayer.prototype.createId = function(id) {
            return `cellId_${currentPlayerId}_${id}`;
        }

        Multiplayer.prototype.focusCurrentCell = function() {
            this.getCurrentPlayerItem(currentCellId).focus();
            players[currentPlayerId].lastFocusedCellId = currentCellId;
        }

        Multiplayer.prototype.isCurrentCellSum = function() {
            return players[currentPlayerId].table[currentCellId].isSum;
        }

        Multiplayer.prototype.enableCurrentCell = function() {
            item = this.getCurrentPlayerItem(currentCellId);
            item.removeAttribute('disabled');
            item.classList.add('avaliable-input');
            item.classList.remove('disabled');
        }

        Multiplayer.prototype.calculateFirstSum = function() {
            firstCellIndex = Math.floor(currentCellId / MAX_ROW) * MAX_ROW;
            resultIndex =  firstCellIndex + SUM_ROW_INDEICES[0];

            if (players[currentPlayerId].table[resultIndex].processed) {
                return;
            }

            allProcessed = true;
            sum = 0;
            for (i = firstCellIndex; i < resultIndex && allProcessed; i++) {
                allProcessed = players[currentPlayerId].table[i].processed;
                sum += Number(players[currentPlayerId].table[i].value);
            }

            if (!allProcessed) {
                return;
            }

            players[currentPlayerId].table[resultIndex].processed = true;
            this.setValueToInput(resultIndex, sum);
        }


        Multiplayer.prototype.calculateSecondSum = function() {
            firstCellIndex = Math.floor(currentCellId / MAX_ROW) * MAX_ROW;
            resultIndex = firstCellIndex + SUM_ROW_INDEICES[1];
            
            firstSumIndex = firstCellIndex + SUM_ROW_INDEICES[0];
            if (!players[currentPlayerId].table[firstSumIndex].processed) {
                return;
            }

            if (players[currentPlayerId].table[resultIndex].processed) {
                return;
            }

            allProcessed = true;
            sum = 0;
            for (i = firstSumIndex + 1; i < resultIndex && allProcessed; i++) {
                allProcessed = players[currentPlayerId].table[i].processed;
                sum += Number(players[currentPlayerId].table[i].value);
            }

            if (!allProcessed) {
                return;
            }

            players[currentPlayerId].table[resultIndex].processed = true;
            this.setValueToInput(resultIndex, sum * Number(players[currentPlayerId].table[firstCellIndex].value));
        }

        Multiplayer.prototype.calculateThirdSum = function() {
            firstCellIndex = Math.floor(currentCellId / MAX_ROW) * MAX_ROW;
            resultIndex =  firstCellIndex + SUM_ROW_INDEICES[2];

            if (players[currentPlayerId].table[resultIndex].processed) {
                return;
            }

            startIndex = firstCellIndex + SUM_ROW_INDEICES[1] + 1;
            allProcessed = true;
            sum = 0;
            for (i = startIndex; i < resultIndex && allProcessed; i++) {
                allProcessed = players[currentPlayerId].table[i].processed;
                sum += Number(players[currentPlayerId].table[i].value);
            }

            if (!allProcessed) {
                return;
            }

            players[currentPlayerId].table[resultIndex].processed = true;
            
            this.setValueToInput(resultIndex, sum);
            players[currentPlayerId].table[resultIndex].value = sum;
        }

        Multiplayer.prototype.setValueToInput = function(index, sum) {
            this.getCurrentPlayerItem(index).value = sum;
            this.addToCurrentPlayerSum(sum);
        }

        Multiplayer.prototype.calculateSum = function() {
            this.calculateFirstSum();
            this.calculateSecondSum();
            this.calculateThirdSum();
        }

        Multiplayer.prototype.checkIsGameOver = function() {
            gameOver = true;
            for (i = 0; i < players.length; i++) {
                if (!players[i].finishedGame) {
                    gameOver = false;
                }
            }

            return gameOver;
        }

        // ------------------------------------------------------------
        // Multiplayer functions
        // ------------------------------------------------------------
        Multiplayer.prototype.currentPlayerEndTurn = function() {
            this.hideCurrentPlayerTable();
            this.selectNextPlayer();
            this.showCurrentPlayerTable();
            currentCellId = players[currentPlayerId].lastFocusedCellId;
            this.focusCurrentCell();
        }

        Multiplayer.prototype.selectNextPlayer = function() {
            currentPlayerId = (currentPlayerId + 1) % players.length;
        }

        Multiplayer.prototype.hideCurrentPlayerTable = function() {
            document.getElementById('player_' + players[currentPlayerId].id).classList.add('hide');
        }
        
        Multiplayer.prototype.showCurrentPlayerTable = function() {
            document.getElementById('player_' + players[currentPlayerId].id).classList.remove('hide');
        }






        // ------------------------------------------------------------
        // GUI
        // ------------------------------------------------------------
        Multiplayer.prototype.getHTML = function() {
            return `<div class='gameTab'>
                        <div id="gameTablesId" class="w100">
                        </div>

                        <div class="flex w100 pTop10 itemAlignCenter">
                            <div id="addPlayerContainerId" class="flex pTop10 w90" style="flex-direction: column;">
                                <div class="flex pTop10 itemAlignCenter" style="height: 70px">
                                    <input id="enterButtonId" class="w40" type="button" tabindex=-1 value="Potvrdi potez" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                </div>
                            </div>
                        </div>
                    </div>`;
        }

        return Multiplayer;
    })();

}).call(this);
