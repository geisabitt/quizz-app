import { Component } from '@angular/core';

import quizz_questions from '../../../assets/data/quizz_questions.json';
import { Quiz } from '../types/quiz';

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.scss'],
})
export class QuizzListComponent {
  quizzes: Quiz[] = [];

  constructor() {
    this.quizzes = quizz_questions as Quiz[];
  }
}
