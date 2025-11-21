"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BuilderLink = {
  id: string;
  title: string;
  url: string;
  note: string;
};

export type PublishPayload = {
  title: string;
  tagline: string;
  description: string;
  creatorName: string;
  creatorHandle: string;
  links: BuilderLink[];
};

export type PublishResponse = {
  publicUrl: string;
  manageUrl: string;
  expiresAt: string;
};

interface ListBuilderState extends PublishPayload {
  lastPublish?: PublishResponse;
  setMeta: (values: Partial<Omit<PublishPayload, "links">>) => void;
  addLink: (link: Omit<BuilderLink, "id">) => void;
  removeLink: (id: string) => void;
  setLastPublish: (result: PublishResponse) => void;
  reset: () => void;
}

const randomId = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 9);

const seedLinks = (): BuilderLink[] => [
  {
    id: randomId(),
    title: "Kürasyon manifestosu",
    url: "https://packedlink.com/manifesto",
    note: "Public sayfada nasıl görüneceğini gösterir",
  },
];

const baseState = {
  title: "Sezonun ilham veren linkleri",
  tagline: "PackedLink builder mock data",
  description: "Backend API hazır olana kadar bu state ile frontendi test ediyoruz.",
  creatorName: "",
  creatorHandle: "",
};

export const useListBuilderStore = create<ListBuilderState>()(
  persist(
    (set) => ({
      ...baseState,
      links: [], // Start with empty links to show empty state
      lastPublish: undefined,
      setMeta: (values) => set((state) => ({ ...state, ...values })),
      addLink: (link) =>
        set((state) => ({
          links: [
            ...state.links,
            {
              ...link,
              id: randomId(),
            },
          ],
        })),
      removeLink: (id) =>
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        })),
      setLastPublish: (result) => set({ lastPublish: result }),
      reset: () =>
        set({
          ...baseState,
          links: seedLinks(),
          lastPublish: undefined,
        }),
    }),
    {
      name: "kaydet-list-builder",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const selectPublishPayload = (state: ListBuilderState): PublishPayload => ({
  title: state.title,
  tagline: state.tagline,
  description: state.description,
  creatorName: state.creatorName,
  creatorHandle: state.creatorHandle,
  links: state.links,
});
