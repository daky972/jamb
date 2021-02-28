;(function() {

    this.Multiplayer = (function() {

        MAX_COL = 6;
        MAX_ROW = 16;
        SUM_ROW_INDEICES = [6, 9, 15];

        rowHeaders = [1, 2, 3, 4, 5, 6, 'Σ', 'Max', 'Min', 'Σ', 'Kenta', 'Triling', 'Ful', 'Kare', 'Jamb', 'Σ']
        columnHeaders = ['↓', '↕', '↑', 'N', 'R', 'D']

        function Multiplayer(parentContext, containerId, playerNames) {

            if (parentContext == null) {
                // test mode
                return;
            }

            this.parentContext = parentContext;
            this.containerId = containerId;
            isMultiplayer = playerNames.length > 1;
            this.includeDice = false

            this.container = document.getElementById(containerId)
            this.container.innerHTML = this.getHTML();

            players = [];
            currentPlayerId = 0;
            tabIndex = 1;
            playerIndex = 3;

            lastEditedCell = null;
            previousSelectedInputId = null;
            currentEditedInput = null;
            this.currentCellId = 0;
            processing = false;

            this.inputChangeEvent = this.inputChangeEventHandler.bind(this);
            this.keyUpEvent = this.keyUpEventHandler.bind(this);
            this.clickEvent = this.clickEventHandler.bind(this);
          
            this.container.addEventListener("change", this.inputChangeEvent);
            this.container.addEventListener("keyup", this.keyUpEvent);
            this.container.addEventListener("click", this.clickEvent);

            this.createPlayers(playerNames);
            this.focusCurrentCell();

            diceDialog = new DiceDialog(this, 'dialogId', {diceNumber: 6});
        }

        Multiplayer.prototype.destroy = function(){

            this.removeEvents()

            delete players
            delete currentPlayerId
            delete tabIndex
            delete playerIndex

            delete lastEditedCell
            delete previousSelectedInputId
            delete currentEditedInput
            delete this.currentCellId
            delete processing

            delete isMultiplayer
            delete this.includeDice

            delete this.container

            delete this.inputChangeEvent
            delete this.keyUpEvent
            delete this.clickEvent

        }

        Multiplayer.prototype.removeEvents = function(){
            this.container.removeEventListener("change", this.inputChangeEvent);
            this.container.removeEventListener("keyup", this.keyUpEvent);
            this.container.removeEventListener("click", this.clickEvent);
        }
        // ------------------------------------------------------------
        // Event handlers
        // ------------------------------------------------------------
        Multiplayer.prototype.inputChangeEventHandler = function(event) {

            if (processing) {
                return;
            }

            target = event.target
            if (target.closest('.play--with--dice')) {
                this.includeDiceChanged(target.checked)
                return;
            }

            previousSelectedInputId = this.getSelectedCell().id;

            this.currentCellId = this.getCellId(event.target);

            if (players[currentPlayerId].lastFocusedCellId != null) {
                if (players[currentPlayerId].lastFocusedCellId != this.getSelectedCell().id) {
                    document.getElementById(this.createCellId(previousSelectedInputId)).value = '';
                }
            }
        }

        Multiplayer.prototype.keyUpEventHandler = function(event) {

            target = event.target

            if (event.keyCode == 13 || event.code == 'Enter') {
                this.enterNumber();
                return;
            }

            if (target.closest('.nmb_input') && isNaN(Number(event.key))) {
                target.value = ''
                return;
            }
        }

        Multiplayer.prototype.clickEventHandler = function(event) {

            element = event.target;
            
            if (element.closest('#enterButtonId')) {
                this.enterNumber();
                return;
            }

            if (element.closest('#throwDiceId')) {
                this.openDiceDialog();
                return;
            }
            
            if (element.closest('.exit--button')) {
                this.parentContext.backToHomePage()
                return
            }

            if (element.closest('.avaliable-input') && this.includeDice) {
                this.currentCellId = this.getCellId(element)
            }
        }

        Multiplayer.prototype.openDiceDialog = function() {
            diceDialog.show()
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

            table = ''
            if (isMultiplayer) {
                hideClass = player.id == 0 ? '' : 'hide';
                table = `<div id="player_${player.id}" class="${hideClass}">
                            <div style="height: 30px; padding-top: 30px; font-size: 2rem; display: block; padding-bottom: 30px;">
                                <span style="display: block; text-align: center;">
                                    ${player.name}
                                </span>
                            </div>`;
            }

            columnHeaderIndex = 0;

            table += "<table class='gameTable'><tr><td class='game_td'>JAMB</td><td class='game_td'>↓</td><td class='game_td'>↕</td><td class='game_td'>↑</td><td class='game_td'>N</td><td class='game_td'>R</td><td class='game_td'>D</td></tr>";
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
                score: 0,
                disabled: disabled,
                rowName: rowHeaders[rowIndex],
                columnName: columnHeaders[columnIndex]
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
            
            input = this.getCurrentPlayerItem(this.currentCellId).value.trim()

            if (this.includeDice) {
                input = this.getCurrentPlayerItem(this.currentCellId).getAttribute('placeholder')
                this.getCurrentPlayerItem(this.currentCellId).value = input

            } else if (input == '' || isNaN(Number(input)) || Number(input) < 0) {
                processing = false;
                return;
            }

            this.getSelectedCell().value = Number(input);
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
                this.getSelectedCell().nextCell = nextCell;
            } else {
                players[currentPlayerId].finishedGame = true;
                
                if (this.checkIsGameOver()) {
                    this.removeEvents();
                    return this.parentContext.gameOver(players);
                    
                }
            }

            if (this.includeDice) {
                this.clearSuggestedValues()
                this.setRollDiceButton()
                this.enableRollDiceToggleButton()
            }

            if (isMultiplayer) {
                this.currentPlayerEndTurn();
            }
            
            processing = false;
        }

        Multiplayer.prototype.disableCurrentCell = function() {
            this.getSelectedCell().processed = true;
            this.getSelectedCell().disabled = false;
            item = this.getCurrentPlayerItem(this.currentCellId);
            item.classList.add('disabled');
            item.classList.remove('avaliable-input');
            item.setAttribute('disabled', true);
        }

        Multiplayer.prototype.getCurrentPlayerItem = function(itemId) {
            return document.getElementById(this.createCellId(players[currentPlayerId].table[itemId].id));
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
                        this.currentCellId = start;
                        return players[currentPlayerId].table[start].id;
                    }
                    start--;
                }
            }

            start = from;
            end = to;

            while (start <= end) {
                if (!players[currentPlayerId].table[start].processed && !players[currentPlayerId].table[start].isSum) {
                    this.currentCellId = start;
                    return players[currentPlayerId].table[start].id;
                }
                start++;
            }

            return null;
        }

        Multiplayer.prototype.selectNextCell = function() {
            order = this.getSelectedCell().order;

            nextCellId = null;
            currentColumnIndex = Math.floor(this.currentCellId / MAX_ROW);
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

            this.currentCellId = nextCellId;
            return players[currentPlayerId].table[nextCellId];
        }

        Multiplayer.prototype.getCellId = function(element) {
            return Number(element.id.replace(`cellId_${currentPlayerId}_`, ''));
        }

        Multiplayer.prototype.createCellId = function(id) {
            return `cellId_${currentPlayerId}_${id}`;
        }

        Multiplayer.prototype.focusCurrentCell = function() {
            this.getCurrentPlayerItem(this.currentCellId).focus();
            players[currentPlayerId].lastFocusedCellId = this.currentCellId;
        }

        Multiplayer.prototype.isCurrentCellSum = function() {
            return this.getSelectedCell().isSum;
        }

        Multiplayer.prototype.enableCurrentCell = function() {
            item = this.getCurrentPlayerItem(this.currentCellId);
            item.removeAttribute('disabled');
            item.classList.add('avaliable-input');
            item.classList.remove('disabled');
        }

        Multiplayer.prototype.calculateFirstSum = function() {
            firstCellIndex = Math.floor(this.currentCellId / MAX_ROW) * MAX_ROW;
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
            firstCellIndex = Math.floor(this.currentCellId / MAX_ROW) * MAX_ROW;
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
            firstCellIndex = Math.floor(this.currentCellId / MAX_ROW) * MAX_ROW;
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
            this.currentCellId = players[currentPlayerId].lastFocusedCellId;
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


        Multiplayer.prototype.includeDiceChanged = function(includeDice) {
            this.includeDice = includeDice

            if (this.includeDice) {
                this.setRollDiceButton()
            } else {
                this.setEnterValueButton()
            }
        }

        Multiplayer.prototype.diceDialogResult = function(diceDialogResult) {
            console.log(diceDialogResult)
            this.suggestResults(diceDialogResult)
            this.disableRollDiceToggleButton()
            this.setEnterValueButton()
        }

        // ------------------------------------------------------------
        // Dice calculations
        // ------------------------------------------------------------
        Multiplayer.prototype.suggestResults = function(result) {
            table = this.getCurrentPlayer().table
            keys = Object.keys(table)
            for (let i = 0; i < keys.length; i++) {
                cellItem = table[keys[i]]
                suggestedValue = this.getSuggestedValueForCell(cellItem, result)
                if (suggestedValue != null) {
                    document.getElementById(this.createCellId(cellItem.id)).setAttribute('placeholder', suggestedValue)
                }
            }
        }

        Multiplayer.prototype.clearSuggestedValues = function() {
            for (i = 0; i < keys.length; i++) {
                document.getElementById(this.createCellId(table[keys[i]].id)).removeAttribute('placeholder')
            }
        }

        Multiplayer.prototype.getSuggestedValueForCell = function(cellItem, result) {
            if (cellItem.processed || cellItem.disabled || cellItem.isSum) {
                return null
            }

            switch (cellItem.rowName) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    return this.countNumberAppearance(cellItem.rowName, result)

                case 'Max':
                case 'Min':
                    return this.countDiceSum(result)

                case 'Kenta':
                    return this.isKenta(result)

                case 'Triling':
                    return this.isTrilling(result)

                case 'Ful':
                    return this.isFull(result)

                case 'Kare':
                    return this.isKare(result)

                case 'Jamb':
                    return this.isYamb(result)
                
                default:
                    return null
            }
        }

        Multiplayer.prototype.countNumberAppearance = function(countSymbol, result) {

            let count = 0
            for (let i = 0; i < result.dice.length; i++) {
                if (result.dice[i] == countSymbol) {
                    count++
                }
            }

            return countSymbol * count
        }

        Multiplayer.prototype.countDiceSum = function(result) {
            let sum = 0
            for (let i = 0; i < result.dice.length; i++) {
                sum += result.dice[i]
            }

            return sum
        }

        Multiplayer.prototype.isKenta = function(result) {
            sum = 0

            kenta = ['12345', '23456']
            diceStr = result.dice.sort().join('')

            if (kenta.includes(diceStr)) {
                isKenta = true
                sum = 66 - ((result.handNumber - 1) * 10)
            }

            return sum
        }

        Multiplayer.prototype.isTrilling = function(result) {
            sum = 0

            maxCount = 1
            currentCount = 1
            dice = result.dice.sort()
            selectedNumber = result.dice[0]
            
            for (i = 1; i < dice.length; i++) {
                if (dice[i] == dice[i - 1]) {
                    currentCount++
                } else {
                    
                    if (currentCount > maxCount) {
                        maxCount = currentCount
                        selectedNumber = dice[i - 1]
                    }

                    currentCount = 1
                }
            }

            if (maxCount > 2) {
                isTrilling = true
                sum = 3 * selectedNumber + 20
            }

            return sum
        }

        Multiplayer.prototype.isFull = function(result) {
            sum = 0

            diceFreq = [0, 0, 0, 0, 0, 0]
            for (i = 0; i < result.dice.length; i++) {
                diceFreq[result.dice[i]]++
            }

            max1 = 0
            max1Index = 0
            max2 = 0
            max2Index = 0
            for (i = 0; i < diceFreq.length; i ++) {
                if (max1 < diceFreq[i]) {
                    max1 = diceFreq[i]
                    max1Index = i
                }

                if (max2 < diceFreq[i] && max1 != diceFreq[i] && max2 < max1) {
                    max2 = diceFreq[i]
                    max2Index = i
                }
            }


            if (max1 < max2) {
                max1 = max1 - max2
                max2 += max1
                max1 = max2 - max1

                max1Index = max1Index - max2Index
                max2Index += max1Index
                max1Index = max2Index - max1Index
            }

            if (max1 >= 3 && max2 >= 2) {
                isFull = true
                sum = 3 * max1Index + 2 * max2Index + 30
            }

            return sum
        }

        Multiplayer.prototype.isKare = function(result) {
            sum = 0

            diceFreq = [0, 0, 0, 0, 0, 0]
            for (i = 0; i < result.dice.length; i++) {
                diceFreq[result.dice[i]]++
            }

            max = 0
            index = 0
            for (i = 0; i < diceFreq.length; i++) {
                if (max < diceFreq[i]) {
                    max = diceFreq[i]
                    index = i
                }
            }

            if (max >= 4) {
                isPoker = true
                sum = 4 * index + 40
            }

            return sum
        }

        Multiplayer.prototype.isYamb = function(result) {
            sum = 0

            diceFreq = [0, 0, 0, 0, 0, 0]
            for (i = 0; i < result.dice.length; i++) {
                diceFreq[result.dice[i]]++
            }

            max = 0
            index = 0
            for (i = 0; i < diceFreq.length; i++) {
                if (max < diceFreq[i]) {
                    max = diceFreq[i]
                    index = i
                }
            }
            if (max >= 5) {
                isYamb = true
                sum = 5 * index + 50
            }

            return sum
        }

        // ------------------------------------------------------------
        // Utils
        // ------------------------------------------------------------
        Multiplayer.prototype.getCurrentPlayer = function() {
            return players[currentPlayerId]
        }

        Multiplayer.prototype.getSelectedCell = function() {
            return players[currentPlayerId].table[this.currentCellId]
        }


        // ------------------------------------------------------------
        // GUI
        // ------------------------------------------------------------
        Multiplayer.prototype.getHTML = function() {
            return `
                    <div>
                        <input class='exitButton exit--button' type='button' value='X'>
                    </div>
                    <div class='gameTab'>
                        <div id='playWithDiceContainerId' class='flex pTop10'>
                            <span style='font-size: 1.3rem;'>Sa kockicom</span>
                            <div style='padding-left: 10px;'>
                                <label class="switch">
                                    <input class='play--with--dice' type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div id="gameTablesId" class="w100">
                        </div>

                        <div class="flex w100 pTop10 itemAlignCenter buttons--container">
                            <div class="flex pTop10 itemAlignCenter include--dice" include-dice='false' style="height: 50px">
                                <input id="enterButtonId" class="w40" type="button" tabindex=-1 value="Potvrdi potez" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                            </div>
                            <div class="flex pTop10 itemAlignCenter include--dice hide" include-dice='true' style="height: 50px">
                                <input id="throwDiceId" class="w40" type="button" tabindex=-1 value="Baci kocke" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                            </div>
                        </div>
                    </div>`;
        }

        Multiplayer.prototype.setEnterValueButton = function() {
            document.querySelector(".include--dice[include-dice='false']").classList.remove('hide')
            document.querySelector(".include--dice[include-dice='true']").classList.add('hide')
        }

        Multiplayer.prototype.setRollDiceButton = function() {
            document.querySelector(".include--dice[include-dice='false']").classList.add('hide')
            document.querySelector(".include--dice[include-dice='true']").classList.remove('hide')
        }

        Multiplayer.prototype.disableRollDiceToggleButton = function() {
            document.getElementById('playWithDiceContainerId').classList.add('disabled')
        }

        Multiplayer.prototype.enableRollDiceToggleButton = function() {
            document.getElementById('playWithDiceContainerId').classList.remove('disabled')
        }

        //buttons--container
        return Multiplayer;
    })();

}).call(this);
