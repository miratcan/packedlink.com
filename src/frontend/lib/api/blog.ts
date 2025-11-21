import 'server-only'

export type BlogTag = {
  name: string
  slug: string
}

export type BlogPost = {
  title: string
  slug: string
  content: string
  excerpt: string
  published_at: string | null
  is_published: boolean
  tags: BlogTag[]
}

export type PaginatedResponse<T> = {
  items: T[]
  count: number
  page: number
  pages: number
}

type FetchPostsParams = {
  page?: number
}

const API_PREFIX = '/api/v1'
const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '')

function buildApiUrl(path: string, searchParams?: URLSearchParams) {
  const query = searchParams && searchParams.toString()
  return `${apiBase}${API_PREFIX}${path}${query ? `?${query}` : ''}`
}

export async function fetchBlogPosts(params: FetchPostsParams = {}): Promise<PaginatedResponse<BlogPost>> {
  const search = new URLSearchParams()
  if (params.page && params.page > 1) {
    search.set('page', params.page.toString())
  }

  const res = await fetch(buildApiUrl('/blog/', search), {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Blog list fetch failed with status ${res.status}`)
  }

  return res.json()
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const res = await fetch(buildApiUrl(`/blog/${slug}/`), { cache: 'no-store' })

  if (res.status === 404) {
    throw Object.assign(new Error('NOT_FOUND'), { code: 404 })
  }

  if (!res.ok) {
    throw new Error(`Blog detail fetch failed with status ${res.status}`)
  }

  return res.json()
}
