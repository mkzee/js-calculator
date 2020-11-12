function printOutput(num) {
    return document.getElementById('output').innerText = num
}

function printHistory(num) {
    document.getElementById('history').innerText = num
}

function getFormattedNum (val) {
    let num = Number(val)
    let x = num.toLocaleString()
    return x
}

function reverseFormattedString (arr) {
    let newArr = '';
    for (let i = 0; i < arr.length; i++) {
       newArr += (arr[i].replace(/,/g,'')) + ' '
    }

    return newArr
}

const numbers = document.getElementsByClassName('number')
const operators = document.getElementsByClassName('operator')
const output = document.getElementById('output')
const equal = document.getElementById('equal')
const point = document.getElementById('point')
const clear = document.getElementById('clear')
const del = document.getElementById('delete')
const historyBtn = document.getElementById('history-btn')

let outputValue = "";
let memory = []
let storage = []

for(let i = 0; i < numbers.length; i ++) {
    numbers[i].addEventListener('click', () => {
        if(output.innerText.length >= 15) {
            return ''
        }
        outputValue += numbers[i].innerText
        if (!outputValue.includes('.')) {
            let outputValueFormatted = getFormattedNum(outputValue)
            return printOutput(outputValueFormatted)
        }
        
        return printOutput(outputValue)
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', () => {
        memory.push(output.innerText, operators[i].innerText)
        printHistory(memory.join(' '))
        output.innerText = ""
        outputValue = ""
    })
}

point.addEventListener('click', () => {
    if (outputValue.includes('.')) {
        return ''
    }
    outputValue += "."
})

equal.addEventListener('click', () => {
    if (output.innerText !== '') {
       try {
        memory.push(output.innerText)
        let operation = reverseFormattedString(memory)
        printHistory(operation)
        output.innerText = eval(operation)
        storage.push(`${operation} = ${output.innerText}`)
        memory.splice(0,memory.length)
        outputValue = ''
        return ''
       } catch (e) {
           printOutput('Syntax Error')
           outputValue = ''
           memory.splice(0,memory.length)
       }
    }
})

clear.addEventListener('click', () => {
    if (output.innerText !== '') {
        printHistory(output.innerText)
        output.innerText = ''
        outputValue = ''
        return ''
    }
})

del.addEventListener('click', () => {
    var val = output.innerText 
    var val = val.substr(0,val.length-1);
    output.innerText = val
    outputValue = val
})

let counter = 0

historyBtn.addEventListener('click', () => {
    if (storage.length === 0) {
        return ''
    } else if (counter >= storage.length ) {
        return ''
    }
    counter ++
    printHistory(storage[storage.length - counter])
})

