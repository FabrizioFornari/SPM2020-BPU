import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './containers/Home/Home'
import { SignUp } from './containers/SignUp/SignUp'
import { LogIn } from './containers/LogIn/LogIn'
import { Welcome } from './containers/Welcome/Welcome'
import { Users } from './containers/Welcome/users/Users'
import { Reservations } from './containers/Welcome/reservations/Reservations'
import {Maps} from './containers/Welcome/map/Maps'
import {Parking} from './containers/Welcome/parking/Parking'
import {Profile} from './containers/Welcome/profile/Profile'
import { useStoreState } from "easy-peasy";
import { useSelector } from 'react-redux'


const App = () => {

  const userData = useStoreState((state) => state.users.userData)
  const isAuth = userData.id == null

  let routes = (
    <Switch>
      <Route path="/home" exact component={Welcome} />
      <Route path="/users" exact component={Users} />
      <Route path="/reservation" exact component={Reservations} />
      <Route path="/map" exact component={Maps} />
      <Route path="/parking" exact component={Parking} />
      <Route path="/profile" exact component={Profile} />
      <Redirect to={"/home"} />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={LogIn} />
        <Redirect to={"/"} />
      </Switch>
    );
  }

  return (
    <div style={{ height: '100%' }}>
      {routes}
    </div>
  );

}

export default App;
