// 拓展类型

// 1.类型别名
// 2.枚举
// 3.接口
// 4.类

// 枚举通常用于约束某个变量的取值范围
// 字面量和联合类型配合使用，也可以达到枚举的目的

// 字面量类型的问题
// 1.在类型约束位置会产生重复代码，可以使用类型别名解决该问题
// 2.逻辑涵义和真实的值产生了混淆，会导致当修改真实值时，产生大量的修改
//   如：定义了一个Gender字面类型 '男' | '女' 并且该字面类型已应用于上千个变量上
//       此时需求需要修改为  '先生' | '女士' 时， 需要修改巨多的地方
// 3. 字面量类型不会进入到编辑结果，即运行的是js不是ts


// 枚举 enum
{
  // 解决字面量类型 逻辑含义和真实值之间的混淆
  // 枚举会 出现在编辑结果中，编辑结果中表现为一个对象
  enum Gender {
    male = '男', //假如需要改动逻辑名称，F2进行改动，将自动匹配他所使用到的地方
    female = '女'
  }
  let gender:Gender
  gender = Gender.male
  gender = Gender.female


  // 枚举的规则
  // 1. 枚举的字段值可以是数字或字符串
  // 2. 当枚举的值不写时，将自动采用数字枚举，从第一个字段开始从0自增，
  //    且当任意一字段采用数字时，往后字段若无值将从值为数字的字段并以该数值为初始点 +1自增
  // 3. 被数字枚举约束的变量可以直接赋值为数字(但不建议这样做，因为这等同于使用字面量约束)

  enum level {
    level1,  //0
    level2,  //1
    lever3   //2
  }

  // 4.数字枚举的编译结果与字符串枚举有差异
  // (function(lev) {
  //   Lev[Lev['lev1'] = 0] = 'lev1'
  //   Lev[Lev['lev2'] = 1] = 'lev2'
  //   Lev[Lev['lev3'] = 2] = 'lev3'
  // })(Lev || (lev = {}))
  // {
  //   'lev1': 0,
  //   'lev2': 1,
  //   'lev3': 2,
  //   '0': 'lev1',
  //   '1': 'lev2',
  //   '2': 'lev3'
  // }

  // 最佳实践
  // 尽量不要在一个枚举中既出现字符串字段，又出现数字字段
  // 使用枚举时，尽量使用枚举字段的名称，而不使用真实的值

  type Deck = NormalCard[]
  enum Color {
    heart = '♥',
    spade = '♠',
    club = '♣',
    diamond = '♦'
  }

  enum Mark {
    A = 'A',
    two = '2',
    three = '3',
    four = '4',
    five = '5',
    six = '6',
    seven = '7',
    eight = '8',
    nine = '9',
    ten = '10',
    eleven = 'J',
    twelve = 'Q',
    king = 'K'
  }
  type NormalCard = {
    color: Color,
    mark: Mark
  }
  function createDeck():Deck {
    const deck:Deck = []
    const marks = Object.values(Mark)
    const colors = Object.values(Color)
    for (const m of marks) {
      for(const c of colors) {
        deck.push({
          color: c,
          mark: m
        })
      }
    }
    return deck
  }
  function printDeck(deck:Deck) {
    let result:string;
    deck.forEach((card) => {
      let str = card.color + card.mark
      result += str
    })
    console.log(result)
  }
  const deck = createDeck()
}


// 位枚举(枚举的位运算,只运用于数字枚举)

{
  enum Permission {
    Read = 1,  //2^0   0001   （二进制）
    Write = 2,  //2^1  0010
    Create =4,  //2^2  0100  
    Delete = 8  //2^3  1000
    // ReadWrite = 3   // 0011
  }

  // 位运算：两个数字换算成二进制后进行的位置运算

  // let readWrite = Permission.Read | Permission.Write;
  // let readWriteDelete = readWrite | Permission.Delete 
  // 0001
  // 或（在对应位上两者进行比较，只要存在1,结果的对应位就是1,即只要有一个为真，结果就是真）
  // 0010
  // = 0011


  // 如何判断是否拥有某个权限
    let p:Permission = Permission.Read | Permission.Write;  
    //数字枚举可赋值为其他数字，所以Permission可以拥有其他数字，所以p可以约束为Permission

    function hasPermission(target:Permission,per:Permission) {
      return (target & per) === per
      // target中的对应位（per中的权限位）是否为1， 且运算 两者都为1时才是1,只要有一个为0就是0
      // 因为per基础权限中只有一位是1，所以假如target具有per权限，那么且运算后所出来的结果
      // 就必然与per相等，由此可以判断出target具有per权限
      //  0011  target
      //  0010  per
    }
    hasPermission(p,Permission.Read)

  
  // 如何删除某个权限
  p = p ^ Permission.Write
  // 异或运算，相同取0，不同取1
  // 0011
  // 异或(假如p中包含write，即对应为上相等，那么结果必然取0，该权限便被删除了)
  // 0010
  // = 0001
  
}