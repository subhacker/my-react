import React, { Component } from 'react'
import './ManageNews.css'
import {withRouter } from 'react-router-dom';

class ManageNews extends Component{
    constructor(props){
        super(props);
        this.onButton=this.onButton.bind(this);
        this.handleOperate=this.handleOperate.bind(this);
    }

    onButton(ev){
        this.props.history.push('/add-module')
    }

    handleOperate(ev){
        const {onNewsDelete}=this.props;
        if(ev.target.dataset.identify=='revise'){
            let path='/revise-news/'+ev.currentTarget.dataset.newsid
            this.props.history.push(path)
        }
        if(ev.target.dataset.identify=='delete'){
            onNewsDelete(ev.currentTarget.dataset.newsid)
        }
    }

    render(){
        let {data,header}=this.props;
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
                                    <td className='module'>{item.module}</td>
                                    <td className='author'>{item.author}</td>
                                    <td className='time'>{item.time}</td>
                                    <td className='times'>{item.visitTime}</td>
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

export default withRouter(ManageNews);