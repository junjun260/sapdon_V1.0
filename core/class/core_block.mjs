import { Block } from "./Block.v1.0.mjs";
import { CropBlockV1 } from "./CropBlock.v1.mjs";
import {TileBlock} from "./TileBlock.mjs";

export const BlockAPI = {
    blockList:{},
    getBlockByStrings(name){
        return this.itemList[name];
    },
    getAllBlocks(){
        return Object.values(this.blockList);
    },
    createBlock:function(identifier,category,variantDatas){
        const block = new Block(identifier, category, variantDatas);
        this.blockList[identifier] = block;
        return block;
    },
    createTileBlock:function(identifier,category,variantDatas){
        const block = new TileBlock(identifier,category,variantDatas);
        this.blockList[identifier] = block;
        return block;
    },
    createCropBlock:function(identifier,category,variantDatas){
        const block = new CropBlockV1(identifier,category,variantDatas);
        this.blockList[identifier] = block;
        return block;
    },
}