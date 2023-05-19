import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('token');
    if(!auth)
    {
      navigate("/")
    }
  },[])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState()
  const [mobileno, setMobileNo] = useState()
  const [user_type, setUserType] = useState()
  const [validationError,setValidationError] = useState({})

  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fromDb = undefined;

      let data = fromDb || [];
      // Fetch data
       data  = await fetch("http://127.0.0.1:8000/api/usertype/",{
        headers:{
          authorization: 'Bearer '+localStorage.getItem('token')
        }
      });
      console.log(data);
      const results = []
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          key: value.name,
          value: value.id,
        });
      });
      // Update the options state
      setOptions([
        {key: 'Select a company', value: ''}, 
        ...results
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);
 
  const CreateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('mobileno', mobileno)
    formData.append('user_type', user_type)
    formData.append('c_password', password)

    await axios.post(`http://127.0.0.1:8000/api/register`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create User</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={CreateUser}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(event)=>{
                              setName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(event)=>{
                              setEmail(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(event)=>{
                              setPassword(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="MobileNo">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="text" value={mobileno} onChange={(event)=>{
                              setMobileNo(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="UserType">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control id={name} name={name}  as={Form.Select}>
                              {options.map((option) => {
                                return (
                                  <option key={option.value} value={option.value}>
                                    {option.key}
                                  </option>
                                );
                              })}
                            </Form.Control>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}