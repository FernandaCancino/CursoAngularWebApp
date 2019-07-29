import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoServices } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
     selector: 'producto-detail'
    ,templateUrl: '../views/producto-detail.html'
    ,providers: [ProductoServices]
})

export class ProductoDetailComponent{

    public producto:Producto;

    constructor(
         private _productoService: ProductoServices
        ,private _route: ActivatedRoute
        ,private _router: Router
    ){
        
    }

    ngOnInit(){
        console.log('producto-detail.component.ts cargado...');
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


}
