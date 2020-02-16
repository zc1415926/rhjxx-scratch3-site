import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

//异步函数，完成异步操作后，调用同步函数并传递获取的数据
export const getGradesInfo = ()=>{
    let gradesInfo = [];

    return dispatch=>{
        axios.get('/grades')
        .then(res => {
            gradesInfo = res.data;
            //使用dispatch调用toGetGradesInfo
            dispatch(toGetGradesInfo(gradesInfo))            
        })
        .catch(err => {
            console.log(err);
        });
    }
}

//同步函数，拿到数据后，返回生成的action
export const toGetGradesInfo = (gradesInfo)=>{
    return {
        type: actionTypes.GET_GRADES_CLASSES_INFO,
        gradesInfo: gradesInfo
    }
}

export const postGradeInfo = (gradeInfo, resolve)=>{
    return dispatch=>{
        axios.post('/grades', gradeInfo)
            .then(res=>{
                //console.log('res=>',res);  
                //post 发送成功后，重新读取年级信息，直接从内存删除再显示出来可能与数据库不同步
                dispatch(getGradesInfo());
                resolve();
                //04.数据库更新完成后，将isUpdating设为false
                //见：GradesTable.js中的this.props.postGradeHandler(newData);
                //dispatch(toggoleGradeTableEditing(false));
                
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const putGradeInfo = (gradeInfo, resolve)=>{
    return dispatch=>{
        //console.log('gradeInfo=>',gradeInfo);
        axios.put('/grades/' + gradeInfo.id, gradeInfo)
            .then(res=>{
                //console.log('res=>',res); 
                dispatch(getGradesInfo());
                resolve();
                //dispatch(toggoleGradeTableEditing(false));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const deleteGradeInfo = (gradeInfo, resolve)=>{
    return dispatch=>{
        axios.delete('/grades/' + gradeInfo.id)
            .then(res=>{
                //post 发送成功后，重新读取年级信息
                dispatch(getGradesInfo());
                resolve();
                //dispatch(toggoleGradeTableEditing(false));
            })
            .catch(err => {
                console.log(err);
            });
    }
}

/* export const toggoleGradeTableEditing = (isEditing)=>{
    return {
        type: actionTypes.TOGGLE_GRADE_TABLE_EDITING,
        isEditing: isEditing
    }
} */