import React from 'react';
import MaterialTable from 'material-table';

export default function InfoTable(props) {

  const editInfoTable = (yourFunc, resolve) => {
    //01.开始编辑的时候isUpdating = false
    //02.当按下确定按钮，将isUpdating设定为true
    props.toggleEditingHandler(true)
    //这个函数是从参数里传进来的，表格的add, update, delete唯一不同的就是在里的函数
    yourFunc();
    //每0.1秒检测一次isUpdating的值
    let timer = setInterval(() => {
      //03.isUpdating为true时，不执行resolve()，表格一直在转圈,等待后台数据更新
      if (props.isEditing) {

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

  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      //不要把data放到state里，这样就只能更新一次数据，后边的更新就显示不出来了
      //data={state.data}
      data={props.data}
      /* 不显示搜索框 */
      options={props.options}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            editInfoTable(() => props.postHandler(newData), resolve);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            editInfoTable(() => props.putHandler(newData), resolve);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            editInfoTable(() => props.deleteHandler(oldData.id), resolve);
          }),
      }}
    />
  );
}