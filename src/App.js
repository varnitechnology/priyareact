import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";


import CreateUser from "./components/user/create.component";
import Login from "./components/user/login.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Priya
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/user/create" element={<CreateUser />} />
            
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;