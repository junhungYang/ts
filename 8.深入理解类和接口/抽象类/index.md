# 抽象类（abstract）

# 为什么需要抽象类
  有时某个类只表示一个抽象概念，主要用于提取子类共有的成员，而不能直接创建它的实例，该类应该作为抽象类

# 抽象成员
  父类中，可能知道有些成员是必须存在的，但是不知道该成员的值或实现是什么，因此，需要有一种强约束，让继承该父类的子类，必须要实现该成员

  **抽象类中**，可以有抽象成员，这些抽象成员只能出现在抽象类中，因为它要求子类必须实现该成员，而假如在普通类中可以创建抽象成员的话，那么直接new该普通类，将无从实现该成员


## 设计模式 - 模板模式
   
   模板模式： 有些方法，所有的子类实现的流程完全一致，只是流程中的某个步骤的具体实现不一致，可以将该方法提取到父类，在父类中完成整个流程的实现，遇到实现不一致的方法时，将该方法做成抽象方法

