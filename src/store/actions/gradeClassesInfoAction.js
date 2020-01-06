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

export const postGradeInfo = (gradeInfo)=>{
    return dispatch=>{
        axios.post('/grades', gradeInfo)
            .then(res=>{
                //console.log('res=>',res);  
                //post 发送成功后，重新读取年级信息，直接从内存删除再显示出来可能与数据库不同步
                dispatch(getGradeClassesInfo());
                //04.数据库更新完成后，将isUpdating设为false
                //见：GradesTable.js中的this.props.postGradeHandler(newData);
                dispatch(toggoleGradeTableEditing(false));
                
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const putGradeInfo = (gradeInfo)=>{
    return dispatch=>{
        //console.log('gradeInfo=>',gradeInfo);
        axios.put('/grades/' + gradeInfo.id, gradeInfo)
            .then(res=>{
                //console.log('res=>',res); 
                dispatch(getGradeClassesInfo());
                dispatch(toggoleGradeTableEditing(false));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const deleteGradeInfo = (gradeId)=>{
    return dispatch=>{
        axios.delete('/grades/' + gradeId)
            .then(res=>{
                //post 发送成功后，重新读取年级信息
                dispatch(getGradeClassesInfo());
                dispatch(toggoleGradeTableEditing(false));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const toggoleGradeTableEditing = (isEditing)=>{
    return {
        type: actionTypes.TOGGLE_GRADE_TABLE_EDITING,
        isEditing: isEditing
    }
}