import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,

} from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'

import {createStore,applyMiddleware,combineReducers} from 'redux'
import {Provider,connect } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import './NewPress.css';
import ConnectAddModule from './newspressredux/AddModule'
import ConnectAddNews from './newspressredux/AddNews'
import ConnectManageNews from './newspressredux/ManageNews'
import ConnectReviseNews from './newspressredux/ReviseNews'
import ConnectManageModule from "./newspressredux/ManageModule";
import ConnectHome from './newspressredux/Home'

import ConnectPage1 from './newspressredux/Page1'
import moduleReducer from './newspressredux/reducer/modulereducer'
import newsReducer from './newspressredux/reducer/newsreducer'
const history = createHistory()

let reducers=combineReducers({
    moduleReducer,
    newsReducer,
    routerReducer
});

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware,routerMiddleware(history)),
);

class NewPressRedux extends Component{
    render(){
        return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md-2'>
                            <ul id='leftMenu'>
                                <li><Link to='/add-module'>添加模块</Link></li>
                                <li><Link to='/manage-module'>管理模块</Link></li>
                                <li><Link to='/add-news'>添加新闻</Link></li>
                                <li><Link to='/manage-news'>管理新闻</Link></li>
                            </ul>

                        </div>

                        <div className='col-md-10'>

                            <Route path='/' exact component={ConnectHome}/>
                            <Route
                                path='/add-module'
                                render={()=>(<ConnectAddModule/>)}
                            />
                            <Route
                                path='/manage-module'
                                render={()=>(<ConnectManageModule/>)}/>
                            <Route
                                path='/add-news'
                                render={()=>(<ConnectAddNews/>)}
                            />
                            <Route
                                path='/manage-news'
                                render={()=>{
                                    return(<ConnectManageNews/>)}}
                            />
                            <Route
                                path='/revise-news/:id'
                                render={(match)=>{return(<ConnectReviseNews {...match} />)}}
                            />


                    </div>

                </div>
                </div>
                </ConnectedRouter>
            </Provider>
        )

    }

}

export default NewPressRedux;


