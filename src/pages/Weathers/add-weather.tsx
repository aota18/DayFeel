import moment from "moment";
import { Icon, InlineIcon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { getWeatherInfo } from '../../modules/weather';
import { useDispatch, useSelector } from 'react-redux';
import bxsDroplet from '@iconify-icons/bx/bxs-droplet';
import CircularProgress from '@material-ui/core/CircularProgress';
import { addPlace, clearAddPlace, getPlaces } from "../../modules/place";
import './add-weather.css';



interface AddWeatherProps {
    onClearInput: any;
    onToggleSearch: any;
    onToggle: any;
    locationInfo?: any;
}
  
  
  
  const AddWeather: React.FC<AddWeatherProps> = ({onClearInput, onToggleSearch, onToggle,locationInfo}) => {

    const addPlaceInfo = useSelector((state:any) => state.place.addPlace);
    const loginInfo = useSelector((state:any) => state.user.login);
  
    const dayOfWeek={
      0: 'SUN',
      1: 'MON',
      2: 'TUE',
      3: 'WED',
      4: 'THU',
      5: 'FRI',
      6: 'SAT'
    }
  
    const today = moment();

    const dispatch = useDispatch();

    const onPressAddPlace = () => {
        dispatch(addPlace({
            userId: loginInfo.data?.user.id,
            country: weatherInfo.data?.result.country,
            city: weatherInfo.data?.result.city,
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude
        }));
    }

    

    const weatherInfo = useSelector((state:any) => state.weather.getWeatherInfo)
   
    useEffect(() => {
      dispatch(getWeatherInfo({lat: locationInfo.latitude, lgt: locationInfo.longitude}))
    }, [locationInfo]);


    if(weatherInfo.loading){
        return(
        <div className="main-container">
            <CircularProgress />
        </div>
        )
    }

    if(!addPlaceInfo.loading && addPlaceInfo.data?.ok){
      onToggle();
      onToggleSearch();
      dispatch(getPlaces({email: loginInfo.data?.user.email}));
    }


    return (
      <div 
      className="container move-right " 
       style={{ backgroundImage: `url(${weatherInfo.data?.result.imgUrl})`}}
        >
  
        
        <div className="top-menu-container">
            <div onClick={() => onToggle()}>Cancel</div>
            <div onClick={() => onPressAddPlace()}>Add</div>
        </div>
  
  
        <div className="sub-container">
        
          <div className="text-city appear">
            {weatherInfo.data?.result.city}, {weatherInfo.data?.result.country}
          </div>
          <div className="text-temp appear">
            {(weatherInfo.data?.result.temp-273).toFixed(1)}°
          </div>
        
          <div className="text-weather-main appear">
            {weatherInfo.data?.result.main}
          </div>
          <div className="text-weather-sub appear">
            {weatherInfo.data?.result.description}
          </div>
        
          <div className="appear">
            {`${today.format('MM/DD')} ${dayOfWeek[today.day()]}`}
          </div>
         
          <div className="appear">
            <Icon icon={bxsDroplet}/>{weatherInfo.data?.result.humidity}%
          </div>
  
        </div>
   
    </div>
  

    );
  
  };
  
  export default AddWeather;
  