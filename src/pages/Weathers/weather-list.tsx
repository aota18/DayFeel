import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, setPlaces} from "../../modules/place";
import { SearchOutline } from 'react-ionicons'
import SearchCity from "./search-city";
import WeatherMain from "./weather-main";
import { IonPage } from "@ionic/react";
import cloudIcon from '../../img/cloud-icon.png';
import './weather-list.css';

const WeatherList:React.FC<any> =  () => {

    const loginInfo = useSelector((state:any) => state.user.login);
    const getPlacesData = useSelector((state:any) => state.place.getPlaces);
    const placesData = useSelector((state:any) => state.place.places);


    const [displayState, setDisplayState] = useState<any>(() => {
        const state = {}

        for(let i=0; i<10; i++){
            state[`place${i}`] = false
        }

        return state;
    });

    const dispatch = useDispatch();

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
 

  const onToggleSearchModal= () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  }

  const onToggleOpenWeather = (idx:any) => {
    setDisplayState(state => ({
        ...state,
        [`place${idx}`]: !state[`place${idx}`]
    }));
  }


    useEffect(() => {
        dispatch(getPlaces({email: loginInfo.data?.user.email}));
    }, [])

    useEffect(() => {
        dispatch(setPlaces({data:getPlacesData.data?.places}));
    }, [getPlacesData])


    if(getPlacesData.loading){
        return (
            <IonPage style={{
                display:"flex",
                alignItems: "center",
                justifyContent:"center"
            }}>
                <div className="loading">
                    <img src={cloudIcon} width="64px"/>
                    <div>
                        Loading ...
                    </div>
                </div>
            </IonPage>
        )
    }


    return (
        <IonPage>
    
        <div className="place-list-container">

       
   
            <div className="place-list">
                {placesData.data?.map((place:any, idx:number) => {
                    return (
                  
                    <WeatherMain 
                        key={idx}
                        index={idx}
                        weatherInfo={place}
                        onToggle={onToggleOpenWeather}
                        isOpened={displayState[`place${idx}`]}
                    />
                    
                  
                    )
                })}

               
               
            </div> 
    

  
    
            <div className="bottom-icon-container">
                <SearchOutline
                    color={'#00000'} 
                    height="24px"
                    width="24px"
                    onClick={() => onToggleSearchModal()}
                />
            </div>

            
            
        </div> 

         {/* Search Modal Pop-up*/}
         { isSearchModalOpen &&
         <div className={`modal ${isSearchModalOpen ? 'bottom-up' : 'top-down'}`}>
                <SearchCity 
                    onToggleModal = {onToggleSearchModal} 
        
                />
            </div>
        }   
        </IonPage>
        
    )
}

export default WeatherList