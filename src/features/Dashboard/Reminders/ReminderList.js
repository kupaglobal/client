import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ListBox } from 'primereact/listbox';
import { loadingSkeleton } from '../../../utils';
import { DashboardService } from '../../../services/dashboard.service';

const RemindersList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [taggedColleague, setTaggedColleague] = useState('');
  const [taggedColleagues, setTaggedColleagues] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null)

  const addTodo = async () => {
    setIsLoading(true)
    if (newTodo.trim() !== '') {
      try {
        const newTodoDto = {
          body: newTodo,
          completed: false,
          tags: taggedColleagues.map(colleague => colleague.id)
        }
        await DashboardService.addReminder(newTodoDto)
        setNewTodo('');
        setShouldRefetch(true)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
      }
    }
  };

  const removeTodo = async (todoId) => {
    try {
      setSelectedTodo(todoId)
      setIsLoading(true)
      await DashboardService.deleteReminder(todoId)
      setShouldRefetch(true)
      setIsLoading(false)
      setSelectedTodo('')
    } catch (e) {
      setIsLoading(false)
    }   
    // const updatedTodos = todos.filter((_, i) => i !== index);
    // setTodos(updatedTodos);
  };

  const renderTaggedUsersAvatars = (taggedUsers) => {
    if (!taggedUsers) taggedUsers = []
    const maxVisibleAvatars = 3;
    const visibleAvatars = taggedUsers.slice(0, maxVisibleAvatars);

    return visibleAvatars.map((user, index) => {
      const opacity = 1 - (index * 0.3); // Adjust the value for different shades

      // Convert the color to RGBA format with varying opacity
      const color = `rgba(93, 23, 235, ${opacity})`;

      return (
        <div
          key={index}
          style={{
            position: 'relative',
            zIndex: maxVisibleAvatars - index,
            marginLeft: index === 0 ? 0 : -5, // Adjust overlap distance
          }}
        >
          <Avatar label={user.initials} shape="circle" style={{ backgroundColor: color, color: 'white', width: '1.7rem', height: '1.7rem', fontSize: '8pt'  }} />
        </div>
      )
    });
  };
 
  const [shouldRefetch, setShouldRefetch] = useState(true)
  useEffect(() => {
    async function getReminders() {
      try {
        setIsLoading(true)
        const {data: { todos }} = await DashboardService.getReminders();
        setTodos(todos)
        setIsLoading(false)
        setShouldRefetch(false)
      } catch(e) {
        setIsLoading(false)
      }
    }
    if (shouldRefetch) {
      getReminders();
    }
  }, [shouldRefetch])

  const [editableIndex, setEditableIndex] = useState(null);

  const handleTodoClick = (index) => {
    setEditableIndex(index);
  };

  const handleEnter = async (event, index) => {
    if (event.key === 'Enter') {
      try {
        updateReminder(todos[index], index)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleInputChange = async (event, index) => {
    try {
      const newTodos = [...todos];
      newTodos[index].body = event.target.value;
      setTodos(newTodos)
    } catch (e) {
      console.error(e)
    }
  };

  const updateReminder = async (todo, index) => {
    setEditableIndex(null)
    await DashboardService.updateReminder(todo.id, {
      body: todos[index].body
    })

  }

  const renderTodoItem = (todo, index) => {
    return (
      <div>
        {editableIndex === index ? (
          <InputTextarea
            autoResize
            maxLength={160}
            value={todo.body}
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              background: 'none',
              fontSize: '10pt'
              // Add any additional styling you need
            }}
            onKeyUp={(event) => handleEnter(event, index)}
            onChange={(event) => handleInputChange(event, index)}
            onBlur={() => updateReminder(todo, index)}
          />
        ) : (
          <div className="p-clearfix">
            <div className="p-float-left mb-2"  onClick={() => handleTodoClick(index)}>{todo.body}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {todo ? renderTaggedUsersAvatars(todo.taggedUsers) : null}
              {todo && todo.taggedUsers?.length > 3 && (
                <div className='text-gray-300' style={{ fontSize: 16, fontWeight: 'bold' }}>
                  +{todo.taggedUsers.length - 3}
                </div>
              )}
            </div>
            <div className="flex flex-end">
              <Button
                loading={isLoading && selectedTodo === todo.id}
                size='small'
                icon="pi pi-trash"
                className="p-button-danger text-right border-none"
                style={{ border: 'none'}}
                text severity="danger"
                onClick={() => removeTodo(todo.id)}
              />
            </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='w-full w-20rem' >
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
      {isLoading && todos.length === 0 ? loadingSkeleton :
      <ListBox
        options={todos.map((todo, index) => ({
          label: renderTodoItem(todo, index),
          value: todo.id
        }))}
        emptyMessage="Nothing upcoming"
        optionLabel="label"
        className="todo-list text-sm"
        // itemTemplate={(todo, index) => (
        // )}
      />}
    </div>
  );
};

export default RemindersList;
