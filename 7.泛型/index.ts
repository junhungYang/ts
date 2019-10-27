{
  function take<T>(arr:T[], n:number):T[] {
    if(n > arr.length) {
      return arr
    }
    const newArr:T[] = []
    for(let i = 0; i< n; i++) {
      newArr.push(arr[i])
    }
    return newArr
  }

  const result = take<number>([2,3,4,5],2)
  console.log(result)
}

{
  // 回调函数： 就判断数组中某一项是否满足条件
  type callback<T> = (n:T, i:number) => boolean

  interface callback1<T> {
    (n:T, i:number): boolean
  }

  function filter<T>(arr:T[],callback: callback<T>): T[] {
    const newArr:T[] = []
    arr.forEach((n,i) => {
      if(callback(n,i)) {
        newArr.push(n)
      }
    })
    return newArr
  }

  const arr = [3,4,6,2,222]
  console.log(filter(arr, n => n % 2 !== 0))

  //arr每一项的类型传入到filter里面，TS进行泛型推导，推导出泛型的类型为number，
  // 执行callback时由于n的类型已决定为number,ts进行泛型推导，推导出callback中参数n为number
}

// 类
{
  class ArrayHelper<T> {
    constructor(private arr:T[]) {}
    suffle() {
      for(let i = 0; i < this.arr.length; i++) {
        const targetIndex = this.getRandom(0,this.arr.length)
        const temp = this.arr[i]
        this.arr[i] = this.arr[targetIndex]
        this.arr[targetIndex] = temp
      }
    }

    // 在数组中取出多少项
    take(n:number):T[] {
      if(n >= this.arr.length) {
        return this.arr
      }
      const newArr: T[] = []
      for(let i = 0; i < n; i++) {
        newArr.push(this.arr[i])
      }
      return newArr
    }

    private getRandom(min:number, max:number) {
      const dec = max - min
      return Math.floor(Math.random() * dec + max)
    }
  }
}

// 泛型约束
{
  const o1 = {
    name: 'jun xing',
    age: 18,
    gender: '男'
  }

  function nameToUpperCase1<T>(obj:T):T {
    obj
    return obj
  }
  const newO1 = nameToUpperCase1(o1)

  // 在当前这个情况中会发现 obj.name 是点不出来的，因为当前这个 泛型 T 在你真的把对象传进来时，
  // 它并不知道你传进来的是不是对象，而在类的例子中之所以可以同 arr[i] 的原因是 T 的类型指代的是 arr的成员
  // 而arr在一开始就明确低被约束为 arr:[]



  // 所以我们需要对T进行约束

  interface hasNameProperty {
    name: string
  }

  const o = {
    name: 'jun xing',
    age: 18,
    gender: '男'
  }
                           // 泛型T至少得具备 hasNameProperty 的约束，传入的参数必须为对象，同时根据鸭子辨型法，该对象只要有name属性就算他成立
  function nameToUpperCase<T extends hasNameProperty>(obj:T):T {
    obj.name
    return obj
  }

  const newO = nameToUpperCase(o) 

  // 不过事实上在这个例子中我们根本不需要泛型，因为该方法已经明确就是要把name属性的首字母变为大写
  // 那么从传入的obj参数上我们就可以直接对obj约束为接口 hasNameProperty  => function xxx(obj:hasNameProerty)
  // *但采取泛型的方式是为了创建描述泛型约束的情景
}


// 多泛型
{
  //[1,3,4] ['a','b','c']
  function mixinArray<T, K>(arr1:T[], arr2:K[]):(T | K)[] {
    if(arr1.length !== arr2.length) {
      throw new Error('长度不等')
    }
    const newArr:(T | K)[] = []
    arr1.forEach((item,index) => {
      newArr.push(item)
      newArr.push(arr2[index])
    })
    return newArr
  }
}