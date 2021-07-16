import './weather-main.css';
import { Icon } from '@iconify/react';
import bxsDroplet from '@iconify-icons/bx/bxs-droplet';
import moment from 'moment';
import { ListOutline } from 'react-ionicons'



interface WeatherMainProps {
  isOpened?: boolean;
  onToggle: any;
  weatherInfo?: any;
 }



const WeatherMain: React.FC<WeatherMainProps> = ({
  isOpened,
  onToggle,
  weatherInfo,
}) => {


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




  return (
    <>
    {isOpened ?

    
    <div 
    className="container move-right " 
    style={{ backgroundImage: `url(${weatherInfo.imgUrl})`}}>

      


      <div className="main-container">
      
        <div className="text-city appear">
          {weatherInfo.city}, {weatherInfo.country}
        </div>
        <div className="text-temp appear">
          {(weatherInfo.temp-273).toFixed(1)}°
        </div>
      
        <div className="text-weather-main appear">
          {weatherInfo.main}
        </div>
        <div className="text-weather-sub appear">
          {weatherInfo.description}
        </div>
      
        <div className="appear">
          {`${today.format('MM/DD')} ${dayOfWeek[today.day()]}`}
        </div>
       
        <div className="appear">
          <Icon icon={bxsDroplet}/>{weatherInfo.humidity}%
        </div>

        <div >
          <ListOutline
            color={'#00000'} 
            height="24px"
            width="24px"
            onClick={() => onToggle()}
          />
            </div>
      </div>

   
    </div>
    :
      <div className="place-list" onClick={() => onToggle()}>
        <div className="place-item" style={{ backgroundImage: `url(${weatherInfo.imgUrl})`}}>
           <div style={{display: 'flex', flexDirection:'column'}}>
             <div>
              {`${today.format('MM/DD')}`}
             </div>
             <div style={{fontSize: '2rem'}}>
               {weatherInfo.city}
              </div>
            </div>
            <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', fontSize:'3rem', fontWeight:'lighter'}}>
              {(weatherInfo.temp-273).toFixed(1)}°
            </div>
        </div>
      </div>

    
    }
  
  </>
  );

};

export default WeatherMain;
