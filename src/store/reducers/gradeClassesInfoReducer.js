import * as actionTypes from '../actions/actionTypes';

//初始数据
const initialState = {
    gradesInfo: [],
    classesInfo: [],
}
//数据处理器
const reducer = (state=initialState, action)=>{
    switch (action.type){
        //reducer检测对应的action type，并将数据返回到数据中心(rootReducer)
        case actionTypes.GET_GRADES_CLASSES_INFO:
            return{
                ...state,
               gradesInfo: action.gradesInfo
            }
        case actionTypes.GET_CLASSES_INFO_BY_GRADENUM:
            return{
                ...state,
                classesInfo: action.classesInfoPayload
            }
        default:
    }

    //固定写法
    return state;
};
export default reducer;