import { pathConfig } from "./manifest.mjs";
import { saveEctype,saveFile } from "./file.mjs";

export const Recipe ={
	version:"1.17.41",
	recipes:[],
	regisiterRecipeShape:function(identifier,tags,pattern,key,result){
		const recipe_shaped = {
			"format_version": this.version,
			"minecraft:recipe_shaped": {
				"description": {
					"identifier": identifier
				},
				"tags": tags,
				"pattern":pattern,
				"key": key,
				"result": result
			}
		}
		const recipe_data={
			"identifier":identifier,
			"recipe":recipe_shaped
		}
		this.recipes.push(recipe_data);

		return recipe_data;
	},
	
	regisiterRecipeShapeless:function(identifier,tags,ingredients,result){
		const recipe_shapeless = {
			"format_version": this.version,
			"minecraft:recipe_shapeless": {
				"description": {
					"identifier": identifier
				},
				"group": "handles",
				"tags": tags,
				"ingredients": ingredients,
				"result": result
			}
		}		
		const recipe_data={
			"identifier":identifier,
			"recipe":recipe_shapeless
		}
		this.recipes.push(recipe_data);

		return recipe_data;
	},
	
	createRecipes:function(){
		this.recipes.forEach((v,i)=>{
			console.log(v)
			const name = v["identifier"].split(":")[1];
			const recipeFilePath = `./dist/BP/recipes/${name}.json`;
			
			saveEctype(recipeFilePath,JSON.stringify(v["recipe"],null,2));
			saveFile(`${pathConfig.behPath}/recipes/${name}.json`,JSON.stringify(v["recipe"],null,2));
		});
	}
}


const pattern = [" X ","XYX"," X "];
const key = {"Y": "minecraft:bone","X": "minecraft:stick"};
const result = {
	"item": "minecraft:ender_pearl"
};

Recipe.regisiterRecipeShape("test:item",["magic_craft"], pattern, key, result);
Recipe.regisiterRecipeShapeless("test:test",["magic_craft"],["minecraft:bone","minecraft:stick"],"minecraft:bone");
Recipe.createRecipes();

