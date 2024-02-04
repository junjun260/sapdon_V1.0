import { ItemComponents } from "../objects/components/ItemComponents.mjs";
import { ItemData } from "./Data.mjs";

export class Equipment{
    tags = [];
    events = [];
    components = [];
    repairableItemList = [];

    constructor(identifier, category, texture, componentsOptions = {}) {
        this.identifier = identifier;
        this.category = category;
        this.texture = texture;
        this.componentsOptions = componentsOptions;
        this.itemName = identifier.slice(':')[1];
    }

    addComponet(component){
        this.components.push(component);
    }

    build(){
        this.behData = new ItemData('1.16.100');

        this.behData.setDescription("identifier", this.identifier);
        this.behData.setDescription("category", this.category);
        this.behData.setComponents(ItemComponents.icon(this.texture));

        //this.setComponentsOptions(this.componentsOptions);
        //tags
        this.tags.forEach((tag)=>{
            const tag_ = {};
            tag_[tag] = {};
            this.addComponet(tag_);
        });
        //repairableItemList
        if(this.repairableItemList.length>0)
        this.addComponet(ItemComponents.repairable(this.repairableItemList));

        //components
        this.components.forEach((component)=>{
            this.behData.setComponents(component);
        });

        //events
        this.events.forEach((event)=>{
            this.behData.setEvents(event);
        });
    }
    setComponentsOptions(componentsOptions) {
      const defaultComponents = {
        "foil": false,
        "max_stack_size": 64,
        "use_duration": 0,
        "allow_off_hand": false,
        "hand_equipped": false,
        ...componentsOptions
      };
      Object.entries(defaultComponents).forEach(([key,value])=>{
          const obj = {};
          obj[`minecraft:${key}`] = value;
          this.components.push(obj);
        }, {});
    }
    setItemName(string){
        this.itemName = string;
        const options = ItemComponents.display_name(string);
        this.addComponet(options);
    }
    setGlint(boolean){
        const options = ItemComponents.glint(boolean);
        this.addComponet(options);
    }
    setMaxStackSize(number) {
        const options = ItemComponents.max_stack_size(number);
        this.addComponet(options);
    }
    
    setUseDuration(number) {
        const options = ItemComponents.use_duration(number);
        this.addComponet(options);
    }
    
    allowOffHand(boolean) {
        const options = ItemComponents.allow_off_hand(boolean);
        this.addComponet(options);
    }
    setHandEquipped(boolean) {
        const options = ItemComponents.hand_equipped(boolean);
        this.addComponet(options);
    }
   
    setDamage(number) {
        const options = ItemComponents.damage(number);
        this.addComponet(options);
    }
    setHoverTextColor(string) {
        const options = ItemComponents.hover_text_color(string);
        this.addComponet(options);
    }
    setCanDestroyInCreative(boolean) {
        const options = ItemComponents.can_destroy_in_creative(boolean);
        this.addComponet(options);
    }
    setMaxDurability(maxDurability, minDamage, maxDamage) {
        const options = ItemComponents.durability(maxDurability, minDamage, maxDamage);
        this.addComponet(options);
    }
    //以上是基础方法
    setCreativeCategory(string) {
        const options = ItemComponents.creative_category(string);
        this.addComponet(options);
    }
    
    setBlockPlacer(blockId, alowBlocks) {
        const options = ItemComponents.block_placer(blockId, alowBlocks);
        this.addComponet(options);
    }
    
    setEntityPlacer(entityId, alowBlocks, disBlock) {
        const options = ItemComponents.entity_placer(entityId,alowBlocks,disBlock);
        this.addComponet(options);
    }
    
    setWearable(dispensable,slot) {
        const options = ItemComponents.wearable(dispensable,slot);
        this.addComponet(options);
    }
    
    setThrowable(do_swing_animation,max_draw_duration,scale_power_by_draw_duration) {
        const options = ItemComponents.throwable(do_swing_animation,max_draw_duration,scale_power_by_draw_duration);
        this.addComponet(options);
    }
    setProjectile(power, entityId) {
        const options = ItemComponents.projectile(entityId,power);
        this.addComponet(options);
    }
    
    setShooter(charge_on_draw, launch_power_scale, max_draw_duration, max_launch_power, scale_power_by_draw_duration, ammunition) {
        const options = ItemComponents.shooter(charge_on_draw, launch_power_scale, max_draw_duration, max_launch_power, scale_power_by_draw_duration, ammunition);
        this.addComponet(options);
      }

    setDyePowder(color) {
        const options = ItemComponents.dye_powder(color);
        this.addComponet(options);
    }
    
    setKnockbackResistance(protection) {
        const options = ItemComponents.knockback_resistance(protection);
        this.addComponet(options);
    }
    
    setEnchantable(slot, value) {
        const options = ItemComponents.enchantable(slot,value);
        this.addComponet(options);
    }
    
    setArmor(protection) {
        const options = ItemComponents.armor(protection);
        this.addComponet(options);
    }
    
    setRecord(sound,duration,comparatorSignal) {
        const options = ItemComponents.record(sound,duration,comparatorSignal);
        this.addComponet(options);
      }
    
    setDigger(use_efficiency, arr) {
        const options = ItemComponents.digger(use_efficiency,arr);
        this.addComponet(options);
    }
    
    setRepairable(arr) {
        const options = ItemComponents.repairable(arr);
        this.addComponet(options);
    }
    
    setOnUse(event, target) {
        const options = ItemComponents.on_use(event, target);
        this.addComponet(options);
    }
    
    setOnUseOn(event, target) {
        const options = ItemComponents.on_use_on(event, target);
        this.addComponet(options);
      }
    

    // 添加标签
    addTag(tag) {
        this.tags.push(tag);
    }
  
    // 添加常见标签
    addSwordTag() {
      this.addTag('minecraft:is_sword');
    }
  
    addToolTag() {
      this.addTag('minecraft:is_tool');
    }
  
    addAxeTag() {
      this.addTag('minecraft:is_axe');
    }
  
    // 添加事件
    addEvent(eventName, eventConext) {
      const event = {[eventName]: eventConext};
      this.events.push(event);
    }

    /**
     * 添加可修复物品列表
     * @param {Array} itemsList 可修复物品列表
     * @param {string|molang} repair_amount 修复值表达式
     */
    addRepairableItemsList(itemsList, repair_amount) {
      this.repairableItemList.push(
      {
        "items": itemsList,
        "repair_amount": repair_amount
      });
    }
    /**
     * 添加单个可修复物品
     * @param {string} itemId 物品标识符
     * @param {number|molang} repair_amount  修复值表达式
     */
    addRepairableItem(itemId, repair_amount) {
      this.repairableItemList.push(
      {
        "items": [itemId],
        "repair_amount": repair_amount
      });
    }
  }
