import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpService } from 'src/app/_services/exp.service';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
  add_pmt_form: FormGroup;
  constructor(public fb: FormBuilder, private expService: ExpService) { }

  ngOnInit(): void {
    this.add_pmt_sru();
  }

  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      rid: ['', [Validators.required]],
      dt: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      pto: ['', [Validators.required]],
      head: ['', [Validators.required]],
      grp: ['', [Validators.required]],
      amt: ['', [Validators.required]],
      pamt: ['', [Validators.required]],
      purp: ['', [Validators.required]],
      usern: ['anjan'],
      type: ['PMT'],
      firm: ['ANJAN'],
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.add_pmt_form.controls[controlName].hasError(errorName);
  }  

  submitAddPmtForm(){
    if(this.add_pmt_form.valid){
      this.expService.add_exp(this.add_pmt_form.value).subscribe(res => {
        console.log(res);
        this.add_pmt_sru();
      })
    }
  }

}
