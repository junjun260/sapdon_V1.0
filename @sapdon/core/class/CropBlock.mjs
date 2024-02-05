import { BlockComponents } from "../objects/components/BlockComponents.mjs";
import { TileBlock } from "./TileBlock.mjs";

export class CropBlock extends TileBlock{
    allowed_faces = [];
    allowed_blocks = [];

    constructor(identifier,states,block_variety_data){
        super(identifier,"construction",block_variety_data);

        //default
        this.setGeometry("geometry.crop");
        this.setLightDampening(0);
        this.setCollisionBox([0,0,0],[0,0,0]);
        this.setPlacementFilter({"conditions": [{"allowed_faces": ["up"],"block_filter": ["minecraft:farmland"]}]});
        this.setRandomTicking("amb:test","self","q.block_state('sapdon:block_variety_tag') <" + states);
        this.addEvent("amb:test",{
          "set_block_state": {
            "sapdon:block_variety_tag": "q.block_state('sapdon:block_variety_tag') + 1"
          }
        });
        
        for(let i = 0;i<block_variety_data.length;i++){
          this.setVariantComponet(i,BlockComponents.materialInstances({
            "*": {
              "texture": `${block_variety_data[i].textures[0]}`,
              "render_method": "alpha_test",
              "face_dimming": false,
              "ambient_occlusion": false
            }
          }));
          this.setVariantComponet(i,BlockComponent.selectionBox([-8,0,-8],[16,Math.floor((i+1)/block_variety_data.length *14)+2, 16]));
        }
        this.regsiterInteractEvent(states);
    }
    randomTickEvents = {};
    regsiterRandomEvent(event_name,conditions,conext){
      this.regsiterState("sapdon:mode",[true,false]);
      this.setRandomTicking("sapdon:random_ticking","self","q.block_state('sapdon:mode') == true");
      const event = {
          "trigger": {
            "event": event_name,
            "target": "self"
          }
      }
      Object.assign(this.randomTickEvents,conext);
      this.addEvent("sapdon:random_ticking",this.randomTickEvents);
    }
    regsiterInteractEvent(states){
      this.setOnInteract("sapdon:fertilize","self","q.is_item_name_any('slot.weapon.mainhand', 'minecraft:bone_meal')");
      this.addEvent("sapdon:fertilize",{
        "sequence": [
          {
            "condition": "q.block_state('sapdon:block_variety_tag') <"+states,
            "set_block_state": {
              "sapdon:block_variety_tag": "q.block_state('sapdon:block_variety_tag') + Math.random(1," +states+"- q.block_state('sapdon:block_variety_tag'))"
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
    }
    setFarmland(farmland){
      this.setPlacementFilter({
        "allowed_faces": this.allowed_faces,
        "block_filter": [...farmland]
      });
    }
   
}