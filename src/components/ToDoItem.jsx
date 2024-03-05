import React, { useState } from "react";
import { useToDo } from "../context/ToDoContext";

const ToDoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  //   console.log(todoMsg)
  const { updateToDo, deleteToDo, toggleComplete } = useToDo();

  const editTodo = () => {
    updateToDo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    //console.log(todo.id);
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`my-6 w-full flex items-center shadow-md h-12 ${todo.completed ? "bg-[#ffffff10]" : "bg-[#00ff0d29]"} rounded-xl`}
    >
      <input
        type="checkbox"
        className=" cursor-pointer  "
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`bg-transparent rounded-md grow mx-2 py-1 pl-1  text-lg outline-none ${isTodoEditable ? "border" : ""} ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <div className="flex pr-3 gap-2  ">
        <button
          className="disabled:opacity-50  "
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? "✅" : "✏️"}{" "}
        </button>
        <button onClick={() => deleteToDo(todo.id)}>❌</button>
      </div>
    </div>
  );
};

export default ToDoItem;
