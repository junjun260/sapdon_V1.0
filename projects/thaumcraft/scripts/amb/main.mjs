import { Translater } from "../../../../core/class/Translate.mjs";
import { ItemAPI } from "../../../../core/class/core_Item.mjs";
import { BlockAPI } from "../../../../core/class/core_block.mjs";
import { EntityAPI } from "../../../../core/class/core_entity.mjs";
import { BlockComponents } from "../../../../core/objects/components/BlockComponents.mjs";


ItemAPI.createEquipmentItem("vampirism:vampire_fang","equipment","vampirism_vampire_fang");
Translater.regsiterItemTranslater("vampirism:vampire_fang","zh_CN","血族之牙");


ItemAPI.createItem("vampirism:gem_of_binding","items","vampirism_gem_of_binding");
ItemAPI.createArmorItem("Helmet","vampirism:vampire_armor_helmet","equipment","vampire_armor_helmet","textures/models/armor/vampireArmor_1");
ItemAPI.createArmorItem("Chestplate","vampirism:vampire_armor_chestplate","equipment","vampire_armor_chestplate","textures/models/armor/vampireArmor_1");
ItemAPI.createArmorItem("Leggings","vampirism:vampire_armor_leggings","equipment","vampire_armor_leggings","textures/models/armor/vampireArmor_2");
ItemAPI.createArmorItem("Boots","vampirism:vampire_armor_boots","equipment","vampire_armor_boots","textures/models/armor/vampireArmor_1");

BlockAPI.createCropBlock("test:crop","construction",[
{stateTag:0,textures:["wheat_stage_0"]},
{stateTag:1,textures:["wheat_stage_1"]},
{stateTag:2,textures:["wheat_stage_2"]},
{stateTag:3,textures:["wheat_stage_3"]},
{stateTag:4,textures:["wheat_stage_4"]},
{stateTag:5,textures:["wheat_stage_5"]},
{stateTag:6,textures:["wheat_stage_6"]},
{stateTag:7,textures:["wheat_stage_7"]},
]);
Translater.regsiterBlockTranslater("test:crop","zh_CN","测试植物方块");


const garlic = ItemAPI.createEquipmentItem("vampire:garlic","items","vampire_garlic");
      garlic.setBlockPlacer("vampirism:garlic_block",["minecraft:farmland"]);
Translater.regsiterItemTranslater("vampire:garlic","zh_CN","大蒜");


BlockAPI.createCropBlock("vampirism:garlic_block","construction",[
    {stateTag:0,textures:["garlic_stage_0"]},
    {stateTag:1,textures:["garlic_stage_1"]},
    {stateTag:2,textures:["garlic_stage_2"]},
    {stateTag:3,textures:["garlic_stage_3"]},
]);

const garlic_bomb = ItemAPI.createEquipmentItem("vampire:garlic_bomb","equipment","vampire_garlic_bomb");
      garlic_bomb.setUseDuration(32);
      garlic_bomb.setProjectile(3,"vampire:thrown_garlic_bomb");
      garlic_bomb.setThrowable(true,4,2);
      
const garlic_bomb_enity = EntityAPI.createProjectile("vampire:thrown_garlic_bomb","textures/items/garlic_bomb_0",3,0.08,0,[0,0,0]);

/*
const description = {
      "spawnable":true,
      "summonable":true,
      "experimental":false,
      "scale":1,
      "damage":3,
      "health":{
        value:10,
        max:10
      },
      "family":["mob","vampire"],
      "collisionBox": { width: 0.6, height: 1.9 }
}



import { Entity, EntityComponent, Projectile, TestEntity } from "./class/Entity.mjs";

      
const testEntity001 = new TestEntity('test:entity002',"minecraft:zombie", description);
      testEntity001.resource.setTextures("default","textures/entity/vampire1");

const testEntity002 = new TestEntity('test:entity003',"minecraft:wolf", {
      "spawnable":true,
      "summonable":true,
      "experimental":false
});
      testEntity002.resource.setTextures("default","textures/entity/吸血狗");

const testEntity003 = new TestEntity('test:entity004',"minecraft:pig", {
      "spawnable":true,
      "summonable":true,
      "experimental":false
});
      testEntity003.resource.setTextures("default","textures/entity/吸血猪");
      
const testEntity004 = new TestEntity('test:entity005',"minecraft:cow", {
     "spawnable":true,
     "summonable":true,
     "experimental":false
});

testEntity004.resource.setTextures("default","textures/entity/吸血牛");

const masterBall = new TestEntity('test:master_ball',"minecraft:snowball", description);
      masterBall.resource.setTextures("default","textures/items/master_ball");

const master_ball = ItemAPI.creatEquipmentItem("test:masterball_entity","equipment","master_ball");
      //master_ball.setUseDuration(32);
      master_ball.setProjectile(1,"test:master_entity");
      master_ball.setThrowable(true);
*/
const arcane_workbench = BlockAPI.createBlock("test:arcane_workbench","construction",[
      {stateTag:0,textures:["base_wood_grain","arcane_workbench_top","arcane_workbench_side"]}
]);
      arcane_workbench.setGeometry("geometry.arcane_workbench");
      arcane_workbench.setMaterialInstances({
            "bottom_side": "down",
            "bottom_top": "*",
            "bottom_bottom": "*",
            "middle_side": "down",
            "table_side": "down",
            "table_top": "up",
            "table_bottom": "*"
      });
      arcane_workbench.setCraftingTable("Arcane_workbench Table",["arcane_workbench","crafting_table"])

const jar_normal = BlockAPI.createTileBlock("test:jar_normal","construction",[
      {stateTag:0,textures:["jar_side","jar_top","jar_bottom"],material:{"render_method":"blend"}},
      {stateTag:1,textures:["jar_side","jar_top","jar_bottom","animatedglow"],material:{"render_method":"blend"}},
      {stateTag:2,textures:["jar_side","jar_top","jar_bottom","animatedglow"],material:{"render_method":"blend"}},
      {stateTag:3,textures:["jar_side","jar_top","jar_bottom","animatedglow"],material:{"render_method":"blend"}},
      {stateTag:4,textures:["jar_side","jar_top","jar_bottom","animatedglow"],material:{"render_method":"blend"}},
]);
      jar_normal.setMapColor("#ffffff");
      jar_normal.setVariantComponent(0,BlockComponents.geometry("geometry.jar_normal"));
      jar_normal.setVariantMaterialInstances(0,{
            "jar_top":"up",
            "jar_side":"*",
            "jar_bottom":"down"
      });
      jar_normal.setVariantComponent(1,BlockComponents.geometry("geometry.jar_normal_0"));
      jar_normal.setVariantMaterialInstances(1,{
            "jar_top":"up",
            "jar_side":"*",
            "jar_bottom":"down",
            "animatedglow":{
                  "texture":"animatedglow",
            "render_method": "alpha_test",
            "face_dimming": false,
            "ambient_occlusion": false
            }
      });
      jar_normal.setVariantComponent(2,BlockComponents.geometry("geometry.jar_normal_1"));
      jar_normal.setVariantMaterialInstances(2,{
            "jar_top":"up",
            "jar_side":"*",
            "jar_bottom":"down",
            "animatedglow":"north"
      });
      jar_normal.setVariantComponent(3,BlockComponents.geometry("geometry.jar_normal_2"));
      jar_normal.setVariantMaterialInstances(3,{
            "jar_top":"up",
            "jar_side":"*",
            "jar_bottom":"down",
            "animatedglow":"north"
      });
      jar_normal.setVariantComponent(4,BlockComponents.geometry("geometry.jar_normal_3"));
      jar_normal.setVariantMaterialInstances(4,{
            "jar_top":"up",
            "jar_side":"*",
            "jar_bottom":"down",
            "animatedglow":"north"
      });
      jar_normal.addEvent("sapdon:test",{
            "sequence": [
                  {
                    "condition": "q.block_state('sapdon:block_variant_tag') <"+4,
                    "set_block_state": {
                      "sapdon:block_variant_tag": "q.block_state('sapdon:block_variant_tag') + 1"
                    }
                  },
                  {
                    "decrement_stack": {}
                  },
                  {
                    "run_command": {
                      "command": ["particle minecraft:crop_growth_emitter ~~~", "playsound item.bone_meal.use @a ~~~","say run"]
                    }
                  }
                ]
      });
      jar_normal.setOnInteract("sapdon:test","self","q.is_item_name_any('slot.weapon.mainhand', 'minecraft:bone_meal')");

