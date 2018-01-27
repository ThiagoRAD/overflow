import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const useTagsStore = create(
  persist(
    (set) => ({
      tags: [],
      createTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
      deleteTag: (id) => set((state) => ({ tags: state.tags.filter((tag) => tag.id !== id) })),
      addTaskToTag: (tagId, taskId) => set((state) => ({
        tags: state.tags.map((tag) => {
          if(tag.id !== tagId) return tag;
          return { ...tag, taskIds: [...(tag.taskIds || []), taskId] }
        })
      })),
      removeTaskFromTag: (tagId, taskId) => set((state) => ({
        tags: state.tags.map((tag) => {
          if(tag.id !== tagId) return tag;
          return { ...tag, taskIds: (tag.taskIds || []).filter(id => id !== taskId) }
        })
      })),
      setTags: (tags) => set(() => ({ tags })),
    }),
    {
      name: 'overflow-tags-storage',
      storage: createJSONStorage(() => dbStorage),
    }
  ) 
);

export default useTagsStore;
