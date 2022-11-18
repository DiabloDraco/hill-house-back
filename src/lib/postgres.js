const {Pool} = require('pg')

const {pgConfig,secretkey} = require('../config')
const pool = new Pool(pgConfig)

async function fetch(Sql,...params){
    const cilent = await pool.connect()
    try {
        const { rows:[row] } = await cilent.query(Sql , params.length ? params : null)
       return row
    } catch (error) {
        console.log(error)
    }finally{
        await cilent.release()
    }
}

async function fetchAll(Sql,...params){
    const cilent = await pool.connect()
    try {
        const {rows} = await cilent.query(Sql, params.length ? params : null)
        return rows
    } catch (error) {
        console.log(error)
    }finally{
        await cilent.release()
    }
}

module.exports = {
    fetch, fetchAll
}