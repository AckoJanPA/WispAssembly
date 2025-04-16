let registers: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0
]

let program: string[] = []
let currentInstruction: number = 0

function loadProgram(input: string) {
    program = input.split(',')
    currentInstruction = 0
}
function getRegisterValue(register: number): number {
    if (register < 0 || register >= registers.length) {
        throw new Error("Invalid register index")
    }
    return registers[register]
}
function executeInstruction() {
    if (currentInstruction >= program.length) {
        throw new Error("No more instructions to execute")
    }
}
