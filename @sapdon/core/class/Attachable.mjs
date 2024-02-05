 import { AttachableData } from "./Data.mjs"
 
 export class Attachable {
  constructor(identifier, texture, geometry){
    this.attachableData = new AttachableData('attachable','1.8.0',{});
    this.identifier = identifier;
    this.texture = texture;
    this.geometry = geometry;
    
    this.setIdentifier(identifier);
    this.addMaterial('default','entity_alphatest');
    this.addTexture('default',texture);
    this.addGeometry('default',geometry);
  }
  setIdentifier(identifier){
    this.attachableData.setIdentifier(identifier);
  }
  addTexture(name,texture){
    this.attachableData.setTextures(name,texture);
  }
  addGeometry(name,geometry){
    this.attachableData.setGeometry(name,geometry);
  }
  addMaterial(name, material) {
    this.attachableData.setMaterials(name, material);
  }
  addAnimation(name,animation){
    this.attachableData.setAnimations(name,animation);
  }
  setScript(name,script){
    this.attachableData.setScripts(name,script);
  }
  addRenderController(controller){
    this.attachableData.addRenderController(controller);
  }
}

/*
let atta = new AttachableData('test');
atta.setIdentifier('minecraft:trident');
atta.setMaterials('default', 'entity_alphatest');
atta.setTextures('default', 'textures/entity/trident')
atta.setGeometry('default', 'geometry.trident');
atta.setAnimations('wield', 'controller.animation.trident.wield');
atta.setScripts('pre_animation', [1, 2, 3])
atta.setScripts('animate', 'wield')
atta.addRenderController('controller.render.item_default');
console.log(atta.toJsonData());*/