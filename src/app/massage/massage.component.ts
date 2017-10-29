import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.css']
})


export class MassageComponent implements OnInit {
  @Input() inputMassage: any;
  @Input() inputUuid: any;
flagForMassage: boolean;
  constructor() { }

  ngOnInit() {
    (this.inputMassage.msg_owner === this.inputUuid)?this.flagForMassage = true:this.flagForMassage=false;
  }

}
