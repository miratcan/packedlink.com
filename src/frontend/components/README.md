# Design System Components

PackedLink'in sade component kütüphanesi.

## Prensip: Sadelik

Componentler mümkün olduğunca sade. Button buttondur, 3 farklı varyant yok.

## Storybook

Component'leri görmek için:

```bash
npm run storybook
# http://localhost:6006
```

## Kullanım

```tsx
import { Button, Card, Hero, LinkBar } from '@/components'

export default function Page() {
  return (
    <div>
      <Hero
        title="PackedLink"
        description="Sade bir link listesi"
      />

      <Card>
        <LinkBar
          title="GitHub"
          description="Kaynak kodu"
          href="https://github.com"
        />
        <LinkBar
          title="Twitter"
          href="https://twitter.com"
        />
      </Card>

      <Button onClick={() => console.log('tıklandı')}>
        Listeyi kaydet
      </Button>
    </div>
  )
}
```

## Component'ler

### Button
Tek tip buton. Hover state var.

**Props:**
- `children`: React.ReactNode
- `onClick?`: () => void
- `type?`: 'button' | 'submit'

### Card
Basit kart. Border, padding, shadow.

**Props:**
- `children`: React.ReactNode

### Hero
Sayfa başlığı component'i.

**Props:**
- `title`: string
- `description?`: string

### LinkBar
Link satırı. Sol tarafta renk bar, başlık + açıklama.

**Props:**
- `title`: string
- `description?`: string
- `href?`: string
- `onClick?`: () => void

## CSS Variables

Tüm component'ler `globals.css`'deki CSS variables kullanır:

```css
--color-dashboard-blue
--color-accent
--color-text-primary
--spacing-sm
--radius
...
```

## Yeni Component Eklemek

1. Klasör oluştur: `components/NewComponent/`
2. Component yaz: `NewComponent.tsx`
3. Styles yaz: `NewComponent.module.css` (CSS variables kullan)
4. Story yaz: `NewComponent.stories.tsx`
5. Export: `index.ts`

**KURALLARI:**
- ❌ Inline style yok
- ❌ Tailwind yok
- ✅ CSS variables kullan
- ✅ Sade tut (gereksiz varyant yok)
