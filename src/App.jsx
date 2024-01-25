import { useEffect, useState } from "react";
import ToDoForm from "./components/ToDoForm";
import ToDoItem from "./components/ToDoItem";
import { ToDoProvider } from "./context/ToDoContext";

function App() {
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <ToDoProvider
        value={{ todos, addToDo, updateToDo, deleteToDo, toggleComplete }}
      >
        <div className="bg-[#363636] flex justify-center w-full h-screen text-[#d7d7d7]">
          <div className="w-11/12 lg:w-3/4 flex flex-col items-center">
            <h1 className="text-[#36c032] font-bold text-2xl text-center py-4 pt-8 ">
              Write Your ToDo's
            </h1>
            <div className="py-4 w-full">
              <ToDoForm />
            </div>
            <div className="w-full py-2 overflow-y-auto ">
              {todos.map((todo) => (
                <div key={todo.id}>
                  <ToDoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ToDoProvider>
    </>
  );
}

export default App;
