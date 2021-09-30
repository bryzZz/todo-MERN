import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import {ReactComponent as ReactPlus} from '../plus.svg';
import {ReactComponent as StarIcon} from './216411_star_icon.svg';
import {ReactComponent as TrashIcon} from '../trashCan.svg';
import './styles.css';

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
        try {
            await request('/api/todo/delete/' + id, 'DELETE');
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {}
    }, [request, todos]);

    const handleStar = useCallback(async (id) => {
        try {
            await request('/api/todo/star/' + id, 'POST');
            const newTodos = [...todos];
            const index = newTodos.findIndex(item => item._id === id);
            newTodos[index].starred = !todos[index].starred;
            setTodos(newTodos);
        } catch (error) {}
    }, [request, todos]);

    const handleComplite = useCallback(async (id) => {
        try {
            await request('/api/todo/complite/' + id, 'POST');
            const newTodos = [...todos];
            const index = newTodos.findIndex(item => item._id === id);
            newTodos[index].complited = !todos[index].complited;
            setTodos(newTodos);
        } catch (error) {}
    }, [request, todos]);

    const onAddTodo = useCallback(async (text) => {
        try {
            const data = await request('/api/todo/create', 'POST', { text }, { ListId: listId });
            setTodos([...todos, data.todo]);
        } catch (error) {}
    }, [request, todos, listId]);

    const handelKeyPress = e => {
        if(e.key === 'Enter' && inputValue !== ''){
            onAddTodo(inputValue);
            setInputValue('');
        }
    };

    const handelClickAdd = () => {
        if(inputValue !== ''){
            onAddTodo(inputValue);
            setInputValue('');
        }
    };

    useEffect(() => {
        fetchListTodos();
    }, [fetchListTodos]);

    return (
        <div className="todoList">
            <div className="todoList__input-container">
                    <ReactPlus className="todoList__input-add" onClick={ handelClickAdd } />
                    <input
                        type="text"
                        className="todoList__input"
                        placeholder='Add new list'
                        value={ inputValue }
                        onChange={ e => {setInputValue(e.target.value)} }
                        onKeyPress={ handelKeyPress }
                    />
                </div>
            {
                todos.map(todo => {
                    return (
                        <div
                            className="todoItem"
                            key={ todo._id }>
                            <div className="round">
                                <input
                                    type="checkbox"
                                    id="checkbox"
                                    onChange={ () => handleComplite(todo._id) }
                                    checked={ todo.complited }
                                />
                                <label htmlFor="checkbox"></label>
                            </div>
                            <span className={`todoItem__text${todo.complited ? ' complited' : ''}`}>
                                { todo.text }
                            </span>
                            <div className="buttons">
                                <StarIcon
                                    className={`todoItem__star${todo.starred ? ' active' : ''}`}
                                    onClick={ () => handleStar(todo._id) } />
                                <TrashIcon className="todoItem__delete" onClick={ () => handleDelete(todo._id) } />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
