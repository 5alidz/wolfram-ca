// example of wolfram elementary cellular automata
// https://en.wikipedia.org/wiki/Elementary_cellular_automaton

const CELL_0 = ' ';
const CELL_1 = '█';

function getRuleSet(ruleNum: number): number[] {
  const binary = ruleNum.toString(2).padStart(8, '0');
  return binary
    .split('')
    .map((bit) => parseInt(bit))
    .reverse();
}

function renderRow(row: number[]) {
  return row.map((cell) => (cell === 1 ? CELL_1 : CELL_0)).join('');
}

function applyRule(
  ruleSet: number[],
  left: number,
  center: number,
  right: number
) {
  return ruleSet[left * 4 + center * 2 + right];
}

function nextGeneration(ruleSet: number[], current: number[]) {
  const next = new Array<number>(current.length).fill(0);
  for (let i = 0; i < current.length; i++) {
    const left = current[(i - 1 + current.length) % current.length];
    const right = current[(i + 1) % current.length];
    next[i] = applyRule(ruleSet, left, current[i], right);
  }
  return next;
}

function initialRow(size: number) {
  const automata = new Array<number>(size).fill(0);
  automata[Math.floor(size / 2)] = 1;
  return automata;
}

// imperative version
function cellularAutomata(ruleNumber: number, size: number, time: number) {
  const ruleSet = getRuleSet(ruleNumber);
  let current = initialRow(size);
  let rendered = renderRow(current);

  // evolve the automata
  for (let i = 0; i < time; i++) {
    current = nextGeneration(ruleSet, current);
    rendered += renderRow(current);
  }

  return rendered;
}

// generator version
function createCellularAutomata(ruleNumber: number, size: number) {
  const ruleSet = getRuleSet(ruleNumber);
  let current = initialRow(size);
  return function* () {
    yield renderRow(current);
    // evolve the automata
    while (true) {
      current = nextGeneration(ruleSet, current);
      yield renderRow(current);
    }
  };
}

const generator = createCellularAutomata(110, 30)();
setInterval(() => {
  console.log({ ['']: generator.next().value });
}, 50);
