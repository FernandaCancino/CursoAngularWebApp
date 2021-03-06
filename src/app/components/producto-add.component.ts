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

    public filesToUpload;
    public resultUpload;

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

        if(this.filesToUpload && this.filesToUpload.length >= 1){
            //1.- agregamos la imagen
            this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) =>{
                console.log(result);
                //cuando esto se produzca
                this.resultUpload = result;
                this.producto.imagen = this.resultUpload.filename;
                this.saveProducto();
            }
            , (error) => {
                console.log(error);
            });
        }else{
            this.saveProducto();
        }
    }

    saveProducto(){
        //2.- insertamos los datos restantes del formulario 
        this._productoService.addProducto(this.producto).subscribe(
            response=>{
                // console.log(response);
                if(response['code'] == 200){
                    // console.log(response);
                    console.log("Entro al codigo 200");
                    // para redirigir a la pagina de listado productos
                    this._router.navigate(['/productos']);

                }else{
                    console.log("Entro a codigo distinto a 200");
                    console.log(response);
                }
            }
            ,
            error =>{
                console.log(<any>error);
            }
        );
    }

    
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
