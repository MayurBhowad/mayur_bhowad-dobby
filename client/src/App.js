import logo from './logo.svg';
import './styles.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.redux';
import { PersistGate } from 'redux-persist/integration/react';


import Navbar from './components/layouts/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard.component';
import AddPostDashboard from './components/dashboard/AddPost.dashboard';
import PrivateRouteCommon from './components/common/PrivateRoute.common';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>

          <Navbar />
          <Route exact path='/'>
            <Redirect to="/login" />
          </Route>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Switch>
            <PrivateRouteCommon exact path='/dashboard' component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRouteCommon exact path='/dashboard/add' component={AddPostDashboard} />
          </Switch>
          <Route />

        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
