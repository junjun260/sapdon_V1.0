
const mod_name = "masterball";

const projectile_masterball  = new Projectile("poke:projectile_masterball","textures/items/masterball",1,0.08,[0,0,0],[0,0,0]);

const uncaughtMasterball = new Equipment("poke:uncaught_masterball","equipment","masterball");
      uncaughtMasterball.setMaxStackSize(64);
      uncaughtMasterball.setThrowable(true,1,1);
      uncaughtMasterball.setProjectile(1,"poke:projectile_masterball");
      uncaughtMasterball.setItemName("大师球");

const caughtMasterball = new Equipment("poke:caught_masterball","none","masterball");
      caughtMasterball.setMaxStackSize(1);
      caughtMasterball.setThrowable(true,1,1);
      caughtMasterball.setProjectile(1,"poke:projectile_masterball");
      caughtMasterball.setFuel(true);
      caughtMasterball.setItemName("大师球");

createItemFile(uncaughtMasterball,mod_name);
createItemFile(caughtMasterball,mod_name);
createEntityFile(projectile_masterball,mod_name);
