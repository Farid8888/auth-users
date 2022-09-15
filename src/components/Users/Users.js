import React from 'react'
import UserItem from './UserItem'
import classes from './Users.module.css'

const Users =({items})=>{
    return(
        <div className={classes.users}>
            {items.map(item=>{
                return <UserItem key={item.id} userId={item.id} author={item.name} company={item.company.name}/>
            })}
        </div>
    )
}

export default Users