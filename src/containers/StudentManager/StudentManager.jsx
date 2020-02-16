import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators  from '../../store/actions/index';
import MySelect from '../../components/commonUI/MySelect';
import StudentsTable from './StudentsTable';

class StudentManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedGrade: null,
            selectedClass: null,
        }
    }

    componentDidMount(){
        //请求年级和班级信息在selector里用
        this.props.onGetGradesInfo();
    }

    onGradeSelectChanged = (selectedGrade) => {
        this.setState({selectedGrade: selectedGrade});
        //根据选中的年级，请求班级数据
        this.props.onGetClassesInfo(selectedGrade); 
    }
    onClassSelectChanged = (selectedClass) => {
        this.setState({selectedClass: selectedClass});
        //请求班级数据
        this.props.onGetStudentsByClassNum(selectedClass);
    }

    render(){
        return(
            <div>
                <h1>学生管理</h1>
                <MySelect text='请选择年级' itemNum='gradeNum' itemName='gradeName' 
                    items={this.props.gradesInfo}
                    onSelectChanged={(selectedGrade)=>this.onGradeSelectChanged(selectedGrade)} />
                {
                    this.props.classesInfo.length > 0
                        ? <MySelect text='请选择班级' itemNum='classNum' itemName='className' 
                            items={this.props.classesInfo}
                            onSelectChanged={(selectedClass)=>this.onClassSelectChanged(selectedClass)} />
                        : <div>请先选择年级</div>
                }
                {
                    this.props.students.length > 0
                    ? <StudentsTable data={this.props.students} classNum={this.state.selectedClass}/>
                    : ''
                }
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        gradesInfo: state.gcInfoReducer.gradesInfo,
        classesInfo: state.gcInfoReducer.classesInfo,
        students: state.studentReducer.students,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onGetGradesInfo: ()=>dispatch(actionCreators.getGradesInfo()),
        onGetClassesInfo: (selectedGrade)=>dispatch(actionCreators.getClassesInfo(selectedGrade)),
        onGetStudents: ()=>dispatch(actionCreators.getStudents()),
        onGetStudentsByClassNum: (classNum)=>dispatch(actionCreators.getStudentsByClassNum(classNum)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentManager);