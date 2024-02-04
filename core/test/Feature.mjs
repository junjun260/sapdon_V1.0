export class Builder {
    constructor(name, lable, version , data = {}) {
      this.name = name;
      this.tags = [];
      this.lable = lable;
      this.version = version;
      this.data = data ;
      this.elements = {};
    }
    build(){
      const data = {};
      data["format_version"] = this.version;
      data[`minecraft:${this.lable}`] = this.data;
      return data;
    }
}


class OreFeatureBuilder extends Builder{
    constructor(name, data = {}) {
        super(name,"ore_feature", "1.13.0", data);
        this.setIdentifier("minecraft:"+ name);
    }
    setIdentifier(identifier) {
      this.data.description = { "identifier": identifier };
      return this;
    }
    setCount(count) {
      this.data.count = count;
      return this;
    }
    setReplaceRules(replace_rules){
      this.data["minecraft"].replace_rules = replace_rules;
      return this;
    }
    addReplaceRule(placesBlock, mayReplace) {
      if (!this.data.replace_rules) this.data.replace_rules = [];
      this.data.replace_rules.push(
        {
          "places_block": placesBlock,
          "may_replace": mayReplace
        }
      );
      return this;
    }
  }
  
 
  
  // 示例：创建一个矿石特性
  const oreFeature = new OreFeatureBuilder("custom_ore")
    .setCount(8)
    .addReplaceRule("test:ore",[{name:"minecraft:stone"}])
    .build();
  
  console.log(JSON.stringify(oreFeature, null, 2));
  
  debugger