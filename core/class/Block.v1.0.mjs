import { BlockComponents } from "../objects/components/BlockComponents.mjs";
import { BlockData } from "./Data.mjs";

export class Block {
    constructor(identifier, category, variantDatas){
      this.identifier = identifier;
      this.category = category;
      this.variantDatas = variantDatas;

      this.states = {};
      this.events = {};
      this.components = {};
      this.permutations = [];
      this.materialInstances = {};

      const sideArr = ['*','up', 'down', 'north', 'east', 'south','west'];
      this.variantDatas.forEach(({stateTag,textures,material}) => {
        const materialObj = {};
        textures.forEach((texture,index)=>{
          materialObj[sideArr[index]] = {
              "texture":texture,
              "render_method": material?material.render_method:"blend",
              "face_dimming": material?material.face_dimming:false,
              "ambient_occlusion": material?material.ambient_occlusion:false
          };
        });
        this.materialInstances[stateTag] = materialObj;
      });
    }
    // 添加事件
    addEvent(eventName, event) {
      const obj = {
        [eventName]: event
      };
      Object.assign(this.events,obj);
    }
    
    registerState(name, context) {
        this.states[name] = context;
    }
  
    setVariantComponent(stateTag, component) {
      if(!this.components[stateTag]){
        this.components[stateTag] = {};
      }
      Object.assign(this.components[stateTag],component);
      this.addPermutation(`q.block_state('sapdon:block_variant_tag') == ${stateTag}`,component);
    }
    setVariantMaterialInstances(stateTag,material){
      Object.assign(this.materialInstances[stateTag],material);
    }
    addPermutation(condition, components) {
      this.permutations.push({ condition, components });
    }
    addUnitCube() {
      const unit_cube = BlockComponent.unitCube();
      this.setVariantComponent(0,unit_cube);
    }
    setLoot(loot) {
      const loot_ = BlockComponent.loot(loot);
      this.setVariantComponent(0,loot_);
    }
    setDestructibleByMining(seconds_to_destroy) {
      const optionObj = BlockComponent.destructibleByMining(seconds_to_destroy);
      this.setVariantComponent(0,optionObj);
    }
    setDestructibleByExplosion(explosion_resistance) {
      const optionObj = BlockComponent.destructibleByExplosion(explosion_resistance);
      this.setVariantComponent(0,optionObj);
    }
    setFriction(friction) {
      const optionObj = BlockComponent.friction(friction);
      this.blockData.setComponents(optionObj);
    }
    setLightEmission(light_emission) {
      const optionObj = BlockComponent.lightEmission(light_emission);
      this.setVariantComponent(0,optionObj);
    }
    setLightDampening(light_dampening) {
      const optionObj = BlockComponent.lightDampening(light_dampening);
      this.setVariantComponent(0,optionObj);
    }
    setMaterialInstances(material_instances) {
      this.setVariantMaterialInstances(0,material_instances);
    }
    setCollisionBox(origin,size) {
      const optionObj = BlockComponent.collisionBox(origin,size);
      this.setVariantComponent(0,optionObj);
    }
    setCraftingTable(table_name,crafting_tags) {
      const optionObj = BlockComponent.craftingTable(table_name,crafting_tags);
      this.setVariantComponent(0,optionObj);
    }
    setFlammable(catch_chance_modifier, destroy_chance_modifier) {
      const optionObj = BlockComponent.flammable(catch_chance_modifier,destroy_chance_modifier);
      this.setVariantComponent(0,optionObj);
    }
    setGeometry(geometry) {
      const optionObj = BlockComponent.geometry(geometry);
      this.setVariantComponent(0,optionObj);
    }
    setMapColor(color) {
      const optionObj = BlockComponent.mapColor(color);
      this.setVariantComponent(0,optionObj);
    }
    setSelectionBox(origin,size) {
      const optionObj = BlockComponent.selectionBox(origin,size);
      this.setVariantComponent(0,optionObj);
    }
    setPlacementFilter(filter) {
      const optionObj = BlockComponent.placementFilter(filter);
      this.setVariantComponent(0,optionObj);
    }
    setTransformation(translation,rotation,scale) {
      const optionObj = BlockComponent.transformation(translation,rotation,scale);
      this.setVariantComponent(0,optionObj);
    }

    build(){
      const blockData = new BlockData("1.12.30");
      blockData.setDescription("identifier",this.identifier);
      blockData.setDescription("menu_category",{"category": this.category});
      this.registerState("sapdon:block_variant_tag",{
        "values": { "min": 0, "max": this.variantDatas.length>1?this.variantDatas.length-1:1 } 
      });
      //materialInstances
      this.variantDatas.forEach(({stateTag})=>{
        this.addPermutation(`q.block_state('sapdon:block_variant_tag') == ${stateTag}`,BlockComponent.materialInstances(this.materialInstances[stateTag]));
      });
      //states
      for(let name in this.states){
        blockData.setStates(name,this.states[name]);
      }
      //events
      for(let event in this.events){
        blockData.setEvents(event);
      }
      //permutations
      this.permutations.forEach(({condition,components})=>{
        //console.log(components)
        blockData.addPermutation({
          "condition":condition,
          "components":components
        });
      });
      return blockData.toJsonData();
    }
    out() {
      const blockData = {
        identifier: this.identifier,
        category: this.category,
        states: this.states,
        permutations: this.permutations,
        materialInstances:this.materialInstances,
        variants:this.components,
        events:this.events
      };
      return blockData;
    }
  }


  
