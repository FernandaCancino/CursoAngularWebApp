//para poder injectar los servicios
import { Injectable } from '@angular/core';
//para poder realizar peticiones, y enviar cabeceras entre otras cosas.
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
//para poder utilizar el objeto map y mapear respuesta, conseguir objetos de la api, etc
// import 'rxjs/add/operator/map';
//
//import { Observable } from 'rxjs/observable';
import { Producto } from '../models/producto';
import { GLOBAL } from './global';

@Injectable()
export class ProductoServices{
    public url: string;
    
    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url;
    }

    getProductos(){
        // return this._http.get(this.url+'productos').map(res => res.json());
        // return (this._http.get(this.url+'productos')).map(res => res.json());
        return (this._http.get(this.url+'productos'));
    }

    getProducto(id){
        //realizamos una peticion ajax
        return (this._http.get(this.url+'producto/'+id));
        
    }

    addProducto(producto: Producto){

        //convertimos el objeto producto a un string de json
        let json = JSON.stringify(producto);

        //parametros que se envian a la peticion ajax al servidor (string de json), e insertan los datos a la bd
        let params = 'json='+json;

        //como nuestro backend procesa la informacion que llega por post
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

        /*
            devolvemos el resultado de la peticion que hacemos por post
            utilizando el servicio http de angular, }
            le enviamos 
                        +la url de la api 
                        + el metodo que utilizaremos de la api 
                        + los parametros 
                        +los headers
            y por ultimo se mapea la respuesta, utilizando el metodo map, se recibe la respuesta, y se convierte en un objeto usable en js
        */
        
        //return this._http.post(this.url+'productos', params, {headers: headers}).map(res => res.json());
        
        return this._http.post(this.url+'productos', params, {headers: headers});
        //return this._http.post(this.url+'productos', params,{headers});
    }

    /*funcion para subir imagenes a la bd
        'hazme una subida de archivos', como parametros de entrada le paso
            -una url de tipo string
            -parametros de peticion: un array de tipo string 
            -parametro files (que son los ficheros que va a subir), es una array de objeto File de js
    */
    makeFileRequest(url: string, params:Array<string>, files: Array<File>){

        //devolvemos una promesa, a traves de una funcion callback se realiza un resolve, reject
        return new Promise((resolve, reject)=>{
            //con esto simulamos un formulario normal
            var formData: any = new FormData();
            //con esto dejamos disponible el objeto para realizar paticiones ajax
            var xhr = new XMLHttpRequest();

            //para recorrer todos los ficheros que hay dentro del array de Files, creamos el bucle for
            //asi vamos iterando y añadiendo ficheros al formulario que vamos a enviar
            for(var i = 0; i <files.length; i++){
                /*AÑADIMOS
                    -uploads[] = es el name del campo que recibimos en el backend
                    -files[i] = recorre los ficheros, iterando y cojiendo el fichero correcto
                    -files[i].name = recojemos el nombre del fichero
                */ 
                formData.append('uploads[]', files[i], files[i].name);
            }

            //cuando la peticion ajax este preparada, realizamos una funcion anonima
            xhr.onreadystatechange = function(){
                //como funcionan las peticiones ajax 
                if(xhr.readyState == 4){
                    //si el estatus de la peticion es 200...
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            /*abrimos la peticion ajax, indicandole:   
                -el metodo que utilizamos
                -la url donde hacemos la peticion ajax
                -le decimos true para que la lance            
            */
            xhr.open("POST", url, true);
            /*Enviamos la peticion ajax (el formulario) */
            xhr.send(formData);

            /*Ahora ya tenemos el metodo preparado , y podemos utilizarlo en producto-add.component.ts */
        });


    }


    
    //para modificar un producto
    editProducto(id, producto: Producto){

        //convierte un objeto javascript a un string de  JSON
        let json = JSON.stringify(producto);
        //definimos el parametro json, y le pasamos el jsn en formato string creado anteriormente
        let params = "json="+json;
        //creamos una variable headers, hacemos una instancia del objeto Headers, que dentro tiene una configuracion json 
        //con el content type, y le decimos que es de tipo application/x-www-form-urlencoded
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'update-producto/'+id, params, {headers: headers});


    }

}

