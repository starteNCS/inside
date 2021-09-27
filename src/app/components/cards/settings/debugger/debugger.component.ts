import { Component, OnInit } from '@angular/core';
import { LogLevel } from 'src/app/models/enums/log-level.enum';
import { DebuggerService } from 'src/app/services/debugger.service';

@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss']
})
export class DebuggerComponent implements OnInit {

  public LogLevel = LogLevel;

  constructor(public debuggerService: DebuggerService) { }

  ngOnInit() {

  }

}
