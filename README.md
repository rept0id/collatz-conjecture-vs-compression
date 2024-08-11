# Collatz Conjecture vs. Compression

## Introduction

Based on the provided tests, a Collatz Conjecture sequence can be more challenging to compress than random data.

This can be used for 'worst-case' scenario metrics of compression efficiency, with significantly less computing power and time cost.

## Analysis

Many times, I’ve found myself needing to measure the effectiveness of a compression algorithm, especially in database design.

Using random values usually provides the best "worst-case" scenario and a good estimation of how compression will help save space.

However, the drawback of random values is that they are slow to generate.

Generating billions of random values is a very slow process when you are in need of data.

**This is where the purpose of this Git repository comes in. It aims to demonstrate that using pseudo-random values produced from a Collatz Conjecture [1] sequence is a method that requires significantly less computational power and time, as these values are easier to calculate. Just to make it better, the end result is even better against compression algorithms.**

To understand how easy it is to generate a Collatz Conjecture sequence, one can refer to the Collatz Conjecture description, which is a simple mathematical sequence defined as follows:

- Start with any positive integer \( n \).
- If \( n \) is even, divide it by 2.
- If \( n \) is odd, multiply it by 3 and then add 1.
- Repeat the process with the resulting number until the number becomes 1.

As we know, Collatz sequences eventually always end with the number 1. However, this has not yet been proven by the best mathematicians in the world.

Until this is proven, compression algorithms struggle to find a better pattern than simply undoing the described process (/2 || *3). This can sometimes result in a compression rate that is even worse than with random numbers, which, in computing, are not truly random.

In the `res.txt` file, you can find a detailed example of the output of this program, or you can run it yourself by executing `node index.js`.

The last time I ran it, simple arithmetic sequences, where each number is the previous number plus 3, achieved a compression effectiveness of 44% with Zstandard (zstd) compression. Random numbers achieved 41%, while Collatz sequences achieved 38% effectiveness, which is significantly lower than random numbers.

| Method | Data | Effect |
| --- | --- | --- |
| Zstd | Arithmetic (n+3) | 44% |
| Zstd | Random (1-100, JS Math.Random()) | 41% |
| Zstd | Collatz | 38% |

---

Here, I would like to notice, that this idea came to mind recently. 
- If I’m mistaken in any way, please feel free to reach out—I’d love to discuss it. 
- If I'm right, I would love as well to discuss it.

## Source of inspiration

The source of inspiration was Prof. *Gregor Kiczales*'s "**How to Code: Complex Data**" course, where the Collatz Conjecture is referenced as a generative recursion that is guaranteed to stop, but can't be proven - at least, till now - when it will stop. 

"How to Code: Complex Data" [2] is an amazing course. You can find it in the links or you can read the book "**How to Design Programs (HtDP)**" by *Matthias Felleisen*, *Robert Bruce Findler*, *Matthew Flatt*, **and** *Shriram Krishnamurthi*.

## Collatz Conjecture in TS
```
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
```
## Links

[1] "Wikipedia : Collatz Conjecture" https://en.wikipedia.org/wiki/Collatz_conjecture

[2] "EdX : How to Code : Complex Data" https://www.edx.org/learn/coding/university-of-british-columbia-how-to-code-complex-data?objectID=course-c2a2d51b-4841-46aa-b149-e7d1a64b6298