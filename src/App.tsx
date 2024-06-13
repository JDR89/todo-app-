import { useEffect, useState } from "react";
import { Form } from "./components/form";
import { Todos } from "./components/todos/Todos";
import { Todo } from "./interfaces/types";
import {
  addTodo,
  deleteSelectedTodo,
  getTodos,
  updateTodo,
} from "./services/http";
import { Toaster, toast } from "sonner";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = async (newTodo: Todo): Promise<void> => {
    const addedTodo = await addTodo(newTodo);

    setTodos((prevTodos) => [...prevTodos, addedTodo]);
  };

  const handleCompleteTodo = async (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    const todoChanged = newTodos.find((e) => e.id === id);
    if (todoChanged) {
      await updateTodo(todoChanged);
    } else {
      console.error(`Todo with id ${id} not found.`);
    }

    setTodos(newTodos);
  };

  const deleteTodo = async (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    const selectedTodo = todos.find((todo) => todo.id === id);
    if(selectedTodo){
      await deleteSelectedTodo(selectedTodo.id);
      toast.info("Todo eliminado")
    }else{
      console.error(`Todo with id ${id} not found.`);
    }
   
    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  return (
    <div className="flex flex-col justify-center mx-2 md:mx-[400px] mt-10">
      <Toaster />
      <h1 className="flex justify-center">Todo App</h1>
      <Form handleAddTodo={handleAddTodo} />
      <Todos
        deleteTodo={deleteTodo}
        handleCompleteTodo={handleCompleteTodo}
        todos={todos}
      />
    </div>
  );
}

export default App;
