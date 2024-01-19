//这里是主程序启动文件
import fs from "fs"
import path from "path";
import {readFileSync} from "fs"
import  {Mod, pathConfig}  from "./manifest.mjs";
import { copyFileMC, copyFolder, saveFile,removeImportsFromFile,traverseDirectory} from "./tools/file.mjs";
import vm from "node:vm"

import { Projectile } from "./class/Entity.v1.0.mjs";
import { Equipment } from "./class/Equipment.v1.0.mjs";
import { AttachableData, BlockData, EntityBehData, EntityResData, ItemData } from "./class/Data.mjs";
import { ItemAPI } from "./class/core_Item.mjs";
import { BlockAPI } from "./class/core_block.mjs";
import { EntityAPI } from "./class/core_entity.mjs";

//启动
//执行遍历projects文件夹下的目录所有的manifest
const manifestPaths = traverseDirectory(pathConfig.projectsPath,'manifest.json');

//如果有清单文件就读取该文件
const manifests = manifestPaths.map(manifest => {
  return JSON.parse(readFileSync(manifest,'utf8'));
});

//console.log(manifestPaths[0])

manifests.forEach((element,index)=>{
    //建立配置文件
    //如果清单文件不存在就新建
    const project_name = manifestPaths[index].split('\\')[1];
    //console.log(manifests[index]);
    const behPath = `${pathConfig.mojangPath}/development_behavior_packs/${element.mod_name}_BP`;
    const resPath = `${pathConfig.mojangPath}/development_resource_packs/${element.mod_name}_RP`;

    const behPathCopy = `./projects/${project_name}/dist/BP`;
    const resPathCopy = `./projects/${project_name}/dist/RP`;
    
    if(!fs.existsSync(`${behPath}/manifest.json`)||!fs.existsSync(`${resPath}/manifest.json`)){
      //清单文件
      const mod = new Mod(element.mod_name,element.version, element.min_engine_version, element);
      saveFile(`${behPath}/manifest.json`,mod.behManifest.toJSON());
      saveFile(`${resPath}/manifest.json`,mod.resManifest.toJSON());
      //保存备份文件
      saveFile(`${behPathCopy}/manifest.json`,mod.behManifest.toJSON());
      saveFile(`${resPathCopy}/manifest.json`,mod.resManifest.toJSON());
    }
    
    //图片
    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${behPath}/pack_icon.png`);
    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${resPath}/pack_icon.png`);

    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${behPathCopy}/pack_icon.png`);
    copyFileMC(`./projects/${project_name}/pack_icon.png`,`${resPathCopy}/pack_icon.png`);

    //复制文件夹
    copyFolder(`./projects/${project_name}/textures`,`${resPath}/textures`);
    copyFolder(`./projects/${project_name}/models`,`${resPath}/models`);

    copyFolder(`./projects/${project_name}/textures`,`${resPathCopy}/textures`);
    copyFolder(`./projects/${project_name}/models`,`${resPathCopy}/models`);

    if(element.scripts.sapi){
        copyFolder(`./projects/${project_name}/scripts/sapi`,`${behPath}/scripts/sapi`);
        copyFolder(`./projects/${project_name}/scripts/sapi`,`${behPathCopy}/scripts/sapi`);
    }
    console.log(`./projects/${project_name+"/sapi/"+element.scripts.amb}`)

    //执行sapdon api
    const codeText = removeImportsFromFile(`./projects/${project_name+"/"+element.scripts.amb}`);
    const script = new vm.Script(codeText);
    // 创建一个具有所需模块的虚拟上下文
    const context = {
      Equipment: Equipment,
      Projectile: Projectile,
      ItemAPI:ItemAPI,
      BlockAPI:BlockAPI,
      EntityAPI:EntityAPI
    };
    // 在虚拟上下文中执行代码
    const sandbox = vm.createContext(context);
    script.runInContext(sandbox);

    ItemAPI.getAllItems().forEach((item)=>{
      item.build();
    });

    BlockAPI.getAllBlocks().forEach((block)=>{
      block.build();
    });

    EntityAPI.getAllEntities().forEach((entity)=>{
      entity.build();
    });

    //统一生成文件 Item Block AttachableData
    ItemData.itemDatas.forEach((itemData)=>{
      const dataText = itemData.toJsonData();
      const itemId = JSON.parse(dataText)["minecraft:item"]["description"]["identifier"].split(":")[1];
      if(itemData.tag == "beh"){
        saveFile(`${behPathCopy}/items/${itemId}.json`,dataText);
        saveFile(`${behPath}/items/${itemId}.json`,dataText);
      }
      else{
        saveFile(`${resPathCopy}/items/${itemId}.json`,dataText);
        saveFile(`${resPath}/items/${itemId}.json`,dataText);
      }
    });
    BlockData.blockDatas.forEach((blockData)=>{
      const dataText = blockData.toJsonData();
      const blockId = JSON.parse(dataText)["minecraft:block"]["description"]["identifier"].split(":")[1];
      saveFile(`${behPathCopy}/block/${blockId}.json`,dataText);
      saveFile(`${behPath}/block/${blockId}.json`,dataText);
    });
    AttachableData.attachableDatas.forEach((attachableData)=>{
      const dataText = attachableData.toJsonData();
      const attachableId = JSON.parse(dataText)["minecraft:attachable"]["description"]["identifier"].split(":")[1];
      saveFile(`${resPathCopy}/attachable/${attachableId}.json`,dataText);
      saveFile(`${resPath}/attachable/${attachableId}.json`,dataText);
    });
    EntityResData.entityResDatas.forEach((entityResData)=>{
      const dataText = entityResData.toJsonData();
      const entityResId = JSON.parse(dataText)["minecraft:client_entity"]["description"]["identifier"].split(":")[1];
      saveFile(`${resPathCopy}/entity/${entityResId}.json`,dataText);
      saveFile(`${resPath}/entity/${entityResId}.json`,dataText);
    });
    EntityBehData.entityBehDatas.forEach((entityBehData)=>{
      const dataText = entityBehData.toJsonData();
      const entityBehId = JSON.parse(dataText)["minecraft:entity"]["description"]["identifier"].split(":")[1];
      saveFile(`${behPathCopy}/entities/${entityBehId}.json`,dataText);
      saveFile(`${behPath}/entities/${entityBehId}.json`,dataText);
    });
});


    
    

//debugger