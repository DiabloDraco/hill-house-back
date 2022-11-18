
const {timeVerify,verify} = require('../../lib/jwt.js')
const {fetch} =  require('../../lib/postgres.js')
const {GETLOGIN,GETREGISTER,GETUSER,GETPOST,PUTBALANCE, SETBALANCE} = require('./query.js')


const GET = async ({token}) =>{
  
    let {id} = verify(token)
    try {
        let user = await fetch(GETUSER,id)
        console.log(user)
        delete user.password
       
        return user
    } catch (error) {
        console.log(error)
    }
}

const POST = async ({filename},{token}) =>{
    let {id} = verify(token)
try {
    let user = await fetch(GETPOST,filename,id)
    delete user.password
    return user
} catch (error) {
    console.log(error)
}
}


const BALANCEPUT = async ({score},{token}) =>{
    let {id} = verify(token)
    try {
        let firstBalance = await fetch(GETUSER,id)
        firstBalance.score = Number(firstBalance.score)
        score = Number(score)
        firstBalance.score += score
        let userBalance = await fetch(PUTBALANCE,firstBalance.score,firstBalance.balance_id)
        return userBalance
       
    } catch (error) {
        console.log(error)
    }
}

const LOGIN = async ({email,password}) => {
try {
    let user =  await fetch(GETLOGIN,email,password)
    return user
} catch (error) {
    console.log(error)
}
}

const REGISTER = async ({username,lastname,password,contact,email,country,brithday}) =>{
    try {
        let user = await fetch(GETREGISTER,username,lastname,password,contact,email,country,brithday)
                   await fetch(SETBALANCE,user.user_id)
        return user
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    LOGIN,REGISTER,GET,POST,BALANCEPUT
}