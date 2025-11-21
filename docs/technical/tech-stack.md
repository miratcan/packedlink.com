# Tech Stack

This document defines what technologies we use and how to use them. **AI agents: Follow these rules strictly.**

---

## Backend

### Framework & API
- **Framework:** Django 5.0+
- **API Layer:** Django Ninja (for REST APIs)
  - ✅ Use Django Ninja routers and decorators
  - ❌ DON'T use Django REST Framework
  - ❌ DON'T use JsonResponse views directly
  - Auto-generates OpenAPI docs at `/api/v1/docs`

### Database
- **Development:** SQLite 3
- **Production (planned):** PostgreSQL/Supabase
- **ORM:** Django ORM (models are source of truth)
- **Migrations:** Django migrations (auto-generated)

### Package Management
- **Package Manager:** uv
- **Config:** pyproject.toml
  - ✅ Use `uv add package-name`
  - ❌ DON'T use pip or requirements.txt

### Admin
- **Admin Panel:** Django Admin
- **Usage:** Operational management, viewing data

---

## Frontend

### Framework & Routing
- **Framework:** Next.js 14+
- **Router:** App Router (app/ directory)
  - ✅ Use App Router: `app/page.tsx`, `app/[slug]/page.tsx`
  - ❌ DON'T use Pages Router (pages/ directory)
  - ❌ DON'T add alternative routing libraries

### Language
- **Language:** TypeScript
- **Type Safety:** Strict mode enabled
  - ✅ Always type props, functions, responses
  - ❌ DON'T use `any` type

### Styling
- **Approach:** CSS Modules + design tokens
  - ✅ Use CSS Modules: `Component.module.css`
  - ✅ Use design tokens from `globals.css` (e.g., `var(--color-accent)`)
  - ❌ DON'T use Tailwind CSS
  - ❌ DON'T use inline styles
  - ❌ DON'T use utility class libraries
  - ❌ DON'T hardcode colors/spacing (use tokens)

### State Management
- **Data Fetching:** React Query (TanStack Query)
  - ✅ Use for server state, caching, refetching
- **Client State:** Zustand (minimal, only when needed)
  - ✅ Use only for UI state across components (modals, filters)
  - ❌ DON'T use for server data (use React Query)
  - ❌ DON'T add Redux, MobX, or other state libraries

### Data Fetching Pattern
- **Server Components:** Fetch directly in components (default)
- **Client Components:** Use React Query hooks
- **Server Actions:** For mutations
  - ✅ Prefer Server Actions over API routes when possible

---

## Infrastructure

### Hosting
- **Frontend:** Vercel
- **Backend:** TBD (currently dev only)
- **CDN:** Cloudflare (DDoS protection)

### Development
- **Containerization:** Docker (only for prod if needed)
  - ✅ Local development runs WITHOUT Docker
  - ❌ DON'T require Docker for development

---

## Key Rules for AI Agents

### When Building API Endpoints
```python
# ✅ DO THIS (Django Ninja)
from ninja import Router
router = Router()

@router.get("/lists/{hash_id}")
def get_list(request, hash_id: str):
    # Implementation

# ❌ DON'T DO THIS
from django.http import JsonResponse
def get_list(request, hash_id):
    return JsonResponse({...})
```

### When Creating Frontend Routes
```
✅ DO THIS (App Router)
app/
  blog/
    page.tsx
    [slug]/
      page.tsx

❌ DON'T DO THIS (Pages Router)
pages/
  blog/
    [slug].tsx
```

### When Styling Components
```css
/* ✅ DO THIS (CSS Modules + tokens) */
.button {
  background: var(--color-accent);
  padding: var(--spacing-sm) var(--spacing-lg);
}

/* ❌ DON'T DO THIS (hardcoded) */
.button {
  background: #C8734C;
  padding: 8px 16px;
}
```

### When Managing State
```typescript
// ✅ DO THIS (React Query for server data)
const { data, isLoading } = useQuery({
  queryKey: ['lists'],
  queryFn: fetchLists
})

// ❌ DON'T DO THIS (useState for server data)
const [lists, setLists] = useState([])
useEffect(() => {
  fetchLists().then(setLists)
}, [])
```

---

## Adding New Dependencies

Before adding any package:
1. **Check if needed:** Can we solve this without a new dependency?
2. **Check existing stack:** Is there already a tool for this?
3. **Ask for approval:** Don't add libraries without discussing

**Common mistakes to avoid:**
- ❌ Adding Tailwind when we use CSS Modules
- ❌ Adding axios when fetch/React Query works
- ❌ Adding moment.js when date-fns or native Intl works
- ❌ Adding Redux when React Query + Zustand exists

---

## Mobile Future Guard

**Important:** Backend decisions assume future iOS/Android clients.

- Django + Django Ninja chosen for clean REST APIs
- Mobile clients will consume same `/api/v1/` endpoints
- Keep API design mobile-friendly (no web-specific assumptions)

---

**Last Updated:** 2025-01-21
