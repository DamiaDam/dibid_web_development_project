import React, { useRef, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import '../css/LocationSelectionMap.css';
import "leaflet/dist/leaflet.css";
import L, { LeafletMouseEvent } from 'leaflet';

const icon = L.icon({ iconUrl: require("../images/marker-icon.png") });

function LocationMarker() {
    const [position, setPosition] = useState({lat: 37.9718, lng: 23.7264})
    const map = useMapEvents({
      click: (location: LeafletMouseEvent) => {
        setPosition(location.latlng);
        console.log('pos: ', position);
        map.flyTo(position, map.getZoom());
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

const LocationSelectionMap: React.FC = () => {

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
                            <LocationMarker />
                        </MapContainer>
                    </div>
                </Col>
            // </Row>
        // </Container>
    );
}

export default LocationSelectionMap;