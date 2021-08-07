import { IonInput } from "@ionic/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearAddPlace, getPlaces, searchPlace } from "../../modules/place";
import { SearchOutline } from 'react-ionicons'
import { CloseCircle } from 'react-ionicons'
import _ from 'lodash';
import AddWeather from "./add-weather";
import './search-city.css';

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
        setKeyword(e.target.value);
        debounceHandleChange.current(e.target);
    }

    const debounceHandleChange = useRef(_.debounce((target) => {
        dispatch(searchPlace({keyword : target.value}));
    }, 500));






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
                  
                    <div className="input-box">
                    <IonInput
                        value={keyword} 
                        onIonChange={handleChange}
                    /> 
                    </div>
                 
                   
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
            
                
                {!searchPlaceData.loading && (searchPlaceData.data?.cities.length > 0) ? (searchPlaceData.data?.cities.map((city: any, idx) => {
                    return (
                        
                        <div className="list-item" key={idx} onClick={() => {
                            dispatch(clearAddPlace());
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
                    onClearInput={onClearInput}
                    onToggleSearch={onToggleModal}
                    onToggle={onToggleWeatherModal}
                    locationInfo={selectedLocation}
                />
            </div>
            }

         
            
            
        </div> 
        
    )
}

export default SearchCity