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
        }

        DiceDialog.prototype.show = function() {
            this.container.classList.remove('hide')
        }

        DiceDialog.prototype.hide = function() {
            this.container.classList.add('hide')
        }

        DiceDialog.prototype.roll = function() {

        }

        DiceDialog.prototype.getHTML = function() {
            return `<div class='dice-container diceDialog'>
                            <div class='dice-wrapper' dice-order='1'>
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
                            <div class='dice-wrapper' dice-order='2'>
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
                            <div class='dice-wrapper'dice-order='3'>
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
                            <div class='dice-wrapper' dice-order='4'>
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
                            <div class='dice-wrapper' dice-order='5'>
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
                            <div class='dice-wrapper' dice-order='6'>
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
                    </div>`
        }

        return DiceDialog;
    })();
}).call(this);