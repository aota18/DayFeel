import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUserInfo } from '../../modules/user';
import { useHistory } from 'react-router';
import { Storage } from '@capacitor/storage';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const loginResult = useSelector((state:any) => state.user.login);

    const [userId, setUserId]  = useState<any>();

    useEffect(() => {
        
        if(!loginResult.loading && loginResult.data?.ok){
            dispatch(setUserInfo({data: loginResult.data.user}));
            history.push('/weathers');
        }

        if(!loginResult.loading && !loginResult.data?.ok){
            console.log('login failed')
        }
        
    }, [loginResult])

    const signIn = async (): Promise<void> => {
        
        const result = await GoogleAuth.signIn();
        // console.info('result', result);

        const token = result.authentication.accessToken;

        dispatch(login({
            name: result.name,
            email: result.email,
            imageUrl: result.imageUrl,
            token
        }))

    }


    return (
        <IonPage>
            <IonContent>
                <IonButton onClick={() => signIn()}>
                    Login with Google
                </IonButton>


                {JSON.stringify(loginResult)}
            </IonContent>
        </IonPage>
    )
}


export default Login;