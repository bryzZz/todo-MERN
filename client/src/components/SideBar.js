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
                            <Link
                                key={ list._id }
                                to={`${url}/${list._id}`}
                                className={`list-group-item list-group-item-action${(index === currentListIndex) ? ' active' : ''}`}
                                onClick={() => {onClick(index)}}
                                aria-current={(index === currentListIndex)}
                            >{ list.name }</Link>
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
