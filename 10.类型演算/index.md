# 类型演算
  根据已知信息，计算出新的类型

# 三个关键字

- typeof

tS中的typeof, 书写位置在类型约束的位置上

表示: 获取某个数据的类型

当typeof 作用于类的时候，得到的类型是类本身


- keyof

作用于类，接口，类型别名，用于获取其他类型中的所有成员名组成的联合类型

- in

该关键字 往往和keyof 进行联用， 用于限制某个索引类型的取值范围


# TS中预设的类型演算

```
Partial<T>   将类型T中的成员变为可选

Required<T>   将类型T中的成员变为必填

Readonly<T>    将类型T中的成员变为只读

Exclude<T, U>   从T中剔除可以赋值给U的类型

Extract<T, U>   只保留T中可以赋值给U的类型

NonNullable<T>    从T中剔除null 和 undefined

ReturnType<T>    获取函数返回值类型

InstanceType<T>   获取构造函数(类)类型的实例类型

```