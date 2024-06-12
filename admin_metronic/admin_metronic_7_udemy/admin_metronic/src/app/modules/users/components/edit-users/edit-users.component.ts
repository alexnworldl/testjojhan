import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
@Input() user_selected: any;
@Output() UserE: EventEmitter<any> = new EventEmitter
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
    this.name  = this.user_selected.name;
    this.subname = this.user_selected.subname;
    this.email = this.user_selected.email;

  }
  save(){
    if(!this.name || !this.subname || !this.email ){
      this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps! Necesita ingresar los datos'`});
      return;
    }
    //if(this.password != this.repeat_password){
      //this.toaster.open(NoticyAlertComponent,{text:`danger- 'Upps!Necesitas ingresar contraseñas iguales'`});
      //return;
    //}
    let data = {
    _id:this.user_selected._id,
    name:this.name,
    subname:this.subname,
    email:this.email,
    password:this.password,
    repeat_password:this.repeat_password,
  
  
  
  
  }
  this.userService.updateUser(data).subscribe((resp:any)=>{
    console.log(resp);
    this.UserE.emit(resp.user);//envia la respuesta 
    this.toaster.open(NoticyAlertComponent,{text:`success- 'Upps!Usuario ACTUALIZADO'`});
      this.modal.close();
  },(error)=>{
    if(error.error){
      this.toaster.open(NoticyAlertComponent,{text:`danger- '${error.error.message}'`});
    }
  })
    }
   

}
