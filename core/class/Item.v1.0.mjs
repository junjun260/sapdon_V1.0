import { ItemData } from "./Data.mjs";

//稳定版api

export class Item {
  /**
   * 构造函数
   * @param {string} identifier 物品的 ID
   * @param {string} category 物品的分类
   * @param {string} texture 物品的贴图
   * @param {Object} componentsOpt 物品的行为组件
   */
  constructor(identifier, category, texture, componentsOptions = {}) {
    this.identifier = identifier;
    this.category = category;
    this.texture = texture;

    this.componentsOptions = componentsOptions;
    this.components = [];
  }
  build(){
    this.behData = new ItemData('1.10.0');
    this.behData.tag = "beh";

    this.resData = new ItemData('1.10.0');
    this.resData.tag = "res";

    this.behData.setDescription("identifier", this.identifier);
    this.resData.setDescription("identifier", this.identifier);

    this.resData.setComponents({
      "minecraft:icon": this.texture
    });

    //components
    const defaultComponents = {
        "foil": false,
        "max_damage": 0,
        "use_duration": 0,
        "max_stack_size": 64,
        ...this.componentsOptions
    };
    Object.entries(defaultComponents).forEach(([key,value])=>{
        const obj = {};
        obj[`minecraft:${key}`] = value;
        this.components.push(obj);
    }, {});
    this.components.forEach((component)=>{
        this.behData.setComponents(component);
    });
  }

  addComponent(component){
    this.components.push(component);
  }

  setBlockPlacer(blockId, alowBlocks) {
    this.addComponent({
      "minecraft:block_placer": {
        "block": blockId,
        "use_on": alowBlocks
      }
    });
  }

  /**
   * 设置物品是否可以被附魔
   * @param {boolean} boolean 物品是否可以被附魔
   */
  setFoil(boolean) {
    this.addComponent({
      "minecraft:foil": boolean
    });
  }

  /**
   * 设置物品的最大耐久度
   * @param {number} number 物品的最大耐久度
   */
  setMaxDamage(number) {
    this.addComponent({
      "minecraft:max_damage": number
    });
  }

  /**
   * 设置物品是否可以堆叠
   * @param {boolean} boolean 物品是否可以堆叠
   */
  setStackedByData(boolean) {
    this.addComponent({ "minecraft:stacked_by_data": boolean });
  }

  /**
   * 设置物品的最大堆叠数量
   * @param {number} number 物品的最大堆叠数量
   */
  setMaxStackSize(number) {
    this.addComponent({ "minecraft:max_stack_size": number });
  }

  /**
   * 设置物品使用的持续时间
   * @param {number} number 物品使用的持续时间
   */
  setUseDuration(number) {
    this.addComponent({ "minecraft:use_duration": number });
  }
}

/*
const test = new Item("test:item","item","masterball",{
  "foil": true,
  "max_damage": 10,
  "use_duration": 10,
  "max_stack_size": 1,
  "test":111
});
test.build();
console.log(test.behData.toJsonData());*/