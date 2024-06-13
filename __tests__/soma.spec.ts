function soma(a: number, b: number) {
  return a + b;
}

test('deve somar dois números corretamente', () => {
  // Preparação
  const num1 = 5
  const num2 = 4
  const resultadoEsperado = 9

  // Execução
  const response = soma(num1, num2)

  // Avaliação
  expect(response).toBe(resultadoEsperado)
})