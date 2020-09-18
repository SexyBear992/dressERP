const BASE_URL = process.env.VUE_APP_API_BASE_URL

let baseUrl = {
    csGet: `http://192.168.5.10:9001/dress/sys/permission/all`,
    LOGIN: `${BASE_URL}/login`,
    ROUTES: `${BASE_URL}/routes`
}

export default baseUrl
