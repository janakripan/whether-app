import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

const [city, setCity]= useState('city')
const [temperature, setTemperature]= useState(0)
const [loading , setLoading]= useState(false)

function selectCity(cityName, latitude, longitude){
  setCity(cityName)
  setLoading(true)

  axios.get('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m')
  .then(data=>{
    const temperatureValue= data.data.current_weather.temperature
    setTemperature(temperatureValue)
    setLoading(false)
  }   
  )
  .catch(err=>{
    console.log(err)
  })
  

}

  return (
    <div className="App">
     <h1>my wheather app</h1>
     <div>
     <button onClick={()=> {selectCity('calicut', 11.25,  75.78)}}>calicut</button>
     <button  onClick={()=>{selectCity('kochin', 9.93, 76.26)}}>kochin</button>
     <button  onClick={()=>{selectCity('trivandrum', 8.52 ,76.93)}}>trivandrum</button>
     </div>
     {loading?<p>loading...</p>:<p>the current temperature in <span id='city'>{city}</span> is <span id='temperature'>{temperature} °C</span></p>}
    </div>
  );
}

export default App;
