import React, { useRef, useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import '../css/LocationSelectionMap.css';
import "leaflet/dist/leaflet.css";
import L, { LeafletMouseEvent } from 'leaflet';
import { LocationMarkerProps, MapCoordsDTO } from '../interfaces';

const icon = L.icon({ iconUrl: require("../images/marker-icon.png") });

const MyLocationMarker: React.FC<LocationMarkerProps> = ({position, setPosition}) => {
    // const [position, setPosition] = useState({lat: 37.9718, lng: 23.7264})
    const map = useMapEvents({
      click: (location: LeafletMouseEvent) => {
        setPosition(location.latlng);
        // console.log('pos: ', position);
        // map.flyTo(position, map.getZoom()); // removed flyTo as it is inaccurate
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          Your location:< br />
          {position.lat},< br />
          {position.lng}
        </Popup>
      </Marker>
    )
  }

const LocationSelectionMap: React.FC<LocationMarkerProps> = ({position, setPosition}) => {

    // const [position, setPosition] = useState<{lat: number, lng: number} | null>({lat: 37.9718, lng: 23.7264})

    const removeMarker = () => {
      setPosition(null);
    }

    // const handleSetPosition = (position: MapCoordsDTO | null) => {
    //   setPosition(position)
    // }

    const [center, setCenter] = useState({lat: 37.9718, lng: 23.7264});
    const zoom = 15;
    const mapRef = useRef();

    return (
        // <Container>
            // <Row>
                <Col>
                    <div className="leaflet-container">
                        <MapContainer
                            center={center}
                            zoom={zoom}
                        >
                            <TileLayer 
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MyLocationMarker position={position} setPosition={setPosition}/>
                        </MapContainer>
                        <Button style={{"position": "absolute", "left": "0"}} onClick={removeMarker}>Remove Marker</Button>
                    </div>
                </Col>
            // </Row>
        // </Container>
    );
}

export default LocationSelectionMap;