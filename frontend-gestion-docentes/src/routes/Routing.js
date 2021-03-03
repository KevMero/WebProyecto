import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { routesUser } from "./configRouting";

const Routing = ({ setRefreshCheckLogin }) => {


  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/register-hours" />;
          }}
        />

        {
          routesUser.map((route, i) => (
            <Route key={i} exact path={route.path}>
              <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
            </Route>
          ))}

     

      </Switch>
    </Router>
  );
};
export default Routing;
