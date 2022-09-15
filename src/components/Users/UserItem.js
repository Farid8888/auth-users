import React,{useEffect,useState} from 'react'
import LoadingSpinner from '../ui/LoadingSpinner'
import classes from './UserItem.module.css'



export default function UserItem(props) {
    const {userId} = props
    const [body,setBody] = useState(null)
    const [image,setImage] = useState('')
    const [loading,setLoading] = useState(false)
useEffect(()=>{
  setLoading(true)
 const sendRequest =async()=>{
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
        const data = await response.json()
        setBody(data)
        const responseImage = await fetch(`https://jsonplaceholder.typicode.com/photos/${userId}`)
        const dataImage = await responseImage.json()
          setImage(dataImage.thumbnailUrl)
          setLoading(false)
    }catch(err){
       alert(err.message)
       setLoading(false)
    }
 }   
 sendRequest()
},[userId])

if(!body || !image || loading){
    return (
      <div style={{textAlign:'center'}}>
        <LoadingSpinner/>
      </div>
    )
}

  return (
    <div className={classes.user}>
        <div className={classes.details}>
        <img src={image} alt=''/>
        <div className={classes.userDetails}>
        <p>Author:{props.author}</p>
        <p>Company:{props.company}</p>
        </div>
        </div>
      <p>Title:{body.title}</p>
      <p>{body.body}</p>
    </div>
  )
}
