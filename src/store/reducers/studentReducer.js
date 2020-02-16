import * as actionTypes from '../actions/actionTypes';

//初始数据
const initialState = {
    students: [],
    isStudentsTableEditing: false,
}
//数据处理器
const reducer = (state=initialState, action)=>{
    
    switch (action.type){
        //reducer检测对应的action type，并将数据返回到数据中心(rootReducer)
        case actionTypes.GET_STUDENTS:
            return{
                ...state,
               students: action.students
            }
        case actionTypes.GET_STUDENTS_BY_CLASSNUM:
            return{
                ...state,
                students: action.students
            }
        /* case actionTypes.TOGGLE_STUDENTS_TABLE_EDITING:
            return{
                ...state,
                isStudentsTableEditing: action.isEditing
            } */
        default:
    }

    //固定写法
    return state;
};
export default reducer;