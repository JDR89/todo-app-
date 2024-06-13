import { ChangeEvent, FC, FormEvent, useState } from "react"
import { Todo } from "../../interfaces/types"
import { toast } from "sonner";

interface FormProps {
  handleAddTodo: (newTodo: Todo) => void;
}

export const Form: FC<FormProps> = ({handleAddTodo}: FormProps) => {

  

  const [newTodo, setNewTodo] = useState<Todo>({
    id:Math.floor(Math.random() * 10000).toString(),
    title:'',
    completed:false,
    
  })

  const onChange=(event: ChangeEvent<HTMLInputElement>)=>{
    const {value}=event.target

    setNewTodo({
      ...newTodo,
      title:value
    })
  }

  const onSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

      if(newTodo.title.trim().length === 0)return

    handleAddTodo(newTodo);
    toast.success('Todo agregado')
    setNewTodo({
      id: Math.floor(Math.random() * 10000).toString(),
      title: '',
      completed: false,
    });
  }


  return (
    <form onSubmit={onSubmit} className="w-full">
      <input
      className="w-full px-6 rounded-md bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 h-10"
      type="text"
      placeholder="Añade nueva tarea"
      onChange={onChange}
      value={newTodo.title}
      />
      


    </form>
  )
}
