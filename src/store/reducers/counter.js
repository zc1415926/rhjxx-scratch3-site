import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

//初始数据
const initialState = {
    counter: 0
}
//数据处理器
const reducer = (state=initialState, action)=>{
    //接受写数据命令，对action.type进行判断，以进行不同的操作
    //使用switch可以更方便的进行多个值的判断
    switch (action.type){
        case actionTypes.INCREMENT:
            //要返回一个object，原state只能读取
            //使用了return就跳出了switch语句，不用break了
            return{
                ...state,
                counter: state.counter + 1
            }
        case actionTypes.DECREMENT:
            return{
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return{
                ...state,
                //通过action载荷action.val进行计算
                counter: state.counter + action.val
            }
        case actionTypes.SUBSTRACT:
            return updateObject(state, {counter: state.counter - action.val});
    }

    //固定写法
    return state;
};
export default reducer;