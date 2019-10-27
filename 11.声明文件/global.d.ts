
/// <reference path="./lodash.d.ts" /> 

// declare表示声明

interface Console {
  log(message?:any): void
  error(message?:any): void
}

declare var console: Console

// declare namespace console {
//   function log(message?:any): void
//   function error(message?:any): void
// }

type timeHandler = () => void

declare function setTimeout(handler:timeHandler,miliseconds:number):number

declare function setInterval(handler:timeHandler,miliseconds:number):number