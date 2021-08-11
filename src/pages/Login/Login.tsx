import { IonContent, IonPage } from '@ionic/react';
import { SignInWithApple, SignInWithAppleOptions, SignInWithAppleResponse} from '@capacitor-community/apple-sign-in';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUserInfo } from '../../modules/user';
import { useHistory } from 'react-router';
import googleIcon from '../../img/google-icon.png';
import appleIcon from '../../img/apple-icon.png';
import appleIconBlack from '../../img/apple-icon-black.png';
import waterfall from '../../movies/waterfall.mp4';
import logo from '../../img/DayFeel-logos_white.png';
import './Login.css';
import { authorize } from '../../modules/user';

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const loginResult = useSelector((state:any) => state.user.login);

    let options: SignInWithAppleOptions = {
        clientId: "com.dayfeel",
        redirectURI: "https://dev.swseo.io:3000/redirect",
        scopes: "name email",
        state: "state",
        nonce: "nounce"

    }


    const [isHoverApple, setIsHoverApple] = useState(false);


    const toggleHoverApple = () => {
        setIsHoverApple(!isHoverApple);
    }

    useEffect(() => {
        
        if(!loginResult.loading && loginResult.data?.ok){
            dispatch(setUserInfo({data: loginResult.data.user}));
            history.replace('/weathers');
        }

        if(!loginResult.loading && !loginResult.data?.ok){
            console.log('login failed')
        }
        
    }, [loginResult])

    const signInWithGoogle = async (): Promise<void> => {
        
        const result = await GoogleAuth.signIn();
        const token = result.authentication.accessToken;

        dispatch(login({
            name: result.name,
            email: result.email,
            imageUrl: result.imageUrl,
            token
        }))

    }

    const signInWithApple = async(): Promise<void> => {
         SignInWithApple.authorize(options).then((res:any) => {
             console.log(res);
            dispatch(authorize({
                code: res.response.authorizationCode,
                token: res.response.identityToken
            }))
        })
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
                    onClick={() => signInWithGoogle()}>

                    <img className="google-logo" src={googleIcon} width="16px"/>
                       Sign in with Google
                    
                </div>

                <div
                    className="btn-login" 
                    onMouseOver={() => toggleHoverApple()}
                    onMouseLeave={() => toggleHoverApple()}
                    onClick={() => signInWithApple()}>

                    <img 
                        className="google-logo" 
                        src={!isHoverApple ? appleIcon : appleIconBlack} width="16px"/>
                       Sign in with Apple
                    
                </div>

     

               

                
                </div>

              



            
            </IonContent>
        </IonPage>
    )
}


export default Login;