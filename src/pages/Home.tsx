import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { SplashScreen} from '@capacitor/splash-screen';
import ExploreContainer from '../components/ExploreContainer';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'; // capacitor v3
import './Home.css';
import Login from './Login/Login';

const Home: React.FC = () => {



  return (
    <IonPage>
      <IonContent fullscreen>

        <Login />
      </IonContent>
    </IonPage>
  );
};

export default Home;
