# psykologistudent.no

## Redigere tekst, lenker og bilder

Alt innhold som kunden normalt skal endre ligger i én fil:

```txt
content/content.md
```

Åpne filen og endre teksten mellom hermetegn. Ikke endre navnene på feltene, for eksempel `title`, `description`, `skills` eller `publications`.

## Vanlige endringer

### Endre hovedtekst

Finn feltet du vil endre:

```yaml
home:
  title: "Veiledning og mestring i psykologifaget"
  description: "Sliter du med metodedelen? Jeg tilbyr **skreddersydd undervisning** ..."
```

Bruk `**tekst**` for fet skrift.

### Endre bilder

```yaml
site:
  images:
    portrait: "https://..."
    action: "https://..."
```

`portrait` brukes i menyen. `action` brukes i "Om meg"-boksen.

### Endre lenker

```yaml
contact:
  socialLinks:
    - label: "LinkedIn"
      url: "https://linkedin.com"
      icon: "linkedin"
```

Tilgjengelige ikoner her er `linkedin` og `globe`.

### Legge til CV-punkt

Legg til et nytt punkt under `cv.timeline`:

```yaml
- role: "Ny rolle"
  company: "Arbeidssted"
  year: "2026"
  description: "Kort beskrivelse."
  type: "job"
```

`type` kan være `job` eller `edu`.

### Legge til forskning

Legg til et nytt punkt under `research.publications`:

```yaml
- title: "Publikasjonstittel"
  journal: "Tidsskrift"
  year: "2026"
  url: "https://..."
```

## Kjøre lokalt

```bash
npm install
npm run dev
```

## Sjekke før publisering

```bash
npx tsc --noEmit --pretty false
npm run build
```
