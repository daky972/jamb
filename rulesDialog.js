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
            return `Možete bacati kockice do 3 puta, ali isto tako možete se odlučiti na upis u neko od raspoloživih polja i nakon prvog ili drugog bacanja, ukoliko ste dobili kombinaciju koja Vam je potrebna. Da biste bacili kockice, kliknite na dugme "Baci" koje je odmah pored kockica. Prilikom prvog bacanja, bacate svih 6 kockica. Na osnovu slobodnih polja koje treba da popunite, odabraćete samo neke od dobijenih kockica, kako biste u sledećem bacanju povećali šansu da željenu kombinaciju i dobijete. Naravno, možete i upisati rezultat u neko od slobodnih polja već nakon prvog bacanja. U drugom i trećem bacanju, bacićete samo one kockice koje niste selektovali nakon prethodnog bacanja. Ne morate unapred odrediti kombinaciju koju želite da dobijete. Možda promenite mišljenje nakon drugog bacanja. Treće bacanje je i konačno, nakon ovog bacanja morate upisati rezultat u neko od slobodnih polja. U ovom bacanju, takođe, možete baciti sve ili samo neke od kockica, izbor je na Vama. Nakon što upišete rezultat u polje, na potezu je Vaš protivnik.(ukoliko igrate u paru, u suprotnom, opet ste Vi na potezu)`
        }

        return RulesDialog;
    })()
}).call(this);