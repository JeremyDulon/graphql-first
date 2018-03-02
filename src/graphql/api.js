/**
 * Created by jerem on 3/2/2018.
 */

const  fetch = require('node-fetch')

async function getResourceByPath (path,  id = null, method = "GET") {
    const response = await fetch(`https://jsonplaceholder.typicode.com${path}` + (id ? '/' + id : '' ))

    return await response.json()
}

module.exports = {
    getResourceByPath
}