import { Vue, CreateElement, VueConstructor } from 'vue/types/vue';
import { PluginObject } from 'vue/types/plugin';
import { Dictionary } from "../types/global";
import { isObject, isPrimitive, replaceClasses } from './class';
import options, { Options } from './options';

const configurable = true, enumerable = true, writable = true;

function createElementWraper(value: CreateElement, vm: Vue) {
  return {
    value: function (tag: any, data: any, ...args: any) {
      if (data && '$style' in vm && !Array.isArray(data) && !isPrimitive(data))
        replaceClasses(vm, data);

      return value.call(this, tag, data, ...args);
    },
    configurable,
    enumerable,
    writable
  }
}

function isImplicitModule(vm: Vue) {
  return vm && (options.unsafe || vm.$options && vm.$options.implicitCssModule)
}

function createPropertyDefinition(name: string) {
  return {
    set(this: Vue, value: CreateElement) {
      Object.defineProperty(this, name, isImplicitModule(this)
          ? createElementWraper(value, this)
          : {
            value,
            configurable,
            enumerable,
            writable
          }
      );
    },
    configurable: true
  }
}

const _c = createPropertyDefinition('_c');
const $createElement = createPropertyDefinition('$createElement');

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    implicitCssModule?: boolean;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $style: Dictionary<string>;
  }

  interface VueConstructor {
    FunctionalRenderContext: Function;
  }
}

export {
  options
}

export default {
  install: function (Vue: VueConstructor, opts: Options = {}) {
    if (!('FunctionalRenderContext' in Vue))
      throw new Error('Can not find FunctionalRenderContext. Unsupported Vue version.');

    if('global' in opts && isObject<Dictionary<string>>(opts.global))
      options.global = opts.global;

    if('unsafe' in opts && typeof opts.unsafe === 'boolean')
      options.unsafe = opts.unsafe;

    Object.defineProperties(Vue.prototype, {_c, $createElement});
    Object.defineProperties(Vue.FunctionalRenderContext.prototype, {_c});
  }
} as PluginObject<Options>
