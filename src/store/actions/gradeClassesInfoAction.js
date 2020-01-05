import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

//异步函数，完成异步操作后，调用同步函数并传递获取的数据
export const getGradeClassesInfo = ()=>{
    let gradeClassesInfo = [];

    return dispatch=>{
        axios.get('/grades')
        .then(res => {
            gradeClassesInfo = res.data;
            //使用dispatch调用toGetGradeClassesInfo
            dispatch(toGetGradeClassesInfo(gradeClassesInfo))            
        })
        .catch(err => {
            console.log(err);
        });
    }
}

//同步函数，拿到数据后，返回生成的action
export const toGetGradeClassesInfo = (gradeClassesInfo)=>{
    return {
        type: actionTypes.GET_GRADES_CLASSES_INFO,
        gradeClassesInfo: gradeClassesInfo
    }
}

export const getClassesInfo = (selectedGrade)=>{
    //let classesInfo = [];
    
    return dispatch=>{
        axios.get('/classes?gradeId='+selectedGrade)
        .then(res => {
            //classesInfo = res.data;
            dispatch(toGetClassesInfo(res.data))            
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const toGetClassesInfo = (classesInfoParam)=>{
    return {
        type: actionTypes.GET_CLASSES_INFO_BY_GRADEID,
        classesInfoPayload: classesInfoParam
    }
}