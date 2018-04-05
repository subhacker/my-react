import React, { Component } from 'react'
import './ReviseNews.css'
import {connect} from 'react-redux'

import {push } from 'react-router-redux';
class ReviseNews extends Component{
    constructor(props){
        super(props);
        const {newsId,data}=this.props;
        let newsIndex;
        let filterNews=data.filter(function (item,index,arr) {
            if( item.newsId==newsId){
                newsIndex=index;
                console.log(newsIndex)
                return true
            }
        });

        let newsTitle=filterNews[0].title;
        let newsContent=filterNews[0].newsContent;
        let newsOption=filterNews[0].module
        this.state={
            newsIndex:newsIndex,
            newsTitle:newsTitle,
            contentValue:newsContent,
            selectedOption:newsOption,
            dummyTitleValue:false,
            dummyOptionValue:false,
            dummyContentValue:false
        };
        this.onNewsTitleInput=this.onNewsTitleInput.bind(this);
        this.onOptionSelect=this.onOptionSelect.bind(this);
        this.onNewsContentInput=this.onNewsContentInput.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onNewsTitleInput(ev){
        let value=ev.target.value;
        this.setState({
            newsTitle:value
        })
    }

    onOptionSelect(ev){
        this.setState({
            selectedOption:ev.target.value
        })

    }

    onNewsContentInput(ev){
        console.log(ev.target.value)
        this.setState({
            contentValue:ev.target.value
        })

    }
    onSubmit(ev) {
        ev.preventDefault();
        let newsTitle=document.getElementById('newsTitle');
        let newsOption=document.getElementById('newsOption');
        let newsContent=document.getElementById('newsContent');
        let dummyTitleValue=false;
        let dummyOptionValue=false;
        let dummyContentValue=false;

        if(newsTitle.value){
                dummyTitleValue=false
        }else{
                dummyTitleValue=true
        }

        if(newsOption.value!=='none'){
                dummyOptionValue=false
        }else{
                dummyOptionValue=true
        }
        if(newsContent.value){
                dummyContentValue=false
        }else{
                dummyContentValue=true
        }

        this.setState({
            dummyTitleValue,
            dummyOptionValue,
            dummyContentValue
        },()=>{
            if(!(this.state.dummyContentValue||this.state.dummyOptionValue||this.state.dummyTitleValue)){
                const {onNewsRevise,newsId}=this.props;
                let newsObj={
                    newsIndex:this.state.newsIndex,
                    title:newsTitle.value,
                    module:newsOption.value,
                    newsContent:newsContent.value,
                    newsId:newsId
                };
                onNewsRevise(newsObj);
            }
        });

    }

    render(){
        let {moduleInfo}=this.props;
        return(
            <div>
                <div style={{display:this.state.showAddNextPage? 'none':'block'}}>
                    <h3>添加模块</h3>
                    <form id='form' className='form-horizontal'>
                        <div className="form-group">
                            <label className='col-md-2' htmlFor="newTitle">新闻标题<span className='requireDot'>*</span></label>
                            <input onChange={this.onNewsTitleInput}  type='text' className="form-control input-sm col-md-5" id="newsTitle" value={this.state.newsTitle}  />
                            <span  style={{display:this.state.dummyTitleValue?'inline':'none'}} className='err-message col-md-2'>标题不得为空</span>
                        </div>
                        <div className="form-group">
                            <label className='col-md-2' htmlFor="newsOption">模块序号<span className='requireDot'>*</span></label>
                            <select id='newsOption' value={this.state.selectedOption} onChange={this.onOptionSelect} className='form-control input-sm col-md-5'>
                                <option value='none'>请选择</option>
                                {
                                    moduleInfo.map(function (item,index) {
                                        return(
                                            <option value={item.moduleName} key={index}>{item.moduleName}</option>
                                        )
                                    })
                                }
                            </select>
                            <span style={{display:this.state.dummyOptionValue?'inline':'none'}} className='err-message col-md-2'>请指定模块</span>

                        </div>
                        <div className="form-group">
                            <label className='col-md-2' htmlFor="newsContent">新闻内容<span className='requireDot'>*</span></label>
                            <textarea rows='12' onChange={this.onNewsContentInput}  className="form-control col-md-5 " id="newsContent" value={this.state.contentValue}  ></textarea>
                            <span style={{display:this.state.dummyContentValue?'inline':'none'}} className='err-message col-md-2'>内容不能为空</span>
                        </div>
                        <button  onClick={this.onSubmit}  type="submit" className="btn btn-default btn-sm">添加</button>
                    </form>
                </div>

                <div style={{display:this.state.showAddNextPage? 'block':'none'}} className='container'>
                    <div className='row'>
                        <div className='col-md-2'><span>新闻标题</span></div>
                        <div className='col-md-6'><span>{this.state.newsTitle}</span></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2'><span>新闻模块</span></div>
                        <div className='col-md-6'><span>{this.state.selectedOption}</span></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2'><span>新闻内容</span></div>
                        <div className='col-md-6'><span>{this.state.contentValue}</span></div>
                    </div>
                    <button onClick={this.addMoreNews} className='btn btn-primary btn-sm'>继续添加新闻</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    let path=state.routerReducer.location.pathname;
    let pathArr=path.split('/');
    let newsId=pathArr[pathArr.length-1]
    return{
        newsId:parseInt(newsId),
        data:state.newsReducer.newsData,
        moduleInfo:state.moduleReducer.moduleInfo
    }
};

const mapDisPatchToProps=dispatch=>{
    return{
        onNewsRevise:(reviseNewsObj)=>{
            dispatch({
                type:'REVISE_NEWS',
                info:reviseNewsObj
            });
            dispatch(push('/manage-news'))
        }

    }
};

let ConnectReviseNews=connect(mapStateToProps,mapDisPatchToProps)(ReviseNews);

export default ConnectReviseNews;