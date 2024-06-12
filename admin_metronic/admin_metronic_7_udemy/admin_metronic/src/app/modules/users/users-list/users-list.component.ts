import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { EditUsersComponent } from '../components/edit-users/edit-users.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
users:any = [];
isLoading$: any;
search:any="";

  constructor(
    public _userService:UsersService,
    public modalService:NgbModal,


  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.allUsers();

  }
  allUsers(){
    this._userService.allUsers(this.search).subscribe((resp:any)=>{
      console.log(resp);
      this.users  = resp.users;
    
    })
  }

  openCreate(){
    const modalRef = this.modalService.open(AddUsersComponent,{centered:true,size:'md'});
    modalRef.result.then(
      ()=>{

      },



    );
    modalRef.componentInstance.UserC.subscribe((resp:any)=>{//componente PADRE ADDUSER ES HIJO
      console.log(resp);
      this.users.unshift(resp);
    })

  }

  editUser(user){
    
    const modalRef = this.modalService.open(EditUsersComponent,{centered:true,size:'md'});
    modalRef.componentInstance.user_selected = user;

    modalRef.result.then(
      ()=>{

      },



    );
    modalRef.componentInstance.UserE.subscribe((resp:any)=>{//componente PADRE ADDUSER ES HIJO
      console.log(resp);
      let index  = this.users.findIndex(item => item._id == resp._id);
      if(index != -1){
        this.users[index] = resp;

      }

    })

  }
delete(user){
  const modalRef = this.modalService.open(DeleteUserComponent,{centered:true,size:'md'});
    modalRef.componentInstance.user_selected = user;

    modalRef.result.then(
      ()=>{

      },



    );
    modalRef.componentInstance.UserD.subscribe((resp:any)=>{//componente PADRE ADDUSER ES HIJO
      console.log(resp);
      let index  = this.users.findIndex(item => item._id == user._id);
      if(index != -1){
        this.users.splice(index,1);

      }

    })
}

refresh(){
  this.search="";
  this.allUsers();

}
                      

}
