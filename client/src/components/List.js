import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';

export default function List() {
    let { listId } = useParams();
    const { request, loading } = useHttp();
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchListTodos = useCallback(async (index) => {
        try {
            const fetchedTodos = await request('/api/todo', 'GET', null, { ListId: listId });
            setTodos(fetchedTodos);
        } catch (error) {}
    }, [ request, listId ]);

    const onAddTodo = useCallback(async (text) => {
        const data = await request('/api/todo/create', 'POST', { text }, { ListId: listId });
        setTodos([...todos, data.todo]);
    }, [request, todos, listId]);

    const handelKeyPress = e => {
        if(e.key === 'Enter' && inputValue !== ''){
            onAddTodo(e.target.value);
            setInputValue('');
        }
    };

    useEffect(() => {
        fetchListTodos();
    }, [fetchListTodos]);

    return (
        <>
            {
                todos.map(todo => {
                    return (
                        <div className="todoItem" key={ todo._id }>
                            { todo.text }
                        </div>
                    );
                })
            }
            <input
                type="text"
                className="form-control"
                placeholder='Add new list'
                value={ inputValue }
                onChange={ e => {setInputValue(e.target.value)} }
                onKeyPress={ handelKeyPress }
            />
        </>
    )
}
