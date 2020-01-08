import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../store/actions/index';
import GradesTable from './GradesTable';
import GradeSelect from '../../components/GradeClassManager/GradeSelect';
import ClassesTable from './ClassesTable';
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
        this.props.onGetGradesInfo();
    }

    gradeSelectChangeHandler=(selectedGrade)=>{
        //保存GradeSelect中已选的年级，放在班级信息表的title里显示用
        this.setState({selectedGrade: selectedGrade});
        //根据选中的年级，请求班级数据
        this.props.onGetClassesInfo(selectedGrade);        
    }

    render(){
        return (
            <div>
                <h1>年级管理</h1>
                {
                    //显示年级信息表
                    //如果有数据就显示数据，如果没有就显示空字符串
                    this.props.gradesInfo.length>0
                        ?<GradesTable GradeData={this.props.gradesInfo} />
                        :'' 
                }
                <h1>班级管理</h1>
                {/* 获取年级信息后，传入select中，选择不同的年级后，请求该年级的班级数据传递给ClassesTable */}
                <GradeSelect gradeInfo={this.props.gradesInfo} 
                            onGradeSelectChanged={(selectedGrade)=>this.gradeSelectChangeHandler(selectedGrade)}/>
                {                    
                    //接收到年级信息后显示对应年级的班级信息表
                    this.props.classesInfo.length > 0
                        ? <ClassesTable data={this.props.classesInfo} grade={this.state.selectedGrade}/>
                        : <ClassesPhPaper>要查看班级信息表，请在上方选择年级</ClassesPhPaper>
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
        gradesInfo: state.gcInfoReducer.gradesInfo,
        classesInfo: state.gcInfoReducer.classesInfo
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        //调用actionCreator，生成action，然后dispatch
        onGetGradesInfo: ()=>dispatch(actionCreators.getGradesInfo()),
        onGetClassesInfo: (selectedGrade)=>dispatch(actionCreators.getClassesInfo(selectedGrade)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeClassManager);