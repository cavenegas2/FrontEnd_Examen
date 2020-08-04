import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vinculacion } from 'src/app/models/vinculacion';
import { VinculacionService } from 'src/app/services/vinculacion.service';

@Component({
  selector: 'app-vinculacion-form',
  templateUrl: './vinculacion-form.component.html',
  styleUrls: ['./vinculacion-form.component.css']
})
export class VinculacionFormComponent implements OnInit {

  title = "Nuevo registro de vinculacion";

  vinculacion : Vinculacion = new Vinculacion();
  
  form: FormGroup;  
  
  constructor(private vinculacionService: VinculacionService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre_proyecto: ['', [Validators.required]],
      lugar: [''],
      horas: [''],      
      coordinador: [''],          
    });  

    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.vinculacionService.retrieve(params['id']).subscribe(
              result =>
              { 
                this.vinculacion = result;
                this.title = "Actualizando el registro de " + this.vinculacion.nombre_proyecto;
              }
          )
        }
      }
    );
  
  }


  onSubmit() : void {
    if(this.form.invalid){
      console.error('Error en formulario');
      return;
    }

    console.log(this.vinculacion);

    this.vinculacionService.save(this.vinculacion).subscribe(
      result => {
        console.log(result);   
        this.router.navigate(['vinculacion/list']);

      }
    );
  }

  onReset() : void {   
    this.form.reset();    
  }


}
