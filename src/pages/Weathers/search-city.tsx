import { IonItem, IonLabel, IonInput, IonButton, IonList } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPlaces, searchPlace } from "../../modules/place";
import { SearchOutline } from 'react-ionicons'
import { CloseCircle } from 'react-ionicons'
import _ from 'lodash';
import './search-city.css';
import axios from 'axios'
import WeatherMain from "./weather-main";
import AddWeather from "./add-weather";

interface SearchCityProps {
    onToggleModal? : any;
    onToggleWeatherModal?: any
    
}

const SearchCity:React.FC<any> =  ({onToggleModal}) => {

    const [keyword, setKeyword] = useState<string>();

    const searchPlaceData = useSelector((state:any) => state.place.searchPlace);
    const dispatch = useDispatch();

    const [selectedLocation, setSelectedLocation] = useState({});
    const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);

    const onToggleWeatherModal= () => {
        setIsWeatherModalOpen(!isWeatherModalOpen);
      }

    const onClearInput = () => {
        setKeyword('');
    }


    const handleChange = (e) => {
        debounceHandleChange(e.target);
        setKeyword(e.target.value);
    }

    const debounceHandleChange = _.debounce((target) => {
        console.log('dispatch');
        dispatch(searchPlace({keyword : target.value}));
    }, 0);






    return (

        <div className="modal-active">
            <div className="background">
                
                <div className="input-container">

                
                <div className="custom-input">
           
                 <SearchOutline
                        color={'#00000'} 
                        height="20px"
                        width="20px"

                    />
                  
                   
                    <IonInput 
                        value={keyword} 
                        onIonChange={handleChange}> 
                    </IonInput>
                 
                   
                    <CloseCircle
                        color={'#787878'} 
                        height="20px"
                        width="20px"
                        onClick={() => onClearInput()}
                    />


                </div>
                    <div className="btn-text" onClick={() => {
                        onClearInput();
                        onToggleModal();
                    }}>
                        Cancel
                    </div>
                
                </div>
                   
                        
                    
                    
                  
              
            </div>
            
           
         
        

            <div className="list">
            
                
                {!searchPlaceData.loading ? (searchPlaceData.data?.cities.map((city: any, idx) => {
                    return (
                        <div className="list-item" key={idx} onClick={() => {
                            setSelectedLocation({
                                latitude: city.latitude,
                                longitude: city.longitude
                            })
                            onToggleWeatherModal()
                        }}>
                            <div>{`${city.name}, ${city.country}`}</div>
                        </div>
                    )
                })) : 
                <div className="list-item">
                    <div>No Results</div>
                </div>
                }
    

            </div>

       
            
            {
                isWeatherModalOpen &&
             <div className={`modal ${isWeatherModalOpen ? 'bottom-up' : 'top-down'}`}>
                <AddWeather
                onToggle={onToggleWeatherModal}
                locationInfo={selectedLocation}
                />
            </div>
            }

         
            
            
        </div> 
        
    )
}

export default SearchCity