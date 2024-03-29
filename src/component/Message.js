import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function Message(){

    const [result, setResult] = useState(null)

    const message = async () => {
        try {
            let res = await axios.get('https://chat.pristio.com/');
            let result = res.data.msg;
            console.log(res.data.msg);
            setResult(result);
    }
        catch(e){
            console.log(e)
        }
    };
    // onSubmitHandler()

    useEffect(() =>{
        message()
    }, [])

    return  (
        <div>
        {result}
        </div>
    )
}