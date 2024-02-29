import styles from './maplocation.module.css'
// import { MapContainer } from 'react-leaflet/MapContainer'
// import { TileLayer } from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'
import { MapContainer, TileLayer, useMap , Marker , Popup , CircleMarker } from 'react-leaflet'
// import { Marker, Popup } from 'leaflet';


const MapLocation = () => {
    const position = [51.505, -0.09];

  return (
        <MapContainer 
        // style={{ height: "100%", width: "100%" }}
        center={position} 
        zoom={13} 
        style={{width:"100%",height:"100%"}}
        scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}

            <CircleMarker center={[51.51, -0.12]}  radius={20}>
                {/* <Popup>Popup in CircleMarker</Popup> */}
            </CircleMarker>
        </MapContainer>
  )
}

export default MapLocation