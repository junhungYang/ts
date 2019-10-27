{
  abstract class Chess {
    x:number = 0
    y:number = 0
    //抽象成员，字类必须去实现
    abstract readonly name:string 

    // 每个棋子都能移动，但在抽象类中冰不能确定它应该怎样移动时，使用抽象方法
    move(targetX:number, targetY:number):boolean  {
      console.log('1.边界判断')
      console.log('2. 目标位置是否有己方棋子')
      if(this.rule(targetX,targetY)) {
        this.x = targetX
        this.y = targetY
        return true
      }
      return false
    }

    protected abstract rule(targetX:number,targetY:number):boolean;
  }


  class Horse extends Chess {
    protected rule(targetX: number, targetY: number): boolean {
      // 书写移动规则
      // 当生成实例后调用move方法，将自动调用该rule 假如rule通拓将实现移动
      return true
    }
    readonly name:string = '马'

    
  }


  class Pao extends Chess {
    protected rule(targetX: number, targetY: number): boolean {
      return true
    }
    readonly name: string

    constructor() {
      super()
      this.name = '炮'
    }

  }

  class Soldier extends Chess {
    protected rule(targetX: number, targetY: number): boolean {
      return true
    }
    get name():string {
      return '兵'
    }

  }

  abstract class AbstractChild extends Chess {
    // 抽象字类可以不实现抽象父类中的抽象成员，也可以实现抽象父类中的抽象成员
    // 当抽象父类中的抽象成员在该抽象子类中已经可以确定它的特征时，那么就可以在抽象子类中进行实现，
    // 当然也可以在继承该抽象子类的普通类中一并实现所有抽象成员,
    // 抽象子类之所以也可以不实现抽象父类中的成员的原因是：该抽象子类同样无法创建实例，
    // 只要它无法创建实例，那么它不实现抽象父类中的抽象成员也是安全的
  }

  const h = new Horse()
  const p = new Pao()
  const s = new Soldier()

  //当把Chess变为一个抽象类后，将无法创建实例
  // const c = new Chess()  
}