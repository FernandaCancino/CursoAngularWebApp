import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoServices } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'producto-edit'
    ,templateUrl: '../views/producto-add.html'
    ,providers: [ ProductoServices ]  
})

export class ProductoEditComponent{
    
    public titulo:string;
    public producto: Producto;
    public filesToUpload;
    public resultUpload;
    public is_edit;

    constructor(
         private _productoService: ProductoServices
        ,private _route: ActivatedRoute
        ,private _router: Router
    ){
        this.titulo = 'Editar producto';
        this.producto = new Producto(1, '', '', 1, '');
        this.is_edit = true;
    }

    ngOnInit(){
        this.getProducto();
    }


    //metodo que llama al servicio
    getProducto(){
        
        this._route.params.forEach((params: Params) =>{
            let id = params['id'];

            this._productoService.getProducto(id).subscribe(
                response =>{
                    console.log(response['code']);

                    if(response['code'] == 200){
                        this.producto = response['data'];
                        
                    }else{
                        this._router.navigate(['/productos']);
                    }
                }
                ,
                error=> {
                    console.log(<any>error);
                }
            );
        });

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
                this.updateProducto();
            }
            , (error) => {
                console.log(error);
            });
        }else{
            this.updateProducto();
        }
    }

    updateProducto(){

        this._route.params.forEach((params: Params) =>{
            let id = params['id'];
        
            //2.- insertamos los datos restantes del formulario 
            this._productoService.editProducto(id, this.producto).subscribe(
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
        });
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