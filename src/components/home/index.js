import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();

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
  const ColorList = () => {
    //singOut();
    navigate("/color/create");
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6"></div>
      <HeadingXXLarge color="secondary500">Welcome Home !</HeadingXXLarge>
      <Button kind="secondary" onClick={CreateUser}>
       Create User
      </Button>
      <Button kind="secondary" onClick={ColorList}>
       Color
      </Button>
      <Button kind="secondary" onClick={logout}>
        Logout
      </Button>
    </div>
    </div>
  );
}

export { Home };