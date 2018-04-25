import React, { Component } from 'react'
import './ManageModule.css'
import {connect} from 'react-redux'
import {fetchModuleList,updateModuleList,deleteModuleList} from './reducer/modulereducer'
class ManageModule extends Component{
    constructor(props){
        super(props)
        this.onRevise=this.onRevise.bind(this);
        this.onRenderIndexChange=this.onRenderIndexChange.bind(this)
        this.onRenderNameChange=this.onRenderNameChange.bind(this)
        this.state={
            reviseId:null,
            reviseName:'',
            reviseIndex:''
        }
    }


    componentDidMount(){
        console.log('生命周期回调')
        const {getModuleList} =this.props;
        getModuleList();

    }

    onRevise(ev){
        let job=ev.target.dataset.job;
        console.log(this.props)

        if(job=='revise'){
            const {onModuleFreeze,onModuleReviseaa,onModuleDelete}=this.props;
            const {onModuleListUpdate}=this.props;
            let {moduleInfo}=this.props;
            let reviseId=ev.target.parentElement.id;
            let index;

            for(index=0;index<moduleInfo.length;index++){
                if(moduleInfo[index].moduleId==reviseId){
                    break;
                }
            }
            if(!this.state.reviseId){
            let reviseName=moduleInfo[index].moduleName;
            let reviseIndex=moduleInfo[index].moduleIndex;
            let reviseModuleId=moduleInfo[index].moduleId;
            this.setState({
                reviseId:reviseId,
                reviseIndex:reviseIndex,
                reviseName:reviseName
            })
               ev.target.innerHTML='保存'

            }else{
                let reviseObj={
                    reviseModuleId:reviseId,
                    newModuleName:this.state.reviseName,
                    newModuleIndex:this.state.reviseIndex
                }
                const{onModuleListUpdate}=this.props;
                onModuleListUpdate(reviseObj)
                ev.target.innerHTML='修改';
                this.setState({
                    reviseId:null
                });
            }
        }

        if(job=='delete'){
            console.log('delete in ')
            const {onModuleDelete}=this.props;
            let {moduleInfo}=this.props;
            let reviseId=ev.target.parentElement.id;
            let deleteIndex;
            for(deleteIndex=0;deleteIndex<moduleInfo.length;deleteIndex++){
                if(moduleInfo[deleteIndex].moduleId==reviseId){
                    break;
                }
            }
            console.log(deleteIndex);

            const{onDeleteModuleList}=this.props;
            onDeleteModuleList({deleteId:reviseId});
           // onModuleDelete(deleteIndex)
        }

        if(job=='freeze'){
            console.log('暂时未添加')
            /**
             * 添加freeze需要指定新的字段，同时的需要的解禁用的操作，
             * block字段，禁用之后的逻辑？添加新闻的时候，模块的选择中并无该禁用字段
             * 修改新闻中也并无该字段，在新闻管理中也并无该字段
             */

        }

    }



    onRenderNameChange(ev){
        this.setState({
            reviseName:ev.target.value
        })
    }
    onRenderIndexChange(ev){
        this.setState({
            reviseIndex:ev.target.value
        })
    }


    render(){
        let {moduleInfo}=this.props;
        moduleInfo=moduleInfo||[];
        return(
            <div id='manage-module'>
                <h3>管理界面</h3>
                <div  onClick={this.onRevise} className='container'>
                   <div id='header-title'  className='row'>
                       <div className='col-md-2'>
                           <span>名称</span>
                       </div>
                       <div className='col-md-2'>
                           <span>序号</span>
                       </div>
                       <div className='col-md-4'>
                           <span>操作</span>
                       </div>
                   </div>
                       {
                           moduleInfo.map(function (item,index,arr) {
                               let renderName;
                               let renderIndex;
                               if(this.state.reviseId==item.moduleId){
                                   renderName=<input type='text' value={this.state.reviseName} onChange={this.onRenderNameChange}/>
                                   renderIndex=<input type='number' value={this.state.reviseIndex} onChange={this.onRenderIndexChange}/>

                               }else{
                                   renderName=<span>{item.moduleName}</span>
                                   renderIndex=<span>{item.moduleIndex}</span>
                               }
                               return(
                                   <div key={index} className='row'>
                                       <div className='col-md-2'>
                                           {renderName}
                                       </div>
                                       <div className='col-md-2'>
                                           {renderIndex}
                                       </div>
                                       <div id={item.moduleId} className='col-md-4'>
                                           <button data-job="revise" className='btn btn-default btn-sm'>修改</button>
                                           <button data-job="freeze" className='btn btn-default btn-sm'>冻结</button>
                                           <button data-job="delete" className='btn btn-default btn-sm'>删除</button>
                                       </div>
                                   </div>

                               )

                           }.bind(this))
                       }

                </div>
            </div>
        )



    }

}

const mapStateToProps=state=>{
    console.log('ManageModule中的State的初始值');
    console.log(state)
    return{
        moduleInfo:state.moduleReducer.moduleInfo
    }
}

const mapDisPatchToProps=dispatch=>{
    return{
        onModuleFreeze:()=>{},
        onModuleReviseaa:(reviseModuleInfo)=>{
            dispatch({
                type:"REVISE_MODULE",
                info:reviseModuleInfo
            })
        },
        onModuleDelete:(deleteIndex)=>{
            dispatch({
                type:'DELETE_MODULE',
                info:deleteIndex
            })
        },
        onModuleListUpdate:(data)=>{
            dispatch(updateModuleList(data))

        },
        getModuleList:()=>{
            console.log('getModuleslit mangge')
            dispatch(fetchModuleList())
        },
        onDeleteModuleList:(data)=>{
            dispatch(deleteModuleList(data))
        }

    }
}

let ConnectManageModule=connect(mapStateToProps,mapDisPatchToProps)(ManageModule)

export default ConnectManageModule;