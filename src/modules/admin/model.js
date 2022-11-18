const { verify } = require('../../lib/jwt.js')
const {fetch, fetchAll} =  require('../../lib/postgres.js')
const {GETLOGIN,GETREGISTER,PUTADMIN,GETUSER,PUTUSER,PUT_USER_ACCOUNT, GET_ONE_USER, DELETE_ONE_USER}  = require('./query.js')

const GET = async () =>{
    try {
        let user = await fetchAll(GETUSER)
        return user 
    } catch (error) {
        console.log(error)
    }
}

const PUT_USER = async ({username,lastname,password,email,score},{userId},{token}) =>{
    try {
        let {status} = verify(token);
        if(status === 'admin'){
            let oldUser = await fetch(GET_ONE_USER,userId);
            let user = await fetch(PUT_USER_ACCOUNT,
                username ? username : oldUser.username,
                lastname ? lastname : oldUser.lastname,
                password ? password : oldUser.password,
                email ? email : oldUser.email,
                userId);
            let putUser = await fetch(PUTUSER,
                score ? score : oldUser.score,
                userId);
            user.balance = putUser.score;
            return user;
        }else{
            return null;
        }
        
    } catch (error) {
        console.log(error)
    }
}


const DELETE = async ({token},{userId}) =>{
    try {
        let {status} = verify(token)
        if(status === 'admin'){
            let deleteUser = await fetch(DELETE_ONE_USER,user = 'no active',userId)
            return deleteUser
        }else{
            return 'your are not admin!'
        }
    } catch (error) {
        console.log(error)
    }
}

const PUT = async ({adminname,password},{token}) =>{
    try {
        let {id,status} = verify(token)
       if(status === 'admin'){
        let admin = await fetch(PUTADMIN,adminname,password,id)
        delete admin.password
        return admin
       }else{
        return 'you are not admin!'
       }
    } catch (error) {
        console.log(error)
    }
}

const LOGIN = async ({adminname,password}) =>{
    try {
        let admin =  await fetch(GETLOGIN,adminname,password)
        return admin  
    } catch (error) {
        console.log(error)
    }
    
}
const REGISTER = async ({adminname,password},{token}) =>{
        try {
            let {status} = verify(token)
            if(status === 'admin'){
               let admin = await fetch(GETREGISTER,adminname,password)
               delete admin.password
               return admin
            }
        } catch (error) {
            console.log(error)
        }
}

module.exports ={
   LOGIN ,REGISTER, GET , PUT ,PUT_USER, DELETE
}