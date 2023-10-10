'use client'

import { deleteTodo, updateTodo } from '@/api';
import { Task } from '@/types';
import React, { useState, useRef, useEffect } from 'react'

interface TodoProps {
    todo: Task;
}

function Todo({ todo }: TodoProps) {

  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

  useEffect(() => {
    if (isEditing){
      ref.current?.focus();
    }
  }, [isEditing]);
  
  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateTodo(todo.id, editedTaskTitle);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <li
        key={todo.id}
        className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow'
    >
        {isEditing ? (
          <input
            ref={ref}
            type="text"
            className='mr-2 py-1 px-2 rounded border-grey-400 border'
            value={editedTaskTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditedTaskTitle(e.target.value)
            }
          />
        ) : (<span>{todo.text}</span>
        )}
        <div>
          {isEditing ? (
            <button className='text-green-500 mr-3' onClick={handleSave}>
              save
            </button>
            ) : (
            <button className='text-green-500 mr-3' onClick={handleEdit}>
              edit
            </button>
            )}
            <button className='text-red-500' onClick={handleDelete}>Delete</button>
        </div>
    </li>
  );
};

export default Todo;