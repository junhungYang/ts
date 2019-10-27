
{
  // 存在当前两种场景

  // -----------
  // 3.isNaN() //假设数字上有isNaN方法

  // ----------
  Number.isNaN(3)

  // 当我的目的是要判断一个数字是不是NaN时
  // 既然我们要判断一个数字是不是NaN那么必然存在这样一种情况，假如我们
  // 用一个数字去判断这个数字是不是NaN这在逻辑上是说不通的，我们应该用一个
  // 生产或设计数字本身的仪器（类）去判断这个数字是不是NaN
  
}

{
  class User {
    static users:User[] = []
    constructor(
      public loginId:string,
      public loginPwd:string,
      public name:string,
      public age:number
    ){
      User.users.push(this)
    }

    sayHello() {
      console.log(`我是${this.name}，我的账号是${this.loginId}，我今年${this.age}岁`) 
    }

    static login(loginId: string, loginPwd: string): User | undefined {
      return this.users.find(u => u.loginId === loginId && u.loginPwd === loginPwd)
    }
  }
  // 假如login方法不是静态方法，那么只有在生成了 User实例后才能调用，这在逻辑上就存在歧义了
  // 实际上 User实例 应该是login后 判断 账号密码是否 正确，是则返回User实例，否则返回undefined
  // 所以login 应该是由构造函数去调用的 这就是静态方法（static）

  const u1 = new User('abc','123','小明',18)
  const u2 = new User('cde','123','小明',89)
  const u3 = new User('ddd','123','小黑',23)

  const res = User.login('abc','1233213')
  if(res) {
    res.sayHello()
  }else {
    console.log('没有该用户')
  }
}
