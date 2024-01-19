import { saveEctype,saveFile } from "./file.mjs";
import { pathConfig, manifest } from "./manifest.mjs";

export const Translater = {
    language:[],
    regsiter:function(itemId,lang,text){
        const contentObj = {
            "lang":lang,
            "content":`tile.${itemId}.name=${text}`
        }
        this.language.push(contentObj);
    },
    createLang:function(){
        const langArr = [];
        this.language.forEach((value,index)=>{
            langArr.push(value.lang);
            const langFilePath = `./dist/RP/texts/${value.lang}.lang`;
            const langContent = value.content;
            saveEctype(langFilePath,langContent);
            saveFile(`${pathConfig.resPath}/texts/${value.lang}.lang`,langContent);
        });
        //languages.json
        const langs = [...new Set(langArr)];
        const languagesPath = `./dist/RP/texts/languages.json`
        saveEctype(languagesPath, JSON.stringify(langs));
        saveFile(`${pathConfig.resPath}/texts/languages.json`,JSON.stringify(langs));
    }
}
/*
Translater.regsiter("test:item","zh_CN","测试物品");
Translater.regsiter("test:item","en_US","test item");
Translater.createLang();
*/
//debugger

