{
  type constructor = new (...args:any[]) => object
  function test(target: constructor) {
    //用 new () => object的形式去约束一个类
    // 用...args:any[]结合拓展运算符表示剩余参数，约束类的参数 
  }

  function test2(str:string) {
    return function(target: constructor) {

    }
  }

  @test
  @test2('hello')
  // 装饰器的运行顺序是 从下到上 , 需要注意的是 在当前场景中  test2 不是装饰器  test2执行后返回的函数才是装饰器
  //  所以运行顺序是 test2执行 => test2返回的装饰器函数执行 => test执行
  class A {
    constructor(public prop2: string) {}
  }
}

{
  function d(target: any, key: string) {

  }

  function fn(target:any, key:string, descriptor:PropertyDescriptor) {
    // 在TS中已经提供了描述符对象的类型PropertyDescriptor
    descriptor.enumerable = true
  }

  function useless(target:any, key:string, descriptor:PropertyDescriptor) {
    descriptor.value = function () {
      console.log('该方法已过期')
    }
  }
  class A {
    @d
    prop1: string

    @d
    static prop2: string

    @fn
    method1() {

    }
    @useless
    method2() {

    }
  }
}