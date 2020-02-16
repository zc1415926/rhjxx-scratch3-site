import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const getClassesInfo = (selectedGrade)=>{
    return dispatch=>{
        axios.get('/classes?gradeNum='+selectedGrade)
        .then(res => {
            dispatch(toGetClassesInfo(res.data))            
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const toGetClassesInfo = (classesInfoParam)=>{
    return {
        type: actionTypes.GET_CLASSES_INFO_BY_GRADENUM,
        classesInfoPayload: classesInfoParam
    }
}

export const postClassInfo = (classInfo, resolve)=>{
    return dispatch=>{
         axios.post('/classes', classInfo)
            .then(res=>{
                dispatch(getClassesInfo(classInfo.gradeNum));
                resolve();
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const putClassInfo = (classInfo, resolve)=>{
    return dispatch=>{
        axios.put('/classes/' + classInfo.id, classInfo)
            .then(res=>{
                dispatch(getClassesInfo(classInfo.gradeNum));
                resolve();
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const deleteClassInfo = (classInfo, resolve)=>{
    return dispatch=>{
        axios.delete('/classes/' + classInfo.id)
            .then(res=>{
                dispatch(getClassesInfo(classInfo.gradeNum));
                resolve();
            })
            .catch(err => {
                console.log(err);
            });
    }
}