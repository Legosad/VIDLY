import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    // `replace` is achieved by passing `{ replace: true }` as the second argument
    const history = {
      push: (path) => navigate(path), // This performs a push
      replace: (path) => navigate(path, { replace: true }), // This performs a replace
    };
    return (
      <WrappedComponent
        {...props}
        match={{ params }}
        history={history} // Note that `navigate` serves both `push` and `replace`
      />
    );
  };
};

export default withRouter;
