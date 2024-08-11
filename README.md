# Collatz Conjecture vs. Compression

Many times, I’ve found myself needing to measure the effectiveness of a compression algorithm, especially in database design.

Using random values usually provides the best "worst-case" scenario and a good estimation of how compression will help save space.

However, the drawback of random values is that they are slow to generate.

Generating billions of random values is a very slow process when you are in need of data.

This is where the purpose of this Git repository comes in. It aims to demonstrate that using pseudo-random values produced from the Collatz Conjecture* is a method that requires significantly less computational power and time, as these values are easier to calculate.

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

This idea came to mind recently. 
- If I’m mistaken in any way, please feel free to reach out—I’d love to discuss it. 
- If I'm right, I would love as well to discuss it.