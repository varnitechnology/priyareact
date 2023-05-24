import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
export default function UserType() {
  const [usertypeItems, initUserType] = useState([])
  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/usertype/',{
        headers:{
          authorization: 'Bearer '+localStorage.getItem('token')
        }
      });
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }
  useEffect(() => {
    fetchData()
      .then((res) => {
        initUserType(res)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])
  return (
    
    <Form.Control id="user_type" name="user_type"  as={Form.Select}>
      
      {usertypeItems.map((item, idx) => {
        return (
            <option key={item.id} value={item.id}>
            {item.name}
          </option>
        )
      })}
    </Form.Control>
  )
  
}