import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//引入redux中的createStore方法以生成一个核心数据存储器
//combineReducer可以合并多个reducer
//引入applyMiddleware以加载middleware, 引入composer配置redux devtool
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
//引入react和redux连接用的包装器Provicer
import {Provider} from 'react-redux'; 
//引入redux-thunk使得我们可以使用异步action
import thunk from 'redux-thunk';
//引入我们自己建立的数据处理器(拆分后)
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

//把2个reducer合成一个，管counter的叫ctr，管result的叫res
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

//新建一个简易的中间件
const logger = store =>{
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}
//使用composerEnhancers配置redux devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//生成核心数据存储器，注册数据处理器reducer（改成rootReducer）
//引入logger中间件，使用composerEnhancers配置redux devtool
//thunk作为一个中间件被引入
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

//使用Provider将react和redux连接起来，指定store为核心数据存储器
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();