;(function() {
    this.RulesDialog = (function() {

        function RulesDialog(parentContext, containerId) {
            this.parentContext = parentContext;
            this.container = document.getElementById(containerId)
            this.container.innerHTML = this._getHTML();
        }

        RulesDialog.prototype.destroy = function() {
        }

        RulesDialog.prototype._getHTML = function() {
            return `<div>
                        <div>
                            <h3>Ukratko o igri</h3>
                            <span>Svaki put kada ste na potezu, možete baciti kockice do 3 puta kako bi dobili što bolji rezultat za upis u neko od polja devet mogućih kolona. Nakon što ste završili sa bacanjem kockica, morate upisati rezultat ili nulu u jedno od raspoloživih. Igra se završava kada sva polja budu popunjena. Igrač koji na kraju bude imao veći rezultat je pobednik igre.</span>
                        </div>

                        <div>
                            <h3>Kada ste Vi na potezu</h3>
                            <span>Možete bacati kockice do 3 puta, ali isto tako možete se odlučiti na upis u neko od raspoloživih polja i nakon prvog ili drugog bacanja, ukoliko ste dobili kombinaciju koja Vam je potrebna. Da biste bacili kockice, kliknite na dugme "Baci" koje je odmah pored kockica. Prilikom prvog bacanja, bacate svih 6 kockica. Na osnovu slobodnih polja koje treba da popunite, odabraćete samo neke od dobijenih kockica, kako biste u sledećem bacanju povećali šansu da željenu kombinaciju i dobijete. Naravno, možete i upisati rezultat u neko od slobodnih polja već nakon prvog bacanja. U drugom i trećem bacanju, bacićete samo one kockice koje niste selektovali nakon prethodnog bacanja. Ne morate unapred odrediti kombinaciju koju želite da dobijete. Možda promenite mišljenje nakon drugog bacanja. Treće bacanje je i konačno, nakon ovog bacanja morate upisati rezultat u neko od slobodnih polja. U ovom bacanju, takođe, možete baciti sve ili samo neke od kockica, izbor je na Vama. Nakon što upišete rezultat u polje, na potezu je Vaš protivnik.(ukoliko igrate u paru, u suprotnom, opet ste Vi na potezu)</span>
                        </div>

                        <div>
                            <h3>Upis u polja</h3>
                            <span>Kada završite sa bacanjem kockica, potrebno je da upišete rezultat u neko od slobodnih i dozvoljenih polja. Svaka kolona u listiću ima 13 polja za upis, kao i svoje specifično pravilo tj. način popunjavanja kolone. Svaki put kada ste Vi na potezu, morate upisati rezultat ili nulu u neko od slobodnih polja. Samo jednom je moguće uneti rezultat u polje, i to samo ukoliko je zadovoljeno i pravilo popunjavanja kolone. Pročitajte ispod kako je najbolje popunjavati polja, kao i kako se popunjavaju Jamb kolone.</span>
                        </div>

                        <div>
                            <h3>Popunjavanje Polja</h3>
                            <span></span>
                        </div>
                        <h3>Ukratko o igri</h3>
                        <span></span>
                        <h3>Ukratko o igri</h3>
                        <span></span>
                    </div>`
        }

        return RulesDialog;
    })()
}).call(this);