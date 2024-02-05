class LootTable {
    constructor() {
      this.pools = [];
    }
  
    // 添加加权随机池
    addWeightedRandomPool(rolls, entries) {
      this.pools.push({
        "rolls": rolls,
        "entries": entries
      });
    }
  
    // 创建物品条目
    createItemEntry(name, weight, functions = []) {
      return {
        "type": "item",
        "name": name,
        "weight": weight,
        "functions": functions
      };
    }
  
    // 创建空条目
    createEmptyEntry() {
      return {
        "type": "empty",
        "weight": 0
      };
    }
  
    // 创建条件
    createCondition(conditionType, conditionData) {
      return {
        "condition": conditionType,
        ...conditionData
      };
    }
  
    // 创建函数
    createFunction(functionType, functionData) {
      return {
        "function": functionType,
        ...functionData
      };
    }
  
    // 添加分层池
    addTieredPool(tiers, entries) {
      this.pools.push({
        "tiers": tiers,
        "entries": entries
      });
    }
  
    // 生成战利品表
    generate() {
      return {
        "pools": this.pools
      };
    }
  }
  
  // 使用示例
  const lootTable = new LootTable();
  
  // 创建一些函数和条件
  const setCountFunction = lootTable.createFunction("set_count", { "min": 1, "max": 3 });
  const setEnchantmentFunction = lootTable.createFunction("enchant_with_levels", { "enchantments": [{ "id": "minecraft:sharpness", "levels": 1 }] });
  
  // 创建一个加权随机池
  lootTable.addWeightedRandomPool({
    "min": 1,
    "max": 3
  }, [
    lootTable.createItemEntry("minecraft:diamond", 10, [setCountFunction]),
    lootTable.createItemEntry("minecraft:gold_ingot", 20, []),
    lootTable.createItemEntry("minecraft:iron_ingot", 30, [])
  ]);
  
  // 创建一个分层池
  lootTable.addTieredPool({
    "initial_range": 2,
    "bonus_rolls": 1,
    "bonus_chance": 0.1
  }, [
    lootTable.createLootTableEntry("loot_table", "loot_tables/chests/abandoned_mineshaft.json"),
    lootTable.createLootTableEntry("loot_table", "loot_tables/chests/simple_dungeon.json"),
    lootTable.createLootTableEntry("loot_table", "loot_tables/chests/stronghold_corridor.json", [], [
      lootTable.createCondition("survives_explosion", { "explosion": "creeper" })
    ])
  ]);
  
  // 输出生成的战利品表
  console.log(JSON.stringify(lootTable.generate(), null, 2));
  debugger