# CPL Metaal - Bedrijfswebsite

Professionele website voor CPL Metaal - specialist in strekmetaal, geperforeerd metaal en gaasproducten.

🌐 **Live Website:** https://jouwgebruikersnaam.github.io/cpl-metaal/

![CPL Metaal](logo.png)

## 📋 Over Dit Project

Deze website is gebouwd voor CPL Metaal, een leverancier van hoogwaardige metaalproducten voor de bouwsector, industrie en architectuur.

### ✨ Features
- ✅ Volledig responsive design
- ✅ SEO geoptimaliseerd
- ✅ Snelle laadtijd (geen externe dependencies)
- ✅ Modern industrieel design
- ✅ Mobile-first approach

### 🛠 Producten
- Strekmetaal (kleine, middelgrote & grote mazen)
- Geperforeerd Metaal (ronde, vierkante & design perforaties)
- Gaasproducten (draadgaas, geweven, gepuntlast)
- Roosters (staal, RVS, geperforeerd)
- Cortenstaal (platen, decoratie, maatwerk)

### 🎯 Toepassingen
- Gevelbekleding
- Balkons & Balustrades
- Hekwerk & Terreinafscheiding
- Vloeren & Trappen
- Industrie & Machineafscherming
- Groenvoorziening

## 🚀 GitHub Pages Deployment

### Automatische Deployment
Deze website wordt automatisch gedeployed via GitHub Pages bij elke push naar `main`.

### Setup Instructions
1. Fork deze repository
2. Ga naar Settings → Pages
3. Selecteer branch: `main`
4. Klik Save
5. Je website is live binnen 1-2 minuten!

## 📁 Project Structuur

```
cpl-metaal/
├── index.html          # Homepage (standalone - alle CSS/JS inline)
├── logo.png           # CPL Metaal logo
├── README.md          # Project documentatie
└── INSTALLATIE.md     # Installatie instructies (Nederlands)
```

### Waarom Standalone?
Alle CSS en JavaScript zitten inline in `index.html` voor:
- ✅ Maximale compatibiliteit
- ✅ Geen externe dependencies
- ✅ Werkt overal (lokaal, GitHub Pages, hosting)
- ✅ Eenvoudige deployment

## 💻 Lokaal Draaien

### Optie 1: Direct Openen
```bash
# Clone repository
git clone https://github.com/jouwgebruikersnaam/cpl-metaal.git
cd cpl-metaal

# Open index.html in browser
open index.html  # macOS
start index.html # Windows
```

### Optie 2: Lokale Server (Optioneel)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Open http://localhost:8000
```

## 🎨 Design System

### Kleuren
- **Primair**: `#1a5490` (Donkerblauw)
- **Secundair**: `#ff6b35` (Oranje)
- **Tekst**: `#1d3a55` (Donkergrijs)
- **Achtergrond**: `#ecf0f1` (Lichtgrijs)

### Typografie
- **Display**: Rajdhani (700)
- **Body**: Karla (400)

### Breakpoints
- Desktop: > 992px
- Tablet: 768px - 992px
- Mobile: < 768px

## 📝 Roadmap

### ✅ Voltooid
- [x] Homepage met alle secties
- [x] Responsive design
- [x] Logo integratie
- [x] SEO optimalisatie
- [x] GitHub Pages deployment

### 🚧 In Development
- [ ] Offerte aanvraag pagina
- [ ] Contact pagina met formulier
- [ ] Product detail pagina's (5 hoofdproducten)
- [ ] Toepassingen pagina's (8 pagina's)
- [ ] Sector pagina's (5 pagina's)

### 🔮 Toekomstig
- [ ] Blog/Nieuws sectie
- [ ] Project portfolio
- [ ] Klantreviews
- [ ] Google Analytics integratie
- [ ] Formulier backend (Formspree/Netlify Forms)

## 🔧 Development

### Code Aanpassen
De website is een standalone HTML file. Om wijzigingen te maken:

1. Open `index.html` in een text editor
2. Maak je wijzigingen
3. Test lokaal
4. Commit en push naar GitHub
5. GitHub Pages update automatisch

### Nieuwe Pagina Toevoegen
```bash
# 1. Kopieer index.html
cp index.html nieuwe-pagina.html

# 2. Bewerk nieuwe-pagina.html
# 3. Link vanuit menu in index.html
# 4. Commit en push
git add .
git commit -m "Add nieuwe pagina"
git push
```

## 📞 Contact Informatie

**CPL Metaal**
- 🌍 Website: [cplmetaal.nl](https://cplmetaal.nl) (wanneer live)
- 📞 Telefoon: 010 123 4567
- 📧 Email: info@cplmetaal.nl
- 📍 Locatie: Rotterdam, Nederland

## 🤝 Contributing

Dit is een private bedrijfswebsite. Voor wijzigingen:
1. Neem contact op met CPL Metaal
2. Fork de repository
3. Maak wijzigingen in een branch
4. Dien een Pull Request in

## 📄 Licentie

© 2025 CPL Metaal. Alle rechten voorbehouden.

Deze website is eigendom van CPL Metaal. Hergebruik van code en design is alleen toegestaan met uitdrukkelijke toestemming.

---

**Built with ❤️ for CPL Metaal**
