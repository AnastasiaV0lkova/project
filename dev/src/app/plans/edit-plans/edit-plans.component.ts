import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MainService} from 'src/app/services/main.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { plans } from 'src/app/plans/plans.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

interface Month {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-edit-plans',
  templateUrl: './edit-plans.component.html',
  styleUrls: ['./edit-plans.component.css']
})
export class EditPlansComponent implements OnInit {

  dataSource = [{}];
  formGroups: FormGroup;
  displayedColumns: string[] = ['subject', 'day1','day2','day3','day4','day5'];
  records: plans[];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isLoading = true;
  allplans: any;
  [x: string]: any;
  getMonth: boolean;
  isShow: boolean = true;
  week: any;
  chouseDate:any;
  chouseDate2:any;
  chouseDate3:any;
  chouseDate4:any;
  chouseDate5:any;

  months: Month[] = [
    {value: 1, viewValue: 'Январь'},
    {value: 2, viewValue: 'Февраль'},
    {value: 3, viewValue: 'Март'},
    {value: 4, viewValue: 'Апрель'},
    {value: 5, viewValue: 'Май'},
    {value: 6, viewValue: 'Июнь'},
    {value: 7, viewValue: 'Июль'},
    {value: 8, viewValue: 'Август'},
    {value: 9, viewValue: 'Сентябрь'},
    {value: 10, viewValue: 'Октябрь'},
    {value: 11, viewValue: 'Ноябрь'},
    {value: 12, viewValue: 'Декабрь'}
  ];
  d = new Date();
  selectedValue: number=this.d.getMonth();

  daysInMonth() {
    const today = new Date();
    const year2 = today.getFullYear();
    const month2 = this.selectedValue;
    const day2 = new Date(year2, month2, 0).getDate();
    const  kol3 = new Date(this.today.getFullYear(), this.selectedValue, 0).getDate();
    this.kol2 = kol3;
  }
    today = new Date();
    kol = this.daysInMonth();
    monthNow = this.today.getMonth()+1;

  constructor(
    private MainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    }

    myFilter = (d: any): boolean => {
      const day = d.weekday(); 
      return day !== 0 && day !== 2 && day !== 3 && day !== 4 && day !== 5 && day !== 6;
    }
  
    minDate = new Date(this.today.getFullYear(), 0, 1);
    maxDate = new Date(this.today.getFullYear(), 11, 31);

  roles: string;
  ngOnInit(): void {
    this.roles = this.getRole('roles');
    this.getPlan();
    this.formGroups = new FormGroup({
      // id: new FormControl(this.id),
       name: new FormControl(),
       days: new FormArray([
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl(),
           plans: new FormControl('')
         })
       ]),
       subjects: new FormArray([
         new FormGroup({
           name: new FormControl(''),
         })
       ])
     });
  }

  getRole(roles: string): string{
    return localStorage.getItem(roles);
  }

  allPlans:any;
  getPlan(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if(this.roles ==='ROLE_MODERATOR'){
      this.MainService.getPlanById(id).subscribe(results=>{
        this.allplans = results;
    //    this.dataSource = new MatTableDataSource(this.allplans);
     //   this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        console.log(this.allplans);
      });
    }
  }

  chouseWeek(){
    this.isShow = false;
    this.chouseDate = new Date(this.week._i.year,this.week._i.month,this.week._i.date);
    this.chouseDate2 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+1);
    this.chouseDate3 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+2);
    this.chouseDate4 = new Date(this.week._i.year,this.week._i.month,this.week._i.date+3);
    this.chouseDate5 = new Date(this.week._i.year,this.week._i.month,this.week._i.date + 4);
    this.formGroups = new FormGroup({
      // id: new FormControl(this.id),
       name: new FormControl(null, [Validators.required]),
       days: new FormArray([
         new FormGroup({
           day: new FormControl(this.chouseDate),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.chouseDate2),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.chouseDate3),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.chouseDate4),
           plans: new FormControl('')
         }),
         new FormGroup({
           day: new FormControl( this.chouseDate5),
           plans: new FormControl('')
         })
       ]),
       subjects: new FormArray([
         new FormGroup({
           name: new FormControl(''),
         })
       ])
     });
  }

  goBack(): void {
    this.location.back();
  }

  clickEdit:boolean = true;
  edit(){
    this.clickEdit = false;
  }

  save(){
    this.clickEdit = true;
  }

  onSubmitGroups(){

  }


}
