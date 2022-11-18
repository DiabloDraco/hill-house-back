const model = require('./model.js')
const {sign} = require('../../lib/jwt.js')

const multer = require('../../lib/multer.js')
const upload = multer.single('avatar')


const LOGIN = async (req,res) =>{
    try {
        let user = await model.LOGIN(req.body)
        if(user){
            res.status(200).json({
                status:200,
                message:'your are login',
                token:sign({id:user.user_id,date:new Date()})
            })
        }else{
            res.status(200).json({
                status:404,
                message:'user not found',
                token:null
            })
        }
    } catch (error) {
        console.log(error)
    }
}


const REGISTER = async (req,res) =>{
  try {
    let user = await model.REGISTER(req.body)
    if(user){
        res.status(200).json({
            status:200,
            message:'your are rgistred',
            token:sign({id:user.user_id,date:new Date()})
        })
    }else{
        res.status(404).json({
            status:404,
            message:'error',
            token:null
        })
    }
  } catch (error) {
    console.log(error)
  }
}



const GET = async (req,res) =>{    
try {
    let user =  await model.GET(req.headers)
    if(user){
        res.status(200).json({
            status:200,
            message:'ok',
            data:user
        })
    }else{
        res.status(403).json({
            status:403,
            message:'old token',
            data:null
        })
    }
} catch (error) {
    
}
}

const POST = async (req,res) =>{    
    try {
        let user =  await model.POST(req.file,req.headers)
        if(user){
            res.status(200).json({
                status:200,
                message:'image seved!',
                data:user
            })
        }else{
            res.status(403).json({
                status:403,
                message:'old token',
                data:null
            })
        }
    } catch (error) {
        console.log(error)
    }
    }



    const BALANCEPUT = async (req,res) =>{
        try {
            let balance = await model.BALANCEPUT(req.body,req.headers)
            if(balance){
                res.status(200).json({
                    status:201,
                    message:'balance updated',
                    data:balance
                })
            }else{
                res.status(404).json({
                    status:404,
                    message:'user not found',
                    data:null
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

module.exports = {
    LOGIN ,REGISTER , GET, POST ,BALANCEPUT , upload
}