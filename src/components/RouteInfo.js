import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMotorcycle, faBus, faArrowRight } from '@fortawesome/free-solid-svg-icons';

    const vehicles = [
        { name: 'Car', icon: faCar },
        { name: 'Motorcycle', icon: faMotorcycle },
        { name: 'Bus', icon: faBus },
      ];

function RouteInfo({ start, end }) {
    const elements = [
      <div key="start" className="route-info__start">{start}</div>,
    ];
  
    vehicles.forEach((vehicle, index) => {
      elements.push(
        <div key={`arrow-${index}`} className="route-info__arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      );
  
      elements.push(
        <div key={`vehicle-${index}`} className="route-info__vehicle">
          <FontAwesomeIcon icon={vehicle.icon} />
          <span>{vehicle.name}</span>
        </div>
      );
    });
  
    elements.push(
      <div key="arrow-end" className="route-info__arrow">
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    );
  
    elements.push(
      <div key="end" className="route-info__end">{end}</div>
    );
  
    return (
      <div className="route-info">
        {elements}
      </div>
    );
  }
  
export default RouteInfo;
