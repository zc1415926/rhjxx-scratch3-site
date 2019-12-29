import * as actionTypes from '../actions/actionTypes';

//初始数据
const initialState = {
    results: []
}
//数据处理器
const reducer = (state=initialState, action)=>{
    //接受写数据命令，对action.type进行判断，以进行不同的操作
    //使用switch可以更方便的进行多个值的判断
    switch (action.type){
        case actionTypes.STORE_RESULT:
            return{
                //immutable:使用...state将state中的原有数据读出，与新的results合并
                ...state,
                //immutalbe:不能使用state.results.push()，因为push会改变原数组，
                //而concat()是连接后返回新数组
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1)

            //在回调函数中将id不符合的项返回给updatedArray，符合的项漏掉，就做出了删除的效果
            const updatedArray = state.results.filter(results => results.id !== action.resultElId);
            return{
                ...state,
                results: updatedArray
            }
    }

    //固定写法
    return state;
};
export default reducer;