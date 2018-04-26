import React, { Component } from 'react'
import './ManageNews.css'
import {push } from 'react-router-redux';
import {connect} from 'react-redux'

import {getNewsList,deleteNews} from './reducer/newsreducer'

class ManageNews extends Component{
    constructor(props){
        super(props);
        this.onButton=this.onButton.bind(this);
        this.handleOperate=this.handleOperate.bind(this);
    }

    componentDidMount(){
        const {onGetNewsList}=this.props;
        onGetNewsList();
    }

    onButton(ev){
        this.props.history.push('/add-module')
    }

    handleOperate(ev){
        const {onNewsDelete}=this.props;
        const {onNewsRevise}=this.props;
        if(ev.target.dataset.identify=='revise'){
            let path='/revise-news/'+ev.currentTarget.dataset.newsid
            onNewsRevise(path)
        }
        if(ev.target.dataset.identify=='delete'){
            onNewsDelete(ev.currentTarget.dataset.newsid)
        }
    }

    render(){
        let {data,header}=this.props;
        data=data||[];
        return(
            <div id='manage-news'>
                <table className='table'>
                    <thead>
                    <tr>
                        {
                            header.map(function (item,index) {
                                return(
                                    <th key={index} className={item.classPros} >{item.name}</th>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map(function (item,index) {
                            return(
                                <tr key={index}>
                                    <td className='index'>{index}</td>
                                    <td className='title'><span>{item.title}</span></td>
                                    <td className='module'>{item.newsModule}</td>
                                    <td className='author'>{item.adder}</td>
                                    <td className='time'>{item.addTime}</td>
                                    <td className='times'>{item.visitTimes}</td>
                                    <td className='operate' data-newsid={item.newsId} onClick={this.handleOperate}>
                                        <button data-identify="revise" className='btn btn-default btn-sm'>修改</button>
                                        <button data-identify='delete' className='btn btn-default btn-sm'>删除</button>
                                    </td>
                                </tr>
                            )

                        }.bind(this))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps=state=>{

    return{
        header:state.newsReducer.header,
        data:state.newsReducer.newsData
    }
};

const mapDispatchToProps=dispatch=>{
    return{
        onNewsDelete:(deleteNewsId)=>{
           dispatch(deleteNews(deleteNewsId))
        },
        onNewsRevise:(path)=>{
            dispatch(push(path))

        },
        onGetNewsList:()=>{
            dispatch(getNewsList())
        }

    }

}


let ConnectManageNews=connect(mapStateToProps,mapDispatchToProps)(ManageNews);
export default ConnectManageNews