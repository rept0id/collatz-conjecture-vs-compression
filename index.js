"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Zstd = __importStar(require("@mongodb-js/zstd"));
const buffer_1 = require("buffer");
function diffPc(originalValue, reducedValue) {
    const difference = originalValue - reducedValue;
    const percentageReduction = (difference / originalValue) * 100;
    return percentageReduction;
}
// Generate an arithmetic sequence
function generateArithmeticSequence(length, start = 1, step = 3) {
    return Array.from({ length }, (_, i) => start + i * step);
}
// Generate a random sequence
function generateRandomSequence(length, low = 1, high = 100) {
    const sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(Math.floor(Math.random() * (high - low + 1)) + low);
    }
    return sequence;
}
// Generate a Collatz sequence
function generateCollatzSequence(n) {
    const sequence = [];
    while (n !== 1) {
        sequence.push(n);
        if (n % 2 === 0) {
            n /= 2;
        }
        else {
            n = 3 * n + 1;
        }
    }
    sequence.push(1); // Add the final 1
    return sequence;
}
// Convert a sequence to a Buffer
function toBuffer(sequence) {
    const buffer = buffer_1.Buffer.alloc(sequence.length * 4);
    for (let i = 0; i < sequence.length; i++) {
        buffer.writeInt32LE(sequence[i], i * 4);
    }
    return buffer;
}
// Main function
(() => __awaiter(void 0, void 0, void 0, function* () {
    let res = Object();
    const collatzStart = 800; // Example starting number for Collatz sequence
    // Generate sequences
    const collatzSeq = generateCollatzSequence(collatzStart);
    const randomSeq = generateRandomSequence(collatzSeq.length);
    const arithmeticSeq = generateArithmeticSequence(collatzSeq.length);
    res.seq = Object();
    res.seq.collatz = Object();
    res.seq.collatz.data = collatzSeq;
    res.seq.collatz.length = collatzSeq.length;
    res.seq.random = Object();
    res.seq.random.data = randomSeq;
    res.seq.random.length = randomSeq.length;
    res.seq.arithmetic = Object();
    res.seq.arithmetic.data = arithmeticSeq;
    res.seq.arithmetic.length = arithmeticSeq.length;
    // Convert sequences to Buffers
    const collatzBuffer = toBuffer(collatzSeq);
    const randomBuffer = toBuffer(randomSeq);
    const arithmeticBuffer = toBuffer(arithmeticSeq);
    res.buff = Object();
    res.buff.collatz = Object();
    res.buff.collatz.length = collatzBuffer.length;
    res.buff.random = Object();
    res.buff.random.length = randomBuffer.length;
    res.buff.arithmetic = Object();
    res.buff.arithmetic.length = arithmeticBuffer.length;
    // Compression
    res.comp = Object();
    // Compression : Zstd
    try {
        const arithmeticZstd = yield Zstd.compress(arithmeticBuffer);
        const randomZstd = yield Zstd.compress(randomBuffer);
        const collatzZstd = yield Zstd.compress(collatzBuffer);
        res.comp.zstd = Object();
        res.comp.zstd.arithmetic = Object();
        res.comp.zstd.arithmetic.length = arithmeticZstd.length;
        res.comp.zstd.arithmetic.effectPc = diffPc(res.buff.arithmetic.length, res.comp.zstd.arithmetic.length);
        res.comp.zstd.random = Object();
        res.comp.zstd.random.length = randomZstd.length;
        res.comp.zstd.random.effectPc = diffPc(res.buff.random.length, res.comp.zstd.random.length);
        res.comp.zstd.collatz = Object();
        res.comp.zstd.collatz.length = collatzZstd.length;
        res.comp.zstd.collatz.effectPc = diffPc(res.buff.collatz.length, res.comp.zstd.collatz.length);
    }
    catch (error) {
        console.error('Error during compression or decompression:', error);
    }
    console.dir(res, { depth: null });
}))();
