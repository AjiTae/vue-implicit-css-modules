export interface Options {
  global?: Dictionary<string>,
  unsafe?: boolean
}

const options: Required<Options> = {
  global: {},
  unsafe: false
};

export default options;
