# Storybook Setup Guide

Kaydet.link için Storybook kurulum kılavuzu. Designer agent bu adımları takip ederek design system'i kurar.

## 1. Installation

```bash
# Storybook'u Next.js projesine kur
npx storybook@latest init

# Storybook çalıştır
npm run storybook
```

Storybook http://localhost:6006 adresinde açılır.

## 2. Project Structure

```
src/
  design/
    tokens.css                 # CSS variables (design tokens)

  frontend/
    components/
      Button/
        Button.tsx             # React component
        Button.module.css      # Component styles
        Button.stories.tsx     # Storybook story
        index.ts               # Export
      Card/
        Card.tsx
        Card.module.css
        Card.stories.tsx
        index.ts

.storybook/
  main.js                      # Storybook config
  preview.js                   # Global styles & decorators
```

## 3. CSS Variables (Design Tokens)

`src/design/tokens.css`:

```css
/* Design Tokens - Single Source of Truth */
:root {
  /* Colors */
  --color-dashboard-blue: #36465D;
  --color-accent: #56BC8A;
  --color-surface: #FFFFFF;
  --color-background: #F3F4F6;
  --color-border: #E5E7EB;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-icon-gray: #9AA2AE;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 32px;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 20px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Border Radius */
  --radius: 4px;

  /* Shadow */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
```

## 4. Storybook Configuration

`.storybook/main.js`:

```js
/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    "../src/frontend/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/frontend/pages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

`.storybook/preview.js`:

```js
import '../src/design/tokens.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

## 5. Production Bundle Exclusion

`next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Production'da .stories.tsx dosyalarını bundle'a alma
    if (!dev && !isServer) {
      config.module.rules.push({
        test: /\.stories\.tsx?$/,
        loader: 'ignore-loader',
      });
    }
    return config;
  },
};

module.exports = nextConfig;
```

**Not:** `ignore-loader` package'ını kurmak gerekebilir:

```bash
npm install --save-dev ignore-loader
```

## 6. Example Component

### Button Component

`src/frontend/components/Button/Button.tsx`:

```tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

`src/frontend/components/Button/Button.module.css`:

```css
.button {
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background: var(--color-dashboard-blue);
  color: white;
}

.primary:hover {
  opacity: 0.9;
}

.secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
}

.lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}
```

`src/frontend/components/Button/Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Linki kopyala',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'İptal',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Küçük buton',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Büyük buton',
  },
};
```

`src/frontend/components/Button/index.ts`:

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## 7. Designer Workflow

Designer bir component yaparken:

1. **Component'i yaz** (`Button.tsx`)
   - Props interface tanımla
   - Pure CSS kullan (Tailwind yok)
   - CSS variables kullan

2. **Styles yaz** (`Button.module.css`)
   - `var(--color-*)` kullan
   - `var(--spacing-*)` kullan
   - Inline style yok

3. **Story yaz** (`Button.stories.tsx`)
   - Meta tanımla
   - Her variant için story
   - Tags: `['autodocs']`

4. **Export** (`index.ts`)
   - Component'i ve type'ları export et

5. **Test et**
   ```bash
   npm run storybook
   ```
   Component'in tüm varyasyonlarını görüntüle

6. **Commit**
   ```bash
   git add src/frontend/components/Button/
   git commit -m "feat(design): add Button component"
   ```

## 8. Developer Usage

Developer component'i kullanırken:

```tsx
// pages/HomePage.tsx
import { Button } from '@/components/Button';

export default function HomePage() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log('clicked')}>
        Listeye Başla
      </Button>
    </div>
  );
}
```

**Önemli:** Developer ASLA custom styling yapmamalı. Eğer variant eksikse designer'dan istenmeli.

## 9. Full Page Stories

`src/frontend/pages/HomePage/HomePage.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import HomePage from './HomePage';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};

export const WithManyLinks: Story = {
  args: {
    links: [
      { title: 'Link 1', url: 'https://example.com' },
      { title: 'Link 2', url: 'https://example.com' },
      // ... more links
    ],
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

## 10. Checklist

Designer component eklerken kontrol et:

- [ ] Component React + TypeScript ile yazıldı
- [ ] Styles .module.css dosyasında
- [ ] Tüm values CSS variables'dan (`var(--*)`)
- [ ] Inline style yok
- [ ] Story dosyası var
- [ ] Her variant için story var
- [ ] Storybook'ta görüntülendi
- [ ] Production bundle'a girmiyor (test edildi)

## 11. Troubleshooting

**Storybook başlamıyor:**
```bash
# Cache temizle
rm -rf node_modules/.cache/storybook
npm run storybook
```

**CSS variables çalışmıyor:**
- `.storybook/preview.js`'de tokens.css import edilmiş mi kontrol et

**Production'da .stories.tsx bundle'a giriyor:**
- `next.config.js`'de webpack config var mı kontrol et
- `ignore-loader` kurulu mu kontrol et

## 12. Next Steps

Setup tamamlandıktan sonra:

1. Designer design-guide.md'yi okur
2. Temel component'leri oluşturur (Button, Card, Hero, LinkBar)
3. Storybook'ta görüntüler
4. Developer'a bildirir: "Design system hazır"
