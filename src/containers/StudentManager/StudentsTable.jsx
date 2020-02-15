import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import InfoTable from '../../components/GradeClassManager/InfoTable';

class StudentsTable extends React.Component {

  render() {
    const columns = [
      { title: '学号', field: 'studentNum' },
      { title: '姓名', field: 'studentName' },
    ];

    return (
      <InfoTable title={this.props.isStudentsTableEditing?'true':'false'}
                 columns={columns}
                 data={this.props.data}
                 //新建学生的时候，没有在表格里填班级信息，所以就默认添加之前选中的classNum到数据中
                 postHandler={(newData) => this.props.onPostStudent({...newData, 'classNum': this.props.classNum})}
                 putHandler={(newData) => this.props.onPutStudent(newData)}
                 deleteHandler={(oldData) => this.props.onDeleteStudent(oldData)}
                 toggleEditingHandler={(isEditing)=>this.props.onToggoleStduentsTableEditing(isEditing)}
                 isStudentsTableEditing={this.props.isStudentsTableEditing}
                 />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isStudentsTableEditing: state.studentReducer.isStudentsTableEditing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostStudent: (student)=>dispatch(actionCreators.postStudent(student)),
    onPutStudent: (student)=>dispatch(actionCreators.putStudent(student)),
    onDeleteStudent: (student)=>dispatch(actionCreators.deleteStudent(student)),
    onToggoleStduentsTableEditing: (isEditing) => dispatch(actionCreators.toggoleStduentsTableEditing(isEditing)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable);