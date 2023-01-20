const inquirer = require('inquirer');
require('colors');
const preguntas = [{
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            }, 
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
}]
const inquirerMenu = async() =>{
    console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opcion'.white);
    console.log('======================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async() =>{
await inquirer.prompt([{
    name:'Confirmacion',
    message: `Presione ${ 'ENTER'.green } para continuar.`,
    type: 'input'
}]).then((result) => {
    return true;
}).catch((err) => {
    return false;
});
}
const leerInput = async(message) =>{
   
   const question =[{
    name:'desc',
    message,
    type: 'input',
    validate(value){
        if(value.length === 0){
            return 'Por favor ingrese un valor.';
        }
        return true;
    }
}];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const mostrarLugares = async(lugares =[])=>{
const choices = lugares.map((lugar,i) =>{
    const idx = `${i+1}.`.green;
    return {
        value: lugar.id
        ,name : `${idx} ${lugar.nombre}`
    }
});

choices.unshift({
     value: '0'
     ,name: '0.'.green + ' Cancelar'
})

const preguntas = [
    {
        type: 'list'
        ,name: 'id'
        ,message: 'Seleccionar lugar:'
        ,choices
    }

]

const {id} = await inquirer.prompt(preguntas);
return id;
}

const confirmar = async(mensaje) => {
    const pregunta = [
       {
        type: 'confirm'
        ,name: 'ok'
        ,message : mensaje
       } 
    ]
    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}
const mostrarListadoCheklist = async(tareas =[])=>{
    const choices = tareas.map((tarea,i) =>{
        const idx = `${i+1}`.green;
        return {
            value: tarea.id
            ,name : `${idx} ${tarea.desc}`
            ,checked: (tarea.completadoEn) ? true : false
        }
    });
    
    // choices.unshift({
    //      value: '0'
    //      ,name: '0.'.green + ' Cancelar'
    // })
    
    const pregunta = [
        {
            type: 'checkbox'
            ,name: 'ids'
            ,message: 'Seleccione'
            ,choices
        }
    
    ]
    
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
    }

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    mostrarLugares,
    confirmar,
    mostrarListadoCheklist
}