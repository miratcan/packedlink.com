export type MockLink = {
  title: string;
  url: string;
  note: string;
  tier?: "hero" | "default";
};

export type MockList = {
  id: string;
  title: string;
  tagline: string;
  curator: string;
  links: MockLink[];
};

const MOCK_LISTS: MockList[] = [
  {
    id: "weekly-ai",
    title: "Haftalık AI Radar",
    tagline: "Solopreneur'ler için haftanın 5 seçeneği",
    curator: "Mira",
    links: [
      { title: "Anthropic Research", url: "https://www.anthropic.com/research", note: "Context window güncellemesi", tier: "hero" },
      { title: "Vercel AI SDK", url: "https://vercel.com/ai", note: "Streaming UI", tier: "default" },
      { title: "Builder.io AI", url: "https://www.builder.io", note: "No-code to AI" }
    ],
  },
  {
    id: "istanbul-food",
    title: "İstanbul Food Saviors",
    tagline: "Lokal üreticileri destekle",
    curator: "Demet",
    links: [
      { title: "Zencefil", url: "https://zencefil.com.tr", note: "Vegan ikon" },
      { title: "Araka", url: "https://arka.com", note: "Michelin önerisi" },
      { title: "Kırlangıç", url: "https://kirlangic.com", note: "Haftalık çiftçi pazarı" }
    ],
  },
  {
    id: "solo-tools",
    title: "Solo Founder Stack",
    tagline: "Tek kişilik SaaS için 7 araç",
    curator: "Kaydet ekibi",
    links: [
      { title: "Linear", url: "https://linear.app", note: "Planlama" },
      { title: "Forecast", url: "https://forecastapp.com", note: "Gelir projeksiyonu" },
      { title: "Fathom", url: "https://usefathom.com", note: "Basit analytics" }
    ],
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchMockLists(): Promise<MockList[]> {
  await delay(250);
  return MOCK_LISTS;
}

export async function fetchMockList(id: string): Promise<MockList | undefined> {
  await delay(200);
  return MOCK_LISTS.find((list) => list.id === id);
}

export const featuredLists = MOCK_LISTS.slice(0, 2);
