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