export class Data {
  constructor(table, version , data) {
    this.tag = "beh";
    this.table = table;
    this.version = version;
    this.elements = data||{};
  }
  /**
   * 获取指定名称的元素
   * @param {string} name 元素名称
   * @returns {Object} 元素对象
   */
  getElement(name) {
    const {
      [name]: element = {}
    } = this.elements;
    return element;
  }
  /**
   * 设置指定名称的元素
   * @param {string} name 元素名称
   * @param {Object} context 元素对象
   */
  setElement(name, context) {
    this.elements = {
      ...this.elements,
      [name]: context
    };
  }
  deleteElement(name){
    delete this.elements[name];
  }
  /**
   * 将数据转换为 JSON 格式
   * @returns {string} JSON 字符串
   */
  toJsonData() {
    const data = {
      format_version: this.version,
      [`minecraft:${this.table}`]: this.elements
    };
    return JSON.stringify(data, null, 2);
  }

   /**
   * 获取数据文件版本号
   * @returns {number} 数据文件版本号
   */
   getFormatVersion() {
    return this.version;
  }

  /**
   * 设置数据文件版本号
   * @param {number} version 数据文件版本号
   */
  setFormatVersion(version) {
    this.version = version;
  }
  
}
/*
这段代码定义了一个 `Data` 类，用于封装 Minecraft 数据文件的通用操作。这个类接受两个参数，`table` 表示数据文件的类型，`version` 表示数据文件的版本。

在类中，定义了三个方法：

- `getElement(name)`：用于获取指定名称的元素。这个方法通过解构赋值和对象字面量的写法，从 `this.elements` 中获取指定名称的元素。如果该元素不存在，则返回一个空对象。
- `setElement(name, context)`：用于设置指定名称的元素。这个方法通过对象展开语法，将新的元素添加到 `this.elements` 中。
- `toJsonData()`：用于将数据转换为 JSON 格式。这个方法将 `this.version` 和 `this.elements` 封装到一个对象中，并使用 `JSON.stringify()` 方法将其转换为 JSON 字符串。

这个类的作用是封装通用的数据操作方法，避免重复的代码。可以通过继承这个类，来实现不同类型的数据文件的特定操作。
*/

/**
 * 物品数据文件操作类
 */
export class ItemData extends Data {
  static itemDatas = [];
  /**
   * 构造函数
   * @param {number} version 数据文件版本号
   */
  constructor(version) {
    super("item", version);
    ItemData.itemDatas.push(this);
  }

  /**
   * 获取物品的描述信息
   * @returns {Object} 物品的描述信息
   */
  getDescription() {
    return this.getElement('description');
  }

  setDescription(name, context) {
    this.elements.description = {
      ...this.elements.description,
          [name]: context
    };
  }

  /**
   * 设置物品的组件
   * @param {Object} option 组件对象
   */
  setComponents(option) {
    this.setElement('components', {
      ...this.getElement('components'),
      ...option
    });
  }

  setEvents(event) {
    this.setElement('events', {
      ...this.getElement('events'),
      ...event
    });
  }

  /**
   * 获取物品的行为组件
   * @returns {Object} 物品的行为组件
   */
  getComponents() {
    return this.getElement('components');
  }

  /**
   * 获取物品的事件
   * @returns {Object} 物品的事件
   */
  getEvents() {
    return this.getElement('events');
  }

}

/*
这段代码定义了一个 `ItemData` 类，继承自 `Data` 类。这个类用于封装 Minecraft 物品数据文件的操作。

在类中，定义了一些方法：

- `constructor(version)`：构造函数，用于调用父类的构造函数，并传入 `"item"` 和 `version` 两个参数。
- `setDescription(identifier, category)`：用于设置物品的描述信息。这个方法接受两个参数，`identifier` 表示物品的 ID，`category` 表示物品的分类。这个方法将描述信息封装到一个对象中，并调用父类的 `setElement()` 方法，将对象添加到 `this.elements` 中。
- `setComponents(option)`：用于设置物品的行为组件。这个方法接受一个参数 `option`，表示要设置的行为组件。这个方法首先调用 `this.getElement('components')` 方法获取之前设置的行为组件，然后使用对象展开语法和参数 `option` 将新的行为组件合并到原有的行为组件中，并调用父类的 `setElement()` 方法，将新的行为组件添加到 `this.elements` 中。
- `getFormatVersion()`：用于获取数据文件的版本号。
- `getDescription()`：用于获取物品的描述信息。
- `getComponents()`：用于获取物品的行为组件。
- `getEvents()`：用于获取物品的事件。
- `setFormatVersion(version)`：用于设置数据文件的版本号。

这个类的作用是封装通用的物品数据操作方法，避免重复的代码。通过继承 `Data` 类，可以实现更加方便的代码复用。
*/

/**
 * attachable 数据文件。
 */
export class AttachableData extends Data {
  static attachableDatas = [];
  /**
   * 创建一个 Minecraft 的 attachable 数据文件。
   * @param {number} version 数据版本号。
   */
  constructor(type,version,data) {
    super(type||'attachable',version,data);
    this.renderControllers = [];
    this.animationControllers = [];
    if(!data) return
    if(!data['description']) this.setElement('description', {});
    if(type!= "attachable") return
    AttachableData.attachableDatas.push(this);
  }
  
  getDescriptionElement(name) {
    const {
          [name]: element = {}
    } = this.elements.description;
    return element;
  }

  setDescriptionElement(name, context) {
    this.elements.description = {
      ...this.elements.description,
          [name]: context
    };
  }

  /**
   * 获取 identifier 字段的值。
   * @returns {string} identifier 字段的值。
   */
  getIdentifier() {
    return this.getDescriptionElement('identifier');
  }

  /**
   * 设置 identifier 字段的值。
   * @param {string} identifier identifier 字段的值。
   */
  setIdentifier(identifier) {
    this.setDescriptionElement('identifier', identifier);
  }

  /**
   * 获取 materials 字段的值。
   * @returns {object} materials 字段的值。
   */
  getMaterials() {
    return this.getDescriptionElement('materials') || {};
  }

  /**
   * 设置 materials 字段的值。
   * @param {string} name 材质名称。
   * @param {string} material 材质路径。
   */
  setMaterials(name, material) {
    this.setDescriptionElement('materials', {
      ...this.getMaterials(),
      [name]: material,
    });
  }

  /**
   * 获取 textures 字段的值。
   * @returns {object} textures 字段的值。
   */
  getTextures() {
    return this.getDescriptionElement('textures') || {};
  }

  /**
   * 设置 textures 字段的值。
   * @param {string} name 纹理名称。
   * @param {string} texture 纹理路径。
   */
  setTextures(name, texture) {
    this.setDescriptionElement('textures', {
      ...this.getTextures(),
      [name]: texture,
    });
  }

  /**
   * 获取 geometry 字段的值。
   * @returns {object} geometry 字段的值。
   */
  getGeometry() {
    return this.getDescriptionElement('geometry') || {};
  }

  /**
   * 设置 geometry 字段的值。
   * @param {string} name 几何体名称。
   * @param {object} geometry 几何体数据。
   */
  setGeometry(name, geometry) {
    this.setDescriptionElement('geometry', {
      ...this.getGeometry(),
      [name]: geometry,
    });
  }

  /**
   * 获取 animations 字段的值。
   * @returns {object} animations 字段的值。
   */
  getAnimations() {
    return this.getDescriptionElement('animations') || {};
  }

  /**
   * 设置 animations 字段的值。
   * @param {string} name 动画名称。
   * @param {object} animation 动画数据。
   */
  setAnimations(name, animation) {
    this.setDescriptionElement('animations', {
      ...this.getAnimations(),
      [name]: animation,
    });
  }

  /**
   * 获取 scripts 字段的值。
   * @returns {object} scripts 字段的值。
   */
  getScripts() {
    return this.getDescriptionElement('scripts') || {};
  }

  /**
   * 设置 scripts 字段的值。
   * @param {string} name 脚本名称。
   * @param {string} script 脚本路径。
   */
  setScripts(name, script) {
    this.setDescriptionElement('scripts', {
      ...this.getScripts(),
      [name]: script,
    });
  }

  /**
   * 添加渲染控制器。
   * @param {object} controller 渲染控制器数据。
   */
  addRenderController(controller) {
    this.renderControllers.push(controller);
    this.setDescriptionElement('render_controllers', this.renderControllers);
  }
 
  /**
   * 添加渲染控制器。
   * @param {object} controller 渲染控制器数据。
   */
  addAnimationControllers(controller) {
    this.animationControllers.push(controller);
    this.setDescriptionElement('animation_controllers', this.animationControllers);
  }
}


export class BlockData extends Data {
  static blockDatas = [];
  permutations = [];
  constructor(version) {
    super('block', version);
    BlockData.blockDatas.push(this);
  }

  /**
   * 获取方块的描述信息
   * @returns {Object} 物品的描述信息
   */
  getDescription() {
    return this.getElement('description');
  }

  setDescription(name, context) {
    this.elements.description = {
      ...this.elements.description,
          [name]: context
    };
  }

  getStates() {
    return this.getDescription()["states"];
  }

  /**
   * 设置方块状态
   * @param {string} name 名
   * @param {any} state 状态
   */
  setStates(name,state){
    this.setDescription("states",{
      ...this.getStates(),
      [name]:state
    });
  }

  /**
   * 获取方块的行为组件
   * @returns {Object} 物品的行为组件
   */
  getComponents() {
    return this.getElement('components');
  }

  /**
   * 设置方块的组件
   * @param {Object} option 组件对象
   */
  setComponents(option) {
    this.setElement('components', {
      ...this.getElement('components'),
      ...option
    });
  }

  /**
   * 获取方块的permutations
   * @returns {Object} permutations
   */
  getPermutations() {
    return this.permutations;
  }
  
  
  addPermutation(permutation){
    this.permutations.push(permutation);

    const result = Object.values(
      this.permutations.reduce((acc, cur) => {
        const { condition, components } = cur;
        if (!acc[condition]) {
          acc[condition] = {
            condition,
            components: {}
          };
        }
        acc[condition].components = Object.assign(acc[condition].components, components);
        return acc;
      }, {})
    );
    this.permutations = result;
    
    this.setElement("permutations", this.permutations);
  }

  setEvents(event) {
    this.setElement('events', {
      ...this.getElement('events'),
      ...event
    });
  }
}

export class EntityResData extends AttachableData{
  static entityResDatas = [];
  constructor(version,data){
    super("client_entity",version,data);
    EntityResData.entityResDatas.push(this);
  }
  
  deleteDescriptionElement(name){
    delete this.elements["description"][name];
  }
}

export class EntityBehData extends Data{
  static entityBehDatas = [];
  constructor(version,data){
    super("entity",version,data);
    EntityBehData.entityBehDatas.push(this);
  }

  getDescription(name) {
    const {
          [name]: element = {}
    } = this.elements.description;
    return element;
  }

  setDescription(name, context) {
    this.elements.description = {
      ...this.elements.description,
          [name]: context
    };
  }

  deleteDescription(name){
    delete this.elements["description"][name];
  }

  /**
   * 获取组件
   * @returns {Object} 物品的行为组件
   */
  getComponents() {
    return this.getElement('components');
  }

  /**
   * 设置组件
   * @param {Object} option 组件对象
   */
  setComponents(option) {
    this.setElement('components', {
      ...this.getElement('components'),
      ...option
    });
  }

  deleteComponent(name){
    delete this.elements["components"][name];
  }

  /**
   * 获取事件
   * @returns {Object} 物品的事件
   */
  getEvents() {
    return this.getElement('events');
  }

  setEvents(event) {
    this.setElement('events', {
      ...this.getElement('events'),
      ...event
    });
  }

  deleteEvent(name){
    delete this.elements["events"][name];
  }
  
}
