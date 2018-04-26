
function moduleReducer(state={},action){

    if(action.type==='ADD_NEW_MODULE'){

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
        return $.get('/news-ajax/api/revise-module.php',data)
            .then(response=>dispatch(fetchModuleList()))
    }

}

export function deleteModuleList(data) {
    return(dispatch)=>{
        return $.get('/news-ajax/api/delete-module.php',data)
            .then(response=>dispatch(fetchModuleList()))
    }

}


 export function fetchModuleList() {
    return dispatch => {
        return fetch('/news-ajax/api/get-module-list-react.php')
            .then(response => response.json())
            .then(json => dispatch(receiveModuleList(json)))
    }
}

function receiveModuleList(data) {
    return{
        type:'RECEIVE_MODULE',
        data:data
    }
}
