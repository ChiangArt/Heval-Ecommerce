import { create } from "zustand";
import { getCollections } from "@/core/collection/action/collection.actions";
import { Collection } from "@/core/collection/interface/collectionResponse";
import { logError } from "@/app/utils/logger";

interface CollectionStore {
  collections: Collection[];
  fetchCollections: () => Promise<void>;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
  fetchCollections: async () => {
    try {
      const data = await getCollections();
      set({ collections: data });
    } catch (error) {
      logError("Error al cargar colecciones", error);
    }
  },
}));
