import {Params} from "@angular/router";

export interface MusicParams extends Params {
  emotion: string,
  beat: string,
  genre: string
}
