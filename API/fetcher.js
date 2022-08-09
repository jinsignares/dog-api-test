import axios from "axios"

export const fetcher = async (url) => {
    return await axios
        .get(url)
        .then(res => res.data.message)
        .catch(error => {
            if (error.response.status !== 409) throw error
        })
}