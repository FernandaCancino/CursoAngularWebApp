import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProductoServices } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'producto-add'
    ,templateUrl: '../views/producto-add.html'
    ,providers: [ProductoServices]
})

export class ProductoAddComponent{
    public titulo:string;
    public producto: Producto;

    constructor(
        //se injectan objetos
         private _productoService: ProductoServices
        ,private _route: ActivatedRoute
        ,private _router: Router

    ){
        this.titulo = 'Crear un nuevo producto';
        this.producto = new Producto(0, '', '', 0, '');
    }

    ngOnInit(){
        console.log('producto-add.component.ts cargado...');
    }

    onSubmit(){
        console.log(this.producto);
        //1.- agregamos la imagen
        this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then(() =>{
            console.log(result);
        }
        , (error) => {
            console.log(error);
        });

        //2.- insertamos los datos restantes del formulario 
        this._productoService.addProducto(this.producto).subscribe(
            response=>{
                
                // console.log(result);
                if(response['code'] != 200){
                    console.log(response);
                }else{
                    console.log(response);
                }
            }
            ,
            error =>{
                console.log(<any>error);
            }
        );

    }

    public filesToUpload;
    public resultUpload;
    
    /*Metodo  para cuando se elige un fichero, 
        que recive un fileInput de tipo any
        cuando hagamos un change en la propiedad de la imagen
    */
    fileChangeEvent(fileInput: any){
        //cogemos el/los ficheros que seleccionaron, y los guardamos en un array
        this.filesToUpload = <Array <File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }



}
