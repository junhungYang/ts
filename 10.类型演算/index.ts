{
  const a: string = 'abc'

  let b: typeof a  // 使b的类型与a的类型保持一致

  class User {
    loginid: string
    loginpwd: string
  }



  function createUser(cls: typeof User): User {
    // :User 某个数据约束为一个类表示的是 该数据必须是该类的对象，而不是该类
    // :typeof User 则可以把一个数据约束为类本身
    return new cls()
  }

  const u = createUser(User)

  interface U1 {
    loginid: string
    loginpwd: string
    age: number
  }

  function U1_PropPrint(obj: U1, prop: string) {
    // 该书写形式具有隐式的any类型存在隐患， 因为并不能确保 传入的 prop 一定是 U1成员里面的一个
    console.log(obj[prop])
  }

  function U1_PropPrint1(obj: U1, prop: 'loginid' | 'loginpwd' | 'age') {
    //这才是正确的书写方式，因为在当前情境下 prop 一定得是 U1的成员中的成员名
    console.log(obj[prop])
  }

  function U1_PropPrintByKeyof(obj: U1, prop: keyof U1) {
    // keyof的优势是它是动态的 使用keyof不需要担心 类中的成员名发生变化或成员的增减导致，prop要进行约束上的变化
    console.log(obj[prop])
  }

  type Obj = {
    // in 关键字可对成员名进行约束
    // [p in 'loginid' | 'loginpwd' | 'age']: string

    // in 与 keyof 联用
    // [p in keyof U1]:string

    // 假如用于演算的类型其成员中存在多种类型 那么可以使用 :U1[p]
    // p映射的是U1种的对应成员的成员名，那么U1[p] 则会映射至 该成员的类型
    readonly [p in keyof U1]: U1[p]
  }

  const u2: Obj = {
    loginid: 'ds',
    loginpwd: 'sdf',
    age: 12
  }

  type Partial1<T> = {
    [p in keyof T]?: T[p]
  }

  const u3: Partial1<U1> = {
    loginid: 'ds',
    loginpwd: 'sdf'
  }
}

{
  interface User {
    age: number
    name: string
  }

  let u: Partial<User>
  u = {
    age: 32
  }

  let u1:Required<User>
  u1 = {
    age: 32,
    name: 'jx'
  }

  type MyRequired<T> = {
    [p in keyof T]-?: T[p]
    // -? 表示去掉问号，即去掉可选
  }
  

  let u2:Readonly<User>
  u2 = {
    age:12,
    name: 'jx'
  }

  u2.name = '123'
}

{
  let u: Exclude<'a'|'b'|'c'|'d','b'|'c'>
  // 最终u 只能具备 a和d属性
  // type Exclude<T,U> = T extends U ? never : T
 // 判断T中的某一成员是否能匹配extends到U中，假如可以的话返回该成员(三目后面的T代表成员)，假如不行的话则不返回

  let u1: Extract<'a'|'b'|'c'|'d','b'|'c'>
  //最终u1只能具备 b 和 c 属性
  // type Exclude<T,U> = T extends U ? T : never
  // 判断T中的某一成员是否能匹配到U中，假如可以的话返回该成员，假如不行的话则不返回

  let u2: NonNullable<'a'|'b'|null|undefined>

  type func = () => number
  type returnType = ReturnType<func>  //infer表示推断

  // 场景获取函数sum的返回值类型
  function sum(a:number, b:number) {
    return `${a+b}`
  }
  // <> 内必须填类型，所以不能填<sum>，而应该是通过typeof 演算出sum的类型 <typeof sum>
  let a:ReturnType<typeof sum>
}

{
  class User {
    age: 12
  }

  let u: InstanceType<typeof User>
  // 其实通过 InstanceType演算后 得到的 就是 new User后的实例

  type twoParamsConstructor = new (arg1:any,arg2:any) => User //对构造函数进行约束

  // 当约束的构造函数 不是返回 User实例  而是 返回 其他类的实例是  Inst所推导出的类型也会发生变化
  type Inst = InstanceType<twoParamsConstructor>
}