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
                 postHandler={(newData) => this.props.onPostStudent({...newData, 'classNum': this.props.classNum})}
                 putHandler={(newData) => this.props.onPutStudent({...newData, 'classNum': this.props.classNum})}
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