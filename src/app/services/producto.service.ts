//para poder injectar los servicios
import { Injectable } from '@angular/core';
//para poder realizar peticiones, y enviar cabeceras entre otras cosas.
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
//para poder utilizar el objeto map y mapear respuesta, conseguir objetos de la api, etc
import 'rxjs/add/operator/map';
//
import { Observable } from 'rxjs/observable';
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

    //funcion para subir imagenes a la bd
    makeFileRequest(url: string, params:Array<string>, files: Array<File>){

        return new Promise((resolve, reject)=>{
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i <files.length; i++){
                formData.append('uploads[]', files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open("POST", url, true);
            xhr.send(formData);
        });


    }


}

