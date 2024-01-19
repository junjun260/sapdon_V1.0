
class Manifest{
  constructor(version=2,header={},modules=[],dependencies=[]){
    this.version = version;
    this.header = header;
    this.modules = modules;
    this.dependencies = dependencies;
  }
  toJSON(){
    const manifest = {
      format_version:this.version,
      header:this.header,
      modules:this.modules,
      dependencies:this.dependencies
    }
    return JSON.stringify(manifest,null,2);
  }
}

class Header{
  constructor(name=null,description=null,uuid=null,version=[],min_engine_version=[]){
    this.name = name;
    this.uuid = uuid;
    this.version = version;
    this.description = description;
    this.min_engine_version = min_engine_version;
  }
  toJSON(){
    const header = {
      name:this.name,
      uuid:this.uuid,
      version:this.version,
      description:this.description,
      min_engine_version:this.min_engine_version
    }
    return header;
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export class Mod{
  config = {
    format_version:2,
    path:null
  }
  constructor(mod_name,version,min_engine_version,descriptionInterce = {}){
    this.mod_name = mod_name;
    this.version = version;
    this.min_engine_version = min_engine_version;
    this.descriptionInterce = descriptionInterce;

    const uuidBeh = generateUUID();
    const uuidRes = generateUUID();

    const headerBeh = new Header(this.mod_name,this.descriptionInterce.description,uuidBeh,this.version,this.min_engine_version).toJSON();
    const headerRes = new Header(this.mod_name,this.descriptionInterce.description,uuidRes,this.version,this.min_engine_version).toJSON();

    const modulesBeh = [{
			"type": "data",
			"uuid": generateUUID(),
			"version": [
				1,
				0,
				0
			]
		},]

    const modulesRes = [{
			"type": "resources",
			"uuid": generateUUID(),
			"version": [
				1,
				0,
				0
			]
		}];
    console.log(this.descriptionInterce)
    if(this.descriptionInterce.scripts.sapi) modulesBeh.push({
			"type": "script",
			"language": "javascript",
			"uuid": "37c1788c-1ea6-45f9-aacb-d829ea608fa3",
			"entry": this.descriptionInterce.scripts.sapi,
			"version": this.version
		})

    const dependencies = this.descriptionInterce.dependencies||[];
    this.behManifest = new Manifest(this.config.format_version,headerBeh,modulesBeh,dependencies)
    this.resManifest = new Manifest(this.config.format_version,headerRes,modulesRes,dependencies)
  }
}