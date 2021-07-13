import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../modules/user';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {

    const dispatch = useDispatch();


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
            </IonContent>
        </IonPage>
    )
}


export default Login;