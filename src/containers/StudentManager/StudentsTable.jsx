import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import InfoTable from '../../components/commonUI/InfoTable';

class StudentsTable extends React.Component {

  render() {
    const columns = [
      { title: '学号', field: 'studentNum' },
      { title: '姓名', field: 'studentName' },
    ];

    return (
      <InfoTable title={'学生信息表'}
                 columns={columns}
                 data={this.props.data}
                 //新建学生的时候，没有在表格里填班级信息，所以就默认添加之前选中的classNum到数据中。
                 //第一个括号里的参数是InfoTable中调用props.postHandler时传入的参数，第二个括号与mapDispatchToProps里
                 //左边的括号对应，是调用onPostStudent时传入的参数，最后放到dispatch里调用postStudent把这些参数传入
                 //studentAction中的postStudent中。
                 postHandler={(newData, resolve) => this.props.onPostStudent({...newData, 'classNum': this.props.classNum}, resolve)}
                 putHandler={(newData, resolve) => this.props.onPutStudent(newData, resolve)}
                 deleteHandler={(oldData, resolve) => this.props.onDeleteStudent(oldData, resolve)}
                 />
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostStudent: (student, resolve)=>dispatch(actionCreators.postStudent(student, resolve)),
    onPutStudent: (student, resolve)=>dispatch(actionCreators.putStudent(student, resolve)),
    onDeleteStudent: (student, resolve)=>dispatch(actionCreators.deleteStudent(student, resolve)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable);