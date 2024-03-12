const instructions = {
  'SET A': 0,
  'PRINT A': 1,
  'IFN A': 2,
  RET: 3,
  'DEC A': 4,
  JMP: 5,
};

const program = [
  instructions['SET A'],
  10,
  instructions['PRINT A'],
  instructions['IFN A'],
  instructions['RET'],
  0,
  instructions['DEC A'],
  instructions['JMP'],
  2,
];

const positions = {
  return: 4,
  decrement: 6,
  print: 2,
};

const execute = (prog, pos) => {
  let cursor = 0;
  let acc = undefined;

  const operations = {
    [instructions['SET A']]: () => {
      acc = prog[cursor + 1];
      cursor += 2;
    },
    [instructions['PRINT A']]: () => {
      console.log(acc);
      cursor++;
    },
    [instructions['IFN A']]: () => {
      cursor = acc === 0 ? pos.return : pos.decrement;
    },
    [instructions['DEC A']]: () => {
      acc -= 1;
      cursor++;
    },
    [instructions['RET']]: () => prog[cursor + 1],
    [instructions['JMP']]: () => {
      cursor = pos.print;
    },
  };

  while (cursor < prog.length) {
    const operation = operations[prog[cursor]];

    if (!operation) {
      cursor++;
      continue;
    }

    const result = operation();

    if (result !== undefined) {
      return result;
    }
  }
};

execute(program, positions);
