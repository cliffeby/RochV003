import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MaterialModule } from "../../material.module";

@Component({
  selector: "score-detail",
  templateUrl: "./score-detail.component.html",
  styleUrls: ["./score-detail.component.css"],
  inputs: ["score"],
})
export class ScoreDetailComponent implements OnInit {


  private editTitle = false;
  @Input() score;
  @Output() public updateScoreEvent = new EventEmitter();
  @Output() public deleteScoreEvent = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateScore() {
    this.updateScoreEvent.emit(this.score);
  }

  deleteScore() {
    this.deleteScoreEvent.emit(this.score);
  }
}

