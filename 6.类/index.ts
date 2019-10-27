{
  class User {
    // 一个类中具有什么属性应该是从一开始就被确定下来的,所以ts要求
    // 在构造函数内对属性进行赋值钱，应先通过属性列表去描述类中的属性
    
    readonly id:number  //不能改变(只在构造函数外)
    gender: '男' |'女' = '男' //默认值
    pid?: string  //非必传 字符串或 undefined的联合类型

    private _publishNumber: number = 3  //private只能在该类中使用
    private _curNumber: number = 0
                     
    constructor(public name:string,private _age:number) {
      // 属性简写：name在参数中添加上了任意一个访问修饰符，其作用等同于 成员age 的整个流程
      this.id = Math.random()
    }
    
    set age(value:number) {
      if(value < 0) {
        this._age = 0
      }
      else if (value > 200) {
        this._age = 200 
      }
      else {
        this._age = value
      }
    }
    get age() {
      return Math.floor(this._age)
    }

    publish(title:string) {
      if(this._curNumber < this._publishNumber) {
        this._curNumber ++
        console.log('发布一篇文章：' + title)
      }else {
        console.log('今日发布的文章数量已达上限')
      }
    }
  }
  
  const u = new User('abid',123)
  // u.gender = '女'
}