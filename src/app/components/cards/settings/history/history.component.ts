import { Component, OnInit } from '@angular/core';
import { LogLevel } from 'src/app/models/enums/log-level.enum';
import { DebuggerService } from 'src/app/services/debugger.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public LogLevel = LogLevel;

  constructor(public debuggerService: DebuggerService) { }

  ngOnInit() {

  }

}
