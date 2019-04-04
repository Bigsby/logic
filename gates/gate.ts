class Operation {
    constructor() {
        this.operands = [];
    }
    operands: boolean[];
    result: boolean;
}

abstract class Gate {
    public abstract operandCount: number;
    protected abstract executeInternal(operands: boolean[]): boolean;

    public name() { return this.constructor.name; }

    public static calculateTable(gate: Gate): Operation[] {
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

abstract class UnaryGate extends Gate {
    public operandCount = 1;
    protected executeInternal(operands: boolean[]): boolean {
        return this.execute(operands[0]);
    }
    public abstract execute(operand: boolean): boolean;
}

abstract class BinaryGate extends Gate {
    public operandCount = 2;
    protected executeInternal(operands: boolean[]): boolean {
        return this.execute(operands[0], operands[1]);
    }

    public abstract execute(operand1: boolean, operand2: boolean): boolean;
}

class NOT extends UnaryGate {
    public execute(operand: boolean): boolean {
        return !operand;
    }
}

class AND extends BinaryGate {
    public execute(operand1: boolean, operand2: boolean): boolean {
        return operand1 && operand2;
    }
}

class OR extends BinaryGate {
    public execute(operand1: boolean, operand2: boolean): boolean {
        return operand1 || operand2;
    }
}

class XOR extends BinaryGate {
    public execute(operand1: boolean, operand2: boolean): boolean {
        return operand1 ? !operand2 : operand2;
    }
}

class NAND extends BinaryGate {
    public execute(operand1: boolean, operand2: boolean): boolean {
        return !(operand1 && operand2);
    }
}

class NOR extends BinaryGate {
    public execute(operand1: boolean, operand2: boolean): boolean {
        return !(operand1 || operand2);
    }
}

class XNOR extends BinaryGate {
    public execute(operand1: boolean, operand2: boolean): boolean {
        return !(operand1 ? !operand2 : operand2);
    }
}



const gates: Gate[] = [
    new NOT(),
    new OR(),
    new AND(),
    new XOR(),
    new NOR(),
    new NAND(),
    new XNOR()
];

function displayGateResults(gate: Gate): void {
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
