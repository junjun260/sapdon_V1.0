import { Attachable } from "./Attachable.mjs";
import { Equipment } from "./Equipment.v1.0.mjs";
//2024.1.18

//Armor
export class Chestplate extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOptions = {}){
      super(identifier,category, texture, componentsOptions);
      //Attachables
      this.attachable = new Attachable(identifier,armor_texture,"geometry.humanoid.armor.chestplate");
      this.attachable.addMaterial("enchanted", "armor_enchanted");
      this.attachable.addTexture("enchanted","textures/misc/enchanted_item_glint");
      this.attachable.addRenderController("controller.render.armor");
      //chest
      this.setArmor(5);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my chest");
      this.setWearable("slot.armor.chest");
      this.setEnchantable("armor_torso",10);
      this.setCreativeCategory("itemGroup.name.chestplate");
      //默认设置 本身为可修复物品
      this.addRepairableItem(identifier,"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }

export  class Helmet extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOpt = {}){
      super(identifier,category, texture, componentsOpt);
      //Attachables
      this.attachable = new Attachable(identifier,armor_texture,"geometry.humanoid.armor.helmet");
      this.attachable.addMaterial("enchanted", "armor_enchanted");
      this.attachable.addTexture("enchanted","textures/misc/enchanted_item_glint");
      this.attachable.addRenderController("controller.render.armor");

      //chest
      this.setArmor(2);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my head");
      this.setWearable("slot.armor.head");
      this.setEnchantable("armor_head",9);
      this.setCreativeCategory("itemGroup.name.helmet");
      //默认设置 本身为可修复物品
      this.addRepairableItem(identifier,"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }

export  class Leggings extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOpt = {}){
      super(identifier,category, texture, componentsOpt);
      //Attachables
      this.attachable = new Attachable(identifier,armor_texture,"geometry.humanoid.armor.leggings");
      this.attachable.addMaterial("enchanted", "armor_enchanted");
      this.attachable.addTexture("enchanted","textures/misc/enchanted_item_glint");
      this.attachable.addRenderController("controller.render.armor");

      //chest
      this.setArmor(5);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my legs");
      this.setWearable("slot.armor.legs");
      this.setEnchantable("armor_legs",9);
      this.setCreativeCategory("itemGroup.name.leggings");
      //默认设置 本身为可修复物品
      this.addRepairableItem(identifier,"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }

export  class Boots extends Equipment{
    constructor(identifier,category,texture,armor_texture,componentsOpt = {}){
      super(identifier,category, texture, componentsOpt);
      //Attachables
      this.attachable = new Attachable(identifier,armor_texture,"geometry.humanoid.armor.boots");
      this.attachable.addMaterial("enchanted", "armor_enchanted");
      this.attachable.addTexture("enchanted","textures/misc/enchanted_item_glint");
      this.attachable.addRenderController("controller.render.armor");

      //chest
      this.setArmor(2);
      this.setMaxStackSize(1);
      this.setMaxDurability(200);
      this.setItemName("my feets");
      this.setWearable("slot.armor.feet");
      this.setEnchantable("armor_feet",9);
      this.setCreativeCategory("itemGroup.name.boots");
      //默认设置 本身为可修复物品
      this.addRepairableItemsList(identifier,"context.other->query.remaining_durability + 0.12 * context.other->query.max_durability");
    }
  }
