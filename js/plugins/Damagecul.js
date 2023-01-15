function damagecul_normal(a_atk, b_def,level,e_enhance){
    var damage = 0;
    var enhance = 0;
    if($gameVariables.value(e_enhance) >= 1){
        enhance += $gameVariables.value(e_enhance)
    }
    damage = a_atk - b_def / 2;
    damage *= 2
    damage *= level;
    enhance += 100;
    enhance /= 100;
    damage *= enhance;
    return damage;
}

function damagecul_magic(a_atk, b_def,level,e_enhance){
    var damage = 0;
    var enhance = $gameVariables.value(1199);
    if($gameVariables.value(e_enhance) >= 1){
        enhance += $gameVariables.value(e_enhance)
    }
    damage = a_atk - b_def / 2;
    damage *= 2
    damage *= level;
    enhance += 100;
    enhance /= 100;
    damage *= enhance;
    return damage;
}

function damagecul_enemy_normal(a_atk, b_def,level){
    var damage = 0;
    damage = a_atk - b_def / 2;
    damage *= 2
    damage *= level;
    if(damage <= 0){damage = Math.floor( Math.random() * 3 )}
    return damage;
}

function damagecul_penetration(a_atk, b_def,level){
    var damage = 0;
    damage = a_atk - b_def / 4;
    damage *= 2
    damage *= level;
    return damage;
}

function damagecul_mat01(a_mat, b_mdf,level){
    var damage = 0;
    damage = a_atk - b_def / 2;
    damage *= 2
    damage *= level;
    return damage;
}