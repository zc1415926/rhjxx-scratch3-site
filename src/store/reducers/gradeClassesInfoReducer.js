import * as actionTypes from '../actions/actionTypes';

//初始数据
const initialState = {
    gradeClassesInfo: []
}
//数据处理器
const reducer = (state=initialState, action)=>{
    switch (action.type){
        case actionTypes.GET_GRADES_CLASSES_INFO:
            return{
                ...state,
               gradeClassesInfo: action.gradeClassesInfo
            }
        default:
    }

    //固定写法
    return state;
};
export default reducer;