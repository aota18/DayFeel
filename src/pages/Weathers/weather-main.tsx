import "./weather-main.css";
import { Icon } from "@iconify/react";
import bxsDroplet from "@iconify-icons/bx/bxs-droplet";
import moment from "moment";
import { ListOutline } from "react-ionicons";
import { dayOfWeek } from "../../utils/time";

interface WeatherMainProps {
  index: number;
  isOpened?: boolean;
  onToggle: any;
  weatherInfo?: any;
}

const WeatherMain: React.FC<WeatherMainProps> = ({
  index,
  isOpened,
  onToggle,
  weatherInfo,
}) => {
  const today = moment();

  return (
    <>
      <div
        className={` ${
          isOpened
            ? "container move-right expand-display"
            : "place-list shirink-display"
        }`}
        style={{ backgroundImage: `url(${weatherInfo.imgUrl})` }}
      >
        {isOpened ? (
          <div className="main-container">
            <div className="sub-container">
              <div className="text-city appear">
                {weatherInfo.city}, {weatherInfo.country}
              </div>
              <div className="text-temp appear">
                {(weatherInfo.temp - 273).toFixed(1)}°
              </div>

              <div className="text-weather-main appear">{weatherInfo.main}</div>
              <div className="text-weather-sub appear">
                {weatherInfo.description}
              </div>

              <div className="appear">
                {`${today.format("MM/DD")} ${dayOfWeek[today.day()]}`}
              </div>

              <div className="appear">
                <Icon icon={bxsDroplet} />
                {weatherInfo.humidity}%
              </div>
            </div>

            <div className="bottom-icon-container">
              <ListOutline
                color={"#00000"}
                height="24px"
                width="24px"
                onClick={() => onToggle(index)}
              />
            </div>
          </div>
        ) : (
          <div
            className="place-item"
            onClick={() => {
              onToggle(index);
            }}
            style={{
              backgroundImage: `url(${weatherInfo.imgUrl})`,
              paddingTop: `${index === 0 ? "50px" : "16px"}`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{`${today.format("MM/DD")}`}</div>
              <div style={{ fontSize: "2rem" }}>{weatherInfo.city}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "3rem",
                fontWeight: "lighter",
              }}
            >
              {(weatherInfo.temp - 273).toFixed(1)}°
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherMain;
