import axios from 'axios';

const instance=axios.create({
    baseURL:'https://e-commerce-34922.firebaseio.com/'
})

export default instance;