import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Boards = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./hubs")
);
const Ideas = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./ideas")
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Route
                exact
                path={`${match.url}/`}
                render={props => <Boards {...props} />}
              />
              <Route
                exact
                path={`${match.url}/:ideaid`}
                render={props => <Ideas {...props} />}
              />

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
