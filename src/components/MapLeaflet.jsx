import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/leaflet.css';

const position = [51.505, -0.09];

const PopupExample = () => {
  return (
    <MapContainer style={{ height: '500px' }} center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <img
          src='https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
          class='leaflet-marker-icon leaflet-zoom-animated leaflet-interactive'
          alt=''
          tabindex='0'
          style={{
            marginLeft: '-12px',
            marginTop: '-41px',
            width: '25px',
            height: '41px',
            transform: 'translate3d(382px, 250px, 0px)',
            zIndex: '250',
            outline: 'none',
          }}
        ></img>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PopupExample;
