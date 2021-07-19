import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router"
import Login from "../pages/Login/Login"

const LoggedOutRouter:React.FC = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>

                <Route exact path="/login" component={Login} />
                
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
            </IonRouterOutlet>
    </IonReactRouter>
    )
}

export default LoggedOutRouter