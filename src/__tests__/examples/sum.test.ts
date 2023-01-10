const sum = (a: number, b: number) => {
  return a + b;
};

// test() // usado fora pra realização de testes
// it()   // usado dentro pra realização de testes

describe("Testes for sum function", () => {
  it("Capable to sum 2 number", () => {
    const expectedResult = 3 + 5;
    const result = sum(3, 5);

    expect(typeof result).toBe("number");
    expect(result).toBe(expectedResult);
  });

  it("Capable to sum 2 numbers. Expect wrong result", () => {
    const result = sum(5, 5);
    const wrongResult = 3 + 5;

    expect(typeof result).toBe("number");
    expect(result).not.toBe(wrongResult);
  });

  it("Capable to sum 2 numbers. Expect wrong typeof.", () => {
    const result = sum(10, 5);
    const expectedResult = 10 + 5;

    expect(typeof result).not.toBe("string");
    expect(result).toBe(expectedResult);
  });
});
