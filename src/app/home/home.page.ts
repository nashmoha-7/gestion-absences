import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Student } from '../models/student';
import { AddClassService } from './services/add-class.service';
import { MatDialog,MatDialogConfig} from "@angular/material/dialog";
import { HeyComponent } from '../hey/hey.component';
import { Router } from '@angular/router';
import { EditClassComponent } from '../edit-class/edit-class.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage   {
  //constructor(private data: DataService) {}

  f: {
    localUrl: string
  }

  date=Date.now();
  databaseObj: any;
  students: Student[];
  classes: any[]=[];
  constructor(
   private addClassS: AddClassService,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
   addClassS.getMessage().subscribe(
    (m)=>{

      console.log(m);
      this.getClasses();
    }

   )
  }
 
  addClass() {
    this.getClassName();
   
  }
  getClassName() {
    console.log("get rows")
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(HeyComponent,dialogConfig)
    this.dialog.afterAllClosed.subscribe(
      ()=>{this.dialog.closeAll()}
    )
    //this.addClassS.getRows();
  }
  getRows(){
    console.log("get Rows")
    this.addClassS.getStudents(1).then((res) => {
      console.log("i am in")
      this.students = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
         
          this.students.push(res.rows.item(i));
        }
        console.log(this.students)
        
      }else{
        console.log("non")
      }
    })
    .catch(e => {
      console.log("error " + JSON.stringify(e))
    });
  }
  getClasses(){
    this.addClassS.getClasses().then((res) => {
      console.log("i am in")
      this.classes = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
         
          this.classes.push(res.rows.item(i));
        }
        console.log(this.classes)
        this.ref.detectChanges();
        
      }else{
        console.log("non")
      }
    })
    .catch(e => {
      console.log("error " + JSON.stringify(e))
    });
  }
  goToClass(id,className){
   
   this.changeRoute(id,className);
  }
  changeRoute (id,className) {
    this.router.navigate(['/class/'+id],{ state: { className: className } });
  }

  editClass(id,index){
    console.log(id,index)
    console.log("get rows")
    this.ref.detectChanges();
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="85%";
    dialogConfig.data=this.classes[index];
    console.log(dialogConfig.data)
    this.dialog2.open(EditClassComponent,dialogConfig);
    this.dialog2.afterAllClosed.subscribe(
      ()=>{
        console.log("close;")
        
       
        this.getClasses();
        this.dialog2.closeAll();
      }
    )
    
  }

}
