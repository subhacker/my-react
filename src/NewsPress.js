import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,

} from 'react-router-dom'
import './NewPress.css';
import AddModule from './newpress/AddModule'
import AddNews from './newpress/AddNews'
import ManageNews from './newpress/ManageNews'
import ReviseNews from './newpress/ReviseNews'
import ManageModule from "./newpress/ManageModule";

class NewsPressRedux extends  Component{
    constructor(props){
        super(props);

        let header=[
            {
                name:'序号',
                classPros:'index'
            },
            {
                name:'标题',
                classPros:'title'
            },
            {
                name:'模块',
                classPros:'module'
            },
            {
                name:'作者',
                classPros:'author'

            },
            {
                name:'创建时间',
                classPros:'time'
            },
            {
                name:'浏览次数',
                classPros:'times'
            },
            {
                name:'操作',
                classPros:'operate'
            }
        ];
        let data=[

            {
                newsId:123,
                title:'react入门',
                module:'react',
                author:'hans',
                time:'2018-2-23 12:43:45',
                visitTime:43,
                newsContent:'React Redux Router'
            }


        ];

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
        ]
        /**
         *
         * 初始化数据的导入，后续改成用Fetch、Ajax引入
         *
         */

        console.log(moduleInfo);
        this.onAddNewModule=this.onAddNewModule.bind(this);
        this.onAddNewNews=this.onAddNewNews.bind(this);
        this.onNewsRevise=this.onNewsRevise.bind(this);
        this.onNewsDelete=this.onNewsDelete.bind(this);
        this.onModuleDelete=this.onModuleDelete.bind(this);
        this.onModuleFreeze=this.onModuleFreeze.bind(this);
        this.onModuleReviseaa=this.onModuleReviseaa.bind(this)

        let iniStr=localStorage.getItem('initData');
        console.log(iniStr)
        if(!iniStr) {
            this.state = {
                moduleInfo: moduleInfo,
                header: header,
                data: data,
                name: 'hans',
                onAddNewModule: this.onAddNewModule,
                onAddNewNews: this.onAddNewNews,
                onNewsRevise: this.onNewsRevise,
                onNewsDelete: this.onNewsDelete,
                reviseNewsId: null,
                onModuleDelete:this.onModuleDelete,
                onModuleFreeze:this.onModuleFreeze,
                onModuleReviseaa:this.onModuleReviseaa
            }
        }else{
             let initData=JSON.parse(iniStr);
            this.state = {
                moduleInfo: initData.moduleInfo,
                header: initData.header,
                data: initData.data,
                name: 'hans',
                onAddNewModule: this.onAddNewModule,
                onAddNewNews: this.onAddNewNews,
                onNewsRevise: this.onNewsRevise,
                onNewsDelete: this.onNewsDelete,
                reviseNewsId: null,
            }

        }

    }

    onAddNewModule(moduleInfo){
        let obj={
            moduleIndex:moduleInfo.index,
            moduleName:moduleInfo.name,
            moduleId:Date.now()
        }
        let moduleList=this.state.moduleInfo.slice();
        moduleList.push(obj)
        this.setState({
            moduleInfo:moduleList
        })
    }

    onAddNewNews(newsInfo){
        let newsList=this.state.data.slice();
        newsList.push(newsInfo);
        this.setState({
            data:newsList
        })

    }

    onNewsRevise(newsObj){
       let newsIndex=newsObj.newsIndex;

        let reviseNewsObj={
            newsId:this.state.data[newsIndex].newsId,
            title:newsObj.title,
            module:newsObj.module,
            author:this.state.data[newsIndex].author,
            time:this.state.data[newsIndex].time,
            visitTime:this.state.data[newsIndex].visitTime,
            newsContent:newsObj.newsContent

        }
        let newsList=this.state.data.slice();
        newsList[newsIndex]=reviseNewsObj;
        this.setState({
            data:newsList
        })

    }
    onNewsDelete(newsId){
        let deleteNewsId=newsId
        let deleteNewsList=this.state.data.slice();
        let i;
        for(i=0;i<deleteNewsList.length;i++){
            if(deleteNewsList[i].newsId==newsId)
                break;
        }
        deleteNewsList.splice(i,1);
        this.setState({
            data:deleteNewsList
        });
    }

    onModuleReviseaa(moduleObj){
        let index=moduleObj.index;
       let newModuleList=this.state.moduleInfo.slice();
       let moduleItem={
           moduleIndex:moduleObj.reviseIndex,
           moduleName:moduleObj.reviseName,
           moduleId:this.state.moduleInfo[index].moduleId
       }
       newModuleList.splice(index,1,moduleItem)

        this.setState({
            moduleInfo:newModuleList
        })

    }
    onModuleFreeze(){

    }

    onModuleDelete(deleteIndex){
        let deleteModuleList=this.state.moduleInfo.slice();
        deleteModuleList.splice(deleteIndex,1);
        this.setState({
            moduleInfo:deleteModuleList
        })

    }

    componentDidMount(){
        console.log('生命周期初始化')
    }

    componentWillUnmount() {
        console.log('卸载');
    }

    render(){
        return(
            <Router>
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
                            <Switch>
                                <Route path='/' exact component={Home}/>
                                <Route
                                    path='/add-module'
                                    render={()=>(<AddModule {...this.state}/>)}
                                />
                                <Route
                                    path='/manage-module'
                                    render={()=>(<ManageModule {...this.state}/>)}/>
                                <Route
                                    path='/add-news'
                                    render={()=>(<AddNews {...this.state}/>)}
                                />
                                <Route
                                    path='/manage-news'
                                    render={()=>{
                                        return(<ManageNews {...this.state}/>)}}
                                />
                                <Route
                                    path='/revise-news/:id'
                                    render={(match)=>(<ReviseNews {...match}  {...this.state}/>)}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }

}

export  default  NewsPressRedux

const Home = () => (
    <div>
        <h2>首页</h2>
    </div>
)