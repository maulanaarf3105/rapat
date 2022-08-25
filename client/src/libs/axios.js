import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
     baseURL: 'http://localhost:8080/',
     timeout: 1000,
     headers: {
      "Content-type": "application/json"
  }
})

Vue.prototype.$http = axiosIns

export default axiosIns
