import { Todo } from '../../interfaces/types';

interface FormProps {
  handleCompleteTodo: (id: string) => void;
  deleteTodo:(id: string)=> void
  todos:Todo[]
}

export const Todos = ({todos,handleCompleteTodo,deleteTodo}:FormProps) => {
  

  return (
    <ul className="mt-10">
      {todos.map((todo:Todo) => (
        <li
          key={todo.id }
          className={`bg-white shadow-md rounded-lg p-4 hover:bg-blue-50 transition duration-200 flex items-center justify-between my-2 `}
        >
          <span className={` ${todo.completed && "opacity-50 line-through"}`}>{todo.title}</span>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onClick={()=>handleCompleteTodo(todo.id)}
            />
            <button 
            onClick={()=>deleteTodo(todo.id)}
            className="text-red-600 hover:text-red-800 transition duration-200">
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
