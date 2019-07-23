import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProductoServices } from '../services/producto.service';
import { Producto } from '../models/producto';

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
    
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array <File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }



}
