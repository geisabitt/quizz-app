import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import quizz_questions from '../../../assets/data/quizz_questions.json';
import { Option, Question, Quiz } from '../types/quiz';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent {
  // TODO: Create a route for the quiz
  // TODO: Create a page with the list of quizzes
  id: string | null = '';
  title: string = '';
  questions: Question[] = [];
  options: Option[] = [];
  quizz: Quiz = { id: '', title: '', questions: [], results: {} };
  questionSelected!: Question;
  answers: string[] = [];
  answersSelected: string = '';
  questionIndex = 0;
  questionMaxIndex = 0;
  finished: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((value) => {
      this.id = value.get('id');
    });
    this.initQuizz();
  }
  initQuizz() {
    if (quizz_questions) {
      this.finished = false;
      const desiredId = this.id;
      const filteredQuiz = quizz_questions.find(
        (quiz: Quiz) => quiz.id === desiredId
      );
      if (filteredQuiz) {
        this.quizz = filteredQuiz;
        this.title = filteredQuiz.title;
        this.questions = filteredQuiz.questions;
        this.questionSelected = this.questions[this.questionIndex];

        this.questionIndex = 0;
        this.questionMaxIndex = this.questions.length;
        this.options = this.questionSelected.options;
      } else {
        this.finished = true;
        this.answersSelected = `Questionário com ID não encontrado`;
      }
    }
  }
  async nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
      this.options = this.questionSelected.options;
    } else {
      this.finished = true;
      const finalAnswer: string = await this.chekResult(this.answers);
      this.answersSelected = this.quizz.results[finalAnswer];
    }
  }
  playerChoose(value: string) {
    this.answers.push(value);
    console.log(this.answers);
    this.nextStep();
  }
  async chekResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, index, array) => {
      if (
        array.filter((item) => item === previous).length >
        array.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
    console.log(result);
    return result;
  }
}
