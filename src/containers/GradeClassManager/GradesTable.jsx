import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'gradeNum', field: 'gradeNum' },
        { title: 'gradeName', field: 'gradeName' },
      ],
    }
  }

  editGradeTable = (yourFunc, resolve) => {
    //01.开始编辑的时候isUpdating = false
    //02.当按下确定按钮，将isUpdating设定为true
    this.props.onToggoleGradeTableEditing(true)
    //这个函数是从参数里传进来的，表格的add, update, delete唯一不同的就是在里的函数
    yourFunc();
    //每0.1秒检测一次isUpdating的值
    let timer = setInterval(() => {
      //03.isUpdating为true时，不执行resolve()，表格一直在转圈,等待后台数据更新
      if (this.props.isUpdating) {

        //04.数据库更新完成后，将isUpdating设为false
        //见：gradeClassesInfoAction.js中的dispatch(toggoleGradeTableUpdating(false))
      } else {
        //05.程序检测到isupdating===false后，执行resolve()
        //resolve是从参数里传进来的
        resolve();
        //结束计时器
        clearInterval(timer)
      }
    }, 100);

  }
  render() {
    return (
      <MaterialTable
        title={"年级信息表"}
        columns={this.state.columns}
        //props一更新，表格的显示就可以一起更新
        data={this.props.GradeData}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              this.editGradeTable(() => this.props.postGradeHandler(newData), resolve);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              this.editGradeTable(() => this.props.putGradeHandler(newData), resolve);

            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              this.editGradeTable(() => this.props.deleteGradeHandler(oldData.id), resolve);
            }),
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUpdating: state.gcInfoReducer.isGradeTableEditing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggoleGradeTableEditing: (isEditing) => dispatch(actionCreators.toggoleGradeTableEditing(isEditing)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeTable);