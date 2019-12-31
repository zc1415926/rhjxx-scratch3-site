import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

//异步函数，完成异步操作后，调用同步函数
export const getGradeClassesInfo = ()=>{
    let gradeClassesInfo = [];

    return dispatch=>{
        axios.get('/grades')
        .then(res => {
            gradeClassesInfo = res.data;
            dispatch(toGetGradeClassesInfo(gradeClassesInfo))            
        })
        .catch(err => {
            console.log(err);
        });
    }
}

//把原来的同步的storeResult分解为异步的storeResult执行完操作后，调用同步的saveResult
//这里是同步函数
export const toGetGradeClassesInfo = (gradeClassesInfo)=>{
    return {
        type: actionTypes.GET_GRADES_CLASSES_INFO,
        gradeClassesInfo: gradeClassesInfo
    }
}