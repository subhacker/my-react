import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);
        let header=['BookName','Author','PublishTime','Sales'];
        let data=[
            ['vue','China','2015','300millions'],
            ['react','facebook','2016','200millions'],
            ['Bootstrap','Twitter','2014','100millions'],
            ['Angular','Google','203','500millions']
        ];
        this.logList= Array();
        this.state={
            initialData:null,
            filterData:null,
            header:header,
            data:data,
            sortIndex:null,
            descending:true,
            editColumn:null,
            editRow:null,
            renderSearch:false
        }

        this.logList.push(JSON.stringify(this.state))
        this.sort=this.sort.bind(this);
        this.handleDoubleClick=this.handleDoubleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.handleFilter=this.handleFilter.bind(this);
        this.logAndSetState=this.logAndSetState.bind(this);
        this.handleBack=this.handleBack.bind(this)
    }
    
    logAndSetState(newState){
        this.logList.push(JSON.stringify(newState));
        this.setState(newState)
    }

    handleDoubleClick(ev){
        let editRow=ev.target.dataset.index;
        let editColumn=ev.target.cellIndex;
        console.log(editRow);
        console.log(editColumn)
        this.logAndSetState({
            editColumn:editColumn,
            editRow:editRow
        })
    }

    handleChange(ev){
        let newData=this.state.data;
        newData[this.state.editRow][this.state.editColumn]=ev.target.value;
        this.logAndSetState({
            data:newData
        })
    }

    handleSubmit(ev){
        ev.preventDefault();
        this.logAndSetState({
            editColumn:null,
            editRow:null
        })
    }

    handleSearch(ev){
        if(this.state.renderSearch===false){
            ev.target.innerHTML='取消';
            let filterData=this.state.data.slice();
            let initialData=this.state.data.slice();
            this.logAndSetState({
                renderSearch:true,
                filterData:filterData,
                initialData:initialData
            })
        }else {
            ev.target.innerHTML='搜索';
            let data=this.state.initialData.slice();
            this.logAndSetState({
                renderSearch:false,
                filterData:null,
                initialData:null,
                data:data
            })
        }
    }

    handleFilter(ev){
        let filterBox=document.getElementsByClassName('filterBox');
        let tempFilterData=this.state.initialData.slice();
        let filterData=tempFilterData.filter(function (item,index,arr) {
            for(let i=0;i<4;i++){
                if(item[i].indexOf(filterBox[i].value)<0){
                    return false;
                    break;
                }
            }
            return true
        });
        this.logAndSetState({
            data:filterData
        })
    }

    handleBack(ev){
        if(this.logList.length==0){
            alert("No list to show")
        }else{
            let j=0;
            let timeId;
            function reback() {
                let currentList=JSON.parse(this.logList[j]);
                this.setState(currentList)
                j=j+1;
                if(j>=this.logList.length){
                    clearTimeout(timeId)
                }else{
                    timeId=setTimeout(reback.bind(this),300)
                }
            }
            timeId=setTimeout(reback.bind(this),300)
        }

    }

    sort(ev){
        this.index=-1;
        let that=this;

        let newData=this.state.data.slice();
        let column=ev.target.cellIndex;
        newData.sort(function (prev,next) {

            return that.state.descending?(prev[column]>next[column]?1:-1):(prev[column]<next[column]?1:-1)
        });
        let newDes=!this.state.descending;
        this.logAndSetState({
            data:newData,
            sortIndex:column,
            descending:newDes
            })
        this.index*=-1;
    }


  render() {

        //注意此处在map函数中，this指向的时map调用的对象，而不是该函数方法，因而的必须通过其他方式传入this
        let that=this;

    return(
        <div>
            <button onClick={that.handleSearch}>搜索</button>
            <button onClick={that.handleBack}>回退状态</button>

        <table>
            <thead>
            <tr>
            {
                this.state.header.map(function (item,index,arr) {
                    let title=index===that.state.sortIndex? (that.state.descending===false?(item+'\u2191'):(item+'\u2193')):item;
                    return <th onClick={that.sort}  key={index}>{title}</th>
                },this)
            }
            </tr>
            </thead>
            <tbody onDoubleClick={this.handleDoubleClick}>
            <tr  onChange={that.handleFilter}>
            {
                this.state.renderSearch&&this.state.header.map(function (itme,idx,arr) {
                    return(
                        <td key={idx}>
                            <input className='filterBox' type='text' />
                        </td>
                    )
                })
            }
            </tr>

            {
                this.state.data.map(function (item,index,arr) {
                    return <tr key={index} >
                        {
                            item.map(function (cellItem,cellIndex,arr) {

                                if(that.state.editRow==index&&that.state.editColumn==cellIndex){

                                    return(
                                        <td data-index={index} key={cellIndex}>
                                            <form onSubmit={that.handleSubmit}>
                                                <input onChange={that.handleChange} type='text' value={cellItem}/>
                                            </form>
                                        </td>
                                    )

                                }else{
                                    return<td data-index={index} key={cellIndex}>{cellItem}</td>
                                }
                            })
                        }
                    </tr>

                })

            }
            </tbody>
        </table>
        </div>
    )

  }
}

export default App;
