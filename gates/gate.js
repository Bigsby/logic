class Operation {
    constructor() {
        this.operands = [];
    }
}
class Gate {
    name() { return this.constructor.name; }
    static calculateTable(gate) {
        let result = [];
        const operationCount = Math.pow(2, gate.operandCount);
        const operandBits = [];
        for (let operandIndex = 0; operandIndex < gate.operandCount; operandIndex++) {
            operandBits.unshift(Math.pow(2, operandIndex));
        }
        for (let operationIndex = 0; operationIndex < operationCount; operationIndex++) {
            let operation = new Operation();
            operandBits.forEach(bit => operation.operands.push((operationIndex & bit) === bit));
            operation.result = gate.executeInternal(operation.operands);
            result.push(operation);
        }
        return result;
    }
}
class UnaryGate extends Gate {
    constructor() {
        super(...arguments);
        this.operandCount = 1;
    }
    executeInternal(operands) {
        return this.execute(operands[0]);
    }
}
class BinaryGate extends Gate {
    constructor() {
        super(...arguments);
        this.operandCount = 2;
    }
    executeInternal(operands) {
        return this.execute(operands[0], operands[1]);
    }
}
class NOT extends UnaryGate {
    execute(operand) {
        return !operand;
    }
}
class AND extends BinaryGate {
    execute(operand1, operand2) {
        return operand1 && operand2;
    }
}
class OR extends BinaryGate {
    execute(operand1, operand2) {
        return operand1 || operand2;
    }
}
class XOR extends BinaryGate {
    execute(operand1, operand2) {
        return operand1 ? !operand2 : operand2;
    }
}
class NAND extends BinaryGate {
    execute(operand1, operand2) {
        return !(operand1 && operand2);
    }
}
class NOR extends BinaryGate {
    execute(operand1, operand2) {
        return !(operand1 || operand2);
    }
}
class XNOR extends BinaryGate {
    execute(operand1, operand2) {
        return !(operand1 ? !operand2 : operand2);
    }
}
const gates = [
    new NOT(),
    new OR(),
    new AND(),
    new XOR(),
    new NOR(),
    new NAND(),
    new XNOR()
];
function displayGateResults(gate) {
    const results = Gate.calculateTable(gate);
    console.log(`Operation ${gate.name()}`);
    results.forEach(operation => {
        console.log(`${operation.operands.map(operand => Number(operand)).join(" : ")} > ${Number(operation.result)}`);
    });
}
gates.forEach(gate => {
    displayGateResults(gate);
});
// run
// tsc --target ES6 gate.ts && node gate.js
