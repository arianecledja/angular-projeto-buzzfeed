import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    // se ele está na memória
    if(quizz_questions) {
      this.finished = false
      // adicionar título do json a variável title
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions 
      this.questionSelected = this.questions[this.questionIndex]

      // alterar o ponteiro
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  // armazena no array o que o jogador escolheu
  playerChoose(value:string) {
    this.answers.push(value)
    // quando salvar uma resposta chama o nextStep
    this.nextStep()
    console.log(this.answers)
  }

  async nextStep() {
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length 
        ){
          return previous
      }else {
        return current
      }
    })

    return result
  }
  
}
