import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const getPersistedTaskIds = async () => {
  try {
    const persistedTasks = await dbStorage.getItem('overflow-task-storage');
    if (!persistedTasks) return null;

    const parsedTasks = typeof persistedTasks === 'string'
      ? JSON.parse(persistedTasks)
      : persistedTasks;

    const tasks = parsedTasks?.state?.tasks;
    if (!Array.isArray(tasks)) return null;

    return new Set(tasks.map((task) => task?.id).filter(Boolean));
  } catch {
    return null;
  }
};

const normalizeTag = (tag = {}, existingTaskIds) => {
  const taskIds = Array.isArray(tag.tasks) ? tag.tasks : [];
  const filteredTaskIds = existingTaskIds instanceof Set
    ? taskIds.filter((taskId) => existingTaskIds.has(taskId))
    : taskIds;

  return {
    ...tag,
    id: tag.id ?? crypto.randomUUID(),
    tasks: filteredTaskIds,
    collapsed: Boolean(tag.collapsed),
  };
};

const normalizeTags = (tags = [], existingTaskIds) => tags.map((tag) => normalizeTag(tag, existingTaskIds));

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
      setTags: (tags, existingTaskIds) => set(() => ({ tags: normalizeTags(tags, existingTaskIds) })),
      setHasHydrated: (hasHydrated) => set(() => ({ hasHydrated })),
    }),
    {
      name: 'overflow-tags-storage',
      storage: createJSONStorage(() => dbStorage),
      onRehydrateStorage: () => (state) => {
        state?.setTags(state.tags ?? []);

        (async () => {
          const existingTaskIds = await getPersistedTaskIds();
          if (!(existingTaskIds instanceof Set)) return;

          const currentTags = useTagsStore.getState().tags ?? [];
          useTagsStore.getState().setTags(currentTags, existingTaskIds);
        })();

        state?.setHasHydrated(true);
      },
    }
  ) 
);

export default useTagsStore;
