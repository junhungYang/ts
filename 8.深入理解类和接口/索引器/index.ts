const methodName = 'sayHello'
class User {

  [prop:string]:any
  // 使用索引器类型约束 等同于约束了xx['xxx']，所以可以写xx['xxx']的索引器代码
  constructor(
    public name: string,
    public age: number
  ) {}
  [methodName]() {

  }
}

// 在TS中，默认情况下，不对索引器做严格的类型检查，
// 使用 noImplicitAny: true， 不允许产生隐式的any类型
// 隐式any: TS根据实际情况推导出的any类型

const u = new User('a',22)

u['pid'] = 3

class MyArray {
  [index:number]: string
}

const myArr = new MyArray()

myArr[0] = 'hello'

// TS中索引器的作用
// 在严格的检查下，可以实现为类动态增加成员
// 可以实现动态地操作类成员  xx['xxx']

class B {

}

class A {
  [prop:number]: B
  [prop:string]: Object
  // [prop: number]: string
  // [prop: string]: string
  
  // 在这种情况中 两者的值类型必须一样，或者说 prop:number 的类型必须时 prop:string的子类型 
  // 因为prop: number只是个语法糖，在JS中它依然时  字符串prop: string
}