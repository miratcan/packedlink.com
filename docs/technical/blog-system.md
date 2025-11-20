# Blog System Architecture

This document outlines the blog system architecture for PackedLink Phase 0. The blog system follows [ZEN-SEO-COMPOUND] principle: build SEO traffic before app launch.

## Goals

1. **500+ blog posts** indexed on Google before Phase 1 launch
2. **Notion-based CMS** - Write in Notion, sync to Next.js
3. **Static generation** - Fast, SEO-friendly pages
4. **Silent operation** - No promotion, pure SEO accumulation

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

### Week 1: Infrastructure

**Day 1-2: Notion Setup**
- [ ] Create Notion database with schema
- [ ] Set up Notion API integration
- [ ] Write test content

**Day 3-4: Sync Script**
- [ ] Install Notion SDK: `npm install @notionhq/client`
- [ ] Write sync script to fetch Notion content
- [ ] Convert Notion blocks to Markdown
- [ ] Save to `content/blog/` directory

**Day 5-7: Blog Routes**
- [ ] Create `/blog` index page
- [ ] Create `/blog/[slug]` post page
- [ ] Implement markdown rendering
- [ ] Add syntax highlighting for code blocks

### Week 2-3: SEO & Publishing

**Week 2: SEO Features**
- [ ] Generate sitemap.xml
- [ ] Create RSS feed
- [ ] Add structured data (JSON-LD)
- [ ] Implement Open Graph tags
- [ ] Add canonical URLs

**Week 3: Content Production**
- [ ] Write initial 50 blog posts with AI
- [ ] Set up publishing schedule (5-10 posts/day)
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor indexing status

### Week 4-12: Content Scaling

- [ ] Continue writing and publishing 5-10 posts/day
- [ ] Reach 500+ total posts by week 12
- [ ] Monitor Google indexing and rankings
- [ ] Adjust content strategy based on performance

## File Structure

```
/Users/mirat/Code/Current/kaydet.link/
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

1. **Build Time:** 500 posts × ~100ms = 50 seconds build time (acceptable)
2. **Incremental Static Regeneration:** Not needed for Phase 0 (content rarely changes after publish)
3. **Image Optimization:** Use Next.js `<Image>` component for all blog images
4. **Code Splitting:** Automatic with Next.js App Router

## Next Steps

1. Set up Notion database and API integration
2. Create blog routes in Next.js
3. Write sync script
4. Start content production with AI
5. Deploy and monitor SEO performance

## Success Metrics

- **500+ posts** indexed on Google by Phase 1 launch
- **Blog pages** generating organic traffic
- **Backlinks** from blog content to landing page
- **Domain authority** increase from blog content
- **Keyword rankings** for target long-tail keywords
