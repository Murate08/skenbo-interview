import React, { useState, FormEvent, ChangeEvent} from "react";
import { Map, Marker, TileLayer} from 'react-leaflet';
import { useHistory } from "react-router-dom";
import Header from '../components/PageHeader'
import {LeafletMouseEvent} from 'leaflet'
import { FiPlus } from "react-icons/fi";

//api connect
import api from '../services/api'


//Componetns
import Select from '../components/Select/index'


//css styles
import '../styles/pages/create-places.css';

//map icon
import mapIcon from "../utils/mapIcon";









export default function CreatePlaces() {

  const history = useHistory()

  const [position, setPosition] = useState({latitude:0, longitude:0});

  const [name, setName] = useState('');
  
  const [floor, setFloor] = useState('');
    
  const [whatsapp, setWhatsapp] = useState('');

  const [wich_work, setWichWork] = useState('');

  const [fix, setFix] = useState('');

  const [open_on_weekends, setOpenOnWeekend] = useState(true);

  const [images, setImages] = useState<File[]>([]);
  
  
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapclick(event: LeafletMouseEvent){
    const  {lat, lng} = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,

    })   

  }

  //функция для регистрации формы

   async function handleSubmit(event: FormEvent){
      event.preventDefault();
      const {latitude, longitude} = position;

      const data = new FormData();      

      data.append('name', name)
      data.append('floor', floor)
      data.append('latitude', String(latitude))
      data.append('longitude', String(longitude))
      data.append('whatsapp',  whatsapp)
      data.append('wich_work',  wich_work)
      data.append('fix',  fix)
      data.append('open_on_weekends', String(open_on_weekends))      

      images.forEach(image =>{
        data.append('images', image)
      })

       await  api.post('places',  data)

       alert('Успешная регистрация!');

       history.push('/')



    }
    //сделать выбор изображения
    function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
      if(!event.target.files){
        return
      }

      const selectedImages = Array.from(event.target.files)
      setImages(selectedImages)

      const selectedimagesPreview = selectedImages.map(image =>{
        return URL.createObjectURL(image)
      })

      setPreviewImages(selectedimagesPreview)

    }



  return (
    <div id="page-create-places">
    <Header/>
      <main>
        <form onSubmit={handleSubmit} className="create-place-form">
          <fieldset>
            <legend>Данных</legend>

            <Map 
                center={[55.665156567459036,37.590618409942635]}
                style={{ width: '100%', height: 280 }}
                zoom={14}
                onclick={handleMapclick}
                className="map"
            >
              <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

                {position.latitude !== 0 && (              
                <Marker 
                    interactive={false} 
                    icon={mapIcon} 
                    position={[
                        position.latitude,
                        position.longitude
                      ]}
                    />
                )}
    
          </Map>

        
          <div className="input-block">
            <label htmlFor="name">ФИО</label>
            <input id="name"
                  placeholder="фамилия имя"        
                  value={name}
                  onChange={event => setName(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="floor">квартир и этаж</label>
            <input id="floor"
              placeholder="дом №"
              value={floor}
              onChange={event => setFloor(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="about">Телефон</label>
            <input id="whatsapp"
              placeholder="Введите ваш телефон"
              value={whatsapp}
              onChange={event => setWhatsapp(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="images">Фото</label>
            <div className="image-container"> 
              {previewImages.map(image =>{
                return(
                  <img key={image} src={image} alt={name} />
                    )
              })}              
            <label  htmlFor="image[]"  className="new-image">
              <FiPlus size={24} color="#15b6d6" />
            </label>                
            </div>
            <input onChange={handleSelectImages} multiple type="file" id="image[]"  />

          </div>
          </fieldset>

          <fieldset>
            <legend>Данных  Ремонт</legend>
            <div className="input-block">
              <label htmlFor="wich-work">Что нужно отремонтировать</label>
                <Select
                className="select"
                  name="wich_work"
                  label="Чего вы хочешь?"
                  value={wich_work}
                  onChange={event =>  setWichWork(event.target.value)}                         
                  options={[
                    {value:'квартира' , label: 'Квартира'},
                    {value:'дом', label: 'Дом'},
                    {value:'комната', label: 'Комната'},
                    {value:'студя', label: 'Студя'},
                    {value:'офис', label: 'Офис'},     
                  ]}
                />
            </div>

            <div className="input-block">
              <label htmlFor="fix">Вид ремонта</label>                
              <Select
                className="select"
                name="fix"
                label="Чего вы хочешь?"
                value={fix}
                onChange={event =>  setFix(event.target.value)}                        
                options={[
                  {value:'наращивать' , label: 'Наращивать'},
                  {value:'ремонт', label: 'Ремонт'},
                  {value:'дизайн-интерьера', label: 'Дизайн интерьера'},                           
                ]}
              />
            </div>            

            <div className="input-block">
              <label htmlFor="open_on_weekends">Работаем до выходным</label>
              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={()=> setOpenOnWeekend(true)}
                >
                  Да
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={()=> setOpenOnWeekend(false)}
                >
                  Нет
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Подтвердить
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
