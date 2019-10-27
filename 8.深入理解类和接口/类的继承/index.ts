export class Tank {
  x:number = 0
  y:number = 0
  // protected修饰符 只能在类自身和子类中访问，但如果 子类该属性进行重写 并将其公开的话（public） 那么子类所生成的实例可以访问该属性
  protected name:string = '坦克'
  
  shoot() {
    console.log('发射子弹')
  }

  sayHello() {
    // 关于方法 的 this指向，只在函数(非箭头函数)被调用时真正确定下来，哪个对象调用this则指向他

    // this补充：this只能指代由类生成的对象，而不指代类本身，我们把方法写在类中，并且在类中使用了this
    // 那么从词法上this是否就指代上方属性列表中的某个成员呢？ 错!!  准确地说此时的this不指向任何东西，它是undefined,
    // 回归最基础的知识 当我们new一个类时， 在函数的最顶端其实是 先完成了 this = {} 这一个步骤，然后最后默认返回该 对象
    // 综上所述，可以得出 this在 实例生成前不指代任何东西，它指代什么东西，是在创建了实例并通过实例调用某一方法时决定的
    console.log(`我是一个${this.name}`)
  }
}

export class PlayerTank extends Tank {
  x:number = 20
  y:number = 20    //成员重写
  name:string = '己方坦克'
  life:number = 5
  // 重写时需做到类型匹配，假如父类的方法中没有参数，那么子类对继承过来的方法进行重写时，都不能带参数
  shot() {  
    console.log('玩家坦克发射子弹')
  }

  sayHello() {
    console.log('啦啦')
  }

  test() {
    // 当子类想调用父类方法时，可以通过super调用，super指代父类,
    // 但通过super调用的方法，其内部的this指向依然是 子类的实例对象本身
    super.sayHello()

    // 在子类中没有对sayHello进行从写时，this.sayHello和super.sayHello
    // 都是调用父类的sayHello
    this.sayHello()
  }
}

export class EnemyTank extends Tank {
  name:string = '敌方坦克'
  shot() {
    console.log('敌方坦克发射子弹')
  }
}

// 类型匹配（鸭子辨型法）
// 子类的对象永远可以赋值给，类型约束为父类的变量，因为子类的成员永远是大于等于父类的成员 （这种现象称为里氏替换原则）
// 但是该对象为子类所产生的对象，需要分清楚被约束和被赋值是两个不同的概念
const p:Tank = new PlayerTank()
p.sayHello()  //己方坦克

// 假如一个变量被约束为父类，但是赋值却是子类所生成的实例，那么子类中的非继承成员将无法使用
// 原因：在当前场景下p确实具有life属性，因为p是由 子类PlayTank所生成的实例，只是该life无法被使用而已，
//      因为ts不能确认p是否真的被赋值为Tank的子类PlayerTank的实例，因为你也可以赋值为 EnemyTank的实例，甚至可以是Tank的实例
//      而EnemyTank和Tank的实例实际上不具备life成员，自然就不允许你 .life的操作了
//      但假如对p不约束为任何类型那么可以使用life属性，因为ts推到出p的类型就是 PlayerTank
p.life 

// 使用类型保护
if(p instanceof PlayerTank) {
  p.life
}