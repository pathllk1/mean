import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ExpService } from 'src/app/_services/exp.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface autos {
  pto: string;
  head: string;
  mode: string;
  grp: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  errorMessage = '';
  isSavedFailed = false;
  add_pmt_form: FormGroup;
  add_rec_form: FormGroup;
  private subs = new Subscription();
  options: autos[] = [];
  filteredJSONDataOptions_pto: Observable<any[]>;
  filteredJSONDataOptions_mode: Observable<any[]>;
  filteredJSONDataOptions_head: Observable<any[]>;
  filteredJSONDataOptions_grp: Observable<any[]>;

  filteredJSONDataOptions_pto1: Observable<any[]>;
  filteredJSONDataOptions_mode1: Observable<any[]>;
  filteredJSONDataOptions_head1: Observable<any[]>;
  filteredJSONDataOptions_grp1: Observable<any[]>;
  constructor(public fb: FormBuilder, private expService: ExpService, private dialogRef: MatDialogRef<AddComponent>, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.add_pmt_sru();
    this.onChanges_pmt();
    this.onChanges_rec_amt();

    this.subs.add(this.expService.list_all().subscribe((data) => {
      this.options = data;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));

    this.filteredJSONDataOptions_pto = this.add_pmt_form.controls['pto'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_pto(value))
    );

    this.filteredJSONDataOptions_mode = this.add_pmt_form.controls['mode'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_mode(value))
    );

    this.filteredJSONDataOptions_head = this.add_pmt_form.controls['head'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_head(value))
    );

    this.filteredJSONDataOptions_grp = this.add_pmt_form.controls['grp'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_grp(value))
    );

    this.filteredJSONDataOptions_pto1 = this.add_rec_form.controls['pto'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_pto(value))
    );

    this.filteredJSONDataOptions_mode1 = this.add_rec_form.controls['mode'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_mode(value))
    );

    this.filteredJSONDataOptions_head1 = this.add_rec_form.controls['head'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_head(value))
    );

    this.filteredJSONDataOptions_grp1 = this.add_rec_form.controls['grp'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_grp(value))
    );
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  private json_data_filter_pto(value: string): string[] {
    const filterValue = value.toLowerCase();
    let newList = [];
    this.options.forEach(element => {
      if (element.pto.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'pto': element.pto, 'head': element.head });
      }
    })
    return newList;
  }

  private json_data_filter_mode(value: string): string[] {
    const filterValue = value.toLowerCase();
    let newList = [];
    this.options.forEach(element => {
      if (element.mode.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'mode': element.mode});
      }
    })
    return newList;
  }

  private json_data_filter_head(value: string): string[] {
    const filterValue = value.toLowerCase();
    let newList = [];
    this.options.forEach(element => {
      if (element.head.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'head': element.head});
      }
    })
    return newList;
  }

  private json_data_filter_grp(value: string): string[] {
    const filterValue = value.toLowerCase();
    let newList = [];
    this.options.forEach(element => {
      if (element.grp.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({'grp': element.grp});
      }
    })
    return newList;
  }

  onChanges_pmt(): void {
    this.add_pmt_form.controls['amt'].valueChanges.subscribe(val => {
      this.add_pmt_form.controls['pamt'].setValue(val);
    })
  }

  onChanges_rec_amt(): void {
    this.add_rec_form.controls['amt'].valueChanges.subscribe(val => {
      this.add_rec_form.controls['pamt'].setValue(val);
    })
  }

  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      rid: [Date.now().toString(), [Validators.required]],
      dt: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      pto: ['', [Validators.required]],
      head: ['', [Validators.required]],
      grp: ['', [Validators.required]],
      amt: ['', [Validators.required]],
      pamt: [''],
      purp: ['', [Validators.required]],
      usern: [this.tokenStorageService.getUser().username],
      type: ['PMT'],
      firm: [this.tokenStorageService.getUser().firm]
    })

    this.add_rec_form = this.fb.group({
      rid: [Date.now().toString(), [Validators.required]],
      dt: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      pto: ['', [Validators.required]],
      head: ['', [Validators.required]],
      grp: ['', [Validators.required]],
      amt: ['', [Validators.required]],
      pamt: [''],
      purp: ['', [Validators.required]],
      usern: [this.tokenStorageService.getUser().username],
      type: ['REC'],
      firm: [this.tokenStorageService.getUser().firm]
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.add_pmt_form.controls[controlName].hasError(errorName);
  }

  submitAddPmtForm() {
    if (this.add_pmt_form.valid) {
      this.expService.add_exp(this.add_pmt_form.value).subscribe(res => {
        console.log(res);
        this.add_pmt_sru();
        this.isSavedFailed = false;
        this.dialogRef.close();
      }, err => {
        this.errorMessage = err.error.message;
        this.isSavedFailed = true;
      }
      )
    }
  }

  submitAddRecForm() {
    let x = this.add_rec_form.controls['amt'].value;
    this.add_rec_form.controls['amt'].setValue("-" + x);
    this.add_rec_form.controls['pamt'].setValue("-" + x);

    if (this.add_rec_form.valid) {
      this.expService.add_exp(this.add_rec_form.value).subscribe(res => {
        console.log(res);
        this.add_pmt_sru();
        this.isSavedFailed = false;
        this.dialogRef.close();
      }, err => {
        this.errorMessage = err.error.message;
        this.isSavedFailed = true;
      }
      )
    }
  }

}
