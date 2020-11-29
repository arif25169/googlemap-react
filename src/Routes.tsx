import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
// import logo from "./assets/logo.png";

const AppWrapper = styled.div`
  // max-width: calc(920x + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  background: whitesmoke;
  flex-direction: column;
  padding: 50px 30px 30px 30px;
`;

export default function () {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Base" defaultTitle="Details">
        <meta name="description" content="Details" />
      </Helmet>
      <AppWrapper>
        {/* <div style={{textAlign:"center", marginBottom:30, marginTop:30}}>
          <img
            src={logo}
            style={{ height: 45, width: 189 }}
            alt=" Details"
          />
        </div> */}
        <Switch>
          <Route component={Home} exact path="/" />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
}
