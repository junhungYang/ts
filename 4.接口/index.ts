// 接口和类型兼容性

// 接口（扩展类型）

// ts 的接口：用于约束类，对象，函数的标准，接口即一种（契约）标准

// 契约（标准的形式）：
// - API文档，若标准
// -代码约束，强标准

{
  // 不会存在于编译结果中
  // 接口约束对象
  interface User {
    name: string
    age: number
    sayHello: () => void  //函数没有参数  返回类型为void(即没有返回值)
    // sayHello(): void
  }

  // 接口与类型别名的区别仅在于约束类上
  // type User1 = {
  //   name: string
  //   age: number
  // }

  let u:User = {
    name: 'junxing',
    age: 20,
    sayHello() {
      console.log('abc')
    }
  }


  // 接口直接约束函数
  // type Condition = (n:number) => boolean
  interface Condition { //该花括号不代表对象，代表的是定界符
    (n:number): boolean
  }
  function sum1(numbers:number[],callBack:Condition) {
    let s = 0;
    numbers.forEach(n => {
      if(callBack(n)) {
        s += n
      }
    })
    return s
  }
  const result = sum1([3,4,5,11],n => n % 2 !== 0)
  console.log(result)
}

{
    // 接口口可以继承
    interface A {
      T1:string
    }

    interface B extends A {
      T2: number
    }

    let u:B = {
      T1: 'asd',
      T2: 123
    }

    interface C {
      T3:boolean
    }

    interface D extends A,C {
      T4: string
    }

    let y:D = {
      T1: 'asd',
      T3: true,
      T4: 'ccc'
    }

    // 使用类型别名可以实现类似的组合效果，通过&(交叉类型)
    type A1 = {
      T1: string
    }
    type B1 = {
      T2: number
    }
    type C1 = {
      T3:boolean
    } & A & B

    // 但接口的继承与 类型别名的交叉间存在差别
    
    // 子接口不能改动(覆盖)父接口的约束，
    // 即不能通过一个与父接口中同名的类型约束去覆盖父接口中的类型约束
    // 但类型别名中的交叉同名类型可以相互合并，即假如A1的T1为string
    // C1中的T1为number的话，合并后的结构就变成既是number又是string
    // 但往后使用C1进行类型约束时，T1将无法进行赋值，因为不存在一种既是number又是string的类型

  }

