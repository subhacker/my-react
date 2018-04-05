import React, { Component } from 'react'
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

    onModuleNameInput(ev){
        let value=ev.target.value;
        this.setState({
            moduleName:value
        })
        console.log(ev.target.value)
    }

    onModuleIndexInput(ev){
        console.log(ev.target.value)
        this.setState({
            moduleIndex:ev.target.value
        })
    }

    onSubmit(ev){
        ev.preventDefault();
        let {moduleInfo}=this.props;

        let moduleName=document.getElementById('moduleName');
        if(moduleName.value){
            this.setState({
                dummyNameValue:false
            })
            let hasRepeatName=moduleInfo.some(function (item,index,arr) {
                if(item.moduleName==moduleName.value){
                    return true
                }else {
                    return false
                }

            })
            if(hasRepeatName){
                this.setState({
                    hasRepeatName:true
                })
            }else{
                this.setState({
                    hasRepeatIndex:false
                })
            }
        }else{
            this.setState({
                dummyNameValue:true
            })
        }

        let moduleIndex=document.getElementById('moduleIndex')
        if(moduleIndex.value){
            this.setState({
                dummyIndexValue:false
            });
            let hasRepeatIndex=moduleInfo.some(function (item,index,arr) {
                if(item.moduleIndex==moduleIndex.value){
                    return true
                }else {
                    return false
                }
            })
            if(hasRepeatIndex){
                this.setState({
                    hasRepeatIndex:true
                })
            }else{
                this.setState({
                    hasRepeatIndex:false
                    })
            }
        }else{
            this.setState({
                dummyIndexValue:true
            })
        }

        let {onAddNewModule}=this.props;

        if(!(this.state.hasRepeatName||this.state.hasRepeatIndex||this.state.dummyIndexValue||this.state.dummyNameValue)){
            let newModuleInfo={
                name:moduleName.value,
                index:moduleIndex.value
            }

            onAddNewModule(newModuleInfo);
            this.setState({
                showAddNextPage:true
            })
        }
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

export default AddModule;