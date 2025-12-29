// PARAMÈTRES CDI
const salaireAnnuel = 30000;
const joursParAn = 220;
const heuresParJour = 7;

// DATE DE DÉPART
const dateDebutCDI = new Date(2025, 11, 29); // 29 décembre 2025

// HORAIRES
const plagesTravail = [
    { debut: { h: 8, m: 30 }, fin: { h: 12, m: 0 } },
    { debut: { h: 14, m: 0 }, fin: { h: 17, m: 30 } }
];

// CALCULS
const salaireJour = salaireAnnuel / joursParAn;
const salaireParSeconde = salaireJour / (heuresParJour * 3600);

// DOM
const currentStatusEl = document.getElementById("current-status");
const totalEl = document.getElementById("amount-total");
const monthEl = document.getElementById("amount-month");
const todayEl = document.getElementById("amount-today");
const startDateEl = document.getElementById("start-date");

// FORMAT DATE FR
function formatDateFr(date) {
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// STATUT ACTUEL
function statutActuel() {
    const now = new Date();
    const day = now.getDay();
    if (day < 1 || day > 5) return "Hors horaires";

    const minutes = now.getHours() * 60 + now.getMinutes();
    if (minutes >= 8*60+30 && minutes < 12*60) return "Travail en cours (matin)";
    if (minutes >= 14*60 && minutes < 17*60+30) return "Travail en cours (après-midi)";
    if (minutes >= 12*60 && minutes < 14*60) return "En pause déjeuner";
    return "Hors horaires";
}

// SECONDES TRAVAILLEES AUJOURD'HUI
function secondesTravailleesAujourdHui() {
    const now = new Date();
    const day = now.getDay();
    if (day < 1 || day > 5) return 0;

    let totalSeconds = 0;
    for (const plage of plagesTravail) {
        const start = new Date(now);
        start.setHours(plage.debut.h, plage.debut.m, 0, 0);
        const end = new Date(now);
        end.setHours(plage.fin.h, plage.fin.m, 0, 0);

        const from = start;
        const to = Math.min(end, now);
        if (from < to) totalSeconds += (to - from) / 1000;
    }

    return totalSeconds;
}

// CALCUL MONTANTS SIMPLIFIÉS

// Montant du jour
function montantAujourdHui() {
    return secondesTravailleesAujourdHui() * salaireParSeconde;
}

// Montant du mois
function montantCeMois() {
    const now = new Date();
    const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
    const start = new Date(Math.max(debutMois.getTime(), dateDebutCDI.getTime()));

    let joursOuvres = 0;
    let current = new Date(start);

    while (current < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        const day = current.getDay();
        if (day >= 1 && day <= 5) joursOuvres++;
        current.setDate(current.getDate() + 1);
    }

    let montant = joursOuvres * salaireJour;
    montant += montantAujourdHui(); // ajouter fraction du jour en cours
    return montant;
}

// Montant total depuis le début
function montantCumule() {
    const now = new Date();
    if (now <= dateDebutCDI) return 0;

    let joursOuvres = 0;
    let current = new Date(dateDebutCDI);

    while (current < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        const day = current.getDay();
        if (day >= 1 && day <= 5) joursOuvres++;
        current.setDate(current.getDate() + 1);
    }

    let montant = joursOuvres * salaireJour;
    montant += montantAujourdHui(); // fraction du jour en cours
    return montant;
}

// UPDATE UI
function update() {
    totalEl.textContent = montantCumule().toFixed(2) + " €";
    monthEl.textContent = montantCeMois().toFixed(2) + " €";
    todayEl.textContent = montantAujourdHui().toFixed(2) + " €";

    currentStatusEl.textContent = statutActuel();
    startDateEl.textContent = "Début : " + formatDateFr(dateDebutCDI);
}

// Mise à jour chaque seconde
setInterval(update, 1000);
update();
