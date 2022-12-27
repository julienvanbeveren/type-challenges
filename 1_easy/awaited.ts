/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in
  
  ### Question
  
  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?
  
  For example: if we have `Promise<ExampleType>` how to get ExampleType?
  
  ```ts
  type ExampleType = Promise<string>
  
  type Result = MyAwaited<ExampleType> // string
  ```
  
  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)
  
  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

type MyAwaited2<T extends Promise<any>> = T extends Promise<infer F>
  ? F extends { then: (onfulfilled: (arg: infer L) => any) => any }
    ? L extends Promise<any>
      ? MyAwaited<L>
      : L
    : F extends Promise<any>
    ? MyAwaited<F>
    : F
  : never;

type MyAwaited3<T extends Promise<any>> = T extends Promise<infer F>
  ? F extends Promise<any>
    ? MyAwaited<F>
    : T extends { then: (onfulfilled: (arg: infer L) => any) => any }
    ? L
    : T
  : never;

type MyAwaited<
  T extends Promise<any> | { then: (onfulfilled: (arg: any) => any) => any }
> = T extends Promise<infer F>
  ? F extends Promise<any>
    ? MyAwaited<F>
    : F
  : T extends { then: (onfulfilled: (arg: infer L) => any) => any }
  ? L
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
