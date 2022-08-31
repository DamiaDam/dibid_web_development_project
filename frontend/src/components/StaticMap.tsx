import React from 'react';
import { Col } from 'react-bootstrap';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../css/LocationSelectionMap.css';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { StaticMapProps } from '../interfaces';

const icon = L.icon({ iconUrl: require("../images/marker-icon.png") });

const StaticMap: React.FC<StaticMapProps> = ({position}) => {

    const zoom = 15;

    return (
                <Col md={5}>
                    <div className="leaflet-container">
                        <MapContainer
                            center={position}
                            zoom={zoom}
                        >
                            <TileLayer 
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} icon={icon}>
                              <Popup>
                                Your location:< br />
                                {position.lat},< br />
                                {position.lng}
                              </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </Col>
    );
}

export default StaticMap;