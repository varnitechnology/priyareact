import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Button } from "baseui/button";

function Header() {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const  isLoggedIn  =  localStorage.getItem('token');
 



  const logout = () => {
    singOut();
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/");
  };

  const CreateUser = () => {
    //singOut();
    navigate("/user/create");
  };


  return (
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Priya
        </Link>
        
        <button onClick={logout}>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button> 
      </Container>
    </Navbar>
  );
}

export { Header };