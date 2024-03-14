import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { loadingSkeleton } from '../../../utils';

const RemindersList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [taggedColleague, setTaggedColleague] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo }]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className='w-full text-' >
      <h3>Reminders</h3>
      <div className="p-inputgroup text-sm">
        <InputText
        className='text-sm'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new reminder"
        />
        <Button size='small' icon="pi pi-plus" onClick={addTodo} />
      </div>
      {isLoading ? loadingSkeleton :
      <ListBox
        options={todos}
        emptyMessage="Nothing upcoming"
        optionLabel="text"
        className="todo-list text-sm"
        itemTemplate={(todo, index) => (
          <div className="p-clearfix">
            <div className="p-float-left">{todo.text}</div>
            <div className="p-float-right">
              <Button
              size='small'
                icon="pi pi-trash"
                className="p-button-danger mt-2"
                rounded text severity="danger"
                onClick={() => removeTodo(index)}
              />
            </div>
          </div>
        )}
      />}
    </div>
  );
};

export default RemindersList;
