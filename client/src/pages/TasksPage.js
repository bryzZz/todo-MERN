import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import List from '../components/List';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

export default function Tasks() {
    const { path } = useRouteMatch();
    const history = useHistory();
    const [lists, setLists] = useState([]);
    const [currentListIndex, setCurrentListIndex] = useState(0);
    const { request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchLists = useCallback(async () => {
        try {
            const fetchedLists = await request('/api/todoList', 'GET', null, {Authorization: `Bearer ${token}`});
            setLists(fetchedLists);
            history.push( path + '/' + fetchedLists[currentListIndex]._id);
        } catch (error) {}
    }, [token, request, currentListIndex, history, path]);

    const onAddList = useCallback(async (name) => {
            const data = await request('/api/todoList/create', 'POST', {name}, {Authorization: `Bearer ${token}`});
            setLists([...lists, data.todoList]);
    }, [lists, request, token]);

    const onClickList = index => {
        setCurrentListIndex(index);
    }

    const onDeleteList = useCallback(async (id) => {
        await request('/api/todoList/' + id, 'DELETE', null, {Authorization: `Bearer ${token}`});
        setLists(lists.filter(list => list._id !== id));
    }, [request, token, lists]);

    useEffect(() => {
        fetchLists();
    }, [fetchLists]);

    // if(loading){
    //     return <div>Loading</div>
    // }

    return (
        <>
            <Header />
            <main>
                <div className="d-flex">
                    <div className="col-2">
                        <SideBar
                            items={ lists }
                            currentListIndex={ currentListIndex }
                            onAdd={ onAddList }
                            onClick={ onClickList }
                            onDelete={ onDeleteList }
                        />
                    </div>
                    <div className="col-2"></div>
                    <div className="col-4 mt-2">
                    <Switch>
                        <Route path={`${path}/:listId`}>
                            <List />
                        </Route>
                    </Switch>
                    </div>
                </div>
            </main>
        </>
    );
}