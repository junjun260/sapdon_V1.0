class ShapedRecipe {
    constructor(id, pattern, key, output, tags, unlock, priority) {
      this.id = id;
      this.pattern = pattern;
      this.key = key;
      this.output = output;
      this.tags = tags;
      this.unlock = unlock;
      this.priority = priority;
    }
  
    toJSON() {
      return {
        "format_version": "1.17.41",
        "minecraft:recipe_shaped": {
          "description": {
            "identifier": this.id
          },
          "tags": this.tags,
          "pattern": this.pattern,
          "key": this.key,
          "unlock": this.unlock,
          "result": this.output,
          "priority": this.priority
        }
      };
    }
  }
  
  class ShapelessRecipe {
    constructor(id, ingredients, output, tags, unlock, priority) {
      this.id = id;
      this.ingredients = ingredients;
      this.output = output;
      this.tags = tags;
      this.unlock = unlock;
      this.priority = priority;
    }
  
    toJSON() {
      return {
        "format_version": "1.17.41",
        "minecraft:recipe_shapeless": {
          "description": {
            "identifier": this.id
          },
          "tags": this.tags,
          "ingredients": this.ingredients,
          "unlock": this.unlock,
          "result": this.output,
          "priority": this.priority
        }
      };
    }
  }
  
  class FurnaceRecipe {
    constructor(id, input, output, tags, unlock) {
      this.id = id;
      this.input = input;
      this.output = output;
      this.tags = tags;
      this.unlock = unlock;
    }
  
    toJSON() {
      return {
        "format_version": "1.17.41",
        "minecraft:recipe_furnace": {
          "description": {
            "identifier": this.id
          },
          "tags": this.tags,
          "input": this.input,
          "output": this.output,
          "unlock": this.unlock
        }
      };
    }
  }
  
  class BrewingRecipe {
    constructor(id, input, reagent, output, tags, unlock) {
      this.id = id;
      this.input = input;
      this.reagent = reagent;
      this.output = output;
      this.tags = tags;
      this.unlock = unlock;
    }
  
    toJSON() {
      return {
        "format_version": "1.17.41",
        "minecraft:recipe_brewing": {
          "description": {
            "identifier": this.id
          },
          "tags": this.tags,
          "input": this.input,
          "reagent": this.reagent,
          "output": this.output,
          "unlock": this.unlock
        }
      };
    }
  }
  
  // 示例：创建不同类型的配方
  const shapedRecipe = new ShapedRecipe(
    "example:shaped_craft",
    ["X", "Y"],
    { "X": "minecraft:iron_ingot", "Y": "minecraft:stick" },
    { "item": "minecraft:iron_sword" },
    ["crafting_table"],
    [{ "item": "minecraft:iron_ingot" }, { "item": "minecraft:stick" }],
    2
  );
  
  const shapelessRecipe = new ShapelessRecipe(
    "example:shapeless_craft",
    [
      { "item": "minecraft:iron_ingot" },
      { "item": "minecraft:stick" }
    ],
    { "item": "minecraft:iron_sword" },
    ["crafting_table"],
    [{ "item": "minecraft:iron_ingot" }, { "item": "minecraft:stick" }],
    2
  );
  
  const furnaceRecipe = new FurnaceRecipe(
    "example:furnace_craft",
    "minecraft:iron_ingot",
    { "item": "minecraft:iron_nugget", "count": 4 },
    ["furnace"],
    [{ "item": "minecraft:iron_ingot" }]
  );
  
  const brewingRecipe = new BrewingRecipe(
    "example:brewing_craft",
    "minecraft:water_bucket",
    "minecraft:fermented_spider_eye",
    { "item": "minecraft:potion", "data": 8229 },
    ["brewing_stand"],
    [{ "item": "minecraft:water_bucket" }, { "item": "minecraft:fermented_spider_eye" }]
  );
  
  console.log(JSON.stringify(shapedRecipe, null, 2));
  console.log(JSON.stringify(shapelessRecipe, null, 2));
  console.log(JSON.stringify(furnaceRecipe, null, 2));
  console.log(JSON.stringify(brewingRecipe, null, 2));

  debugger