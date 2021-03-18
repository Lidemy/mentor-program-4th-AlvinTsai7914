import './App.css';
import { TodoItem, Button } from './TodoItem';
import { useState } from 'react';
import styled from 'styled-components';

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 100px 200px;
`;

const TodoItemsWrapper = styled.div`
  border: 1px solid #d2d2d2;
  border-radius: 12px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;
`;
const Title = styled.h1`
  margin: 0;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 50%;
  font-size: 20px;
  border: 1px solid #d2d2d2;
`;

let id = 1;
function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('all');
  const handleButtonClick = (e) => {
    console.log(todos);
    if (value === '') {
      alert('請填寫待辦事項');
      return;
    }
    setTodos([{ id, content: value, isDone: false }, ...todos]);
    setValue('');
    id++;
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleChangeFilter = (filter) => {
    console.log(filter);
    setFilter(filter);
  };

  const handleClearTodos = () => {
    setTodos([]);
  };

  return (
    <TodoWrapper className="App">
      <Title>Todo List</Title>
      <div>
        <Input type="text" placeholder="todo" value={value} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button
          onClick={(e) => {
            handleButtonClick(e);
          }}
        >
          Add
        </Button>
      </div>
      <FilterWrapper>
        <Button
          onClick={() => {
            handleChangeFilter('all');
          }}
        >
          全部
        </Button>
        <Button
          onClick={() => {
            handleChangeFilter('isDone');
          }}
        >
          已完成
        </Button>
        <Button
          onClick={() => {
            handleChangeFilter('unDone');
          }}
        >
          未完成
        </Button>
        <Button
          onClick={() => {
            handleClearTodos();
          }}
        >
          清空
        </Button>
      </FilterWrapper>
      <TodoItemsWrapper>
        {todos
          .filter((todo) => (filter === 'isDone' ? todo.isDone : true))
          .filter((todo) => (filter === 'unDone' ? !todo.isDone : true))
          .map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleDeleteTodo={handleDeleteTodo}
                handleToggleIsDone={handleToggleIsDone}
              />
            );
          })}
      </TodoItemsWrapper>
    </TodoWrapper>
  );
}

export default App;
