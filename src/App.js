import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { RequireAuth } from "react-auth-kit";
import { createContext, useState, useEffect, handleAuth,isLoggedIn  } from 'react';
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import CreateUser from "./components/user/create.component";
import Login from "./components/user/login.component";
import { Home } from "./components/home";
import { Header } from "./components/Header";
import ColorCreate from "./components/color/createcolor.component";




function App() {
  return (<Router>
    
    <Header />
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route index element={<Login />}></Route>
            <Route path="/user/create"  element={
            <RequireAuth loginPath="/">
              <CreateUser />
            </RequireAuth>
          }
        ></Route>
        <Route path="/home"  element={
            <RequireAuth loginPath="/">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/color/create"  element={
            <RequireAuth loginPath="/">
              <ColorCreate />
            </RequireAuth>
          }
        ></Route>

         
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;