import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function CreateColor() {
    const navigate = useNavigate();
 
    const [name, setName] = useState("")
    
    const [validationError,setValidationError] = useState({})
  
    
   
    const CreateColor = async (e) => {
      e.preventDefault();
  
      const formData = new FormData()
  
      formData.append('name', name)
      formData.append('status', 'active')

      
      
      await axios.post(`http://127.0.0.1:8000/api/colors`, formData , {
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer "+localStorage.getItem('token'),
        } }).then(({data})=>{
        Swal.fire({
          icon:"success",
          text:data.message
        })
        navigate("/color/create")
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
                <h4 className="card-title">Create Color</h4>
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
                  <Form onSubmit={CreateColor}>
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