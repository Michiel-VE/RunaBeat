import {Component, OnInit} from '@angular/core';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-emotion',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public user!: User
  faArrow = faArrowRight
  emotionArr = ['Motivated', 'Physically Exhausted', 'Mentally Exhausted', 'Frustrated', 'Sad']
  beatArr = ['Easy', 'Medium', 'Hard']
  genreArr = ['Pop', 'Hip Hop - R&B', 'Electronic']
  pickedEmotion: string
  pickedBeat: string
  pickedGenre: string

  constructor(private router: Router, public authService: AuthServiceService) {
  }

  ngOnInit(): void {
    const userValue = localStorage.getItem('user') || ''
    this.user = JSON.parse(userValue)
    this.authService.user = this.user
  }

  pickEmotion(emotion: string) {
    this.pickedEmotion = emotion
  }

  pickBeat(beat: string) {0
    this.pickedBeat = beat
  }

  pickGenre(genre: string) {
    this.pickedGenre = genre
    console.log('emotion', this.pickedEmotion)
    console.log('beat', this.pickedBeat)
    console.log('genre', this.pickedGenre)
  }

  startRun(emotion: string, beat: string, genre: string) {
    this.router.navigateByUrl('/start')
  }
}
