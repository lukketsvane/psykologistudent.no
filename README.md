# psykologistudent.no

Her er kjeldekoden til nettsida di. Me har bygd ho med React og Vite.

## Endra innhald

Alt innhald ligg i mappa `content/`. Du treng ikkje kunna programmering for å gjera endringar her. Filene er `.tsx`, men du skal berre endra teksten mellom hermeteikna.

### Mappestruktur

```
content/
├── hjem.tsx           # Forsida
├── om-meg.tsx         # Om meg
├── kontakt.tsx        # E-post og lenker
├── site.tsx           # Namn, bilete og fargar
├── cv.tsx             # Utdanning og erfaring
├── forskning.tsx      # Publikasjonar
└── tjenester.tsx      # Tenester
```

### Korleis endra tekst? (t.d. `hjem.tsx`)

Når du opnar fila ser du noko slikt:

```tsx
export const welcomeMD = `
Sliter du med å knekke koden på bacheloroppgaven?

Jeg tilbyr **skreddersydd veiledning**.
`;
```

*   Skriv teksten din heilt vanleg.
*   Bruk `**tekst**` for å få **feit skrift**.
*   Bruk `[tekst](https://...)` for å laga lenkje.
*   Lag nytt avsnitt med å trykka enter to gonger.

### Korleis endra CV? (`cv.tsx`)

Her ligg data i lister. For å leggja til ein ny jobb, kopierer du berre ei blokk mellom `{ ... }` og limer ho inn.

```tsx
export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Ny Tittel",
    company: "Ny Stad",
    description: "Kva gjorde du her?"
  },
  // ... andre jobbar
];
```

### Køyra lokalt

Om du vil testa endringane på di eiga maskin:

1.  Installer [Node.js](https://nodejs.org/)
2.  Opna terminalen i denne mappa.
3.  Køyr `npm install`
4.  Køyr `npm run dev`
5.  Gå til lenkja som kjem opp (oftast `http://localhost:5173`).
