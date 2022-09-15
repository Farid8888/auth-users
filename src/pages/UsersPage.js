import React,{useEffect,useState} from 'react'
import Users from '../components/Users/Users'


export default function UsersPage() {
const [items,setItems] = useState([])
useEffect(()=>{
const sendRequest =async()=>{
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setItems(data)
    }catch(err){
      alert(err.message)
    }
}
sendRequest()
},[])

  return (
    <div>
      <Users items={items}/>
    </div>
  )
}
