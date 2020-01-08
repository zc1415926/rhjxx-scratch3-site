import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const getClassesInfo = (selectedGrade)=>{
    //let classesInfo = [];
    return dispatch=>{
        axios.get('/classes?gradeNum='+selectedGrade)
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
        type: actionTypes.GET_CLASSES_INFO_BY_GRADENUM,
        classesInfoPayload: classesInfoParam
    }
}

export const postClassInfo = (classInfo)=>{
    return dispatch=>{
         axios.post('/classes', classInfo)
            .then(res=>{
                //post 发送成功后，重新读取年级信息，直接从内存删除再显示出来可能与数据库不同步
                dispatch(getClassesInfo(classInfo.gradeNum));
                //04.数据库更新完成后，将isUpdating设为false
                //见：GradesTable.js中的this.props.postGradeHandler(newData);
                dispatch(toggoleClassesTableEditing(false));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const putClassInfo = (classInfo)=>{
    return dispatch=>{
        axios.put('/classes/' + classInfo.id, classInfo)
            .then(res=>{
                dispatch(getClassesInfo(classInfo.gradeNum));
                dispatch(toggoleClassesTableEditing(false));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const deleteClassInfo = (classNumToDel, gradeNum)=>{
    return dispatch=>{
        axios.delete('/classes/' + classNumToDel)
            .then(res=>{
                //post 发送成功后，重新读取年级信息
                dispatch(getClassesInfo(gradeNum));
                dispatch(toggoleClassesTableEditing(false));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const toggoleClassesTableEditing = (isEditing)=>{
    return {
        type: actionTypes.TOGGLE_CLASSES_TABLE_EDITING,
        isEditing: isEditing
    }
}