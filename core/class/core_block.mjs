import { Block } from "./Block.v1.0.mjs";

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
    createCropBlock:function(identifier,category,texture,parameters){
        const item = new Array(identifier,category,texture,parameters);
        this.itemList[identifier] = item;
        return item;
    }
}