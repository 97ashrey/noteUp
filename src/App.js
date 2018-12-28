import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import AppWrapper from './components/AppWrapper';
import Main from './scenes/notes/scenes/main';
import Archive from './scenes/notes/scenes/archive';
import TrashCan from './scenes/notes/scenes/trash-can';
import Note from './scenes/note';
import Search from './scenes/search';
import About from './scenes/about';
import Test from './components/Test';
import NotFound from './scenes/404';
import { MuiThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './themes/defaultTheme';

class App extends Component {
  render() {
    return (
      
    <MuiThemeProvider theme={defaultTheme}>
      <AppWrapper>
      <Provider store={store}>
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/archive" component={Archive}/>
            <Route exact path="/trash" component={TrashCan}/>
            <Route exact path="/note/:id?" component={Note}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/test" component={Test}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </React.Fragment>
    </Provider>
    </AppWrapper>
    </MuiThemeProvider>
      
    );
  }
}

export default App;
