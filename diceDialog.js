;(function() {

    this.DiceDialog = (function() {

        function DiceDialog(parentContext, containerId, data) {
            this.parentContext = parentContext;

            this.container = document.getElementById(containerId);
            this.container.innerHTML = this.getHTML();

            this.rollDice = []
            for (i = 0; i < data.diceNumber; i++) {
                this.rollDice.push(i + 1);
            }

            this.moveToNeutral()

            document.addEventListener('keyup', this.rollDiceF.bind(this));
        }

        DiceDialog.prototype.show = function() {
            document.getElementById('viewId').setAttribute('view-type', 'dialog')
        }

        DiceDialog.prototype.hide = function() {
            document.getElementById('viewId').setAttribute('view-type', 'game')
        }

        DiceDialog.prototype.roll = function() {

        }

        DiceDialog.prototype.getHTML = function() {
            return `<div class='dice-container diceDialog'>
                        <div class='dice-wrapper dice-animation' dice-order='1'>
                            <div class='dice-face' dice-value='1'>
                                <div class='dot' dice-number='5'></div>
                            </div>
                
                            <div class='dice-face' dice-value='2'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                            
                            <div class='dice-face' dice-value='3'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='4'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='5'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='6'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='4'></div>
                                <div class='dot' dice-number='6'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                        </div>
                        <div class='dice-wrapper dice-animation' dice-order='2'>
                            <div class='dice-face' dice-value='1'>
                                <div class='dot' dice-number='5'></div>
                            </div>
                
                            <div class='dice-face' dice-value='2'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                            
                            <div class='dice-face' dice-value='3'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='4'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='5'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='6'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='4'></div>
                                <div class='dot' dice-number='6'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                        </div>
                        <div class='dice-wrapper dice-animation'dice-order='3'>
                            <div class='dice-face' dice-value='1'>
                                <div class='dot' dice-number='5'></div>
                            </div>
                
                            <div class='dice-face' dice-value='2'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                            
                            <div class='dice-face' dice-value='3'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='4'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='5'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='6'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='4'></div>
                                <div class='dot' dice-number='6'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                        </div>
                        <div class='dice-wrapper dice-animation' dice-order='4'>
                            <div class='dice-face' dice-value='1'>
                                <div class='dot' dice-number='5'></div>
                            </div>
                
                            <div class='dice-face' dice-value='2'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                            
                            <div class='dice-face' dice-value='3'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='4'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='5'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='6'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='4'></div>
                                <div class='dot' dice-number='6'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                        </div>
                        <div class='dice-wrapper dice-animation' dice-order='5'>
                            <div class='dice-face' dice-value='1'>
                                <div class='dot' dice-number='5'></div>
                            </div>
                
                            <div class='dice-face' dice-value='2'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                            
                            <div class='dice-face' dice-value='3'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='4'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='5'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='6'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='4'></div>
                                <div class='dot' dice-number='6'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                        </div>
                        <div class='dice-wrapper dice-animation' dice-order='6'>
                            <div class='dice-face' dice-value='1'>
                                <div class='dot' dice-number='5'></div>
                            </div>
                
                            <div class='dice-face' dice-value='2'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                            
                            <div class='dice-face' dice-value='3'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='4'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='5'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='5'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                
                            <div class='dice-face' dice-value='6'>
                                <div class='dot' dice-number='1'></div>
                                <div class='dot' dice-number='3'></div>
                                <div class='dot' dice-number='4'></div>
                                <div class='dot' dice-number='6'></div>
                                <div class='dot' dice-number='7'></div>
                                <div class='dot' dice-number='9'></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex w100 pTop10 itemAlignCenter" style="background-color: antiquewhite;
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            padding-top: 50px;
                            margin: 0;
                            opacity: 0.9;">
                                <div class="flex pTop10 itemAlignCenter include--dice" include-dice='false' style="height: 70px">
                                    <input id="enterButtonId" class="w40" type="button" tabindex=-1 value="Potvrdi potez" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                </div>
                            </div>
                        </div>
                    </div>`
        }

        DiceDialog.prototype.rollDiceF = function(event) {

            if (event.key == 'n') {
                this.moveToNeutral()
            }

            if (event.key != 'x') {
                return;
            }

            containerWidth = this.container.offsetWidth
            containerHeight = this.container.offsetHeight - 50
            diceWidth = document.getElementsByClassName('dice-wrapper')[0].offsetWidth

            // maxHeight = this.rollDice.length * diceWidth + this.rollDice.length * 20 
            
            // calcHeight = (height - maxHeight) / this.rollDice.length

            // diceItems = el = document.querySelectorAll(`.dice-wrapper`)
            // diceItems.forEach(item => item.classList.remove('hide'))

            setTimeout(() => {
                for (i = 0; i < this.rollDice.length; i++) {
                    w = containerWidth - (diceWidth + (diceWidth/2))
                    rw = Math.floor(Math.random() * (w - 20 + 1) + 20)
                    el = document.querySelector(`.dice-wrapper[dice-order='${i + 1}']`)
                    el.style.transform = `translateX(${rw}px) translateY(0px)`
                }
            }, 100);
        }


        DiceDialog.prototype.moveToNeutral = function() {
            diceItems = el = document.querySelectorAll(`.dice-wrapper`)

            for (i = 0; i < diceItems.length; i++) {
                diceItems[i].classList.remove('dice-animation')
                diceItems[i].style.transform = `translateY(1000px)`
            }

            setTimeout(() => {
                for (i = 0; i < diceItems.length; i++) {
                    diceItems[i].classList.add('dice-animation')
                }    
            }, (500));
            
        }

        return DiceDialog;
    })();
}).call(this);