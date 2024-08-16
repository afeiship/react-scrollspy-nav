import RcComponent from '.';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    RcComponent.event.emit(`${name}:${command}`, ...args);

  // the command repository:
  const anchor = (index: number) => execute('anchor', index);

  return {
    anchor,
  };
};

export default useCommand;
