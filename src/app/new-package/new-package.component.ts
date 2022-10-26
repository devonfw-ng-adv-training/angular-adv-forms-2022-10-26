import { Component, OnInit } from '@angular/core';
import { AvailabeService } from '../model/availabe-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit {

  availableServices: AvailabeService[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.availableServices = this.activatedRoute.snapshot.data['services'];
  }

}
