import React, { Component } from 'react';
//引入react和redux的连接方法connect
import {connect} from 'react-redux';
//引入actionTypes更方便、精确地表示action.type
//import * as actionTypes from '../../store/actions/actions';
//引入actionCreators（拆分后）
import * as actionCreators  from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                {/* 使用redux读取数据 */}
                <CounterOutput value={this.props.ctr} />
                {/* 调用dispatch函数，发送写数据命令 */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter } />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter}  />

                <hr />
                {/* 通过参数传递要保存的值 */}
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {/* strResult=>接{}需要在{}里使用return，接()表示()中的内容即是return的内容 */}
                    {this.props.storedResults.map(strResult=>(
                        /* ()=>this.props.onDeleteResult(strResult.id)的第一个括号不用传入参数，这是这部分代码
                        是在map函数中，strResult依然有效，所以就在第二个括号里传入strResult.id就行了 */
                        <li key={strResult.id} onClick={()=>this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

//使用mapStateToProps方法，redux可以读取数据
//并把this.state.counter转换为this.props.ctr，供用户使用
//拆分reducer后，要使用设定好的ctr和res调用不同的reducer
const mapStateToProps=(state)=>{
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};
//在mapDispatchToProps中定义发送写数据的命令（action）的函数
//定义的函数放在this.props里，供用户调用
const mapDispatchToProps=(dispatch)=>{
    return {
        //修改成使用actionCreators的形式
        onIncrementCounter: ()=>dispatch(actionCreators.increment()),
        onDecrementCounter: ()=>dispatch(actionCreators.decrement()),
        //在发送的action中加入payload，即带上数据
        onAddCounter: ()=>dispatch(actionCreators.add(5)),
        onSubstractCounter: ()=>dispatch(actionCreators.substract(8)),
        //使用payload向reducer传递要保存的值
        onStoreResult: (result)=>dispatch(actionCreators.storeResult(result)),
        //这里的id是调用onDeleteResult时传入的参数
        onDeleteResult: (id)=>dispatch(actionCreators.deleteResult(id))
    };
}
//使用connect连接React和Redux传入读数据和写数据的函数
export default connect(mapStateToProps, mapDispatchToProps)(Counter);