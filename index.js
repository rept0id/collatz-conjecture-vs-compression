"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Zstd = require("@mongodb-js/zstd");
var buffer_1 = require("buffer");
function diffPc(originalValue, reducedValue) {
    var difference = originalValue - reducedValue;
    var percentageReduction = (difference / originalValue) * 100;
    return percentageReduction;
}
// Generate an arithmetic sequence
function generateArithmeticSequence(length, start, step) {
    if (start === void 0) { start = 99; }
    if (step === void 0) { step = -1; }
    return Array.from({ length: length }, function (_, i) { return start + i * step; });
}
// Generate a random sequence
function generateRandomSequence(length, low, high) {
    if (low === void 0) { low = 10; }
    if (high === void 0) { high = 100; }
    var sequence = [];
    for (var i = 0; i < length; i++) {
        sequence.push(Math.floor(Math.random() * (high - low + 1)) + low);
    }
    return sequence;
}
// Generate a Collatz sequence
function generateCollatzSequence(n) {
    var sequence = [];
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
    var buffer = buffer_1.Buffer.alloc(sequence.length * 4);
    for (var i = 0; i < sequence.length; i++) {
        buffer.writeDoubleLE(sequence[i]);
    }
    return buffer;
}
// Main function
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, collatzStart, collatzSeq, randomSeq, arithmeticSeq, collatzBuffer, randomBuffer, arithmeticBuffer, arithmeticZstd, randomZstd, collatzZstd, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res = Object();
                collatzStart = 92;
                collatzSeq = generateCollatzSequence(collatzStart);
                randomSeq = generateRandomSequence(collatzSeq.length);
                arithmeticSeq = generateArithmeticSequence(collatzSeq.length);
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
                collatzBuffer = toBuffer(collatzSeq);
                randomBuffer = toBuffer(randomSeq);
                arithmeticBuffer = toBuffer(arithmeticSeq);
                res.seq.collatz.buff = Object();
                res.seq.collatz.buff.length = collatzBuffer.length;
                res.seq.random.buff = Object();
                res.seq.random.buff.length = randomBuffer.length;
                res.seq.arithmetic.buff = Object();
                res.seq.arithmetic.buff.length = arithmeticBuffer.length;
                // Compression
                res.comp = Object();
                // Compression : Zstd
                res.comp.zstd = Object();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Zstd.compress(arithmeticBuffer)];
            case 2:
                arithmeticZstd = _a.sent();
                return [4 /*yield*/, Zstd.compress(randomBuffer)];
            case 3:
                randomZstd = _a.sent();
                return [4 /*yield*/, Zstd.compress(collatzBuffer)];
            case 4:
                collatzZstd = _a.sent();
                res.comp.zstd.seq = Object();
                res.comp.zstd.seq.arithmetic = Object();
                res.comp.zstd.seq.arithmetic.buff = Object();
                res.comp.zstd.seq.arithmetic.buff.length = arithmeticZstd.length;
                res.comp.zstd.seq.arithmetic.effectPc = diffPc(res.seq.arithmetic.buff.length, res.comp.zstd.seq.arithmetic.buff.length);
                res.comp.zstd.seq.random = Object();
                res.comp.zstd.seq.random.buff = Object();
                res.comp.zstd.seq.random.buff.length = randomZstd.length;
                res.comp.zstd.seq.random.effectPc = diffPc(res.seq.random.buff.length, res.comp.zstd.seq.random.buff.length);
                res.comp.zstd.seq.collatz = Object();
                res.comp.zstd.seq.collatz.buff = Object();
                res.comp.zstd.seq.collatz.buff.length = collatzZstd.length;
                res.comp.zstd.seq.collatz.effectPc = diffPc(res.seq.collatz.buff.length, res.comp.zstd.seq.collatz.buff.length);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.error('Error during compression or decompression:', error_1);
                return [3 /*break*/, 6];
            case 6:
                console.log(JSON.stringify(res));
                return [2 /*return*/];
        }
    });
}); })();
