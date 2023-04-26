import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  icon = '';
  textFeatured = '';
  text = '';
  
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef  
  ) { }

  ngOnInit(): void { 
    this.icon = this.config.data.icon;
    this.textFeatured = this.config.data.textFeatured;
    this.text = this.config.data.text;
  }

  fechar() {
    this.ref.close();
  }

}
