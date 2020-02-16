import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const getStudents = ()=>{
    return dispatch=>{
        axios.get('/students')
        .then(res => {
            dispatch(toGetStudents(res.data))            
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const toGetStudents = (students) => {
    return {
        type: actionTypes.GET_STUDENTS,
        students: students
    }
}

export const getStudentsByClassNum = (classNum)=>{
    return dispatch=>{
        axios.get('/students?classNum='+classNum)
        .then(res => {
            dispatch(toGetStudentsByClassNum(res.data))            
        })
        .catch(err => {
            console.log(err);
        });
    }
}

//post不需要建立对应的action type，因为actionType是针对内存数据的，而post修改数据库后
//用actionTypes.GET_STUDENTS_BY_CLASSNUM刷新数据就行了
export const postStudent = (student, resolve) => {
    return dispatch => {
        axios.post('/students', student)
            .then(res=>{
                dispatch(getStudentsByClassNum(student.classNum));
                //从InfoTable到StudentTable几经辗转传过来的resove()函数，只有调用它才能结束表格
                //正在上传的转圈圈锁定状态
                resolve();
            })
            .catch(err=>{
                console.log(err);
            })
    }
}

export const putStudent = (student, resolve) => {
    return dispatch => {
        axios.put('/students/' + student.id, student)
            .then(res=>{
                //TODO:研究一下如果是改了班级会出现什么情况
                dispatch(getStudentsByClassNum(student.classNum));
                resolve();
            })
            .catch(err=>{
                console.log(err);
            })
    }
}

export const deleteStudent = (student, resolve)=>{
    return dispatch=>{
        axios.delete('/students/' + student.id)
            .then(res=>{
                dispatch(getStudentsByClassNum(student.classNum));
                resolve();
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const toGetStudentsByClassNum = (students) => {
    return {
        type: actionTypes.GET_STUDENTS_BY_CLASSNUM,
        students: students
    }
}
/* 
export const toggoleStduentsTableEditing = (isEditing)=>{
    return {
        type: actionTypes.TOGGLE_STUDENTS_TABLE_EDITING,
        isEditing: isEditing
    }
} */