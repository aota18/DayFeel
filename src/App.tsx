import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, isPlatform, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import WeatherList from './pages/Weathers/weather-list'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login/Login';

import './App.css'
import Callback from './pages/callback';


const App: React.FC = () => {

  /* Disable animation & swiping back */
  setupConfig({
    animated: !isPlatform('mobileweb') && !isPlatform('mobile'),
    swipeBackEnabled: false,
  })


  /* Initiating Google Auth */
  GoogleAuth.init();


  return(
  <IonApp>
    <IonReactRouter >
      <IonRouterOutlet >
        <Route exact path="/redirect" component={Callback} /> 
        <Route exact path="/login" component={Login} />
        <Route exact path="/weathers" component={WeatherList} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
)};

export default App;
