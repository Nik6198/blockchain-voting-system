const axios = require('axios');

module.exports = async function(){
    const result = await axios.post('http://localhost:3002/authorization/l')
    console.log(result);
    return this.props.history.push('/login');

}