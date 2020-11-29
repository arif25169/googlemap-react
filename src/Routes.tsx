import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import StepOne from "./pages/StepOne";
import logo from "./assets/logo.png";

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  background: whitesmoke;
  flex-direction: column;
`;

export default function () {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Base" defaultTitle="Details">
        <meta name="description" content="Details" />
      </Helmet>
      <AppWrapper>
        <div style={{textAlign:"center", marginBottom:30, marginTop:30}}>
          <img
            src={logo}
            style={{ height: 45, width: 189 }}
            alt=" Details"
          />
        </div>
        <Switch>
          <Route component={StepOne} exact path="/" />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
}
