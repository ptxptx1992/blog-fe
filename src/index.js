import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/index'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import FrontEnd from './view/frontEnd'
import BackEnd from './view/backEnd'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/" exact component={FrontEnd} />
                    <Route path="/home"  component={FrontEnd} />
                    <Route path="/admin" component={BackEnd} />
                </Switch>
            </Router>
        </LocaleProvider>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
