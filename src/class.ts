import { VNodeData } from 'vue/types/vnode';
import { Vue } from 'vue/types/vue';
import { Dictionary } from '../types/global';
import options from './options';

type VNodeClass = string | Dictionary<string> | Array<VNodeClass> | unknown;

export function isObject<T extends object = any>(obj: unknown): obj is T {
  return obj !== null && typeof obj === 'object'
}

export function isPrimitive (value: unknown) {
  return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'symbol' ||
      typeof value === 'boolean'
  )
}

let $style!: Dictionary<string>; // yes, I use global variables and have no shame

export function replaceClasses(vm: Vue, data: VNodeData) {
  $style = vm.$style;

  if(data.staticClass)
    data.staticClass = processString(data.staticClass);
  if(data.class)
    data.class = processClass(data.class);
}

function processClass(value: VNodeClass): VNodeClass {
  if (Array.isArray(value))
    return processArray(value);

  if (isObject<Dictionary<string>>(value))
    return processObject(value);

  if (typeof value === 'string')
    return processString(value);

  return value
}

function processArray (value: Array<VNodeClass>): Array<VNodeClass> {
  return value.map(processClass);
}

function processString (value: string): string {
  return value.replace(/\S+/g, cls => $style[cls] || options.global[cls] || cls);
}

function processObject (value: Dictionary<string>): Dictionary<string> {
  const obj: Dictionary<string> = {};
  for (const key in value)
    obj[processString(key)] = value[key];
  return obj
}
