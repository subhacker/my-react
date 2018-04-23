
import React, { Component } from 'react'
import {connect} from 'react-redux'
class Page1 extends Component{
    render(){
        return(
            <div>
                <h1>内部标题</h1>
                <h2>{this.props.p1}</h2>
            </div>
        )
    }

}

const mapStateToProps=state=>{
    console.log('state的值')
    console.log(state);
    return{
        p1:state.moduleReducer.page1
    }

};
let ConnectPage1=connect(mapStateToProps)(Page1)

export default ConnectPage1;