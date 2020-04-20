import {Component} from "@angular/core";


@Component({
  selector: 'app-warning-alert',
  template: `
  <p>This is a warning, you are in danger!</p>
  `,
  styles: [
    `
      p {
        padding: 10px;
        background-color: mistyrose;
        border: 1px solid red;
        margin: 20px;
        border-radius: 5px;
      }
    `
  ]
})
export class WarningAlertComponent {

}
