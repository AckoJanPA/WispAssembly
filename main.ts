//ALERT: do NOT set registers to booleans or strings, they only accept numbers
//It will NOT show an error but it is very important to keep this rule

const code: string[] = []

let RUNNING = true

let registers = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  G: 0,
  H: 0,
  I: 0,
  J: 0,
  K: 0,
  L: 0,
  M: 0,
  N: 0,
  O: 0,
  P: 0,
  Q: 0,
  R: 0,
  S: 0,
  T: 0,
  U: 0,
  V: 0,
  W: 0,
  X: 0,
  Y: 0,
  Z: 0,
}

let operand1 = 0
let operand2 = 0

let instructions: any[] = []

let InsID = 0

console.log("Registers: ", registers)

/* --- ASSEMBLY CODE --- 

ADD (target) - and operand1 to operand2, result is stored in target
SUB (target) - subtracts operand1 from operand2, result is stored in target
MUL (target) - multiplies operand1 and operand2, result is stored in target
DIV (target) - divides operand1 by operand2, result is stored in target

SET (target) (value) - sets the value of target to value
MOV (target) (source) - sets the value of target to the value of source

JMP (instruction line) - jumps to instruction line
JIE (instruction line) - jumps to instruction line if operand1 is equal to operand2
JNE (instruction line) - jumps to instruction line if operand1 is not equal to operand2
JLT (instruction line) - jumps to instruction line if operand1 is less than operand2
JGT (instruction line) - jumps to instruction line if operand1 is greater than operand2
JLE (instruction line) - jumps to instruction line if operand1 is less than or equal to operand2
JGE (instruction line) - jumps to instruction line if operand1 is greater than or equal to operand2
JrMP (source) - jumps to the instruction line in the register source
JrIE (source) - jumps to the instruction line in the register source if operand1 is equal to operand2
JrNE (source) - jumps to the instruction line in the register source if operand1 is not equal to operand2
JrLT (source) - jumps to the instruction line in the register source if operand1 is less than operand2
JrGT (source) - jumps to the instruction line in the register source if operand1 is greater than operand2
JrLE (source) - jumps to the instruction line in the register source if operand1 is less than or equal to operand2
JrGE (source) - jumps to the instruction line in the register source if operand1 is greater than or equal to operand2

LD1 (source) - sets the value of operand1 to the value of source
LD2 (source) - sets the value of operand2 to the value of source 

ALR (source) - alerts the value of source
PRO (target) - sets the value of target to prompt the user for input

*/

const ASSEMBLY = {
  add: function (target: string) {
    registers[target] = operand1 + operand2
  },
  sub: function (target: string) {
    registers[target] = operand1 - operand2
  },
  mul: function (target: string) {
    registers[target] = operand1 * operand2
  },
  div: function (target: string) {
    registers[target] = operand1 / operand2
  },
  set: function (target: string, value: number) {
    registers[target] = Number(value)
  },
  mov: function (target: string, source: string) {
    registers[target] = registers[source]
  },
  jmp: function (line: number) {
    InsID = line
  },
  jie: function (line: number) {
    if (operand1 === operand2) {
      InsID = line
    }
  },
  jne: function (line: number) {
    if (operand1 !== operand2) {
      InsID = line
    }
  },
  jlt: function (line: number) {
    if (operand1 < operand2) {
      InsID = line
    }
  },
  jgt: function (line: number) {
    if (operand1 > operand2) {
      InsID = line
    }
  },
  jle: function (line: number) {
    if (operand1 <= operand2) {
      InsID = line
    }
  },
  jge: function (line: number) {
    if (operand1 >= operand2) {
      InsID = line
    }
  },
  jrmp: function (source: string) {
    InsID = registers[source]
  },
  jrie: function (source: string) {
    if (operand1 === operand2) {
      InsID = registers[source]
    }
  },
  jrne: function (source: string) {
    if (operand1 !== operand2) {
      InsID = registers[source]
    }
  },
  jrlt: function (source: string) {
    if (operand1 < operand2) {
      InsID = registers[source]
    }
  },
  jrgt: function (source: string) {
    if (operand1 > operand2) {
      InsID = registers[source]
    }
  },
  jrle: function (source: string) {
    if (operand1 <= operand2) {
      InsID = registers[source]
    }
  },
  jrge: function (source: string) {
    if (operand1 >= operand2) {
      InsID = registers[source]
    }
  },
  ld1: function (source: string) {
    operand1 = registers[source]
  },
  ld2: function (source: string) {
    operand2 = registers[source]
  },
  alr: function (source: string) {
    alert(registers[source])
  },
  pro: function (target: string) {
    let value = prompt("Enter a value for " + target)
    if (value !== null) {
      registers[target] = Number(value)
    }
  },
}

function loadInstructions(compiledCode: any[]) {
  // Load the instructions into memory
  // Yes it's very simple :)
  instructions = compiledCode
}

function executeInstruction(id: number) {
  // Execute the instruction
  let instruction = instructions[id]
  let func = instruction[0]
  let val1 = instruction[1]
  let val2 = instruction[2]

  if (func === "ADD") {
    ASSEMBLY.add(val1)
  }
  if (func === "SUB") {
    ASSEMBLY.sub(val1)
  }
  if (func === "MUL") {
    ASSEMBLY.mul(val1)
  }
  if (func === "DIV") {
    ASSEMBLY.div(val1)
  }
  if (func === "SET") {
    ASSEMBLY.set(val1, val2)
  }
  if (func === "MOV") {
    ASSEMBLY.mov(val1, val2)
  }
  if (func === "JMP") {
    ASSEMBLY.jmp(val1)
  }
  if (func === "JIE") {
    ASSEMBLY.jie(val1)
  }
  if (func === "JNE") {
    ASSEMBLY.jne(val1)
  }
  if (func === "JLT") {
    ASSEMBLY.jlt(val1)
  }
  if (func === "JGT") {
    ASSEMBLY.jgt(val1)
  }
  if (func === "JLE") {
    ASSEMBLY.jle(val1)
  }
  if (func === "JGE") {
    ASSEMBLY.jge(val1)
  }
  if (func === "JrMP") {
    ASSEMBLY.jrmp(val1)
  }
  if (func === "JrIE") {
    ASSEMBLY.jrie(val1)
  }
  if (func === "JrNE") {
    ASSEMBLY.jrne(val1)
  }
  if (func === "JrLT") {
    ASSEMBLY.jrlt(val1)
  }
  if (func === "JrGT") {
    ASSEMBLY.jrgt(val1)
  }
  if (func === "JrLE") {
    ASSEMBLY.jrle(val1)
  }
  if (func === "JrGE") {
    ASSEMBLY.jrge(val1)
  }
  if (func === "LD1") {
    ASSEMBLY.ld1(val1)
  }
  if (func === "LD2") {
    ASSEMBLY.ld2(val1)
  }
  if (func === "ALR") {
    ASSEMBLY.alr(val1)
  }
  if (func === "PRO") {
    ASSEMBLY.pro(val1)
  }

  // Add more instructions here
}

function runInstructions() {
  // Run the instructions
  while (RUNNING) {
    executeInstruction(InsID)
    InsID++
    if (InsID >= instructions.length) {
      RUNNING = false
    }
  }
}

function runCompiled(compiledCode: any[]) {
  loadInstructions(compiledCode)
  runInstructions()
}

// Example usage
runCompiled([code])
