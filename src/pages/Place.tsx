import React, {useEffect, useState} from "react";
import { FiInfo} from "react-icons/fi";
import {useParams} from 'react-router-dom'
import { Map, Marker, TileLayer } from "react-leaflet";


//components import's
import PageHeader from '../components/PageHeader'

import Loading from '../img/loading.gif'

import '../styles/pages/place.css';

import mapIcon from "../utils/mapIcon";

import api from '../services/api'

import whatsappIcon from '../img/icon/whatsapp.svg'



interface Places{
  latitude:number;
  longitude:number;
  name: string;
  floor:string;
  wich_work:string;
  fix:string;
  whatsapp:string,
  open_on_weekends:string;
  images: Array<{
    id:number;
    url:string;
  }>;
}

interface PlaceParams{
  id:string;
}

export default function Place() {
  const params = useParams<PlaceParams>();
  const [place, setPlaces] = useState<Places>();
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(()=>{
      api.get(`places/${params.id}`).then(response =>{
        setPlaces(response.data)
      })
  },[params.id]);

  if(!place){
    return <img src={Loading} alt="" className="loading"/>;
  }

 

  return (
    <div id="page-place">
      <PageHeader/>
      <main>
        <div className="place-details">
          <img src={place.images[activeImageIndex].url} alt={place.name} />

          <div className="images">
            {place.images.map((image, index )=>{
              return(
              <button  
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''} 
                type="button"
                onClick={()=>{
                  setActiveImageIndex(index);
                }}                
              >
                <img src={image.url} alt={place.name} />
              </button>
             
              )
            })}
          </div>
          
          <div className="place-details-content">
            <h4><span>Меня зовут</span> - {place.name}</h4>

           
            <div className="map-container">
              <Map 
                center={[place.latitude, place.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[place.latitude, place.longitude]} />
              </Map>

              <footer>
                <a target="_black" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}>Найди меня на карте</a>
              </footer>
            </div>
            <hr />
            <h2>Информация для клиентов</h2>
            <p><span>Квартир и этаж - </span>{place.floor}</p>
              <p><span>Вид ремонта - </span>{place.fix}</p>
              <p><span>Тип помещения - </span>{place.wich_work}</p>

            <div className="open-details">
              {place.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Да работаем до выходным <br />
                  {place.open_on_weekends}
                  </div>
              )  : (
                <div className="open-on-weekends dont-open">
                <FiInfo size={32} color=":#FF6690" />
                Нет работы по выходным<br />
                {place.open_on_weekends}
              </div>
              )}
            </div>
         
            <a className="btn" target="_black"  href={`http://wa.me/${place.whatsapp}`}>
                <img src={whatsappIcon}alt="whatsapp"/>
                свяжитесь со мной
            </a>
          
          </div>
        </div>
      </main>
    </div>
  );
}