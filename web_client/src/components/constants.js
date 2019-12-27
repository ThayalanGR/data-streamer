let urlString = window.location.origin.split(":")
let url = urlString[0] + ":" + urlString[1]

export default {
    baseUrl: `${url}:4000/api`
}