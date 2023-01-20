const fs = require('fs');

const axios = require('axios');

class Busquedas{

    historial = [];
    dbPath = './db/data.json';
    constructor() {
        this.leerDB();
       
    }

   get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language':'es',
            'limit':'5'
        }
    }
    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang':'es',
            'units':'metric'

        }
    }
    async ciudad(lugar=''){
        try {

            const instance = axios.create({
                baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            
        const resp = await instance.get();
        
        return resp.data.features.map(lugar => ({
            id: lugar.id
            ,nombre: lugar.place_name
            ,lgn: lugar.center[0]
            ,lat: lugar.center[1]
        }));
        } catch (error) { 
            return [];
        }
        

    }
    async climaLugar(lat, lon){
        try {
        let parametros = this.paramsOpenWeather;
        parametros.lat = lat;
        parametros.lon = lon;
        
            //Hacer peticion http para obtener datos de la peticion
           
            const instance = axios.create({
                baseURL : `https://api.openweathermap.org/data/2.5/weather`,
                params: parametros
            });

            
        const resp = await instance.get();
        
        return {
            desc: resp.data.weather[0].description,
            min: resp.data.main.temp_min ,
            max: resp.data.main.temp_max,
            temp: resp.data.main.temp
        }; 
            
        } catch (error) {
            return {};
        }
    }
    agregarHistorial(lugar=''){
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            console.log('No guarda');
            return;
        };
        this.historial.unshift(lugar.toLocaleLowerCase());
        console.log('Guarda');
        this.guardarDB();
    }

    guardarDB(){
        const payload ={
            historial : this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
    leerDB(){
       try {
        if(!fs.existsSync(this.dbPath)){
            return null;
        }
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'})
        const data = JSON.parse(info);
        console.log(data);
        this.historial =  data.historial;
       } catch (error) {
        this.historial = [];
       }
        
    }
    mostrarHistorialCapitalizado(){
        
        this.historial.forEach( (lugar,i)=>{
            const words = lugar.split(" ");

           const completa = words.map((word) => { 
                   return word[0].toUpperCase() + word.substring(1); 
            }).join(" ");
          
             console.log(`${idx} ${completa}`);
        });
    }
}

module.exports = Busquedas;
