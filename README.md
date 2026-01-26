
# psykologistudent.no (Vilde Brecke)

Dette er kildekoden til din personlige porteføljeside. Siden er bygget med React og Vite.

## Redigering av innhold

Alt innhold på siden ligger i mappen `content/`. Du trenger ikke kunne programmering for å endre teksten her. Filene er `.tsx` (TypeScript), men fungerer som enkle oppskrifter.

### Mappestruktur i `content/`

```
content/
├── hjem.tsx           # Forsiden (Hei student, intro)
├── om-meg.tsx         # Om meg teksten
├── kontakt.tsx        # E-post og sosiale lenker
├── site.tsx           # Navn, bilder, og fargetema
├── cv.tsx             # Utdanning, erfaring, ferdigheter
├── forskning.tsx      # Publikasjoner
└── tjenester.tsx      # Tjenesteliste
```

### Hvordan endre tekst (Eksempel: `hjem.tsx`)

Når du åpner `content/hjem.tsx` ser du noe slikt:

```tsx
export const WelcomeText = () => (
  <>
    Sliter du med å knekke koden...
    <br /><br />
    Jeg tilbyr <strong>skreddersydd veiledning</strong>...
  </>
);
```

*   Skriv vanlig tekst mellom `<>` og `</>`.
*   Bruk `<br />` for å lage linjeskift.
*   Bruk `<strong>Tekst</strong>` for å gjøre tekst fet.
*   Bruk `<em>Tekst</em>` for kursiv.

### Hvordan endre CV og Erfaring (`cv.tsx`)

Her ligger data i lister. For å legge til en ny erfaring, kopier en blokk mellom `{ ... }` og lim den inn.

```tsx
export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Ny Tittel",
    company: "Nytt Sted",
    description: "Hva gjorde du her?"
  },
  // ... andre jobber
];
```

### Kjøre lokalt

Hvis du vil teste endringene på din egen PC:

1.  Installer [Node.js](https://nodejs.org/)
2.  Åpne terminalen i denne mappen.
3.  Kjør `npm install`
4.  Kjør `npm run dev`
5.  Gå til lenken som vises (vanligvis `http://localhost:5173`).
