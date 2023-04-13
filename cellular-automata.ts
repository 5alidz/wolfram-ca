import { createCellularAutomata } from './elementary-cellular-automata';

// example running the command yarn start rule-30 speed-10 size-100
const getArgs = (args: string[]) => {
  // these args could be in any order
  const ruleNumber = args.find((arg) => arg.startsWith('rule-'));
  const speed = args.find((arg) => arg.startsWith('speed-'));
  const size = args.find((arg) => arg.startsWith('size-'));
  return {
    ruleNumber: ruleNumber ? parseInt(ruleNumber.split('-')[1]) : 30,
    speed: speed ? parseInt(speed.split('-')[1]) : 10,
    size: size ? parseInt(size.split('-')[1]) : 100,
  };
};

const { ruleNumber, speed, size } = getArgs(process.argv.slice(2));
const generator = createCellularAutomata(ruleNumber, size)();
const render = (value: string) => process.stdout.write(value);

setInterval(() => {
  const { done, value } = generator.next();
  if (done) process.exit(0);
  render(value + '\n');
}, speed);
