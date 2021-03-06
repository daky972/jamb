;(function() {

    this.DiceDialog = (function() {

        ROTATIONS = {
            '1': [
            'rotateX(40deg) rotateY(360deg) rotateZ(370deg)',
            'rotateX(60deg) rotateY(354deg) rotateZ(64deg)',
            'rotateX(238deg) rotateY(188deg) rotateZ(108deg)',
            'rotateX(598deg) rotateY(548deg) rotateZ(-252deg)'
            ],
            '2': [
                'rotateX(66deg) rotateY(-438deg) rotateZ(372deg)',
                'rotateX(154deg) rotateY(21deg) rotateZ(92deg) translateZ(100px) translateX(-60px)',
                'rotateX(154deg) rotateY(-46deg) rotateZ(97deg) translateZ(100px) translateX(-60px)'
            ],
            '3': [
                'rotateX(125deg) rotateY(-39deg) rotateZ(181deg)',
                'rotateX(125deg) rotateY(55deg) rotateZ(181deg)',
                'rotateX(156deg) rotateY(43deg) rotateZ(181deg)',
                'rotateX(152deg) rotateY(-37deg) rotateZ(184deg)'
            ],
            '4': [
                'rotateX(-393deg) rotateY(421deg) rotateZ(539deg)',
                'rotateX(-393deg) rotateY(365deg) rotateZ(539deg)',
                'rotateX(-393deg) rotateY(292deg) rotateZ(539deg)',
                'rotateX(-392deg) rotateY(231deg) rotateZ(543deg)'

            ],
            '5': [
                'rotateX(479deg) rotateY(240deg) rotateZ(244deg)',
                'rotateX(-63deg) rotateY(310deg) rotateZ(443deg)',
                'rotateX(-27deg) rotateY(345deg) rotateZ(452deg)',
                'rotateX(-27deg) rotateY(415deg) rotateZ(452deg)',
                'rotateX(-27deg) rotateY(872deg) rotateZ(452deg)',
                'rotateX(-27deg) rotateY(962deg) rotateZ(452deg)',
                'rotateX(-27deg) rotateY(1010deg) rotateZ(452deg)'
            ],
            '6': [
                'rotateX(60deg) rotateY(544deg) rotateZ(236deg)',
                'rotateX(59deg) rotateY(549deg) rotateZ(402deg)',
                'rotateX(414deg) rotateY(898deg) rotateZ(664deg)',
                'rotateX(421deg) rotateY(899deg) rotateZ(745deg)',
                'rotateX(422deg) rotateY(899deg) rotateZ(611deg)',
                'rotateX(414deg) rotateY(901deg) rotateZ(566deg)'
            ]
        }

        rotations = {
            1: {
                x: 70, y: 0, z: 'random'
            },
            2: {
                x: 'random', y: 90, z: 0
            },
            3: {
                x: 270, y: 'random', z: 0
            },
            4: {
                x: 90, y: 'random', z: 0
            },
            5: {
                x: 270, y: 'random', z: 90
            },
            6: {
                x: 280, y: 100, z: 90
            }
        }

        MAX_ROLL_NUMBER = 3
        
        function DiceDialog(parentContext, containerId, data) {
            this.parentContext = parentContext;
            this.container = document.getElementById(containerId);
            this.container.innerHTML = this.getHTML();

            this.clickEvent = this.clickEventHandler.bind(this)
            this.container.addEventListener('click', this.clickEvent)
        }

        DiceDialog.prototype.show = function() {
            document.getElementById('viewId').setAttribute('view-type', 'dialog')

            this.handNumber = 0
            this.moveToNeutral()
        }

        DiceDialog.prototype.hide = function() {
            document.getElementById('viewId').setAttribute('view-type', 'game')

            document.getElementsByClassName('enter--result')[0].value = 'Upiši 0'
            diceElements = document.getElementsByClassName('dice-wrapper')
            for (i = 0; i < diceElements.length; i++) {
                diceElements[i].classList.remove('selected')
            }
        }

        DiceDialog.prototype.destroy = function() {
            this.container.removeEventListener('click', this.clickEvent)
            delete this.clickEvent
        }

        DiceDialog.prototype.clickEventHandler = function(event) {

            target = event.target

            if (target.closest('.exit--button')) {
                this.hide()
                return
            }

            if (target.closest('.throw--dice--button')) {
                this.roll()
                return
            }

            if (target.closest('.enter--result')) {
                this.parentContext.diceDialogResult(this.returnDiceInfo())
                this.hide()
                return
            }

            if (target.closest('.dice-wrapper')) {
                diceWrapper = target.closest('.dice-wrapper')
                if (diceWrapper.classList.contains('selected')) {
                    diceWrapper.classList.remove('selected')
                } else {
                    diceWrapper.classList.add('selected')
                }

                if (document.querySelectorAll('.dice-wrapper.selected').length > 0) {
                    document.getElementsByClassName('enter--result')[0].value = 'Upiši'
                } else {
                    document.getElementsByClassName('enter--result')[0].value = 'Upiši 0'
                }
                
            }
        }

        DiceDialog.prototype.roll = function() {

            this.handNumber++
            if (this.handNumber == MAX_ROLL_NUMBER) {
                this.parentContext.diceDialogResult(this.returnDiceInfo())
                this.hide()
            }

            containerWidth = this.container.offsetWidth
            
            diceWidth = document.getElementsByClassName('dice-wrapper')[0].offsetWidth

            diceContainerWidth = document.getElementsByClassName('dice--container')[0].offsetHeight


            diceElements = document.getElementsByClassName('dice-wrapper')

            setTimeout(() => {
                for (i = 0; i < diceElements.length; i++) {
                    if (diceElements[i].classList.contains('selected')) {
                        continue
                    }
                    diceElements[i].classList.add('dice-before-animation')
                }    
            }, 100);
            

            setTimeout(() => {
                for (i = 0; i < diceElements.length; i++) {
                    if (diceElements[i].classList.contains('selected')) {
                        continue
                    }
    
                    number = Math.floor(Math.random() * 6 + 1)
                    rotationType = Math.floor(Math.random(0, rotations[number].length) * rotations[number].length);
    
                    diceElements[i].classList.remove('dice-before-animation')
                    diceElements[i].setAttribute('dice-selected-number', number)
                    diceElements[i].style.transform = ''
                }    
            }, 500);

        }

        DiceDialog.prototype.returnDiceInfo = function() {
            return {
                handNumber: this.handNumber,
                dice: this.getSelectedDice()
            }
        }

        DiceDialog.prototype.getSelectedDice = function() {
            diceElements = document.getElementsByClassName('dice-wrapper')

            selectedDice = []
            for (i = 0; i < diceElements.length; i++) {
                if (diceElements[i].classList.contains('selected')) {
                    selectedDice.push(Number(diceElements[i].getAttribute('dice-selected-number')))
                }
            }

            return selectedDice
        }

        DiceDialog.prototype.getRandomRotation = function() {
            return Math.floor(Math.random() * 360)
        }
        // DiceDialog.prototype.getNumber() {

        //     number = Math.floor(Math.random() * 6 + 1)
        //     rotationType = Math.floor(Math.random(0, rotations[number].length) * rotations[number].length);
        //     el.style.transform = rotations[number][rotationType];
        // }


        DiceDialog.prototype.getHTML = function() {
            return `<div>
                        <input class='exitButton exit--button' type='button' value='X'>
                    </div>
                    <div class='dice-container diceDialog'>
                        <div class='dicePositions dice--container' style='height:70%;'>

                            <div class='dice-wrapper dice-animation' dice-order='1'>
                                <div class='dice-face' dice-value='1'>
                                    <div class='dot' dot-number='5'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='2'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                                
                                <div class='dice-face' dice-value='3'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='4'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='5'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='6'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='4'></div>
                                    <div class='dot' dot-number='6'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                            </div>
                            <div class='dice-wrapper dice-animation' dice-order='2'>
                                <div class='dice-face' dice-value='1'>
                                    <div class='dot' dot-number='5'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='2'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                                
                                <div class='dice-face' dice-value='3'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='4'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='5'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='6'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='4'></div>
                                    <div class='dot' dot-number='6'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                            </div>
                            <div class='dice-wrapper dice-animation' dice-order='3'>
                                <div class='dice-face' dice-value='1'>
                                    <div class='dot' dot-number='5'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='2'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                                
                                <div class='dice-face' dice-value='3'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='4'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='5'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='6'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='4'></div>
                                    <div class='dot' dot-number='6'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                            </div>
                            <div class='dice-wrapper dice-animation' dice-order='4'>
                                <div class='dice-face' dice-value='1'>
                                    <div class='dot' dot-number='5'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='2'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                                
                                <div class='dice-face' dice-value='3'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='4'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='5'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='6'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='4'></div>
                                    <div class='dot' dot-number='6'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                            </div>
                            <div class='dice-wrapper dice-animation' dice-order='5'>
                                <div class='dice-face' dice-value='1'>
                                    <div class='dot' dot-number='5'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='2'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                                
                                <div class='dice-face' dice-value='3'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='4'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='5'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='6'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='4'></div>
                                    <div class='dot' dot-number='6'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                            </div>
                            <div class='dice-wrapper dice-animation' dice-order='6'>
                                <div class='dice-face' dice-value='1'>
                                    <div class='dot' dot-number='5'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='2'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                                
                                <div class='dice-face' dice-value='3'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='4'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='5'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='5'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                    
                                <div class='dice-face' dice-value='6'>
                                    <div class='dot' dot-number='1'></div>
                                    <div class='dot' dot-number='3'></div>
                                    <div class='dot' dot-number='4'></div>
                                    <div class='dot' dot-number='6'></div>
                                    <div class='dot' dot-number='7'></div>
                                    <div class='dot' dot-number='9'></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="flex w100 pTop10 itemAlignCenter";
                            width: 100%;
                            height: 100%;
                            position: relative;
                            margin-top: 50px;
                            margin: 0;
                            opacity: 0.9;
                            height: 20%;">

                                <div clsas='flex' style='flex-direction: row; width: 100%; display: flex; justify-content: space-evenly;'>
                                    <div class="flex w40 pTop10 itemAlignCenter include--dice" include-dice='false' style="height: 50px">
                                        <input class="throw--dice--button" type="button" tabindex=-1 value="Baci" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                    </div>
                                    <div class="flex pTop10 w40 itemAlignCenter include--dice" include-dice='false' style="height: 50px">
                                        <input class="enter--result" type="button" tabindex=-1 value="Upiši 0" style="border-radius: 100%; width: 100%; height: 100%; background: #6ebcff; cursor: pointer; border-radius: 16px; font-size: 2rem;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
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