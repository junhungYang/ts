
export interface IFireShow {
  singleFire(): void
  doubleFire(): void
}

export interface IWisdomShow {
  suanshuti(): void
  dance(): void
}

export interface IBalanceShow {
  dumuqiao(): void
  zougangsi(): void
}

export abstract class Animal {
  abstract type: string;

  constructor(
    public name: string,
    public age: number
  ){

  }

  sayHello() {
    console.log(`我是${this.type},我叫${this.name},今年${this.age}`)
  }
}

// class本身只是描述了它是啥，但并没有描述它具有什么能力
// implements 用于要求一个类必须实现某种能力，假如不实现则会报错，这就形成了强约束
export class Lion extends Animal implements IFireShow  {
  singleFire(): void {
    throw new Error("Method not implemented.");
  }
  doubleFire(): void {
    throw new Error("Method not implemented.");
  }
  type:string = '狮子'

  
}

export class Tiger extends Animal implements IFireShow {
  singleFire(): void {
    throw new Error("Method not implemented.");
  }
  doubleFire(): void {
    throw new Error("Method not implemented.");
  }
  type:string = '老虎'
}

export class Monkey extends Animal implements IBalanceShow {
  dumuqiao(): void {
    throw new Error("Method not implemented.");
  }
  zougangsi(): void {
    throw new Error("Method not implemented.");
  }
  type:string = '猴子'
}

export class Dog extends Animal implements IWisdomShow {
  suanshuti(): void {
    throw new Error("Method not implemented.");
  }
  dance(): void {
    throw new Error("Method not implemented.");
  }
  type:string = '狗'
}

const animals: Animal[] = [
  new Dog('旺财', 18),
  new Tiger('大狮',20),
  new Lion('大虎',23)
]

// 类型保护函数： is 用于判断是不是某个类型或拥有某个类型，要求返回true or false
function hasFireShow(ani:object): ani is IFireShow {
  if((ani as IFireShow).singleFire && (ani as IFireShow).doubleFire) {
    return true
  }
  return false
  // 把ani 当作IFireShow 的情况下判断是否有signleFire和doubleFire
  // 之所以不能 ani.single的原因是，ts不能确定ani是IFireShow类型，
  // 所以它认为 ani.singleFire是由隐患的，而在这种情况下使用as其实就是告诉TS
  // 我清楚该类型可能不是IFireShow，但我愿意假设它是，因为我并不是用户执行该方法
  // 而仅仅是用于判断，假设是用于判断的话，在原则上(js中)是不会报错的
}

animals.forEach(a => {
  if(hasFireShow(a)) {
    a.singleFire()
    a.doubleFire()
  }
})

class A {
  a1:string = ''
  a2:string = ''
  a3:string = ''
}

class B {
  b1: number = 0
  b2: number = 0
  b3: number = 0
}

// 接口C继承了 类A和类B就意味着，被约束为C的对象必须具有A和B类的所有成员
interface C extends A,B {

}

const c:C = {
  a1: 'x',
  a2: 'xx',
  a3: '',
  b1: 1,
  b2: 2,
  b3: 3
}