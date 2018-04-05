import React, { Component } from 'react'
import {connect} from 'react-redux'
import './AddModule.css'

class AddModule extends Component{
    constructor(props){
        super(props)
        this.state={
            showAddNextPage:false,
            moduleName:'',
            moduleIndex:'',
            hasRepeatName:false,
            hasRepeatIndex:false,
            dummyNameValue:false,
            dummyIndexValue:false
        };
        this.onModuleIndexInput=this.onModuleIndexInput.bind(this);
        this.onModuleNameInput=this.onModuleNameInput.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.addNext=this.addNext.bind(this)
    }

    /**
     * 实现moduleName的输入
     * @param ev
     */
    onModuleNameInput(ev){
        let value=ev.target.value;
        this.setState({
            moduleName:value
        })
    }

    /**
     * 实现moduleIndex的输入
     * @param ev
     */

    onModuleIndexInput(ev){
        this.setState({
            moduleIndex:ev.target.value
        })
    }

    /**
     * 表单提交时候的处理
     * @param ev
     */

    onSubmit(ev){
        ev.preventDefault();
        let {moduleInfo}=this.props;
        let moduleName=document.getElementById('moduleName');

        let dummyNameValue=false;
        let hasRepeatName=false;
        let dummyIndexValue=false;
        let hasRepeatIndex=false;

        if(moduleName.value){
            dummyNameValue=false;
            let RepeatNameItem=moduleInfo.some(function (item,index,arr) {
                if(item.moduleName==moduleName.value){
                    return true
                }else {
                    return false
                }
            });
            if(RepeatNameItem){
                    hasRepeatName=true
            }else{
                    hasRepeatName=false
            }
        }else{
                dummyNameValue=true
        }

        let moduleIndex=document.getElementById('moduleIndex')
        if(moduleIndex.value){
            dummyIndexValue=false
            let RepeatIndexItem=moduleInfo.some(function (item,index,arr) {
                if(item.moduleIndex==moduleIndex.value){
                    return true
                }else {
                    return false
                }
            })
           if(RepeatIndexItem){
                    hasRepeatIndex=true
            }else{
                    hasRepeatIndex=false
            }
        }else{
                dummyIndexValue=true
        }

        this.setState(
            {
                dummyNameValue,
                hasRepeatName,
                dummyIndexValue,
                hasRepeatIndex
            },
            ()=>{
                console.log('回调函数中的state');
                console.log(this.state);
                if(!(this.state.hasRepeatName||this.state.hasRepeatIndex||this.state.dummyIndexValue||this.state.dummyNameValue)){
                    let newModuleInfo={
                        name:moduleName.value,
                        index:moduleIndex.value
                    }
                    let{onAddNewModule}=this.props;
                    onAddNewModule(newModuleInfo);
                    this.setState({
                        showAddNextPage:true
                    })
                }
            }
        )
    }

    addNext(){
        this.setState({
            showAddNextPage:false,
            moduleName:'',
            moduleIndex:'',
            hasRepeatName:false,
            hasRepeatIndex:false,
            dummyNameValue:false,
            dummyIndexValue:false
        })
    }

    render(){
        return(
            <div id='add-module'>
            <div style={{display:this.state.showAddNextPage? 'none':'block'}}>
                <h3>添加模块</h3>
            <form id='form'>
                <div className="form-group">
                    <label htmlFor="moduleName">模块名称</label>
                    <input onChange={this.onModuleNameInput}  type='text' className="form-control input-sm" id="moduleName" value={this.state.moduleName}  />
                    <span style={{display:this.state.hasRepeatName?'inline':'none'}} className='err-message'>模块名称已经存在</span>
                    <span style={{display:this.state.dummyNameValue?'inline':'none'}} className='err-message'>模块名称不得为空</span>
                </div>
                <div className="form-group">
                    <label htmlFor="moduleIndex">模块序号</label>
                    <input onChange={this.onModuleIndexInput} type='number'  className="form-control input-sm" id="moduleIndex" value={this.state.moduleIndex}  />
                    <span id='hasRepeatIndexErr' style={{display:this.state.hasRepeatIndex?'inline':'none'}} className='err-message'>该序号已经存在</span>
                    <span style={{display:this.state.dummyIndexValue?'inline':'none'}} className='err-message'>序号不得为空</span>
                </div>
                <button id='add-module-button' onClick={this.onSubmit}  type="submit" className="btn btn-default">添加</button>
            </form>

            </div>
                <div id='inputInfo' style={{display:this.state.showAddNextPage? 'block':'none'}} className='container'>
                    <h3>已添加模块信息</h3>
                    <div className='row'>
                        <div className='col-md-2'>
                            <span className='moduleTip'>模块名称</span>
                        </div>
                        <div className='col-md-4'>
                            <span>{this.state.moduleName}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2'>
                            <span className='moduleTip'>模块序号</span>
                        </div>
                        <div className='col-md-2'>
                            <span>{this.state.moduleIndex}</span>
                        </div>
                    </div>
                    <button id='add-module-button-next' onClick={this.addNext} className='btn btn-primary btn-sm'>继续添加+</button>
                </div>
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
        onAddNewModule:(moduleInfo)=>{
            console.log('dispatch执行')
            dispatch(
                {
                    type:'ADD_NEW_MODULE',
                    info:moduleInfo
                }
            )
        }

    }

};

const ConnectAddModule=connect(mapStateToProps,mapDispatchToProps)(AddModule);
export default ConnectAddModule;