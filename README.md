# 💼 CDI Fantôme (manque à gagner du CDI)

**CDI Fantôme** est une mini-application web personnelle qui te permet de visualiser en temps réel le salaire que tu aurais gagné si tu étais en CDI. Elle est conçue pour motiver les indépendants à se discipliner en affichant le “CDI fantôme” sur trois échelles : **total depuis le début, montant du mois et montant du jour**.

---

## ⚡ Fonctionnalités

- **Total cumulé depuis le début** du projet (ne redescend jamais)  
- **Montant pour le mois en cours**, ajusté pour la date réelle de début  
- **Montant pour aujourd’hui**, mis à jour en temps réel  
- **Indication du statut actuel** :
  - Travail en cours (matin / après-midi)
  - Pause déjeuner
  - Hors horaires
- Gestion des heures de travail en **2 plages horaires** :
  - Matin : 08:30 → 12:00
  - Après-midi : 14:00 → 17:30
- **Affichage du salaire initial théorique** indiqué après les horaires (exemple : 30 000 €/an)

## ⚙️ Personnalisation

Pour adapter l’application à ton utilisation personnelle, modifie directement le fichier `script.js` :

```javascript
// Salaire annuel en CDI
const salaireAnnuel = 30000;       

// Date de départ du “CDI fantôme”
const dateDebutCDI = new Date(2025, 11, 29); // Format : YYYY, MM (0-indexé), DD

// Plages horaires de travail (2 par jour)
const plagesTravail = [
    { debut: { h: 8, m: 30 }, fin: { h: 12, m: 0 } },
    { debut: { h: 14, m: 0 }, fin: { h: 17, m: 30 } }
];
