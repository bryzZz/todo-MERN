import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function SideBar({items, onAdd, onDelete, onClick, currentListIndex}) {
    const [inputValue, setInputValue] = useState('');
    let { url } = useRouteMatch();

    const handelKeyPress = e => {
        if(e.key === 'Enter' && inputValue !== ''){
            onAdd(e.target.value);
            setInputValue('');
        }
    };

    return (
        <div className="sidebar">
            <div className="list-group" style={{borderRadius: '0'}}>
                {
                    items.map((list, index) => {
                        return (
                            <div className="d-flex">
                                <Link
                                    key={ list._id }
                                    to={`${url}/${list._id}`}
                                    className={`list-group-item list-group-item-action${(index === currentListIndex) ? ' active' : ''}`}
                                    onClick={() => {onClick(index)}}
                                    aria-current={(index === currentListIndex)}
                                >{ list.name }</Link>
                                <button onClick={e => onDelete(list._id)} className="btn btn-outline-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#fff" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
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
            </div>
        </div>
    )
}
