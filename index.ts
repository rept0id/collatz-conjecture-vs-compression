import * as Zstd from '@mongodb-js/zstd';
import { Buffer } from 'buffer';

function diffPc(originalValue: number, reducedValue: number): number {
    const difference = originalValue - reducedValue;
    const percentageReduction = (difference / originalValue) * 100;
    return percentageReduction;
}

// Generate an arithmetic sequence
function generateArithmeticSequence(length: number, start: number = 99, step: number = -1): number[] {
    return Array.from({ length }, (_, i) => start + i * step);
}

// Generate a random sequence
function generateRandomSequence(length: number, low: number = 10, high: number = 100): number[] {
    const sequence: number[] = [];
    for (let i = 0; i < length; i++) {
        sequence.push(Math.floor(Math.random() * (high - low + 1)) + low);
    }
    return sequence;
}

// Generate a Collatz sequence
function generateCollatzSequence(n: number): number[] {
    const sequence: number[] = [];
    while (n !== 1) {
        sequence.push(n);
        if (n % 2 === 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
    }
    sequence.push(1); // Add the final 1
    return sequence;
}

// Convert a sequence to a Buffer
function toBuffer(sequence: number[]): Buffer {
    const buffer = Buffer.alloc(sequence.length * 4);
    for (let i = 0; i < sequence.length; i++) {
        buffer.writeDoubleLE(sequence[i]);
    }
    return buffer;
}

// Main function
(async () => {
    let res = Object();

    const collatzStart = 92; // Example starting number for Collatz sequence

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

    try {
        const arithmeticZstd = await Zstd.compress(arithmeticBuffer);
        const randomZstd = await Zstd.compress(randomBuffer);
        const collatzZstd = await Zstd.compress(collatzBuffer);

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
    } catch (error) {
        console.error('Error during compression or decompression:', error);
    }

    console.log(JSON.stringify(res, null, "\t"));
})();
