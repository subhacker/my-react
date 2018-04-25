

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

function newsReducer(state={newsData:[],header},action){
    if(action.type==='ADD_NEWS'){
        let newsList=state.newsData.slice();
        let obj={
            newsId:Date.now(),
            title:action.info.title,
            module:action.info.module,
            author:'hans',
            time:Date.now(),
            visitTime:44,
            newsContent:action.info.newsContent
        };
        newsList.push(obj)
        return Object.assign({},state,{newsData:newsList})
    }

    if(action.type==='DELETE_NEWS'){
        let deleteNewsId=action.info;
        let deleteNewsList=state.newsData.slice();
        let i;
        for(i=0;i<deleteNewsList.length;i++){
            if(deleteNewsList[i].newsId==deleteNewsId)
                break;
        }
        deleteNewsList.splice(i,1);

       let deleteReturnState= Object.assign({},state,{newsData:deleteNewsList})
        return deleteReturnState ;
    }

    if(action.type==='FILL_NEWS_LIST'){
       let data={
            ...state,
            newsData:action.data
        }
        console.log('获取数据后的')
        console.log(data)

        return data;


    }
    if(action.type==='REVISE_NEWS'){

        let newsObj=action.info;
        let newsIndex=newsObj.newsIndex;
        let ReviseNewsList=state.newsData.slice();
        let reviseNewsObj={
            newsId:ReviseNewsList[newsIndex].newsId,
            title:newsObj.title,
            module:newsObj.module,
            author:ReviseNewsList[newsIndex].author,
            time:ReviseNewsList[newsIndex].time,
            visitTime:ReviseNewsList[newsIndex].visitTime,
            newsContent:newsObj.newsContent
        };

        ReviseNewsList.splice(newsIndex,1,reviseNewsObj);
        return{
            ...state,
            newsData:ReviseNewsList
        }

    }

    return state
}
export default newsReducer;


export function getNewsList() {
    return(dispatch)=>{
        console.log('获取NewsList数据')
        let data={
            filter:'all',
            startNews:0,
            requiredNewsNum:20
        };
        return $.get('/news-ajax/api/get-news-list.php',data)
            .then(response=>{
                let data=JSON.parse(response)
                console.log(data['news_arr'])
                dispatch({
                    type:"FILL_NEWS_LIST",
                    data:data['news_arr']
                })
            })

    }

}

export function deleteNews(newsId) {
    return (dispatch)=>{
    console.log('进行NewsList的删除');
    let data={
        deleteNodeId:newsId
    }
    return $.get('/news-ajax/api/delete-news.php',data)
        .then(response=>{
            console.log('删除陈宫');
            dispatch(getNewsList())
        })

    }

}
