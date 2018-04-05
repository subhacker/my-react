let moduleInfo=[
    {
        moduleIndex:1,
        moduleName:'react',
        moduleId:'15000001'

    },
    {
        moduleIndex:6,
        moduleName:'vue',
        moduleId:'15000344001'

    },
    {
        moduleIndex:5,
        moduleName:'angular',
        moduleId:'159993'

    },
    {
        moduleIndex:2,
        moduleName:'bootstrap',
        moduleId:'1500dsd0001'

    }
];
function moduleReducer(state={moduleInfo},action){
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

    return state

}
export default moduleReducer;