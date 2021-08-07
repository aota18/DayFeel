import { IonContent, IonPage } from '@ionic/react';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUserInfo } from '../../modules/user';
import { useHistory } from 'react-router';
import googleIcon from '../../img/google-icon.png';
import waterfall from '../../movies/waterfall.mp4';
import logo from '../../img/DayFeel-logos_white.png';
import './Login.css';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const loginResult = useSelector((state:any) => state.user.login);


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
            <video className="videoTag" autoPlay loop muted playsInline>
                    <source src={waterfall} type="video/mp4"/>
                </video>
             
                <div className="landing-page">

                <div className="main-section">
                    <div className="app-logo">
                        <img src={logo} height="120px"/>
                    </div>
                    <div className="app-title">
                        Feel your days.
                    </div>
                    
                </div>
               
                <div
                    className="btn-login" 
                    onClick={() => signIn()}>

                    <img className="google-logo" src={googleIcon} width="16px"/>
                       Sign in with Google
                    
                </div>

               

                
                </div>

              



            
            </IonContent>
        </IonPage>
    )
}


export default Login;