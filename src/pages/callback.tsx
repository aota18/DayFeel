import qs from 'qs';
import { useEffect } from 'react';

const Callback = ({history, location}) => {

    useEffect(() => {
       const getToken = async () => {
           const {code} = qs.parse(location.search);

           console.log(code);
       }

       getToken();
    }, [history, location])
    return (
        <div>
            Callback
        </div>
    )
}

export default Callback;