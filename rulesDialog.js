;(function() {
    this.RulesDialog = (function() {

        function RulesDialog(parentContext, containerId) {
            this.parentContext = parentContext
            this.container = document.getElementById(containerId)
            this.container.innerHTML = this._getHTML()

            // this.clickEvent = this.clickEventHandler.bind(this)
            // this.container.addEventListener('click', this.clickEvent)
        }

        RulesDialog.prototype.destroy = function() {
            this.container.removeEventListener('click', this.clickEvent)
            delete this.clickEvent
        }

        RulesDialog.prototype.clickEventHandler = function(event) {
            target = event.target

            if (target.closest('.exit--button')) {
                this.parentContext.backToHomePage()
                return
            }
        }

        RulesDialog.prototype._getHTML = function() {
            return `<div>
                        <div style='height:10%;'>
                            <input class='exitButton exit--button' type='button' value='X'>
                        </div>

                        <div class='pTop10'>
                            <h2>Ukratko o igri</h2>
                            <span>Svaki put kada ste na potezu, možete baciti kockice do 3 puta kako bi dobili što bolji rezultat za upis u neko od polja devet mogućih kolona. Nakon što ste završili sa bacanjem kockica, morate upisati rezultat ili nulu u jedno od raspoloživih. Igra se završava kada sva polja budu popunjena. Igrač koji na kraju bude imao veći rezultat je pobednik igre.</span>
                        </div>

                        <div class='pTop10'>
                            <h2>Kada ste Vi na potezu</h2>
                            <span>Možete bacati kockice do 3 puta, ali isto tako možete se odlučiti na upis u neko od raspoloživih polja i nakon prvog ili drugog bacanja, ukoliko ste dobili kombinaciju koja Vam je potrebna. Da biste bacili kockice, kliknite na dugme "Baci" koje je odmah pored kockica. Prilikom prvog bacanja, bacate svih 6 kockica. Na osnovu slobodnih polja koje treba da popunite, odabraćete samo neke od dobijenih kockica, kako biste u sledećem bacanju povećali šansu da željenu kombinaciju i dobijete. Naravno, možete i upisati rezultat u neko od slobodnih polja već nakon prvog bacanja. U drugom i trećem bacanju, bacićete samo one kockice koje niste selektovali nakon prethodnog bacanja. Ne morate unapred odrediti kombinaciju koju želite da dobijete. Možda promenite mišljenje nakon drugog bacanja. Treće bacanje je i konačno, nakon ovog bacanja morate upisati rezultat u neko od slobodnih polja. U ovom bacanju, takođe, možete baciti sve ili samo neke od kockica, izbor je na Vama. Nakon što upišete rezultat u polje, na potezu je Vaš protivnik.(ukoliko igrate u paru, u suprotnom, opet ste Vi na potezu)</span>
                        </div>

                        <div class='pTop10'>
                            <h2>Upis u polja</h2>
                            <span>Kada završite sa bacanjem kockica, potrebno je da upišete rezultat u neko od slobodnih i dozvoljenih polja. Svaka kolona u listiću ima 13 polja za upis, kao i svoje specifično pravilo tj. način popunjavanja kolone. Svaki put kada ste Vi na potezu, morate upisati rezultat ili nulu u neko od slobodnih polja. Samo jednom je moguće uneti rezultat u polje, i to samo ukoliko je zadovoljeno i pravilo popunjavanja kolone. Pročitajte ispod kako je najbolje popunjavati polja, kao i kako se popunjavaju Jamb kolone.</span>
                        </div>

                        <div class='pTop10'>
                            <h2>Popunjavanje Polja</h2>
                            <span>
                                <table>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Jedinice</td><td class='ruleTableDescription'>Maksimalni broj jedinica u sva 3 bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Dvojke</td><td class='ruleTableDescription'>Maksimalni broj dvojki u sva 3 bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Trojke</td><td class='ruleTableDescription'>Maksimalni broj trojki u sva 3 bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Četvorke</td><td class='ruleTableDescription'>Maksimalni broj četvorki u sva 3 bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Petice</td><td class='ruleTableDescription'>Maksimalni broj petica u sva 3 bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Šestice</td><td class='ruleTableDescription'>Maksimalni broj šestica u sva 3 bacanja.</td>
                                    </tr>

                                    
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Max</td><td class='ruleTableDescription'>Maksimalni zbir 5 selektovanih kockica u sva 3 bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Min</td><td class='ruleTableDescription'>Minimalni zbir 5 selektovanih kockica u sva 3 bacanja.</td>
                                    </tr>
                                    
                                    
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Kenta</td><td class='ruleTableDescription'>Kombinacija kockica ( '1' '2' '3' '4' '5') or ( '2' '3' '4' '5' '6'). Kao rezultat upisuje se 66, ako se neka od kombinacija dobije bacanjem svih šest kockica, bez prethodno selektovanih, 56 ako se neka od kombinacija dobije kroz dva bacanja kockica, 46 ako se neka od kombinacija dobije kroz tri dozvoljena bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Triling</td><td class='ruleTableDescription'>Kombinacija tri iste kockice. Kao rezultat upisuje se zbir tri iste selektovane kockice+20, nezavisno od broja bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Ful</td><td class='ruleTableDescription'>Kombinacija tri iste + dve iste kockice. Kao rezultat upisuje se zbir selektovanih kockica+30, nezavisno od broja bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Poker</td><td class='ruleTableDescription'>Kombinacija četiri iste kockice. Kao rezultat se upisuje zbir selektovanih kockica+40, nezavisno od broja bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>Yamb</td><td class='ruleTableDescription'>Kombinacija 5 istih kockica. Kao rezultat se upisuje zbir selektovanih kockica+50, nezavisno od broja bacanja.</td>
                                    </tr>
                                </table>
                            </span>
                        </div>

                        <div class='pTop10'>
                            <h2>Popunjavanje po kolonama</h2>
                            <span>
                                <table>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>↓</td><td class='ruleTableDescription'>Popunjava se odozgo na dole, redom, bez mogućnosti preskakanja polja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>↕</td><td class='ruleTableDescription'>Popunjava se bilo kojim redosledom, sa mogućnošću preskakanja polja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>↑</td><td class='ruleTableDescription'>Popunjava se odozdo na gore, redom, bez mogućnosti preskakanja polja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>N</td><td class='ruleTableDescription'>Popunjava se bilo kojim redosledom, pri čemu je obavezno protivniku Najaviti, nakon prvog bacanja kockica koje polje želite da popunite, bez mogućnosti promene izbora polja u sledeća dva bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td class='ruleTableName'>R</td><td class='ruleTableDescription'>Popunjava se bilo kojim redosledom, sa mogućnošću preskakanja polja, ako je ostvaren maksimalan mogući rezultat predviđen za to polje, u toku 3 dozvoljena bacanja.</td>
                                    </tr>
                                    <tr class='flex ruleTableRow'>
                                        <td  class='ruleTableName'>D</td><td class='ruleTableDescription'>Popunjava se obavezno onim redosledom, koji diktira protivnik popunjavajući odredjeno polje u koloni najave (N).</td>
                                    </tr>
                                </table>
                            </span>
                        </div>
                    </div>`
        }

        return RulesDialog;
    })()
}).call(this);