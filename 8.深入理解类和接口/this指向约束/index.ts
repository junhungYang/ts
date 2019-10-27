{
  interface Iuser {
    name: string,
    age: number,
    sayHello(this:Iuser): void
  }
  
  const u: Iuser = {
    name: 'asd',
    age: 33,
    sayHello() {
      console.log(this)
    }
  }

  class User {
    constructor(
      public name: string,
      public age: number
    ){}

    sayHello(this: User) {
      console.log(this,this.name)
    }
  }
}