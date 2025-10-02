document.addEventListener('DOMContentLoaded', function () {
    // --- NAVEGACIÓN ENTRE PESTAÑAS ---
    const navCartas = document.getElementById('nav-cartas');
    const navInstructivo = document.getElementById('nav-instructivo');
    const seccionCartas = document.getElementById('seccion-cartas');
    const seccionInstructivo = document.getElementById('seccion-instructivo');

    navCartas.addEventListener('click', (e) => {
        e.preventDefault();
        seccionCartas.classList.remove('d-none');
        seccionInstructivo.classList.add('d-none');
        navCartas.classList.add('active');
        navInstructivo.classList.remove('active');
    });

    navInstructivo.addEventListener('click', (e) => {
        e.preventDefault();
        seccionInstructivo.classList.remove('d-none');
        seccionCartas.classList.add('d-none');
        navInstructivo.classList.add('active');
        navCartas.classList.remove('active');
    });

    // --- LÓGICA DE LAS CARTAS ---
    const cardDisplay = document.getElementById('card-display');
    const drawCardBtn = document.getElementById('draw-card-btn');
    const cardCounter = document.getElementById('card-counter');

    // Aquí se insertan las 50 ideas de cartas
    const fullDeck = [
        "Te encontraron una resortera en el aeropuerto de EUA, ve a la casilla de deportado sin recibir sueldo. ¿Te parece exagerado? Imagina si trajeras una pistola de agua.",
        "Tu video de 'bailando en la Torre Eiffel' se hizo viral. Recibes $10,000 por monetización.",
        "Error en la reservación de tu hotel. El banco te compensa con $5,000 por las molestias.",
        "¡Día de suerte! Ganas un concurso de fotografía de viajes. Recibe $20,000.",
        "Exceso de equipaje. Paga $2,000 a la aerolínea (al banco).",
        "Se te antojó un café carísimo en Suiza. Paga $3,000.",
        "Tu tarjeta de crédito fue clonada. El banco te reintegra $7,500.",
        "Decidiste tomar un curso de cocina en Italia. Paga $4,000 por la matrícula.",
        "Multa por alimentar a las palomas en una plaza pública. Paga $1,000.",
        "¡Inversión exitosa! Tus acciones en una aerolínea suben. Cobra $15,000.",
        "Por tu excelente comportamiento como turista, recibes un bono de $5,000 del banco.",
        "Caíste en una estafa de 'souvenirs auténticos'. Pierdes $2,500.",
        "Te confundieron con una celebridad y te dieron mejoras en tu vuelo. Avanza a la casilla de SALIDA y cobra tu sueldo.",
        "Problemas con la visa. Ve directamente a DEPORTADO.",
        "Tu post en redes sociales ofendió a la cultura local. Pide disculpas pagando a cada jugador $1,000.",
        "¡Feliz cumpleaños! Todos los jugadores te regalan $500 como presente.",
        "Encontraste una cartera y la devolviste. El dueño te recompensa con $10,000.",
        "Tu equipaje se perdió. La aerolínea te da $8,000 para ropa nueva.",
        "Intoxicación alimentaria por probar comida callejera exótica. Paga $2,000 en medicinas.",
        "RECOGE TU PASAPORTE Y SAL DE LA CASILLA DE DEPORTADO. Esta carta la puedes guardar o vender.",
        "Renovación de pasaporte de emergencia. Cuesta $5,000.",
        "Ganaste la lotería del dutty free. ¡Cobra $25,000!",
        "Tu vuelo se sobrevendió. Te ofrecen $10,000 y un asiento en primera clase para el siguiente. Aceptas el dinero.",
        "Un mono te robó la cámara en la India. Paga $3,000 por una nueva.",
        "Confundiste el metro y terminaste en el otro lado de la ciudad. Avanza a la propiedad más barata sin dueño y puedes comprarla.",
        "Te quedaste dormido en la playa y perdiste la noción del tiempo. Pierdes un turno.",
        "Tu reseña de un restaurante local atrajo a muchos turistas. El dueño te regala $4,000.",
        "Impuesto de turista inesperado. Paga $1,500 al banco.",
        "Ayudaste a un local a cambiar una llanta. Como agradecimiento, te paga $2,000.",
        "Tu teléfono se cayó al agua en un paseo en góndola. Paga $6,000 para repararlo.",
        "Avanza a la propiedad de color ROJO más cercana. Si no tiene dueño, puedes comprarla.",
        "Avanza a la línea aérea más cercana.",
        "¡Auditoría sorpresa! El banco revisa tus cuentas. Paga $500 por cada propiedad que poseas.",
        "Bono de viajero frecuente. Recibe $3,000 del banco.",
        "Te inscribiste a un maratón internacional. Paga $1,000 de inscripción.",
        "Donación a un fondo para la preservación de monumentos históricos. Paga $2,000.",
        "Tu blog de viajes consigue un patrocinador. Recibe $12,000.",
        "Error de conversión de moneda. Perdiste $1,500.",
        "Te ofreciste como voluntario en un refugio de animales. Por tu buena acción, el banco te premia con $5,000.",
        "Tomaste un taxi 'turístico' y te cobró de más. Paga $4,000.",
        "Te unes a un tour gastronómico. Paga $2,500 pero disfruta la experiencia.",
        "¡Flashmob! Participaste en un baile masivo y ganaste un premio. Recibe $3,000.",
        "Vendes tus fotos de viaje a una revista. Ganas $7,000.",
        "Decides dar una gran propina. Paga $1,000 al banco.",
        "Te perdiste en el Gran Bazar y encontraste una oferta increíble. Avanza a cualquier propiedad sin dueño y cómprala.",
        "Hackearon tu cuenta de streaming de viaje. Paga $500 para recuperarla.",
        "Avanza hasta la propiedad más cara del tablero. Si tiene dueño, págale el doble de la renta.",
        "Tu hotel tiene una plaga de chinches. El hotel te devuelve el dinero. Cobra $4,000.",
        "Te vuelves guía turístico por un día. Ganas $5,000.",
        "Te saltaste la fila en una atracción popular y te multaron. Ve a DEPORTADO."
    ];

    let currentDeck = [];

    function shuffleDeck() {
        // Crea una copia del mazo completo y la barajea
        currentDeck = [...fullDeck];
        for (let i = currentDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
        }
        updateCounter();
    }

    function drawCard() {
        if (currentDeck.length === 0) {
            // Si el mazo se acaba, se barajea de nuevo
            shuffleDeck();
            cardDisplay.innerHTML = `<p class="card-text text-success">¡Se acabaron las cartas! Se ha barajeado el mazo de nuevo.</p>`;
            return;
        }

        const card = currentDeck.pop(); // Saca la última carta del arreglo
        cardDisplay.innerHTML = `<p class="card-text">"${card}"</p>`;
        updateCounter();
    }

    function updateCounter() {
        cardCounter.textContent = `Cartas restantes: ${currentDeck.length}`;
    }

    // Event Listeners
    drawCardBtn.addEventListener('click', drawCard);

    // Inicializar el mazo por primera vez
    shuffleDeck();
});