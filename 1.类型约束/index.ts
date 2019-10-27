// 进行类型约束 (变量，函数参数，函数返回值)
{
  let color:string = 'red'
  function add(a: number,b: number): number {
                                  //返回值
    return a + b;
  }
  let num: number = add(3,4)

}


// 基本类型
// number string boolean 数组 object
{
  function isOdd(n: number): boolean {
    return n % 2 === 0
  } 

  // 数组的类型约束必须细化至数组钟的item为什么类型
  let nums2: Array<number> = [1,2,3]  //在react <>代表一个组件，所以建议使用下面的方法
  let nums: number[] = [1,2,3]

}

// undefinde和null 可以是所有基本类型的子类型

// 其他常用类型
// 1.联合类型
// 2. void类型
// 3. never类型
// 4.字面量类型
// 5.元祖类型(Tuple)
// 6.any类型

{
// 1.联合类型(既可以是该类型也剋是另一类型)
  let name:string|undefined;

  // 当name处于联合类型，在类型判断外围进行 name.xxx 操作时是不会出现提示的
  // 因为ts并不知道name究竟是字符串还是undefined,而当进行了类型判断后
  // 在类型判断的作用域中 name.xxx可出现提示，这样一个方式称之为类型保护
  if(typeof name === 'string') {
    
  }


// 2.void类型： 通常用于约束函数的返回值，表示该函数没有任何返回
  function printMenu():void {
    console.log(1,2,3,4)
  }

// 3.never类型： 通常用于约束函数的返回值，表示该函数永远不可能结束
  //情况一 
  function throwError(msg: string):never {
    throw new Error(msg)
    console.log('never ending')
    // 该函数将永远无法结束， 原因在于 跑出错误后，之后的代码将不继续往下执行
  }
  // 情况二  死循环
  function alwaysDoSomthing():never {
    while(true) console.log('never ending')
  }


// 4.字面量类型： 使用一个值进行约束
  let a:'a';   //当进行这种情况的约束后a的值从此就被越是为 'a' 无法被改变
               //该种情况的约束与 const 定义一个常量 没有什么区别
  
  let gender:'male'|'female'
  // 字面量约束更强大的使用应是这种情况， 性别只能是男或女 不能是其之外的值

  let arr1:[]  //约束arr1永远只能取值为一个空数组

  let user: {
    name: string
    age: number
  }

// 5.元祖类型约束（Tuple）: 一个固定长度的数组，并且数组中每一项的类型确定
  let tu: [string, number]
  tu = ['3',4]

// 6. any类型： any类型可以绕过类型检查，因此，any类型的数据可以赋值给任何类型
  let data:any = 'abcdefg'
  let num:number = data   
  //因为any涵盖所有类型，所以当data赋值给类型为number的num变量时不会报错
}


// 类型别名：对已知的一些类型定义名称
{
  type Edu = '大学' | '硕士'
  type User = {
    name: string
    age: number
    gender: "male"|"female"
    edu:Edu
  }
  function getUsers():User[] {
    return []
  }
}


// 函数的相关约束
{
  // 函数重载： 在函数实现之前，对函数调用的多种情况进行定义
  function combine(a:number, b:number):number
  function combine(a:string, b:string):string
  function combine(a:number|string, b:number|string):number|string {
    if(typeof a === 'number' && typeof b === 'number') {
      return a * b
    }else if(typeof a === 'string' && typeof b === 'string') {
      return a + b
    }
    throw new Error('a和b必须是相同的类型')
  }
  const result = combine(3,3)
  

  // 可选参数： 可以在某些参数名后加上问号，表示该参数可以不用传递
  function sum(a:number,b:number,c?:number) {

  }
  sum(1,2)
}

{
  type Deck = NormalCard[]
  type Color = "♥" | "♠" | "♦" | "♣"
  type NormalCard = {
    color: Color
    mark: number
  }

  function createDeck():Deck {
    const deck:Deck = []
    for(let i = 1; i <= 13; i++) {
      deck.push({
        mark: i,
        color: "♠"
      })
      deck.push({
        mark: i,
        color: "♣"
      })
      deck.push({
        mark: i,
        color: "♥"
      })
      deck.push({
        mark: i,
        color: "♦"
      })
    }
    return deck
  }
  function printDeck(deck:Deck) {
    deck.forEach(card => {
      let str = card.color
      if(card.mark <= 10) {
        str += card.mark
      }else if(card.mark === 11) {
        str += 'J'
      }else if(card.mark === 12) {
        str += 'Q'
      }else if(card.mark === 13) {
        str += 'K'
      }
      console.log(str)
    })
  }
}
