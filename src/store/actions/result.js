import * as actionTypes from './actionTypes';

//把原来的同步的storeResult分解为异步的storeResult执行完操作后，调用同步的saveResult
//这里是同步函数
export const saveResult = (res) =>{
    return{
        type: actionTypes.STORE_RESULT,
        result: res
    };
}
//异步函数，完成异步操作后，调用同步函数
export const storeResult = (res) => {
    return dispatch=>{
        setTimeout(() => {
            dispatch(saveResult(res))
        }, 2000);
    }
};

export const deleteResult = (resElId) => {
    return{
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId
    };
};