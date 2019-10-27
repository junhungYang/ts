interface User {
  readonly id: string
  name: string
  age: number
}

let u:User = {
  id: '123',
  name: 'xx',
  age: 18
}

// 只读修饰符，修饰的目标是 只读，一旦赋值 不能再改变，
// 不存在编译结果中


// 修时数组
let arr: readonly number[] = [3,4,6]  
// readyonly 不用做修饰变量，而用作修饰变量的内容，不存在编译结果中
// 该表达式代表该数组只读，而不是代表该变量只读，变量只读的话使用const
// 该数组只读即代表，所有用于改变该数组自身结构的方法都无法使用，以及不能对成员重新赋值
// 例如push,splice,unshift， 但不改变数组自身的方法如slice,join等都可以使用

// 其他写法
let arr1: ReadonlyArray<number> = [3,4,6]


// 修饰对象中的数组
interface obj {
  readonly arr: readonly string[]
}

//第一个readonly代表const   该变量无法进行其他赋值
//第二个readyonly 代表 修饰该数组

