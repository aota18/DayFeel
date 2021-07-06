import './ExploreContainer.css';

import { useEffect, useState } from 'react';
import { getWeatherInfo } from '../modules/weather';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
// npm install --save-dev @iconify/react @iconify-icons/ic
import { Icon, InlineIcon } from '@iconify/react';
import baselineDeviceThermostat from '@iconify-icons/ic/baseline-device-thermostat';
import bxsDroplet from '@iconify-icons/bx/bxs-droplet';
import moment, { weekdays } from 'moment';
import { Geolocation} from '@capacitor/geolocation';
import {isPlatform} from '@ionic/react'

interface ContainerProps { }



const ExploreContainer: React.FC<ContainerProps> = () => {

  const dayOfWeek={
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
  }

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    dispatch(getWeatherInfo({lat: coordinates.coords.latitude, lgt:coordinates.coords.longitude}));
    setGeoLoading(false);
    console.log('Current position: ', coordinates);
  }


  const today = moment();

  const[geoLoading, setGeoLoading] = useState(false);
  const weatherInfo = useSelector((state:any) => state.weather.getWeatherInfo);
  const dispatch = useDispatch();
  const [pos, setPos] = useState({});


  useEffect(() => {

    setGeoLoading(true);
    getCurrentPosition();
    
    
    
    return () => {
      console.log(weatherInfo)
    }
  }, [])

  const [res, setRes] = useState({});

  if(geoLoading || weatherInfo.loading){
    return(
    <div className="display-center">
       <CircularProgress />
    </div>
    )
   
  }

  return (
    
    <div className="container type-b " style={{
      backgroundImage: `url(${weatherInfo.data?.result.imgUrl})`
    }}>
      
    
      
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
  );
};

export default ExploreContainer;
