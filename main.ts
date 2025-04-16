let registers: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0
]

let instructions: string[] = []
let currentInstruction: number = 0

function loadProgram(input: string) {
    instructions = input.split(',')
    currentInstruction = 0
}

function getRegisterValue(register: number): number {
    if (register < 0 || register >= registers.length) {
        console.log("ERR: Invalid register index")
    }
    return registers[register]
}

function setRegisterValue(register: number, value: number) {
    let reg = register
    if (reg < 0 || reg >= registers.length) {
        console.log("ERR: Invalid register index")
    }
    registers[reg] = value
}

function getCurrentInstruction(): string {
    return instructions[currentInstruction]
}

function executeInstruction() {
    if (currentInstruction >= instructions.length) {
        console.log("ERR: No more instructions to execute")
    }
    let instruction = getCurrentInstruction()
    let parts = instruction.split(' ')
    let opcode = parts[0]
    let val1 = parseInt(parts[1])
    let val2 = parseInt(parts[2])
    let val3 = parseInt(parts[3])
    switch (opcode) {
        case 'ADD':
            setRegisterValue(val1, getRegisterValue(val2) + getRegisterValue(val3))
            break
        case 'SUB':
            setRegisterValue(val1, getRegisterValue(val2) - getRegisterValue(val3))
            break
        case 'MUL':
            setRegisterValue(val1, getRegisterValue(val2) * getRegisterValue(val3))
            break
        case 'DIV':
            if (getRegisterValue(val3) === 0) {
                console.log("ERR: Division by zero")
            } else {
                setRegisterValue(val1, Math.floor(getRegisterValue(val2) / getRegisterValue(val3)))
            }
            break
        case 'MOD':
            if (getRegisterValue(val3) === 0) {
                console.log("ERR: Division by zero")
            } else {
                setRegisterValue(val1, getRegisterValue(val2) % getRegisterValue(val3))
            }
            break
        case 'SETR':
            setRegisterValue(val1, getRegisterValue(val2))
            break
        case 'SETN':
            setRegisterValue(val1, val2)
        case 'JMP':
            currentInstruction = val1
            break
        case 'JIE':
            if (getRegisterValue(val1) === getRegisterValue(val2)) {
                currentInstruction = val3
            }
            break
        case 'JIN':
            if (getRegisterValue(val1) !== getRegisterValue(val2)) {
                currentInstruction = val3
            }
            break
        case 'GET':
            setRegisterValue(val1, parseInt(prompt("Enter a value:") || "0"))
            break
        case 'PRT':
            alert(getRegisterValue(val1))
            break
        case 'HLT':
            console.log("Program halted")
            currentInstruction = instructions.length // End the program
            break
        default:
            console.log("ERR: Unknown instruction " + opcode)
            break
    }
}

function runProgram(program: string) {
    loadProgram(program)
    while (currentInstruction < program.length) {
        executeInstruction()
        currentInstruction++
    }
}
