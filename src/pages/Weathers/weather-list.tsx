import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlace, getPlaces, setPlaces} from "../../modules/place";
import { SearchOutline } from 'react-ionicons'
import './weather-list.css';
import redux from 'redux';
import SearchCity from "./search-city";
import WeatherMain from "./weather-main";
import { IonButton, IonPage } from "@ionic/react";

const WeatherList:React.FC<any> =  () => {


    const getPlacesData = useSelector((state:any) => state.place.getPlaces);
    const placesData = useSelector((state:any) => state.place.places);
    const [isOpenWeather, setIsOpenWeather] = useState(false);
    const dispatch = useDispatch();

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
 

  const onToggleSearchModal= () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  }

  const onToggleOpenWeather = (idx:any) => {
    setIsOpenWeather(!isOpenWeather)
  }




  const onAddNewPlace = ({country, city, latitude, longitude}) => {
      dispatch(addPlace({country, city, latitude, longitude}))
  }


    useEffect(() => {
        
        dispatch(getPlaces({email: "sapphire031794@gmail.com"}));
    }, [])

    useEffect(() => {
        dispatch(setPlaces({data:getPlacesData.data?.places}));
    }, [getPlacesData])


    return (
        <IonPage>
        <div className="place-list-container">
       
            {!placesData.loading ? 
            <div className="place-list" >
                {placesData.data?.map((place:any, idx) => {
                    return (
                  
                    <WeatherMain 
                        key={idx} 
                        weatherInfo={place}
                        onToggle={onToggleOpenWeather}
                        isOpened={isOpenWeather}
                    />
                    
                  
                    )
                })}

               
               
            </div> : <div></div>
            } 


        {/* {JSON.stringify(placesData)} */}

        {/* Weather-Main */}
        


        {/* Search Modal Pop-up*/}
            <div className={`modal ${isSearchModalOpen ? 'bottom-up' : 'top-down'}`}>
                <SearchCity 
                    onToggleModal = {onToggleSearchModal} 
        
                />
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
        </IonPage>
        
    )
}

export default WeatherList