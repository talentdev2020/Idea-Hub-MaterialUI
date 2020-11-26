import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import "./helpers/Firebase";
import AppLocale from "./lang";
import { isDemo } from "./constants/defaultValues";
import { getDirection } from "./helpers/Utils";

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views")
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/hubs")
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./views/account")
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./views/admin")
);
const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser || isDemo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }

  render() {
    const { locale, loginUser } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <AuthRoute
                    path="/hubs"
                    authUser={loginUser}
                    component={ViewApp}
                  />
                  <AuthRoute
                    path="/account"
                    authUser={loginUser}
                    component={Account}
                  />
                  <AuthRoute
                    path="/admin"
                    authUser={loginUser}
                    component={Admin}
                  />
                  <Route
                    path="/user"
                    render={props => <ViewUser {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={props => <ViewError {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={props => <ViewMain {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { userid: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
