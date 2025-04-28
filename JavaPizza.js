// Muuttujat
let selectedSize = null;
let selectedSizePrice = 0;
const toppingPrice = 2;
const toppings = {
    pepperoni: 0,
    salami: 0,
    kana: 0,
    ananas: 0,
    sieni: 0
};

// Alustus
document.addEventListener('DOMContentLoaded', function() {
    // Valitse koko
    document.querySelectorAll('.select-size').forEach(button => {
        button.addEventListener('click', function() {
            selectedSize = this.getAttribute('data-size');
            selectedSizePrice = parseInt(this.getAttribute('data-price'));
            
            // Poista aktiivinen luokka kaikilta
            document.querySelectorAll('.select-size').forEach(btn => {
                btn.classList.remove('btn-danger');
                btn.classList.add('btn-outline-danger');
            });
            
            // Lisää aktiivinen luokka valitulle
            this.classList.remove('btn-outline-danger');
            this.classList.add('btn-danger');
            
            updateTotalPrice();
        });
    });
    
    // Lisää täyte
    document.querySelectorAll('.increase-topping').forEach(button => {
        button.addEventListener('click', function() {
            const topping = this.getAttribute('data-topping');
            toppings[topping]++;
            document.getElementById(`${topping}-count`).textContent = toppings[topping];
            updateTotalPrice();
        });
    });
    
    // Vähennä täyte
    document.querySelectorAll('.decrease-topping').forEach(button => {
        button.addEventListener('click', function() {
            const topping = this.getAttribute('data-topping');
            if (toppings[topping] > 0) {
                toppings[topping]--;
                document.getElementById(`${topping}-count`).textContent = toppings[topping];
                updateTotalPrice();
            }
        });
    });
    
    // Nollaa kaikki
    document.getElementById('resetBtn').addEventListener('click', NollaaKaikkiAsetukset);
});

// Päivitä kokonaishinta
function updateTotalPrice() {
    let total = selectedSizePrice;
    
    // Laske täytteiden hinta
    let toppingsCount = 0;
    for (const topping in toppings) {
        toppingsCount += toppings[topping];
    }
    total += toppingsCount * toppingPrice;
    
    // Päivitä näytölle
    document.getElementById('totalPrice').textContent = `${total}€`;
}

// Nollaa kaikki asetukset -funktio
function NollaaKaikkiAsetukset() {
    // Nollaa koko
    selectedSize = null;
    selectedSizePrice = 0;
    document.querySelectorAll('.select-size').forEach(btn => {
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-outline-danger');
    });
    
    // Nollaa täytteet
    for (const topping in toppings) {
        toppings[topping] = 0;
        document.getElementById(`${topping}-count`).textContent = '0';
    }
    
    // Nollaa hinta
    document.getElementById('totalPrice').textContent = '0€';
}