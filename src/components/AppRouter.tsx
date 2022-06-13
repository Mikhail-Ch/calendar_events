import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";
// import { useSelector } from "react-redux";

const AppRouter = () => {
  const { isAuth } = useTypedSelector(state => state.auth)

  return (
    isAuth ?
      <Switch>
        {
          privateRoutes.map(({ path, component, exact }) => {
            return <Route path={ path }
                          exact={ exact }
                          component={ component }
                          key={ path }
            />
          })
        }
        <Redirect to={ RouteNames.EVENT }/>
      </Switch>
      :
      <Switch>
        {
          publicRoutes.map(({ path, component, exact }) => {
            return <Route path={ path }
                          exact={ exact }
                          component={ component }
                          key={ path }
            />
          })
        }
        <Redirect to={ RouteNames.LOGIN }/>
      </Switch>
  );
};

export default AppRouter;