import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../store/actions/index';
import GradeClassesLists from '../../components/GradeClassManager/GradeClassesLists';

class GradeClassManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gradeClassesInfo: []
        }
    }
    
    componentDidMount(){
        //组件一挂载，就使用redux请求班级年级信息
        //调用mapDispatchToProps中的dispatch
        this.props.onGetGradeClassesInfo();
    }

    render(){
        return (
            <div>
                <h1>GradeClassManager</h1>
                <GradeClassesLists gradeClassesInfo={this.props.gradeClassesInfo} />
            </div>
        );
    }
}

//使用redux管理的是内存中的数据，不是数据库的数据，所以读取和写入都是针对数据中心
//即rootReducer中的内容，至于数据库其实的外部的资源，就勉强放在action creator里了
const mapStateToProps = state =>{
    return{
        //获取到的信息，存入this.props.gradeClassesInfo中
        //如何获取数据就交给redux
        gradeClassesInfo: state.gradeClassesInfoReducer.gradeClassesInfo
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        //调用actionCreator，生成action，然后dispatch
        onGetGradeClassesInfo: ()=>dispatch(actionCreators.getGradeClassesInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeClassManager);