import { Component } from '@angular/core';
import { Algorithm } from 'src/app/models/enums/algorithm.enum';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent {

  constructor(
    public state: StateService
  ) {
  }

  change(index: number): void {
    this.state.setAlgorithm(index as Algorithm)
  }

}
