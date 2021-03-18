import styled from 'styled-components';

const TodoContent = styled.div`
  color: black;
  font-size: 20px;
  ${(props) => props.$isDone && 'text-decoration: line-through; '}
`;

const TodoButtonWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.1s ease-in;
`;

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 0px solid black;

  &:hover ${TodoButtonWrapper} {
    opacity: 1;
  }

  & + & {
    border-top: 1px solid #d2d2d2;
  }
`;

const Button = styled.button`
  padding: 10px 10px;
  color: #6b6b6b;
  background-color: white;
  border: 1px solid #d2d2d2;
  border-radius: 6px;
  box-shadow: 1px 2px 2px #808080c9;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  & + & {
    margin-left: 4px;
  }
`;

function TodoItem({ todo, handleDeleteTodo, handleToggleIsDone }) {
  return (
    <TodoItemWrapper data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <Button
          onClick={() => {
            handleToggleIsDone(todo.id);
          }}
        >
          {todo.isDone ? '未完成' : '已完成'}
        </Button>
        <Button
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          刪除
        </Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

export { TodoItem, Button };
