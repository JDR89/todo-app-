import { Todo } from "../interfaces/types";



// const URL_BASE = "http://18.219.160.0:8080/tasks"; // aws
const URL_BASE = "http://localhost:4000/todos";

// Defaul headers for fetch
const defaultHeaders = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

// Error class for http
class HttpError extends Error {
    response: Response;

    constructor(response: Response) {
        super(`Http Error: ${response.statusText}`);
        this.response = response;
    }
}

function handleResponse(response: Response) {
    if (!response.ok) {
        throw new HttpError(response);
    }

    return response.json();
}

export async function getTodos(){
    const response = await fetch(URL_BASE,{
        method:"GET",
        headers:defaultHeaders
    })

    return handleResponse(response)
}

export async function addTodo(todo:Todo){
    const response = await fetch(URL_BASE,{
        method:"POST",
        headers:defaultHeaders,
        body: JSON.stringify(todo)
    })

    return handleResponse(response)
}

export async function updateTodo(todo:Todo) {
	const response = await fetch(`${URL_BASE}/${todo.id}`, {
		method: "PUT",
		headers: defaultHeaders,
		body: JSON.stringify(todo),
	})

	return handleResponse(response);
}

export async function deleteSelectedTodo(id: string){
    const response = await fetch(`${URL_BASE}/${id}`,{
        method:"DELETE",
        headers:defaultHeaders
    })
    return handleResponse(response)
}