import { TileBlock } from "./TileBlock.mjs";

export class CropBlockV1 extends TileBlock{
    
    cropList = [];
    farmlandList = ["minecraft:farmland"];
    fertilizerList = [];
    constructor(identifier, category, variantDatas){
        super(identifier, category, variantDatas);
        this.setGeometry("geometry.crop");
        this.setCollisionBox([0,0,0],[0,0,0]);
        this.setLightDampening(0);
    }
    addCrop(crop){
        this.cropList.push(crop);
    }
    addFarmland(farmland){
      this.farmlandList.push(farmland);
    }
    build(){
        //farmlands
        this.setPlacementFilter({"conditions": [{
            "allowed_faces": ["up"],
            "block_filter": [...this.farmlandList]
        }]});
        //
        this.setRandomTicking("sapdon:test","self","q.block_state('sapdon:block_variant_tag') <" + (this.variantDatas.length-1));
        this.addEvent("sapdon:test",{"set_block_state": {"sapdon:block_variant_tag": "q.block_state('sapdon:block_variant_tag') + 1"}});
        //
        this.setOnInteract("sapdon:fertilize","self","q.is_item_name_any('slot.weapon.mainhand', 'minecraft:bone_meal')");
        this.addEvent("sapdon:fertilize",{
          "sequence": [
            {
              "condition": "q.block_state('sapdon:block_variant_tag') <" + (this.variantDatas.length-1),
              "set_block_state": {
                "sapdon:block_variant_tag": "q.block_state('sapdon:block_variant_tag') + Math.random(1," +(this.variantDatas.length-1)+"- q.block_state('sapdon:block_variant_tag'))"
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
        super.build();
    }
}
