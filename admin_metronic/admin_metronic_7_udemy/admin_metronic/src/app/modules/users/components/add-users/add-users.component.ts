import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
@Output() UserC: EventEmitter<any> = new EventEmitter();
@Input() user_selected:any;

name:any = null;
subname:any=null;
email:any=null;
password:any=null;
repeat_password:any=null;

  constructor(
    public modal: NgbActiveModal,
    public userService:UsersService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }
  save(){
    if(!this.name || !this.subname || !this.email || !this.password || !this.repeat_password){
      this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps! Necesita ingresar los datos'`});
      return;
    }
    if(this.password != this.repeat_password){
      this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps!Necesitas ingresar contraseñas iguales'`});
      return;
    }
    let data = {
    name:this.name,
    subname:this.subname,
    email:this.email,
    password:this.password,
    repeat_password:this.repeat_password,
  
  
  
  
  }
  this.userService.createUser(data).subscribe((resp:any)=>{
    console.log(resp);
    this.UserC.emit(resp.user);//envia la respuesta 
    this.toaster.open(NoticyAlertComponent,{text:`success- 'Upps!Usuario Registrado'`});
      this.modal.close();
  },(error)=>{
    if(error.error){
      this.toaster.open(NoticyAlertComponent,{text:`danger- '${error.error.message}'`});
    }
  })
    }
   

  }



