import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"
import WeatherList from "../pages/Weathers/weather-list"

const LoggedInRouter:React.FC = () => {
    return (
        <IonReactRouter>
      <IonRouterOutlet>

        <Route exact path="/weathers" component={WeatherList} />
         
        <Route exact path="/">
          <Redirect to="/weathers" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
    )
}

export default LoggedInRouter