import React, { Component } from 'react'
import './AddNews.css'
import {connect} from 'react-redux'
class AddNews extends Component{
    constructor(props){
        super(props)
        this.state={
            showAddNextPage:false,
            newsTitle:'',
            contentValue:'',
            selectedOption:'',
            dummyTitleValue:false,
            dummyOptionValue:false,
            dummyContentValue:false
        };
        this.onNewsTitleInput=this.onNewsTitleInput.bind(this);
        this.onOptionSelect=this.onOptionSelect.bind(this);
        this.onNewsContentInput=this.onNewsContentInput.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.addMoreNews=this.addMoreNews.bind(this)
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

        this.setState(
            {
                dummyTitleValue,
                dummyOptionValue,
                dummyContentValue
            },()=>{
                if(!(this.state.dummyContentValue||this.state.dummyOptionValue||this.state.dummyTitleValue)){
                    let newsObj={
                        newsId:Date.now(),
                        title:newsTitle.value,
                        module:newsOption.value,
                        newsContent:newsContent.value,
                        author:'hans',
                        time:'2018-2-23 12:43:45',
                        visitTime:43,
                    }

                    let {onAddNewNews}=this.props;
                    onAddNewNews(newsObj)

                    this.setState({
                        showAddNextPage:true
                    })
                }
            }
            )
    }

    addMoreNews(){
        this.setState({
            showAddNextPage:false,
            newsTitle:'',
            contentValue:'',
            selectedOption:'',
            dummyTitleValue:false,
            dummyOptionValue:false,
            dummyContentValue:false
        })
    }

    render(){
        let {moduleInfo}=this.props;
        return(
            <div id='add-news'>
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

                <button id='add-news-button'  onClick={this.onSubmit}  type="submit" className="btn btn-default">添加</button>
            </form>
            </div>


                <div id='add-news-prev' style={{display:this.state.showAddNextPage? 'block':'none'}} className='container'>
                    <h3>添加新闻明细</h3>
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
                    <button id='add-more-news-button' onClick={this.addMoreNews} className='btn btn-default btn-sm'>继续添加新闻+</button>

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

const mapDispatchToProps=dispatch=>{
    return{
        onAddNewNews:(newsInfo)=>{
            dispatch({
                type:"ADD_NEWS",
                info:newsInfo
            })
        }

    }
}
let ConnectAddNews=connect(mapStateToProps,mapDispatchToProps)(AddNews)
export default ConnectAddNews;