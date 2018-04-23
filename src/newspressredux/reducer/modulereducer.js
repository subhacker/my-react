
function moduleReducer(state={},action){
    console.log('state的最初的状态')
    console.log(state)

    if(action.type==='ADD_NEW_MODULE'){
        console.log('正在进行moduleReducer更新ADD_NEW_MODULE')
        let newModuleList=state.moduleInfo.slice();
        let obj={
            moduleIndex:action.info.index,
            moduleName:action.info.name,
            moduleId:Date.now()
        };
        newModuleList.push(obj)
        return{
            moduleInfo:newModuleList
        }
    }

    if(action.type==='REVISE_MODULE'){
        console.log('revise_module更新')
        let newModuleName=action.info.reviseName;
        let index=action.info.index;
        let newModuleIndex=action.info.reviseIndex;
        let newModuleList=state.moduleInfo.slice();
        let moduleId=newModuleList[index].moduleId;
        let newModuleObj={
            moduleId:moduleId,
            moduleName:newModuleName,
            moduleIndex:newModuleIndex
        }
        newModuleList.splice(index,1,newModuleObj);
        return{
            moduleInfo:newModuleList
        }
    }

    if(action.type==='DELETE_MODULE'){
        console.log('dleteModule更新')
        let index=action.info;
        let newModuleList=state.moduleInfo.slice();
        newModuleList.splice(index,1);
        return{
            moduleInfo:newModuleList
        }
    }

    if(action.type==='RECEIVE_MODULE'){
        return {
            moduleInfo:action.data
        }

    }

    return state

}
export default moduleReducer;

export function updateModuleList(data) {
    return dispatch=>{
        return fetch('/news-ajax/api/revise-module.php',data)
            .then(response=>dispatch(fetchModuleList()))
    }

}


 export function fetchModuleList() {
    return dispatch => {

        console.log('fetch moduleList')
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
