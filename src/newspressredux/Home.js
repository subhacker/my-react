import React, { Component } from 'react'
import {connect} from 'react-redux'



class Home extends Component{
    constructor(props){
        super(props)





    }
    componentDidMount(){
        const {getInitialModuleList}=this.props;
        getInitialModuleList();

    }

    render(){
        return(
            <div id='add-module'>
            <img src="../../img/welcome.gif"/>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        moduleInfo:state.moduleReducer.moduleInfo
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        getInitialModuleList:()=>{
            dispatch(fetchModuleList())
        }
    }

};

const ConnectHome=connect(mapStateToProps,mapDispatchToProps)(Home);
export default ConnectHome;

function fetchModuleList() {
    return dispatch => {
        return fetch('/news-ajax/api/get-module-list-react.php')
            .then(response => response.json())
            .then(json => dispatch(receiveModuleList(json)))
    }
}

function receiveModuleList(data) {
    console.log('收到的ModuleList')
    console.log(data)
    return{
        type:'RECEIVE_MODULE',
        data:data
    }
}


