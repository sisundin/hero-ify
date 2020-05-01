import React from "react";
import { withRouter } from "react-router-dom";

const Back = ({ history }) => (
  <p className = "backbutton" onClick={history.goBack}>‹ BACK</p>
);

export default withRouter(Back);