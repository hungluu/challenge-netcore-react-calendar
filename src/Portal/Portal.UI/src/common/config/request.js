import axios from 'axios'

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'https://localhost:5001/v1' : 'http://localhost/api/v1',
    crossdomain: true,
    headers: {
        'Content-Type': 'application/json'
        // 'Origin': 'http://localhost:3000'
    }
})