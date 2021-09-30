import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {ReactComponent as TrashIcon} from '../trashCan.svg';
import {ReactComponent as PlusIcon} from '../plus.svg';
import './styles.css';

export default function SideBar({items, onAdd, onDelete, onClick, currentListIndex}) {
    const [inputValue, setInputValue] = useState('');
    let { url } = useRouteMatch();

    const handelKeyPress = e => {
        if(e.key === 'Enter' && inputValue !== ''){
            onAdd(inputValue);
            setInputValue('');
        }
    };

    const handelAddClick = () => {
        if(inputValue !== ''){
            onAdd(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="Sidebar">
                {
                    items.map((list, index) => {
                        return (
                            <div className={`Sidebar__item${(index === currentListIndex) ? ' active' : ''}`} key={ list._id }>
                                <Link
                                    className="Sidebar__item-link"
                                    to={`${url}/${list._id}`}
                                    onClick={() => {onClick(index)}}
                                >{ list.name }</Link>
                                <TrashIcon className="Sidebar__item-delete" onClick={e => onDelete(list._id)} />
                            </div>
                        );
                    })
                }
                <div className="Sidebar__input-container">
                    <input
                        className="Sidebar__input"
                        type="text"
                        placeholder='Add new list'
                        value={ inputValue }
                        onChange={ e => {setInputValue(e.target.value)} }
                        onKeyPress={ handelKeyPress }
                    />
                    <PlusIcon className="Sidebar__input-add" onClick={ handelAddClick } />
                </div>
        </div>
    )
}
