import './ExploreContainer.css';

import { useEffect, useState } from 'react';
import { getWeatherInfo } from '../modules/weather';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
// npm install --save-dev @iconify/react @iconify-icons/ic
import { Icon, InlineIcon } from '@iconify/react';
import baselineDeviceThermostat from '@iconify-icons/ic/baseline-device-thermostat';
import bxsDroplet from '@iconify-icons/bx/bxs-droplet';

import moment from 'moment';
import { url } from 'inspector';

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

  const weatherPattern = {
    2: {
      group: "Thunderstorm",
      img : "thunderstorm.jpg"
    },
    3: {
      group: "Drizzle",
      img : "drizzle.jpg"
    },
    5: {
      group: "Rain",
      img : "rain.jpg"
    },
    6: {
      group: "Snow",
      img : "snow.jpg"
    },
    7: {
      group: "Atmosphere",
      img : "atmosphere.jpg"
    },
    8: {
      group: "Clouds",
      img : "clouds.jpg"
    },
    800: {
      group: "Clear",
      img : "clear.jpg"
    },
  }

  const today = moment();

  const[geoLoading, setGeoLoading] = useState(false);
  const weatherInfo = useSelector((state:any) => state.weather.getWeatherInfo);
  const dispatch = useDispatch();
  const [pos, setPos] = useState({});


  useEffect(() => {
    
    if(navigator.geolocation){
      setGeoLoading(true);
      navigator.permissions.query({name: "geolocation"}).then((result) => {
        if(result.state=="granted"){
          navigator.geolocation.getCurrentPosition(pos => {
            dispatch(getWeatherInfo({lat: pos.coords.latitude, lgt:pos.coords.longitude}));
            setGeoLoading(false);
          });
        }else if(result.state==="denied"){
          console.log("Denied");
        }
      })
     
    }
    
    
    
    return () => {
      console.log(weatherInfo)
    }
  }, [])

  const [res, setRes] = useState({});

  if(geoLoading || weatherInfo.loading){
    return <CircularProgress />
  }

  return (
    
    <div className="container type-b">
   
      
      <div className="text-city">
        {weatherInfo.data?.name}, {weatherInfo.data?.sys.country}
      </div>
      <div className="text-temp">
        {(weatherInfo.data?.main.temp-273).toFixed(1)}°
      </div>
    
      <div className="text-weather-main">
        {weatherInfo.data?.weather[0].main}
      </div>
      <div className="text-weather-sub">
        {weatherInfo.data?.weather[0].description}
      </div>
    
      <div>
        {`${today.format('MM/DD')} ${dayOfWeek[today.day()]}`}
      </div>
       

      <div>
        <Icon icon={bxsDroplet}/>{weatherInfo.data?.main.humidity}%
      </div>

      
      {/* <video autoPlay loop muted>
        <source src={clear} type="video/mp4"/>
      </video> */}
   
    </div>
  );
};

export default ExploreContainer;
