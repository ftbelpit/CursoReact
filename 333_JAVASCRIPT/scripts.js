// arrow function
const sum = function sum(a, b) {
    return a + b
}

const arrowSum = (a, b) => a + b

console.log(sum(38,39))
console.log(arrowSum(27, 50))

const greeting = (name) => {
    if(name) {
        return 'Olá ' + name + '|'
    } else {
        return 'Olá!'
    }
}

console.log(greeting('Matheus'))
console.log(greeting())

const testeArrow = () => console.log("testou!")

testeArrow()

const user = {
    name: 'Theo',
    sayUserName() {
        var self = this
        setTimeout(function() {
            console.log(self)
            console.log('Username: ' + self.name)
        }, 500)
    },
    sayUserNameArrow() {
        setTimeout(() => {
            console.log(this)
            console.log('Username: ' + this.name)
        }, 700)
    }
}

// user.sayUserName()
// user.sayUserNameArrow()

// 3 filter 
const arr = [1, 2, 3, 4, 5]

console.log(arr)

const highNumbers = arr.filter((n) => {
    if (n >= 3) {
        return n
    }
})

console.log(highNumbers)

const users = [
    { name: 'Matheus', available:true},
    { name: 'Pedro', available:false},
    { name: 'João', available:false},
    { name: 'Marcos', available:true},
]

const availableUsers = users.filter ((user) => user.available)
const notAvailableUsers = users.filter ((user) => !user.available)

console.log(availableUsers)
console.log(notAvailableUsers)

// 4 map
const products = [
{ name: 'Camisa', price: 10.99, category: 'Roupas' },
{ name: 'Chaleira Elétrica', price: 49.90, category: 'Eletro' },
{ name: 'Fogão', price: 400, category: 'Eletro' },
{ name: 'Calça jeans', price: 50.99, category: 'Roupas' },
]

products.map((product) => {
    if (product.category === 'Roupas') {
        product.onSale = true
    }
})
console.log(products)

// 5 template literals
const userName = 'Felipe'
const age = 19

console.log(`O nome do usuário é ${userName} e ele tem ${age} anos.`)

// 6 destructuring
const fruits = ["Maçã", "laranja", "Mamão"]
const [f1, f2, f3] = fruits
console.log(f1)
console.log(f3)

const productDetails = {
    name: "Mouse",
    price: 39.99,
    category: "Periféricos",
    color: "Cinza"
}

const {name: productName, price, category: productCategory, color} = productDetails

console.log(`O nome do produto é ${productName}, custa R$${price}, pertence a categoria ${productCategory} e é da cor ${color}`)