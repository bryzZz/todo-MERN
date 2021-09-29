import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';

export default function List() {
    let { listId } = useParams();
    const { request } = useHttp();
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchListTodos = useCallback(async (index) => {
        try {
            const fetchedTodos = await request('/api/todo', 'GET', null, { ListId: listId });
            setTodos(fetchedTodos);
        } catch (error) {}
    }, [ request, listId ]);

    const handleDelete = useCallback(async (id) => {
        await request('/api/todo/' + id, 'DELETE');
        setTodos(todos.filter(todo => todo._id !== id));
    }, [request, todos]);

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
                        <div
                            className="todoItem d-flex align-items-center justify-content-between border-bottom p-1"
                            key={ todo._id }>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            { todo.text }
                            <div className="buttons">
                                <button className="btn btn-outline-warning btn-sm">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                    </svg> */}
                                    star
                                </button>
                                <button
                                    className="btn btn-outline-danger ms-2 btn-sm"
                                    onClick={e => handleDelete(todo._id)}
                                >
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#fff" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg> */}
                                    delete
                                </button>
                            </div>
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
