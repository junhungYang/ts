export function classDescriptor(description: string) {
  return function (target:Function) {
    // 把描述信息保存至原型中
    target.prototype.$classDescription = description
  }
}

export function  propDescriptor(description: string) {
  return function (target:any, propName:string) {
    // 把所有的属性信息保存到该类的原型中，描述属性时，第一个参数为类的原型
    if(!target.$propDescriptions) {
      target.$propDescriptions = []
    }
    target.$propDescriptions.push({
      propName,
      description
    })
  }
}

export function printObj(obj: any) {
  if(obj.$classDescription) {
    console.log(obj.$classDescription)
  }else {
    console.log(obj.__proto__.constructor.name)
  }
  if(!obj.$propDescriptions) {
    obj.$propDescriptions = []
  }
  for(const key in obj) {
    if(obj.hasOwnProperty(key)) {
      const prop = obj.$propDescriptions.find((p: any) => p.propName === key)
      if(prop) {
        console.log(`\t${prop.description}:${obj[key]}`)
      }else {
        console.log(`\t${key}:${obj[key]}`)
      }
    }
  }
}