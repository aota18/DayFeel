import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { SplashScreen} from '@capacitor/splash-screen';
import WeatherMain from '../pages/Weathers/weather-main';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'; // capacitor v3
import './Home.css';
import Login from './Login/Login';

const Home: React.FC = () => {



  return (
    <IonPage>
      <IonContent fullscreen>
        {/* <WeatherMain isSearched={false}/> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
