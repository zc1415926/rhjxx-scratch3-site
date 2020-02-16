//引入这一个文件，就可以把各个文件都一次性引入
export {
    add,
    substract,
    increment,
    decrement
} from './counter';

export {
    storeResult,
    deleteResult
} from './result';

export {
    getGradesInfo,
    postGradeInfo,
    putGradeInfo,
    deleteGradeInfo,
} from './gradesInfoActions';

export {
    getClassesInfo,
    postClassInfo,
    putClassInfo,
    deleteClassInfo,
} from './classesInfoActions';

export {
    getStudents,
    getStudentsByClassNum,
    postStudent,
    putStudent,
    deleteStudent,
} from './studentActions';