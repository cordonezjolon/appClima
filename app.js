require('dotenv').config();
const { leerInput,inquirerMenu,pausa ,mostrarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");



const main = async() => {
    const busquedas = new Busquedas();

    let opt ;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostrar mensaje 
                const lugarBusqueda = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugarBusqueda);

                const idSeleccionado = await mostrarLugares(lugares);
                if(idSeleccionado === '0')continue;

                const lugarSel = lugares.find(l => l.id === idSeleccionado)
                busquedas.agregarHistorial(lugarSel.nombre);
                const temperaturaLugar = await busquedas.climaLugar(lugarSel.lat,lugarSel.lgn)
             
                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Lat:' , lugarSel.lat);
                console.log('Lng: ', lugarSel.lgn);
                console.log('Temperatura: ', temperaturaLugar.temp);
                console.log('Minima', temperaturaLugar.min);
                console.log('Maxima', temperaturaLugar.max);
                console.log('Como esta el clima:', temperaturaLugar.desc.green);                
                break;
            case 2:
                //console.log();

                busquedas.mostrarHistorialCapitalizado();
           
                break;
            case 0:
               
                break;
           
            default:
                console.log('No es una opcion valida, ingresa una opcion del menu.')
                break;
        }
    
        //guardarDB(tareas.listadoArr);
        await pausa();
       //if(opt !=='0') await pausa();
    } while (opt!=='0');
}

main();