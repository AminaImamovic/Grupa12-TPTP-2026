document.addEventListener('DOMContentLoaded', () => {
    const dugmeTema=document.getElementById('dark-mode-toggle');
    const trenutnaTema=localStorage.getItem('tema');
    
    if(trenutnaTema=='dark'){

        document.body.classList.add('dark-mode');
        if(dugmeTema) dugmeTema.textContent='☀️';
    
    }

    if(dugmeTema){

        dugmeTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if(document.body.classList.contains('dark-mode')){

                localStorage.setItem('tema', 'dark');
                dugmeTema.textContent='☀️';
            
            } else {
            
                localStorage.setItem('tema', 'light');
                dugmeTema.textContent='🌙';
            
            }
        });
    }

//===================SADRZAJ STRANICA===============//

// BROJAC //
const dugmeLajk=document.getElementById('lajk-dugme');
const prikazLajkova=document.getElementById('broj-lajkova');

let brojLajkova=0;

if(dugmeLajk){
    dugmeLajk.addEventListener('click', () => {
        brojLajkova=brojLajkova+1;
        prikazLajkova.textContent=brojLajkova;
    });
}


// smooth scroll //

const bookmarkLinkovi=document.querySelectorAll('a[href^="#"]');

bookmarkLinkovi.forEach(link => {
    link.addEventListener('click', (event) => {
        
        event.preventDefault();

        const idSekcije=link.getAttribute('href');
        const ciljnaSekcija=document.querySelector(idSekcije);

        if(ciljnaSekcija) {
            ciljnaSekcija.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
});

// STRANICA INDEX //
const posmatrac = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('prikazi'); 
            posmatrac.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15 
});


document.querySelectorAll('.animiraj-me').forEach(element => {
    posmatrac.observe(element);
});

const filterStavke = document.querySelectorAll('aside.kategorije ul li');
const projekatKartice = document.querySelectorAll('.projekt-kartica');

filterStavke.forEach(stavka => {
    stavka.addEventListener('click', function() {
        const odabranaKategorija = this.getAttribute('data-filter').trim().toLowerCase();

        projekatKartice.forEach(kartica => {
            const kategorijaAtribut = kartica.getAttribute('data-category');
            
            // Sigurnosna provjera: ako neka kartica nema data-category, preskoči je da ne pukne kod//
            if (!kategorijaAtribut) return; 

            const kategorijaKartice = kategorijaAtribut.trim().toLowerCase();

            if (odabranaKategorija === 'sve' || odabranaKategorija === kategorijaKartice) {
                kartica.style.display = ''; 
            } else {
                kartica.style.display = 'none'; 
            }
        });
    });
});

//======KONTAKT STRANICA=========//

document.addEventListener("DOMContentLoaded", function() {
    const kontaktForma = document.getElementById("kontakt-forma");

    if (kontaktForma) {
        kontaktForma.addEventListener("submit", function(dogadjaj) {
            
            dogadjaj.preventDefault(); 

            document.getElementById("greska-ime").textContent = "";
            document.getElementById("greska-email").textContent = "";
            document.getElementById("greska-telefon").textContent = "";
            document.getElementById("greska-poruka").textContent = "";

            let formaValidna = true;

            const ime = document.getElementById("ime").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefon = document.getElementById("telefon").value.trim();
            const poruka = document.getElementById("poruka").value.trim();

      if (ime === "") {
         document.getElementById("greska-ime").textContent = "Molimo Vas unesite svoje ime.";
         formaValidna = false;
         }

            //Validacija broja telefona i e-mail urađena pomoću AI alata Gemini.//
        const telefonRegex = /^[0-9+\s-]+$/; //Razumijem da ovo znaci da se u polje za telefon smiju upisati samo brojevi 0-9, razmaci, + i -//
            if (telefon === "") {
                document.getElementById("greska-telefon").textContent = "Broj telefona je obavezan.";
                formaValidna = false;
            } else if (!telefonRegex.test(telefon)) {
                    document.getElementById("greska-telefon").textContent = "Unesite ispravan broj (samo brojevi, + ili -).";
                   formaValidna = false;
                }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Razumijem da ovo znaci da se provjerava ispravnost formata e-maila (tekst prije i poslije @ i domenu npr. .com)//
            if (email === "" || !emailRegex.test(email)) {
                document.getElementById("greska-email").textContent = "Unesite ispravan format email adrese (npr. ime@ispravno.com).";
                formaValidna = false;
        } else if (!emailRegex.test(email)) {
                document.getElementById("greska-email").textContent = "Unesite ispravan format email adrese (npr. ime@ispravno.com).";
                formaValidna = false;
            }

      if (poruka === "") {
         document.getElementById("greska-poruka").textContent = "Niste unijeli tekst Vaše poruke.";
         formaValidna = false;
            }

       if (formaValidna) {
         alert("Hvala Vam! Vaša poruka je uspješno poslana!");
         kontaktForma.reset(); 
         }

        });
    }
});