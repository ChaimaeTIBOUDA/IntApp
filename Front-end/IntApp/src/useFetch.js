import { useState, useEffect} from 'react'
import axios from 'axios'
// simplify the GET method to display interns 
const useFetch = (url) => {
    const [data, setData] = useState()
    useEffect(() => {
        axios.get(url)
        .then ((res) => {
            console.log(res)
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [url]);
    return data
}
export default useFetch