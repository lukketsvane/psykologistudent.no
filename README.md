
# psykologistudent.no

## Enklere redigering (MDX-stil)

Me har oppdatert nettsida slik at du kan skriva innhaldet som "levande dokument". 
Du kan blanda tekst, bilete og spesialkomponentar (som PixelGame) fritt.

### 1. Endra tekst og innhald

Gå til `content/` mappa. Her finn du filer som `hjem.tsx`, `om-meg.tsx` osv.
Disse filene er nå **React Komponenter**. Det betyr at du skriv HTML/Tekst direkte.

**Døme (hjem.tsx):**

```tsx
import React from 'react';
import { Prose } from '../components/Prose';

export default function Hjem() {
  return (
    <div>
       <h1>Tittel her</h1>
       <p>
         Dette er eit avsnitt. 
         Du kan bruka <strong>feit skrift</strong> eller <em>kursiv</em>.
       </p>
       
       {/* Du kan leggja inn komponentar kor som helst! */}
       <MinSpesialKnapp />
    </div>
  );
}
```

### 2. Endra struktur (Legg til/fjern boksar)

Alt oppsettet ligg i `content/sections.tsx`.
Dette er ei liste over alle boksane på framsida.

For å leggja til ein ny boks:
1. Lag ei ny fil i `content/`, f.eks `ny-boks.tsx`.
2. Importer ho i `sections.tsx`.
3. Legg ho til i lista:

```tsx
{
  id: 'ny-boks',
  component: <NyBoks />,
  colSpan: 1, // Hvor bred? (1-4)
  rowSpan: 1, // Hvor høy? (1-3)
}
```

### 3. Ikoner og Bilder

Bilder og hovedinformasjon ligg i `content/site.tsx`.
Ikoner kan hentast frå `lucide-react` (biblioteket me brukar).

---

**Køyra lokalt:**
1. `npm install`
2. `npm run dev`
