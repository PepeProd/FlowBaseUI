import axios from 'axios'

export default {
    getBaseUrl: function() {
        //return 'http://flowbase-api-lb-1387389396.us-east-2.elb.amazonaws.com'
        return 'http://18.217.154.212:5000'
        //return 'http://18.219.139.17'
        //return 'http://192.168.1.221:5000' //(home)
        //return 'http://192.168.0.18:5000'
    }
}