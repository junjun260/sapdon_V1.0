//这里是主程序启动文件
import fs from "fs"
import path from "path";
import {readFileSync} from "fs"
import  {Mod}  from "./manifest.mjs";
import { copyFileMC, copyFolder, saveFile,saveEctype, createItemFile } from "./file.mjs";
import { ItemAPI } from "./v1.0/core_Item.mjs";
import vm from "vm"

import { Item } from "./class/Item.mjs";
import { Block } from "./v1.0/Block.v1.0.mjs";
import { AttachableData, BlockData, ItemData } from "./v1.0/Data.mjs";

// 递归遍历目录的函数
export function traverseDirectory(directory,fileName) {
  const files = fs.readdirSync(directory);
  const targetFiles = [];

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()&& file !== 'dist') {
      targetFiles.push(...traverseDirectory(filePath,fileName));
    } else if (stats.isFile() && file === fileName) {
      targetFiles.push(filePath);
    }
  });

  return targetFiles;
}

//启动
//执行遍历projects文件夹下的目录所有的manifest
//如果有清单文件就读取该文件

// 定义要遍历的目录路径

export const pathConfig = {
    mojangPath: "C:/Users/ASUS/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang",
    projectsPath:"./projects"
};

// 执行遍历
const manifestPaths = traverseDirectory(pathConfig.projectsPath,'manifest.json');
const manifests = manifestPaths.map(manifest => {
  return JSON.parse(readFileSync(manifest,'utf8'));
});
console.log(manifestPaths[0])

manifests.forEach((element,index)=>{
    //建立配置文件
    //如果清单文件不存在就新建
    const project_name = manifestPaths[index].split('\\')[1];
    console.log(manifests[index]);
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
      saveEctype(`${behPathCopy}/manifest.json`,mod.behManifest.toJSON());
      saveEctype(`${resPathCopy}/manifest.json`,mod.resManifest.toJSON());
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
    /*
    //执行sapdon api
    const code = readFileSync(`./projects/${project_name+"/"+element.scripts.amb}`,"utf8");
    console.log(code)
    const executeCode = new vm.Script(code);
    executeCode.runInThisContext();

    ItemAPI.getAllItems().forEach((item)=>{
      createItemFile(item,project_name);
    });
    */
/*
  //统一生成文件 Item Block AttachableData
  ItemData.itemDatas.forEach((itemData)=>{
    saveEctype(behPathCopy,itemData.toJSON());
    saveFile(behPath,itemData.toJSON());
  });
  BlockData.blockDatas.forEach((blockData)=>{
    saveEctype(behPathCopy,blockData.toJSON());
    saveFile(behPath,blockData.toJSON());
  });
  AttachableData.attachableDatas.forEach((attachableData)=>{
    saveEctype(behPathCopy,attachableData.toJSON());
    saveFile(behPath,attachableData.toJSON());
  })
  */
});


    
    

//debugger