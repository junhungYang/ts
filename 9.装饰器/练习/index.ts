import { classDescriptor,propDescriptor,printObj } from "./Descriptors"
@classDescriptor('用户')
class User {
  @propDescriptor('账号')
  loginId: string

  @propDescriptor('密码')
  loginPwd: string
}

const u = new User()

printObj(u)

{
  function test(target: any, method: string, index: number) {
    console.log(target, method, index)
    // MyMath.prototype , sum , 1
  }

  class MyMath {
    sum(
      a: number,
      @test b: number
    ) {

    }
  }
}
