// example of wolfram elementary cellular automata
// https://en.wikipedia.org/wiki/Elementary_cellular_automaton

const CELL_0 = ' ';
const CELL_1 = '█';

function renderRow(row: number[]) {
  return row.map((cell) => (cell === 1 ? CELL_0 : CELL_1)).join('') + '\n';
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

function initAutomata(size: number) {
  const automata = new Array<number>(size).fill(0);
  automata[Math.floor(size / 2)] = 1;
  return automata;
}

function cellularAutomata(ruleSet: number[], size: number, time: number) {
  let current = initAutomata(size);
  let rendered = renderRow(current);

  // evolve the automata
  for (let i = 0; i < time; i++) {
    current = nextGeneration(ruleSet, current);
    rendered += renderRow(current);
  }

  return rendered;
}

// example rule set, ideally we want to explore the space of all possible rules
// https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
const rules = {
  30: [0, 1, 1, 1, 1, 0, 0, 0],
};

console.log(cellularAutomata(rules[30], 100, 100));
