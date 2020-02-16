import React from 'react';
import MaterialTable from 'material-table';

export default function InfoTable(props) {
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
            //表格在执行操作的时候会显示一个圈圈将自己挡住避免数据出错
            //后台数据操作完成后调用resolve()就会退出转圈圈状态
            props.postHandler(newData, resolve)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            props.putHandler(newData, resolve)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            props.deleteHandler(oldData, resolve)
          }),
      }}
    />
  );
}