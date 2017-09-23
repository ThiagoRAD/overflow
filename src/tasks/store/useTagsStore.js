import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const useTagsStore = create(
  persist(
    (set) => ({
      tags: [],
      createTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
      deleteTag: (id) => set((state) => ({ tags: state.tags.filter((tag) => tag.id !== id) })),
      toggleTagCollapse: (id) => set((state) => ({
        tags: state.tags.map((tag) => (tag.id === id ? { ...tag, collapsed: !tag.collapsed } : tag)),
      })),
      addTaskToTag: (tagId, taskId) => set((state) => ({
        tags: state.tags.map((tag) => {
          console.log(state.tags)
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
      setTags: (tags) => set(() => ({ tags })),
    }),
    {
      name: 'overflow-tags-storage',
      storage: createJSONStorage(() => dbStorage),
    }
  ) 
);

export default useTagsStore;
