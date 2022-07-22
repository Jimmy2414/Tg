# Reading

Desarrollar usando React.js un componente de tipo dropdown (o combobox) con las siguientes pasos:

- Al desplegarlo consultará a un servicio de firebase buscando coincidencias según el texto escrito (o sin filtro, en caso de que no se haya escrito texto).

- El modelo en firebase consistirá de los siguientes atributos:

1. nombre
2. razón social
3. nit
4. teléfono
5. código

- Debe solicitar resultados paginados de 20 en 20, y solo deberá traer la siguiente página cuando se esté scrolleando cerca al final de la lista actual de resultados.

- Debe permitir parametrizar por qué atributo del objeto se buscará. La parametrización se debe hacer por código, no en tiempo de ejecución.

- El primer resultado del dropdown debe ser una opción fija que al darle click levante un pequeño pop-up, parte del componente, que permita agregar un nuevo objeto con el texto ya ingresado, pero permitiendo editarlo antes de guardar también.

##
