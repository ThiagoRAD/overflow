import { useRef, useState } from 'react';
import useTaskStore from './store/useTaskStore';
import useTagsStore from './store/useTagsStore';
import {TbTag} from 'react-icons/tb';
import DraggableTaskItem from './DraggableTaskItem';
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { TbTrash } from 'react-icons/tb';

const DELETE_REVEAL_WIDTH = 88;
const SWIPE_THRESHOLD = 48;

const TaskListTagManagement = () => {
  const {tasks} = useTaskStore();
  const {tags, addTaskToTag, removeTaskFromTags, toggleTagCollapse, deleteTag} = useTagsStore();
  const [openTagId, setOpenTagId] = useState(null);
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);
  const ignoreTapRef = useRef(false);

  const taggedTaskIds = new Set(tags.flatMap((tag) => tag.tasks));

  const handleTagDrop = (event, tag) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');

    removeTaskFromTags(taskId);
    if (tag) addTaskToTag(tag, taskId);

  };

  const handleTagDragOver = (event) => {
    event.preventDefault();
  };

  const handleTagTouchStart = (event, tagId) => {
    touchStartXRef.current = event.touches[0].clientX;
    touchDeltaXRef.current = 0;
    ignoreTapRef.current = false;

    if (openTagId && openTagId !== tagId) {
      setOpenTagId(null);
    }
  };

  const handleTagTouchMove = (event) => {
    if (touchStartXRef.current === null) {
      return;
    }

    touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
    ignoreTapRef.current = Math.abs(touchDeltaXRef.current) > 10;
  };

  const handleTagTouchEnd = (tagId) => {
    if (touchStartXRef.current === null) {
      return;
    }

    if (touchDeltaXRef.current <= -SWIPE_THRESHOLD) {
      setOpenTagId(tagId);
    } else if (touchDeltaXRef.current >= SWIPE_THRESHOLD / 2) {
      setOpenTagId(null);
    }

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  const handleTagClick = (tagId) => {
    if (ignoreTapRef.current) {
      ignoreTapRef.current = false;
      return;
    }

    toggleTagCollapse(tagId);
  };

  return (
    <div className='p-4' onClick={() => openTagId && setOpenTagId(null)}>
      {tags.map((tag) => (
        <div key={tag.id} className='mb-4' onDragOver={handleTagDragOver} onDrop={(event) => handleTagDrop(event, tag.id)}>
          <div className='relative overflow-hidden rounded-2xl' onClick={(event) => event.stopPropagation()}>
            <button
              type='button'
              className={`absolute inset-y-0 right-0 flex w-22 items-center justify-center gap-2 rounded-2xl bg-red-500/90 px-3 text-sm font-medium text-white transition-all duration-200 ${openTagId === tag.id ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
              onClick={() => deleteTag(tag.id)}
              aria-label={`Delete ${tag.name} tag`}
            >
              <TbTrash className='text-base' />
              Delete
            </button>
            <div
              className='relative flex justify-between items-center w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition-transform duration-200 touch-pan-y'
              style={{ transform: `translateX(${openTagId === tag.id ? -DELETE_REVEAL_WIDTH : 0}px)` }}
              onTouchStart={(event) => handleTagTouchStart(event, tag.id)}
              onTouchMove={handleTagTouchMove}
              onTouchEnd={() => handleTagTouchEnd(tag.id)}
            >
              <h2 style={{color: tag.color}} className='flex items-center gap-0.5 text-xl'>
                <div className='flex items-center gap-1 text-xl' onClick={() => handleTagClick(tag.id)}><TbTag /> {tag.name}  {tag.collapsed ? <MdArrowDropDown /> : <IoMdArrowDropup />}</div>
              </h2>
              <span className='flex h-5 w-5 items-center justify-center rounded-full border bg-white/10 p-1 font-sans text-[10px] font-normal leading-none text-white' style={{ borderColor: tag.color }}>{tag.tasks.length}</span>
            </div>
          </div>
          {tag.tasks.map((taskId) => {
            if(tag.collapsed) return null;
            const task = tasks.find((t) => t.id === taskId);
            return task ? <DraggableTaskItem key={task.id} task={task} /> : null;
          })}
        </div>
      ))}
      <div className='mb-4' onDragOver={handleTagDragOver} onDrop={handleTagDrop}>
        <h2 className='flex items-center gap-0.5 text-xl'>No Tag</h2>
      </div>
      {tasks
        .filter((task) => !taggedTaskIds.has(task.id))
        .map((task) => (
          <DraggableTaskItem key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskListTagManagement;
