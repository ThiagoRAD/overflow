import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const normalizeTag = (tag = {}) => ({
  ...tag,
  id: tag.id ?? crypto.randomUUID(),
  tasks: Array.isArray(tag.tasks) ? tag.tasks : [],
  collapsed: Boolean(tag.collapsed),
});

const normalizeTags = (tags = []) => tags.map(normalizeTag);

const useTagsStore = create(
  persist(
    (set) => ({
      hasHydrated: false,
      tags: [],
      createTag: (tag) => set((state) => ({ tags: [...state.tags, normalizeTag(tag)] })),
      deleteTag: (id) => set((state) => ({ tags: state.tags.filter((tag) => tag.id !== id) })),
      toggleTagCollapse: (id) => set((state) => ({
        tags: state.tags.map((tag) => (tag.id === id ? { ...tag, collapsed: !tag.collapsed } : tag)),
      })),
      addTaskToTag: (tagId, taskId) => set((state) => ({
        tags: state.tags.map((tag) => {
          if(tag.id !== tagId) return tag;
          const existingIds = tag.tasks
          if(existingIds.includes(taskId)) return { ...tag, tasks: existingIds }
          return { ...tag, tasks: [...existingIds, taskId] }
        })
      })),
      removeTaskFromTags: (taskId) => set((state) => ({
        tags: state.tags.map((tag) => {
          const existingIds = tag.tasks
          return { ...tag, tasks: existingIds.filter(id => id !== taskId) }
        })
      })),
      setTags: (tags) => set(() => ({ tags: normalizeTags(tags) })),
      setHasHydrated: (hasHydrated) => set(() => ({ hasHydrated })),
    }),
    {
      name: 'overflow-tags-storage',
      storage: createJSONStorage(() => dbStorage),
      onRehydrateStorage: () => (state) => {
        state?.setTags(state.tags ?? []);
        state?.setHasHydrated(true);
      },
    }
  ) 
);

export default useTagsStore;
