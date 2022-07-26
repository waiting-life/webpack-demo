const person = {
  name: 'cpp',
  age: 24
}
function getPersonInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(person)
    }, 2000);
  })
}
export const test = async () => {
  console.log('test')
  const {name, age} = await getPersonInfo()
  console.log('name-----', name, 'age-----', age)
}