
export const Translater = {
    languages:{},
    regsiterItemTranslater:function(ItemId,lang,text){
        if(!this.languages[lang]) this.languages[lang] = [];
        this.languages[lang].push(`item.${ItemId}=${text}`);
        this.languages[lang].push(`item.${ItemId}.name=${text}`);
    },
    regsiterBlockTranslater:function(BlockId,lang,text){
        if(!this.languages[lang]) this.languages[lang] = [];
        this.languages[lang].push(`tile.${BlockId}.name=${text}`);
    },
    /*createLang:function(){
        const langArr = Object.keys(this.languages);
        this.language.forEach((value,index)=>{
            langArr.push(value.lang);
            const langFilePath = `./dist/RP/texts/${value.lang}.lang`;
            const langContent = value.content;
            //saveEctype(langFilePath,langContent);
            //saveFile(`${pathConfig.resPath}/texts/${value.lang}.lang`,langContent);
        });
        //languages.json
        const langs = [...new Set(langArr)];
        const languagesPath = `./dist/RP/texts/languages.json`
        saveEctype(languagesPath, JSON.stringify(langs));
        saveFile(`${pathConfig.resPath}/texts/languages.json`,JSON.stringify(langs));
    }*/
}
/*
Translater.regsiter("test:item","zh_CN","测试物品");
Translater.regsiter("test:item","en_US","test item");
Translater.createLang();
*/
//debugger

