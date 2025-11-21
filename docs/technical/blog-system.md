# Blog System Architecture

This document outlines the blog system architecture for PackedLink. The blog system follows [ZEN-SEO-COMPOUND] principle: sürekli içerik üretimi ile SEO trafiğini kademeli büyütmek.

## Goals

1. **Notion-based CMS** - Notion'da yaz, otomatik Next.js'e senkronize et
2. **Static generation** - Hızlı, SEO-friendly sayfalar
3. **Sürekli yayın** - Haftalık/aylık düzenli blog üretimi; tek seferlik 500+ hedefi yok
4. **Sessiz operasyon** - Abartılı promosyon yerine temiz indeksleme ve yapılandırılmış veri

## Technology Stack

- **Next.js 14 App Router** - Static Site Generation (SSG)
- **Notion API** - Content source
- **Markdown** - Blog post format
- **RSS/Sitemap** - SEO optimization

## Architecture

### 1. Content Source: Notion

```
Notion Database → Notion API → Sync Script → Local Markdown → Next.js Build
```

**Notion Database Schema:**
- Title (text) - Post title
- Slug (text) - URL-friendly slug
- Published (checkbox) - Publish status
- PublishedDate (date) - Publication date
- Category (select) - Post category
- Tags (multi-select) - Post tags
- Content (page content) - Markdown content

### 2. Sync Script

**Location:** `scripts/sync-blog.js`

**Functionality:**
- Fetch published posts from Notion API
- Convert Notion blocks to Markdown
- Save as static markdown files in `content/blog/`
- Generate metadata JSON

**Usage:**
```bash
npm run sync-blog
```

**Output:**
```
content/
  blog/
    how-to-organize-instagram-links.md
    best-link-in-bio-tools-2024.md
    ...
  metadata.json
```

### 3. Blog Routes

**Landing:** `/blog` - Blog index page with all posts
**Post:** `/blog/[slug]` - Individual blog post page

**Next.js App Structure:**
```
src/frontend/app/
  blog/
    page.tsx              # Blog index
    page.module.css
    [slug]/
      page.tsx            # Blog post
      page.module.css
```

### 4. Static Site Generation

**Strategy:** `generateStaticParams` for all blog posts at build time

```typescript
// src/frontend/app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
    }
  }
}
```

### 5. SEO Features

**Required:**
- Sitemap.xml generation
- RSS feed
- Structured data (Article schema)
- Open Graph tags
- Canonical URLs
- Internal linking

**Sitemap:**
```typescript
// src/frontend/app/sitemap.ts
export default function sitemap() {
  const posts = getAllPosts()

  return [
    { url: 'https://packedlink.com', lastModified: new Date() },
    { url: 'https://packedlink.com/blog', lastModified: new Date() },
    ...posts.map(post => ({
      url: `https://packedlink.com/blog/${post.slug}`,
      lastModified: post.publishedDate,
    }))
  ]
}
```

## Content Strategy

### Blog Post Categories

1. **How-to Guides**
   - "How to organize Instagram links"
   - "How to share multiple links in bio"
   - "How to create link lists for content creators"

2. **Comparisons**
   - "Best link in bio tools 2024"
   - "Linktree alternatives"
   - "LinkStack vs Linktree vs PackedLink"

3. **Use Cases**
   - "Link organization for travel bloggers"
   - "Restaurant recommendation lists for food bloggers"
   - "Resource lists for teachers"

4. **Industry Insights**
   - "Instagram bio link best practices"
   - "Social media link management trends"
   - "Content creator toolkit 2024"

### SEO Keywords

Target long-tail keywords with search volume:
- "how to add multiple links to instagram bio"
- "link in bio tool free"
- "organize links for content creators"
- "best way to share links on instagram"
- "link management for influencers"

## Implementation Plan

### Setup

- Notion database oluştur ve API entegrasyonunu yap (schema: Title, Slug, Published, PublishedDate, Category, Tags, Content).
- Sync script'i yaz: Notion → Markdown → `content/blog/` + `metadata.json` üret.
- Blog rotalarını oluştur: `/blog` index, `/blog/[slug]` post sayfası; markdown render + syntax highlighting.
- SEO hygiene: sitemap.xml, RSS feed, structured data (JSON-LD), Open Graph, canonical URLs.

### Yayın ve Süreç

- **Ritim:** Haftalık en az 1–3 yazı; kapasiteye göre artırılabilir. İstikrar > hacim.
- **Girdi:** Notion'da yaz → `npm run sync-blog` ile dosyaları çek → build/deploy ile yayınla.
- **Kontrol:** Search Console indeks durumu, kırık link taraması, temel web vitals.
- **Güncelleme:** Performans düşük yazıları iyileştir; içerik backlog'unu persona önceliklerine göre tut.

## File Structure

```
/Users/mirat/Code/Current/packedlink/
  content/
    blog/
      *.md                    # Blog post markdown files
    metadata.json             # All posts metadata

  scripts/
    sync-blog.js              # Notion sync script

  src/frontend/
    app/
      blog/
        page.tsx              # Blog index
        page.module.css
        [slug]/
          page.tsx            # Blog post
          page.module.css
      sitemap.ts              # Sitemap generation
      feed.xml/
        route.ts              # RSS feed

    lib/
      blog.ts                 # Blog utilities
        - getAllPosts()
        - getPostBySlug()
        - getFeaturedPosts()
        - getPostsByCategory()

  package.json
    - scripts: { "sync-blog": "node scripts/sync-blog.js" }
```

## API Design

### getAllPosts()

```typescript
type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedDate: string
  category: string
  tags: string[]
  readingTime: number
}

function getAllPosts(): BlogPost[] {
  // Read from content/metadata.json
  // Sort by publishedDate desc
  return posts
}
```

### getPostBySlug(slug: string)

```typescript
function getPostBySlug(slug: string): BlogPost | null {
  // Read specific markdown file
  // Parse frontmatter and content
  return post
}
```

## Notion API Integration

**Required Environment Variables:**
```bash
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=...
```

**Sync Script Flow:**
```javascript
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function syncBlog() {
  // 1. Query published posts
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: { property: 'Published', checkbox: { equals: true } }
  })

  // 2. For each post, fetch content
  for (const page of response.results) {
    const blocks = await notion.blocks.children.list({ block_id: page.id })
    const markdown = convertBlocksToMarkdown(blocks.results)

    // 3. Save as markdown file
    const slug = page.properties.Slug.rich_text[0].plain_text
    fs.writeFileSync(`content/blog/${slug}.md`, markdown)
  }

  // 4. Generate metadata.json
  generateMetadata(response.results)
}
```

## Performance Considerations

1. **Build Time:** İçerik arttıkça build süresi lineer artar; birkaç yüz yazı sonrası build süresini izleyip gerekirse ISR veya kısmi yeniden üretim ekle.
2. **Incremental Static Regeneration:** İçerik sık güncellenirse seçili sayfalara ISR eklenebilir; düşük frekansta tam statik üretim yeterli.
3. **Image Optimization:** Tüm blog görsellerinde Next.js `<Image>` kullan.
4. **Code Splitting:** App Router ile otomatik; ekstra aksiyon gerekmez.

## Next Steps

1. Set up Notion database and API integration
2. Create blog routes in Next.js
3. Write sync script
4. Başlangıç içeriklerini üretip düzenli yayın ritmini oturt
5. Search Console ve analytics ile performansı izle

## Success Signals

- Düzenli yayın ritmi korunuyor (haftalık/aylık)
- Blog sayfaları organik trafik ve indeks artışı sağlıyor
- İçeriklerden landing sayfalarına geri bağlantılar oluşuyor
- Hedeflenen long-tail anahtar kelimelerde görünürlük artışı
