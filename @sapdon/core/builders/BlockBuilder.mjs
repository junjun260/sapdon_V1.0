import { Builder } from "./builder.mjs";

export class BlockBuilder extends Builder{
    constructor(name, version, data = {}){
      super(name, "block", version, data);
      this.setIdentifier(name);
    }
    setPermutations(permutations){
      this.data.permutations = permutations;
      return this;
    }
    addPermutation(condition, components) {
        if (!this.permutations) this.permutations = {};
        const compactText = condition.replace(/\s/g, "");
        console.log(compactText);
        if (!this.permutations[compactText]) {
          this.permutations[compactText] = {};  // 初始化为空对象
        }
        Object.assign(this.permutations[compactText], components);
        // 转数组
        const permutations = this.permutations;
        const array = Object.keys(this.permutations).map(function(key) {
          return {
            [key]: permutations[key]
          };
        });
        console.log(array);
        this.setPermutations(array);
        return this;
    }
    setTrais(name,content){
      const trais = this.data.description?this.data.description.trais:{};
      this.setDescription({
        trais:{
          ...trais,
          [name]:content
        }
      });
      return this;
    }
    setStates(name,content){
      const states = this.data.description?this.data.description.states:{};
      this.setDescription({
        states:{
          ...states,
          [name]:content
        }
      });
      return this;
    }
    setIdentifier(identifier) {
      this.setDescription({
        identifier: identifier
      });
      return this;
    }
    setCategory(category) {
      this.setDescription({
        menu_category:{
          category: category
        }
      });
      return this;
    }
  }

/*const block = new BlockBuilder("sapdon:block","1.20.30").setCategory("block")
.setComponents(BlockComponents.collisionBox([0,0,0],[0,0,0]))
.addPermutation("q.states == 1",{q:111})
.addPermutation("q.states== 1",{a:222}).build();
console.log(block);
debugger*/