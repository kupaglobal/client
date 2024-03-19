import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ListBox } from 'primereact/listbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { loadingSkeleton } from '../../../utils';
import { DashboardService } from '../../../services/dashboard.service';
import OrganisationService from '../../../services/organisation.service';

const RemindersList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [tagUserIsLoading, setTagUserIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null)

  const [showColleaguesOverlay, setShowColleaguesOverlay] = useState(false)
  const [colleaguesOverlayPosition, setColleaguesOverlayPosition] = useState(null)

  const [colleagues, setColleagues] = useState([])

  const overlayPanel = useRef(null);
  const addTodo = async () => {
    setIsLoading(true)
    if (newTodo.trim() !== '') {
      try {
        const newTodoDto = {
          body: newTodo,
          completed: false
        }
        setTodos([ newTodoDto, ...todos ])
        setNewTodo('');

        await DashboardService.addReminder(newTodoDto)
        setShouldRefetch(true)
        setIsLoading(false)
      } catch (e) {
        setShouldRefetch(true)
        setIsLoading(false)
      }
    }
  };

  const removeTodo = async (todoId) => {
    try {
      setSelectedTodo(todoId)
      setIsLoading(true)
      setTodos(todos.filter(todo => todo.id!==todoId))
      await DashboardService.deleteReminder(todoId)
      setShouldRefetch(true)
      setIsLoading(false)
      setSelectedTodo('')
    } catch (e) {
      setShouldRefetch(true)
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

      user.initials = `${user.firstName[0]}${user.lastName[0]}`
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
  const [shouldRefetchColleagues, setShouldRefetchColleagues] = useState(true)
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

    async function getColleagues() {
      try {
        const {data: { members }} = await OrganisationService.getOrganisationMembers();
        setColleagues(members)
        setShouldRefetchColleagues(false)
      } catch(e) {
        console.error(e)
      }
    }
    if (shouldRefetchColleagues) {
      getColleagues();
    }
  }, [shouldRefetch, shouldRefetchColleagues])

  const [editableIndex, setEditableIndex] = useState(null);

  const handleTodoClick = (index) => {
    setEditableIndex(index);
  };

  const handleEnter = async (event, index, selectedTodoId) => {
    if (selectedTodoId) {
      setSelectedTodo(selectedTodoId)
    }    
    if (event.key === 'Enter' && !showColleaguesOverlay) {
      try {
        if (newTodo) {
          addTodo()
        } else {
          updateReminder(todos[index], index)
        }
      } catch (e) {
        console.error(e)
      }
    } else if (event.key === '@') {
      const inputElement = event.target;
      const rect = inputElement.getBoundingClientRect();

      setColleaguesOverlayPosition({ left: rect.left, top: rect.top + rect.height });
      setShouldRefetchColleagues(true) 

      overlayPanel.current.toggle(event)
    } else {
      overlayPanel.current.to = null
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
            <div className="flex flex-end text-right">
            <Button
                loading={isLoading && selectedTodo === todo.id}
                size='small'
                icon="pi pi-trash"
                className="p-button-danger text-right border-none"
                style={{ border: 'none', paddingRight: '0px'}}
                text severity="danger"
                onClick={() => removeTodo(todo.id)}
              />
              <Button
                loading={tagUserIsLoading}
                size='small'
                icon="pi pi-user-plus"
                className="text-right border-none"
                style={{ border: 'none', paddingLeft: '0px'}}
                text
                disabled={availableColleagues(colleagues, todo.id).length === 0}
                onClick={(e) => handleEnter({...e, key: '@'}, null, todo.id)}
              />
            </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  async function addColleagueToReminder(colleague, todoId) {
    try {
      setTagUserIsLoading(true)
      const todo = todos.filter(todo => todo.id === todoId)[0]
      
      const currentTags = todo && todo && todo.taggedUsers ? todo?.taggedUsers.map(taggedUser => taggedUser.id) : []
      if (!currentTags.includes(todo.id)) {
        await DashboardService.updateReminder(selectedTodo, {
          tags: [...currentTags, colleague.id]
        })
  
        setTagUserIsLoading(false)
        setShouldRefetch(true)
        overlayPanel.current.toggle(null)
      }
    } catch (e) {
      overlayPanel.current.toggle({})
      console.error(`Exception when adding ${colleague.id} to toDo ${todoId}, e: ${e}`)
    }
  }

  function availableColleagues(colleagues, selectedTodoId) {
    if (!selectedTodoId) return colleagues
    const todo = todos.filter(todo => todo && todo.id === selectedTodoId)[0]
    const todoTags = todo?.taggedUsers.map(taggedUser => taggedUser.id) ?? []

    return colleagues.filter(colleague => todoTags.indexOf(colleague.id) === -1)
  }

  return (
    <div className='w-full w-20rem' >
      <h3>Reminders</h3>
      <div className="p-inputgroup text-sm">
        <InputText
          onKeyUp={(event) => handleEnter(event, null)}
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
      <OverlayPanel
        dismissable={true}
        ref={overlayPanel}
        onHide={() => setShowColleaguesOverlay(false)}
        position={colleaguesOverlayPosition}
      >
        {/* Your list of colleagues goes here */}
        <ul className='p-list-unstyled w-15rem'>
          {availableColleagues(colleagues, selectedTodo).map((colleague, index) => (
            <li key={index} className="my-2 p-cursor-pointer colleague-item w-full" onClick={() => addColleagueToReminder(colleague, selectedTodo)}>
              <div className="gap-2 flex flex-row p-align-center">
                <Avatar
                  className="p-mr-2"
                  label={colleague.firstName.charAt(0)}
                  shape="circle"
                  size="small"
                />
                <div>
                  <span>{colleague.firstName}</span>
                  <br />
                  <span className="p-text-secondary" style={{fontSize: '8pt'}}>{colleague.role}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </OverlayPanel>
    </div>
  );
};

export default RemindersList;
