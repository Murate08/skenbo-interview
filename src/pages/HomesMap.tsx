import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {Map, TileLayer, Marker, Popup}from 'react-leaflet'
import {FiPlus, FiArrowRight} from 'react-icons/fi'

//styles import's
import '../styles/pages/homes-map.css'

//API import
import api from '../services/api'
import PageHeader  from '../components/PageHeader'
import mapIcon from '../utils/mapIcon'



//estado para amarzer dados em umcomponentes


interface Place{
    id: number;
    latitude:number;
    longitude:number;
    name: string;

}
function PlacesMap() {
    //connectar com a api para listar

    //para listar

    const [places, setOrphanages] = useState<Place[]>([]);

    useEffect(()=>{
        api.get('places').then(response =>{
          setOrphanages(response.data)
        })
    },[]);


  return(     
    <div id="page-map">                                  
        <PageHeader/>   
        <Map 
            center={[55.665156567459036,37.590618409942635]}
            zoom={14}
            style={{width:'100%', height:'100%'}}
        >
            <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

                     {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
            {places.map(place =>{
                return(
                    <Marker
                        icon={mapIcon}
                        position={[place.latitude, place.longitude]}
                        key={place.id}
                    >
                        <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup" >
                            {place.name}
                            <Link to={`/places/${place.id}`}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>    
                        </Popup>
                    </Marker>
                )
            })}
        </Map>

        <Link to="/places/create" className="create-home">
            <FiPlus size={50} color="#fff" />
        </Link>
    </div>           
  )
}

export default  PlacesMap;