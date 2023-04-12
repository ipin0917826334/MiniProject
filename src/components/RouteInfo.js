import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';


const RouteInfo = ({ start, end }) => {
  return (
    <div className="route-info">
      <div className="route-info__item">
        <strong>Start:</strong> {start.lat}, {start.lng}
      </div>
      <div className="route-info__item">
      <FontAwesomeIcon icon={faCar} className="route-info__vehicle" />
      </div>
      <div className="route-info__item">
        <strong>End:</strong> {end.lat}, {end.lng}
      </div>
    </div>
  );
};

export default RouteInfo;
