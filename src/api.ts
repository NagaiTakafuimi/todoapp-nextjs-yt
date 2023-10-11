import { Task } from "./types";

export const getAllTodos = async (): Promise<Task[]> => {
    const res = await fetch(`http://localhost:3005/tasks`, {
        cache: "no-store", //SSR or CSR（クライアントサイドレンダリング、useEffectでフェッチ）
    });
    const todos = res.json();

    return todos;
};

export const addTodo = async (todo: Task): Promise<Task> => {
    const res = await fetch(`http://localhost:3005/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const newTodo = res.json();

    return newTodo;
};

export const updateTodo = async (
    id: string,
    newText: string
    ): Promise<Task> => {
    const res = await fetch(`http://localhost:3005/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
    });
    const updatedTodo = res.json();

    return updatedTodo;
};

export const deleteTodo = async (id: string ): Promise<Task> => {
    const res = await fetch(`http://localhost:3005/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const deleteTodo = res.json();

    return deleteTodo;
};