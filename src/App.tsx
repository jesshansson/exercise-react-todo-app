import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState<string>(""); //The input field
  const [todoList, setTodoList] = useState<{ text: string; isDone: boolean }[]>([
    { text: "Buy cat food", isDone: false },
    { text: "Buy cat", isDone: false },
  ]); // The list of to-dos

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo.trim() !== "") {
      //Controlling if the input field is empty ("trim" removes extra blank spaces)
      setTodoList([...todoList, { text: todo, isDone: false }]); // Creates a new array includning old to-tos "(...todoList)" and the new added. All initially marked as not done. setTodoList updates the todoList with the new todo.
      setTodo(""); // Clear the input field
    }
  };

  const markAsDone = (index: number) => {
    //index = a number saying which task to mark
    const newTodoList = [...todoList]; //Creates a copy of the todoList to avoid changning the state
    newTodoList[index].isDone = !newTodoList[index].isDone; // Switch isDone - mark as done or not done
    setTodoList(newTodoList); // Update the todoList with the new list, having changed the isDone-value for a specific task
  };

  const removeTodo = (index: number) => {
    const newTodoList = [...todoList]; // Creates a copy of the todoList to avoid changning the state
    newTodoList.splice(index, 1); // Remove (splice) the element at a specific index
    setTodoList(newTodoList); // Update the state with the new list
  };

  const removeAllTodos = () => {
    setTodoList([]);
  };

  const markAllDone = () => {
    const newTodoList = todoList.map((todo) => {
      return { ...todo, isDone: true }; //Maps through the todoList and makes isDone true
    });
    setTodoList(newTodoList);
  };

  return (
    <>
      <section className="todo-container">
        <h1>To-do list</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => {
              setTodo(event.target.value);
            }}
            value={todo} // Connecting the input to todo-state
            type="text"
            className="todo-input"
            placeholder="Add to-do"
          />
          <button type="submit">Add</button>
          <button className="mark-all-done-btn" onClick={markAllDone}>
            Mark All Done
          </button>
          <button className="remove-all-btn" onClick={removeAllTodos}>
            Remove all
          </button>
        </form>
        <ul>
          {todoList.map((todo, i) => (
            <li key={i} className="todo-item">
              <span className={todo.isDone ? "todo-text done" : "todo-text"}>{todo.text}</span>{" "}
              <div className="buttons">
                <button className="done-btn" onClick={() => markAsDone(i)}>
                  Done
                </button>
                <button className="remove-btn" onClick={() => removeTodo(i)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
