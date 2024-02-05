import { EntityBehData, EntityResData } from "./Data.mjs";
import { EntityComponents } from "../components/EntityComponents.mjs";

class ResourceData{
    constructor(data){
        this.materials = [];
        this.textures = [];
        this.geometry = [];
        this.renderControllers = [];
        this.animations = [];
        this.scripts = [];
        this.sound_effects = [];
        this.particle_effects = [];
        this.spawn_egg = [];
        this.enable_attachables = false;
        this.hide_armor = false;
        if(!data) return
    }
    out(){
        const data = {
            materials:this.materials,
            textures:this.textures,
            geometry:this.geometry,
            renderControllers:this.renderControllers,
            animations:this.animations,
            scripts:this.scripts,
            sound_effects:this.sound_effects,
            particle_effects:this.particle_effects,
            spawn_egg:this.spawn_egg,
            enable_attachables:this.enable_attachables,
            hide_armor:this.hide_armor
        }
        return data;
    }
    addMaterial(name, material) {
        const obj = {
            name:name,
            material:material
        };
        this.materials.push(obj);
    }
    addTexture(name, texture) {
        const obj = {
            name:name,
            texture:texture
        }
        this.textures.push(obj)
    }
    addGeometry(name, geometry) {
        const obj = {
            name:name,
            geometry,geometry
        };
        this.geometry.push(obj);
    }
    addAnimation(name, animation) {
        const obj = {
            name:name,
            animation:animation
        }
       this.animations.push(obj);
    }
    addScripts(name, script) {
        const obj = {
            name:name,
            script:script
        }
        this.scripts.push(obj);
    }
    addRenderController(controller) {
       this.renderControllers.push(controller)
    }
}
class BehaviorData{
    constructor(){
        this.components = [];
        this.component_groups = [];
        this.events = [];
    }
    out(){
        const data ={
            components:this.components,
            component_groups:this.component_groups,
            events:this.events
        }
        return data;
    }
    addComponent(component){
        this.components.push(component);
    }
    addComponentGroup(GroupName,components){
        const componentGroup = {};
        componentGroup[GroupName] = components;
        this.component_groups.push(componentGroup);
    }
    addEvents(eventName,eventConext){
        const event = {
            eventName:eventName,
            eventConext:eventConext
        }
        this.events.push(event);
    }
}

export class Entity{
    constructor(identifier, resourceData, behaviorData, options={}){
        this.identifier = identifier;
        this.resourceData = resourceData;
        this.behaviorData = behaviorData;
        this.options = options;

        this.components = [];
        this.component_groups = [];
        this.events = {};
    }
    build(){
        this.behData = new EntityBehData("1.16.0",{});
        this.resData = new EntityResData("1.10.0",{});

        this.behData.setDescription("identifier", this.identifier);
        this.resData.setDescriptionElement("identifier", this.identifier);

        this.behData.setDescription("is_spawnable", this.options.spawnable||true);
        this.behData.setDescription("is_summonable", this.options.summonable||true);
        this.behData.setDescription("is_experimental", this.options.experimental||false);
        this.behData.setDescription("runtime_identifier", this.options.runtime_identifier == "self" ? identifier : this.options.runtime_identifier);
        
        //beh
        this.components.concat(this.behaviorData.components);

        this.components.forEach((component)=>{
            this.behData.setComponents(component);
        });

        //res
        this.resourceData.materials.forEach(({name,material})=>{
            this.resData.setMaterials(name,material);
        });
        this.resourceData.textures.forEach(({name,texture})=>{
            this.resData.setTextures(name,texture);
        });
        this.resourceData.geometry.forEach(({name,geometry})=>{
            this.resData.setGeometry(name,geometry);
        });
        this.resourceData.animations.forEach(({name,animation})=>{
            this.resData.setAnimations(name,animation);
        });
        this.resourceData.scripts.forEach(({name,script})=>{
            this.resData.setScripts(name,script);
        });
        this.resData.addRenderController(...this.resourceData.renderControllers);
    }
    addComponent(component){
        this.components.push(component);
    }
    setPushable(is_pushable,is_pushable_by_piston){
        const option = EntityComponents.pushable(is_pushable,is_pushable_by_piston);
        this.addComponent(option);
    }
    setHealth(value,max){
        const option = EntityComponents.health(value,max);
        this.addComponent(option);
    }
    setTypeFamily(type_family_arr){
        const option = EntityComponents.type_family(type_family_arr);
        this.addComponent(option);
    }
    setScale(scale){
        const option = EntityComponents.scale(scale);
        this.addComponent(option);
    }
    setCollisionBox(width,height){
        const option = EntityComponents.collisionBox(width,height);
        this.addComponent(option);
    }
    setAttackDamage(value){addComponent
        const option = EntityComponents.attack(value);
        this.addComponent(option);
    }

    setJump_basic(){
        const option = EntityComponents.jump_static();
        this.addComponent(option);
    }
   
    setNavigation_walk(can_walk,can_path_over_water,avoid_water,avoid_damage_blocks,avoid_sun,can_pass_doors,can_open_doors){
        const option = EntityComponents.navigation_walk(can_walk,can_path_over_water,avoid_water,avoid_damage_blocks,avoid_sun,can_pass_doors,can_open_doors);
        this.addComponent(option);
    }
    setMovement_basic(){
        const option = EntityComponents.movement_basic();
        this.addComponent(option);
    }
    setMovement(movement){
        const option = EntityComponents.movement(movement);
        this.addComponent(option);
    }
    setPhysics(){
        const option = EntityComponents.physics();
        this.addComponent(option);
    }
    setProjectile(anchor,power,gravity,angle_offset,offset,on_hit){
        const option = EntityComponents.projectile(anchor,power,gravity,angle_offset,offset,on_hit);
        this.addComponent(option);
    }
}

export class Projectile extends Entity {
    constructor(identifier, texture, power, gravity, angle_offset, offset) {
      super(identifier, new ResourceData(), new BehaviorData());
  
      this.options["runtime_identifier"] = "minecraft:snowball";
  
      this.setScale(0.5);
      this.setCollisionBox(0.25, 0.25);
      this.setPushable(true, true);
      this.setPhysics();
      this.setProjectile(1, power, gravity, angle_offset, offset);
  
      this.setRemoveOnHit();
      this.setImpactDamage();
      this.setParticleOnHit();
  
      this.addDefaultResources(texture);
    }
  
    setRemoveOnHit() {
      this.on_hit = {};
      this.on_hit.remove_on_hit = {};
    }
  
    setImpactDamage(filter = "blaze", damage = 3, knockback = true) {
      this.on_hit.impact_damage = {
        filter,
        damage,
        knockback
      };
    }
  
    setParticleOnHit(
      particle_type = "snowballpoof",
      num_particles = 6,
      on_entity_hit = true,
      on_other_hit = true
    ) {
      this.on_hit.particle_on_hit = {
        particle_type,
        num_particles,
        on_entity_hit,
        on_other_hit
      };
    }
  
    addDefaultResources(texture) {
      this.resourceData.addTexture("default", texture);
      this.resourceData.addMaterial("default", "snowball");
      this.resourceData.addGeometry("default", "geometry.item_sprite");
      this.resourceData.addRenderController("controller.render.item_sprite");
      this.resourceData.addAnimation("flying", "animation.actor.billboard");
      this.resourceData.addScripts("animate", ["flying"]);
    }
}