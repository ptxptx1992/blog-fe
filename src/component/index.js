import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import FrontEnd from './frontEnd'
import BackEnd from './backEnd'
class App extends Component {
  render() {
    return (
      <div className="App">
        <LocaleProvider locale={zhCN}>
          <Switch>
              <Route path="/" exact component={FrontEnd} />
              <Route path="/home"  component={FrontEnd} />
              <Route path="/admin" component={BackEnd} />
          </Switch>
        </LocaleProvider>
      </div>
    );
  }
}

export default App;
