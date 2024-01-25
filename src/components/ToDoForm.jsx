import React, { useContext, useState } from "react";
import { useToDo } from "../context/ToDoContext";

const ToDoForm = () => {
  const [todo, SetTodo] = useState("");

  const { addToDo } = useToDo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addToDo({ todo: todo, completed: false });
    SetTodo("");
  };

  return (
    <div>
      <form onSubmit={add} className="flex shadow-md ">
        <input
          type="text"
          className="w-full h-12 outline-none  bg-transparent border border-black rounded-l-xl text-center"
          placeholder="Write something..."
          value={todo}
          onChange={(e) => SetTodo(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#14c50e86] rounded-r-xl px-8 hover:bg-[#30c22bc3] active:bg-[#a9eba8] active:text-[#217829] duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
