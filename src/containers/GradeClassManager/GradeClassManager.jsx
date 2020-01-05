import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../store/actions/index';
import ClassesList from '../../components/GradeClassManager/ClassesList';
import Gradelist from '../../components/GradeClassManager/GradeList';
import ClassesTable from '../../components/GradeClassManager/ClassesTable';
import ClassesPhPaper from '../../components/GradeClassManager/ClassesPlaceholderPaper';

class GradeClassManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedGrade: null
        }
    }
    
    componentDidMount(){
        //组件一挂载，就使用redux请求班级年级信息
        //调用mapDispatchToProps中的dispatch
        this.props.onGetGradeClassesInfo();
    }

    gradeSelectChangeHandler=(selectedGrade)=>{
        this.setState({selectedGrade: selectedGrade});
        this.props.onGetClassesInfo(selectedGrade);        
    }

    render(){
        return (
            <div>
                <h1>年级管理</h1>
                <Gradelist gradeClassesInfo={this.props.gradeClassesInfo} />
                <h1>班级管理</h1>
                <ClassesList gradeInfo={this.props.gradeClassesInfo} 
                            onGradeSelectChanged={(selectedGrade)=>this.gradeSelectChangeHandler(selectedGrade)}/>
                {
                    
                    this.props.classesInfo.length > 0
                        ? <ClassesTable classesData={this.props.classesInfo} grade={this.state.selectedGrade}/>
                        : <ClassesPhPaper>请在上方选择年级</ClassesPhPaper>
                }
            </div>
        );
    }
}

//使用redux管理的是内存中的数据，不是数据库的数据，所以读取和写入都是针对数据中心
//即rootReducer中的内容，至于数据库其实的外部的资源，就勉强放在action creator里了
const mapStateToProps = (state) =>{
    return{
        //获取到的信息，存入this.props.gradeClassesInfo中
        //如何获取数据就交给redux
        gradeClassesInfo: state.gcInfoReducer.gradeClassesInfo,
        classesInfo: state.gcInfoReducer.classesInfo
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        //调用actionCreator，生成action，然后dispatch
        onGetGradeClassesInfo: ()=>dispatch(actionCreators.getGradeClassesInfo()),
        onGetClassesInfo: (selectedGrade)=>dispatch(actionCreators.getClassesInfo(selectedGrade)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeClassManager);