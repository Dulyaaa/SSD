import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const AccessDenied = () => {
  const history = useHistory();
  return (
    <section style={{ marginTop: "40vh" }}>
      <div>
        <h3>Access Denied</h3>
      </div>
      <Button onClick={() => history.goBack()}>CLICK TO GO BACK</Button>
    </section>
  );
};

export default AccessDenied;
