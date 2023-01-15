//Game_Action.prototype.executeHpDamage 被虐 伤痕
//Game_Action.prototype.needsSelection 眼罩致盲
//Game_Action.prototype.itemHit
//Window_BattleLog.prototype.push 眼罩真实视觉
//Spriteset_Battle.prototype.createLowerLayer
//Game_Interpreter.prototype.command321 更换职业取血魔占比
//Game_BattlerBase.prototype.refresh 负法力
//Game_BattlerBase.prototype.initMembers
//Window_Base.prototype.drawActorMp
//Game_BattlerBase.prototype.canPaySkillCost
//Game_Action.prototype.executeMpDamage
//Game_Actor.prototype.isEquipChangeOk 解咒灵水
//Window_Base.prototype.drawGauge 瘴气值BB_DrawGauge.js
//Window_Base.prototype.drawActorTp  YEP_CoreEngine.js
//BattleManager.checkBattleEnd 负生命
//Game_Battler.prototype.refresh
//Window_Base.prototype.drawActorHp
//Game_Action.prototype.executeHpDamage
//Sprite_Character.prototype.updateVisibility 视距
//Game_Event.prototype.activateAlert  YEP_EventChasePlayer.js
//Game_BattlerBase.prototype.die 战败状态修复
//SceneManager.updateMain 锁60FPS
//Scene_Equip.prototype.onItemOk 脱内衣
//BattleManager.makeEscapeRatio 逃跑率
//BattleManager.processEscape  YEP_BattleEngineCore.js
//Window_Options.prototype.addGeneralOptions 设置增加选项
//ConfigManager.makeData
//ConfigManager.applyData
//Sprite.prototype._executeTint 染色
//Window_ItemList.prototype.includes 物品栏
//Window_ItemCategory.prototype.makeCommandList
//Game_BattlerBase.prototype.attackSkillId 修复混乱
//Game_Battler.prototype.onRestrict
//Game_Action.prototype.evcVariablesChange FTKR_ExVariablesChange.js
//Game_Event.prototype.initialize  TemplateEvent.js  随机位置刷新
(function(){  
  Spriteset_Battle.prototype.removeEnemies = function() {
    var sprites = this._enemySprites;
    for (var i = 0; i < sprites.length; i++) {
      this._battleField.removeChild(sprites[i]);
    }
  }  
	
  var My_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command === "Dforce") {
		if(args[0] == '$gameActors.actor(1).abu.chooseSk') args[0] = $gameActors.actor(1).abu.chooseSk;
		if(args[1] === null){
			BattleManager._subject.forceAction(args[0],-1);
		}else{
			BattleManager._subject.forceAction(args[0],args[1]);
		}
		BattleManager.forceAction(this._subject);
    }	
    else if (command === 'CallLoseStand') {
      if (args[0].match(/\\v/)) {
        //args[1]に\vを含む場合の処理
        array = args[0].match(/[0-9]+\.?[0-9]*/g);
        for(var i = 0; i < array.length; i++) {
			args[0] = Number(array);
			var StandPoseID = $gameVariables.value(args[0]);
        }
      }
	  else{var StandPoseID = args[0]}
	  $gameVariables._data[912] = 0
	  $gameVariables._data[415] = 0
	  $gameVariables._data[351] = 0
	  $gameVariables._data[352] = 0
	  $gameVariables._data[353] = 0
	  $gameVariables._data[354] = 0
	  
	  //催眠开关
	  var hypnosis = 0

      //立ち絵基本座標
      var Stand1X = 512
      var Stand1Y = 384

      //立ち絵エロの指定コモン228
      var Dif1PicFileName = 0;
      var Dif2PicFileName = 0;
      if(StandPoseID == "0" || StandPoseID == 0 || StandPoseID == null){StandPoseID = 1}
      else if(StandPoseID >= 1){}
      else if(StandPoseID == "1" || StandPoseID == "2" || StandPoseID == "3" || StandPoseID == "4" || StandPoseID == "5" || StandPoseID == "6" || StandPoseID == "7" || StandPoseID == "8" || StandPoseID == "9" || StandPoseID == "10"){StandPoseID = Number(StandPoseID);}
      else if(StandPoseID == "拘束_触手"){StandPoseID = 4;$gameVariables._data[415] = 2}
      else if(StandPoseID == "拘束_人間"){StandPoseID = 4;$gameVariables._data[415] = 1}
      else if(StandPoseID == "拘束_触手壁"){StandPoseID = 4;$gameVariables._data[415] = 3}
      else if(StandPoseID == "拘束_ワーム"){StandPoseID = 4;$gameVariables._data[415] = 4}
      else if(StandPoseID == "拘束_怪魔"){StandPoseID = 4;$gameVariables._data[415] = 5}
      else if(StandPoseID == "拘束_鎖"){StandPoseID = 4;$gameVariables._data[415] = 10}
      else if(StandPoseID == "拘束_くすぐり"){StandPoseID = 4;$gameVariables._data[415] = 11}
	  else if(StandPoseID == "催眠_假想"){StandPoseID = 4;$gameVariables._data[415] = 15}
	  else if(StandPoseID == "催眠_涂抹"){StandPoseID = 4;$gameVariables._data[415] = 16}
	  else if(StandPoseID == "催眠_注射"){StandPoseID = 4;$gameVariables._data[415] = 17}
	  else if(StandPoseID == "催眠_快乐"){StandPoseID = 4;$gameVariables._data[415] = 18}

      else if(StandPoseID == "挿入前脚上げ_人間"){StandPoseID = 5;$gameVariables._data[354] = 1}//415は拘束351-は穴
      else if(StandPoseID == "セックス脚上げ_人間"){StandPoseID = 5;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "触手拘束脚上げ"){StandPoseID = 5;$gameVariables._data[415] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手イラマセックス"){StandPoseID = 5;$gameVariables._data[351] = 2;$gameVariables._data[352] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手イラマアナルセックス"){StandPoseID = 5;$gameVariables._data[351] = 2;$gameVariables._data[353] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手セックス"){StandPoseID = 5;$gameVariables._data[352] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手アナルセックス"){StandPoseID = 5;$gameVariables._data[353] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手両穴セックス"){StandPoseID = 5;$gameVariables._data[352] = 2;$gameVariables._data[353] = 2}//415は拘束351-は穴
      else if(StandPoseID == "触手三穴セックス"){StandPoseID = 5;$gameVariables._data[352] = 2;$gameVariables._data[353] = 2;$gameVariables._data[354] = 2}//415は拘束351-は穴

      else if(StandPoseID == "セックス後背位_人間"){StandPoseID = 6;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "アナルセックス後背位_人間"){StandPoseID = 6;$gameVariables._data[353] = 1}//415は拘束351-は穴
      
      else if(StandPoseID == "鎖セックス_人間"){StandPoseID = 7;$gameVariables._data[352] = 1;$gameVariables._data[415] = 10}//415は拘束351-は穴
      else if(StandPoseID == "鎖二穴セックス_人間"){StandPoseID = 7;$gameVariables._data[352] = 1;$gameVariables._data[353] = 1;$gameVariables._data[415] = 10}//415は拘束351-は穴
      else if(StandPoseID == "二穴セックス_人間"){StandPoseID = 7;$gameVariables._data[352] = 1;$gameVariables._data[353] = 1}//415は拘束351-は穴

      else if(StandPoseID == "セックス開脚_人間"){StandPoseID = 8;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "アナルセックス開脚_人間"){StandPoseID = 8;$gameVariables._data[353] = 1}//415は拘束351-は穴
      else if(StandPoseID == "イラマセックス開脚_人間"){StandPoseID = 8;$gameVariables._data[351] = 1;$gameVariables._data[352] = 1}//415は拘束351-は穴
      else if(StandPoseID == "イラマアナルセックス開脚_人間"){StandPoseID = 8;$gameVariables._data[351] = 1;$gameVariables._data[353] = 1}//415は拘束351-は穴
      else if(StandPoseID == "催眠洗脳"){StandPoseID = 8;$gameVariables._data[415] = 8}//415は拘束351-は穴
      else if(StandPoseID == "触手椅子"){StandPoseID = 8;$gameVariables._data[415] = 9}//415は拘束351-は穴
      else if(StandPoseID == "触手椅子_両穴"){StandPoseID = 8;$gameVariables._data[415] = 9;$gameVariables._data[352] = 1;$gameVariables._data[353] = 1}//415は拘束351-は穴
	  else if(StandPoseID == "催眠开脚"){StandPoseID = 8;hypnosis = 1}

      else if(StandPoseID == "奉仕_人間"){StandPoseID = 9;$gameVariables._data[351] = 1}
      else if(StandPoseID == "奉仕_触手"){StandPoseID = 9;$gameVariables._data[351] = 2}
      else if(StandPoseID == "催眠奉仕_触手"){StandPoseID = 9;$gameVariables._data[351] = 2}
	  else if(StandPoseID == "催眠奉仕_人间"){StandPoseID = 9;$gameVariables._data[351] = 1;hypnosis = 1}
      else if(StandPoseID == "倒地"){StandPoseID = 10;}
      else if(StandPoseID == "倒地人间sex"){StandPoseID = 10;$gameVariables._data[352] = 1} 
      else{console.error('ポーズIDが不正'); StandPoseID = 1;}

      //ゲーム中の装備番号
      var StandEqCloth = 1
      var StandEqLeg = 7

      //フラグ
      if($gameSwitches.value(131)){
        var StandAltFlag = 1
      }else{
        var StandAltFlag = 0
      }

      //衣装耐久
      $gameVariables._data[741] = $gameVariables.value(702)
      $gameVariables._data[742] = $gameVariables.value(722)



      //状態の確認
      var LovejuiceFlag = 0
	  var SweatFlag = 0
	  var BreathFlag = 0
	  
	  if($gameVariables.value(1027) >= 100){
		  LovejuiceFlag = 1
		  SweatFlag = 1
		  BreathFlag = 1
	  }else{
		if($gameVariables.value(1027) >= 50)  LovejuiceFlag = 1 
	    if($gameVariables.value(1026) >= 500){
		 SweatFlag = 1
		 BreathFlag = 1
		}
	  }
	  //状态
		var MarkIndex = "0";
		var PaintIndex = "0";
		var ScarFlag = 0;
		//伤痕
		if($gameActors.actor(1).isStateAffected(320)) ScarFlag = 1;
		//淫纹
		if($gameActors.actor(1).isStateAffected(321)){
			if($gameActors.actor(1).isStateAffected(322)) MarkIndex = "3";
		else MarkIndex = "1";}
		else if($gameActors.actor(1).isStateAffected(322)) MarkIndex = "2";
		//涂鸦
		if($gameVariables.value(4900) > 0){
			if($gameVariables.value(4900) <= 1){PaintIndex = "11"}
			else if($gameVariables.value(4900) <= 2){PaintIndex = "12"}
			else{PaintIndex = "13"}
		}	
		
		
      //精液汚れ度
      var SemenBody = $gameVariables.value(942)
      var SemenFace = $gameVariables.value(941)
      var SemenAnus = $gameVariables.value(945)
      var SemenVagina = $gameVariables.value(944)
      var SemenMouth = $gameVariables.value(943)



      //呼び出しファイル名入力用
      var FileName = 0
	  
      var PiercePicFileNum = 0;
	  var PierceL = -1;
	  var PierceR = -1;
      if($gameActors._data[1]._equips[10] && $gameActors._data[1]._equips[10]._itemId >= 5){
		 var m = $gameActors._data[1]._equips[10]._itemId;
         PiercePicFileNum = $dataArmors[m].meta.FileNumPierce;
		 if($dataArmors[m].meta["CorrectL"] && $dataArmors[m].meta["CorrectR"]){
			PierceL = $dataArmors[m].meta.CorrectL[StandPoseID-1];
			PierceR = $dataArmors[m].meta.CorrectR[StandPoseID-1];
		 }
      }//PierceL大于0代表有超出身体

      //ピクチャ番号指定
      //開始番号
      var stand_bigin = 66;
	  stand_bigin += 1;
      var stand_difback = stand_bigin;
      var stand_cloth_back = stand_bigin + 1; //空图
      var stand_base = stand_bigin + 2; //136、201、229
	  //贴身
	  var stand_scar = stand_bigin + 3;
	  var stand_paint = stand_bigin + 4;
	  var stand_mark = stand_bigin + 5;	  
      var stand_ero = stand_bigin + 6;
	  var stand_sweat = stand_bigin + 7;
	  var stand_semenhole = stand_bigin + 8;
	  var stand_face = stand_bigin + 9;
	  var stand_eye = stand_bigin + 10;
	  var stand_mouth = stand_bigin + 11;  
	  var stand_hair = stand_bigin + 12; //299
	  //服饰
	  var stand_ear = stand_bigin + 13;//299
	  var stand_pierceL = stand_bigin + 14;
	  var stand_pierceR = stand_bigin + 15;
      var stand_under = stand_bigin + 16;  
      var stand_leg = stand_bigin + 17;
	  var effect_splash = stand_bigin + 18;
      var stand_cloth = stand_bigin + 19; //乳环处理到此为止
      var stand_neck = stand_bigin + 20; 
	  var stand_byt = stand_bigin + 21;
      var stand_semenbody = stand_bigin + 22;
      var stand_semenface = stand_bigin + 23;
      var stand_semenmouth = stand_bigin + 24; //尾巴处理到此为止
	  var effect_breath = stand_bigin + 25; //229
      var stand_diffront = stand_bigin + 26;
	  var stand_MOLU = stand_bigin + 27


      //装備情報取得
      
      var NippleL = 1;
	  var NippleR = 1;
      var ClothUpdate = 0
      if($gameActors._data[1]._equips[StandEqCloth]._itemId >= 5){
        
        var StandEqNum = $gameActors._data[1]._equips[StandEqCloth]._itemId//衣装指定する場合はここの処理変更
        var EqClothOpacity = $dataArmors[StandEqNum].meta.ClothOpacity
        if($gameActors.actor(1).isStateAffected(55) || $gameActors.actor(1).addedSkills().contains(722) || $gameActors.actor(1).isLearnedSkill(722)){
          EqClothOpacity = EqClothOpacity / 2
        }//すけすけステート食らっている場合
        if($gameVariables.value(4964) != EqClothOpacity){
          ClothUpdate = 1
        }else{ClothUpdate = 0}//透過度が違う場合保存して更新フラグオン
        $gameVariables._data[4964] = EqClothOpacity

        if(StandEqNum == 71 && $gameActors.actor(1).isStateAffected(94)){StandEqNum = 72}
        if(StandEqNum == 71 && $gameActors.actor(1).isStateAffected(95)){StandEqNum = 73}
        var UnderPicFlag = Number($dataArmors[StandEqNum].meta.ClothUnderFlag); //衣装の下着フラグ
        var ClothPicFileNum = $dataArmors[StandEqNum].meta.FileNumCloth
		NippleL = $dataArmors[StandEqNum].meta.ClothNippleL[StandPoseID-1];
		NippleR = $dataArmors[StandEqNum].meta.ClothNippleR[StandPoseID-1];
      }else{
        var EqClothOpacity = 255 //衣装透過度
        var UnderPicFlag = 1; //下着
        var ClothPicFileNum = 0
      }
      
      //変身衣装コス
      var Cosplay = 0
      if($gameActors._data[1]._equips[StandEqCloth]._itemId >= 5 && $dataArmors[StandEqNum].meta.Cosplay){//コス着てる場合
        var StandAltFlag = 1
        var Cosplay = 1
      }
	  //眼罩
	  var EyePicFileNum = 0;
	  if($gameVariables.value(489) != 6){//实验不带眼罩
      if($gameActors._data[1]._equips[9] && $gameActors._data[1]._equips[9]._itemId >= 5){
         EyePicFileNum = $dataArmors[$gameActors._data[1]._equips[9]._itemId].meta.FileNumEye;
      }}
	  
	  if($gameVariables.value(1212) > 0){
        var MouthFlag = 1
      }else{
        var MouthFlag = 0
      }//嘴
	  
      var NeckPicFileNum = 0;
      if($gameActors._data[1]._equips[8] && $gameActors._data[1]._equips[8]._itemId >= 5){
         NeckPicFileNum = $dataArmors[$gameActors._data[1]._equips[8]._itemId].meta.FileNumNeck;
      }//项圈	  

	  var EarPicFileNum = 0;
      if($gameActors._data[1]._equips[13] && $gameActors._data[1]._equips[13]._itemId >= 5){
         EarPicFileNum = $dataArmors[$gameActors._data[1]._equips[13]._itemId].meta.FileNumEar;
		 //处理尾巴
		 if(StandPoseID == 6){
			stand_ear += 10;
			stand_pierceL -= 1;
			stand_pierceR -= 1;
			stand_under -= 1;
			stand_leg -= 1;
			effect_splash -= 1;
			stand_cloth -= 1;
			stand_neck -= 1;
			stand_semenbody -= 1;
			stand_semenface -= 1;
			stand_semenmouth -= 1;
		 }
      }//耳朵

      //下着のオンオフ
      var UnderPicFileNum = 0;
	  if($gameActors._data[1]._equips[12]){
		var k = $gameActors._data[1]._equips[12]._itemId;
		if(k >= 5 && (UnderPicFlag >= 1 || $dataArmors[k].meta.ForceDisplay)){
		 switch(k){
			case 84:
				if($gameActors.actor(1).isStateAffected(37) || $gameActors.actor(1).isStateAffected(38) || [5,6,7,8,10].includes(StandPoseID)) k++;
				UnderPicFileNum = $dataArmors[k].meta.FileNumUnder;
				if([4,6,7,8,9].includes(StandPoseID) && StandAltFlag == 0) UnderPicFileNum += "b";
				break;
			case 284:
				if([5,6,7,8,10].includes(StandPoseID)) k++;
				UnderPicFileNum = $dataArmors[k].meta.FileNumUnder;
				if(StandPoseID == 6 && StandAltFlag == 0) UnderPicFileNum += "b";
				break;
			case 286:
				if([5,6,7,8,10].includes(StandPoseID)) k++;
				UnderPicFileNum = $dataArmors[k].meta.FileNumUnder;
				if(StandPoseID == 6 && StandAltFlag == 0) UnderPicFileNum += "b";
				break;
			default:
				UnderPicFileNum = $dataArmors[k].meta.FileNumUnder;
		 }
		 if(NippleL >= 1) NippleL = $dataArmors[k].meta.UnderNippleL[StandPoseID-1];
		 if(NippleR >= 1) NippleR = $dataArmors[k].meta.UnderNippleR[StandPoseID-1];
		}
	  }
	  
	  //打开露出判定开关
	  $gameSwitches._data[2922] = NippleL >= 1 ? true : false;
	  $gameSwitches._data[2923] = NippleR >= 1 ? true : false;
	  
	  //处理吊坠
	  var PiercePicFileNumR = 0;
	  if(PierceR + PierceL >= 0){
		PiercePicFileNumR = PiercePicFileNum;
		PiercePicFileNum += 'l';
		PiercePicFileNumR += 'r';
		if(PierceL >= 1 && NippleL < 1) PiercePicFileNum += 'b';
		if(PierceR >= 1 && NippleR < 1) PiercePicFileNumR += 'b';
		if(NippleR >= 1){
			stand_pierceR += 4;
			stand_under -= 1;  
			stand_leg -= 1;
			effect_splash -= 1;
			stand_cloth -= 1;
		}
		if(NippleL >= 1){
			stand_pierceL += 5;
			stand_pierceR -= 1;
			stand_under -= 1;  
			stand_leg -= 1;
			effect_splash -= 1;
			stand_cloth -= 1;
		}
	  }

      //足装備取得
	  var LegOpacity = 0;
      if($gameActors._data[1]._equips[StandEqLeg]._itemId >= 5){
        var LegEqNum = $gameActors._data[1]._equips[StandEqLeg]._itemId
        var LegPicFileNum = $dataArmors[LegEqNum].meta.FileNumOption
		LegOpacity = $dataArmors[LegEqNum].meta.LegOpacity;
      }else{
        var LegPicFileNum = 0};


      //立ち絵ポーズ基本ファイル名
      StandPoseID = ( '00' + StandPoseID ).slice( -2 );//ゼロ埋め
      var BasePoseFileName = 'actor01_pose'
      BasePoseFileName += StandPoseID//ポーズ名を結合

      //立ち絵素体//変身中か乳首見えてるかなど
      if(StandAltFlag >= 1){
		  if($gameSwitches.value(98)) var BaseID = "0006";
          else var BaseID = "0004";
      }else{
          var BaseID = "0002";
      }

      if(!$gameScreen.picture(stand_bigin-1)) $gameScreen.showPicture(stand_bigin-1,'MOLU_black',0,0,0,100,100,255,0);
	  
      FileName = BasePoseFileName + "_body_" + BaseID;
      if($gameScreen.picture(stand_base) && $gameScreen.picture(stand_base)._name == FileName){
      }else{
        $gameScreen.showPicture(stand_base,FileName,1,Stand1X,Stand1Y,82,82,255,0)
      }
	  //头发
	  if(!$gameScreen.picture(stand_base) || $gameSwitches.value(98)) $gameScreen.erasePicture(stand_hair);
	  else{
		  if(StandAltFlag >= 1) FileName = 'hair/' + BasePoseFileName + "_hair_" + '0002';
		  else FileName = 'hair/' + BasePoseFileName + "_hair_" + '0001';
		  if($gameScreen.picture(stand_hair) && $gameScreen.picture(stand_hair)._name == FileName){}
		  else{
			var realPictureId = $gameScreen.realPictureId(stand_hair);
			var P = new Game_Picture();
			P.show(FileName,1,Stand1X,Stand1Y,82,82,255,0);
			if(StandAltFlag >= 1) P._tone = $gameActors.actor(1).hairToneb;
			else P._tone = $gameActors.actor(1).hairTone;
			$gameScreen._pictures[realPictureId] = P;
		  }
	  }
      //衣装
      FileName = BasePoseFileName + "_cloth_" + ClothPicFileNum
      if($gameScreen.picture(stand_cloth) && $gameScreen.picture(stand_cloth)._name == FileName && ClothUpdate == 0){
      }else{
        if(ClothPicFileNum != 0){//取得した装備タグの衣装ファイル名が0(全裸)以外の場合      
          $gameScreen.showPicture(stand_cloth,FileName,1,Stand1X,Stand1Y,82,82,EqClothOpacity,0)
        }else{
          $gameScreen.erasePicture(stand_cloth)//全裸の場合消去
        }
      }
      //脚　変身中は反映なし
      FileName = BasePoseFileName + "_option_" + LegPicFileNum
      if($gameScreen.picture(stand_leg) && $gameScreen.picture(stand_leg)._name == FileName){
        if(StandAltFlag == 0 || Cosplay == 1){//取得した装備タグの衣装ファイル名が0(全裸)以外、かつ未変身　またはコスプレの場合
        }else{
          $gameScreen.erasePicture(stand_leg)//全裸の場合消去
        }
      }else{
        if(LegPicFileNum != 0 && StandAltFlag == 0 || LegPicFileNum != 0 && Cosplay == 1){//取得した装備タグの衣装ファイル名が0(全裸)以外、かつ未変身        
          $gameScreen.showPicture(stand_leg,FileName,1,Stand1X,Stand1Y,82,82,LegOpacity,0)
        }else{
          $gameScreen.erasePicture(stand_leg)//全裸の場合消去
        }
      }
      //下着
      FileName = 'under/' + BasePoseFileName + "_option_" + UnderPicFileNum
      if($gameScreen.picture(stand_under) && $gameScreen.picture(stand_under)._name == FileName){
      }else{
        if(UnderPicFileNum != 0){//取得した装備タグの衣装ファイル名が0(全裸)以外の場合        
          $gameScreen.showPicture(stand_under,FileName,1,Stand1X,Stand1Y,82,82,240,0)
        }else{
          $gameScreen.erasePicture(stand_under)//全裸の場合消去
        }
      }
      //息
      FileName = BasePoseFileName + "_option_" + "0035"      
      if($gameScreen.picture(effect_breath) && $gameScreen.picture(effect_breath)._name == FileName){
      }else{
          if(BreathFlag >= 1){
            $gameSwitches._data[52] = true;//吐息アニメ    
            $gameScreen.showPicture(effect_breath,FileName,1,Stand1X,Stand1Y,82,82,255,0);           
          }else{
            $gameSwitches._data[52] = false;//吐息アニメ
            $gameScreen.erasePicture(effect_breath);
          }
      }
      //表情    
      var FaceId = 0
	  if(StandPoseID == 9 && hypnosis == 1){FaceId = 25}
	  else if(StandPoseID == 9 && $gameVariables.value(351) >= 1){FaceId = 25}//奉仕
	  else if(StandPoseID == 8 && hypnosis == 1){FaceId = 40} //催眠
	  else if($gameActors.actor(1).isStateAffected(164)){FaceId = 41}//强绝顶
	  else if($gameActors.actor(1).isStateAffected(163)){FaceId = 36}//弱绝顶
	  else if($gameActors.actor(1).isStateAffected(165)){
		   if($gameVariables.value(1033) == 3) FaceId = 40;
		   else FaceId = 37;
	  }//绝顶余韵
      else if($gameVariables.value(1027) >= 50){FaceId = 35}//発情中
      else if($gameVariables.value(1026) >= 500){FaceId = 34}//快感高
	  else{FaceId = 31};
	  if(['06','10'].includes(StandPoseID) || !$gameScreen.picture(stand_base)){
	     if($gameScreen.picture(stand_face)) $gameScreen.erasePicture(stand_face);
	  }else{
	     FaceId = ( '0000' + FaceId ).slice( -4 );//ゼロ埋め
         FileName = BasePoseFileName + "_face_" + FaceId         
         if($gameScreen.picture(stand_face) && $gameScreen.picture(stand_face)._name == FileName){
		 }else{
			$gameScreen.showPicture(stand_face,FileName,1,Stand1X,Stand1Y,82,82,255,0);
		 }
	  }
	  //汗水+爱液
	  if(SweatFlag < 1 && LovejuiceFlag < 1){$gameScreen.erasePicture(stand_sweat);}
	  else{
		  if(SweatFlag >= 1 && LovejuiceFlag >= 1){var SweatPicFileNum = "0032"}
		  else if(SweatFlag >= 1 && LovejuiceFlag == 0){var SweatPicFileNum = "0036"}
		  else if(SweatFlag == 0 && LovejuiceFlag >= 1){var SweatPicFileNum = "0031"}
		  else{}
		  FileName = BasePoseFileName + "_option_" + SweatPicFileNum;
		  if($gameScreen.picture(stand_sweat) && $gameScreen.picture(stand_sweat)._name == FileName){}
		  else{$gameScreen.showPicture(stand_sweat,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }
	  //侵蚀
	  if(!ConfigManager.Erode){$gameScreen.erasePicture(stand_ero);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + "9";
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  var s = ($gameVariables.value(1030) - 45)*5;
		  if($gameScreen.picture(stand_ero) && $gameScreen.picture(stand_ero)._name == FileName && $gameScreen.picture(stand_ero)._opacity == s){}
		  else{$gameScreen.showPicture(stand_ero,FileName,1,Stand1X,Stand1Y,82,82,s,0);}
	  }
	  //伤痕
	  if(ScarFlag < 1){$gameScreen.erasePicture(stand_scar);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + "8";
		  if($gameScreen.picture(stand_scar) && $gameScreen.picture(stand_scar)._name == FileName){}
		  else{$gameScreen.showPicture(stand_scar,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }
	  //涂鸦
	  if(PaintIndex == "0"){$gameScreen.erasePicture(stand_paint);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + PaintIndex;
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  if($gameScreen.picture(stand_paint) && $gameScreen.picture(stand_paint)._name == FileName){}
		  else{$gameScreen.showPicture(stand_paint,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }
	  //淫紋
	  if(MarkIndex == "0"){$gameScreen.erasePicture(stand_mark);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + MarkIndex;
		  if($gameScreen.picture(stand_mark) && $gameScreen.picture(stand_mark)._name == FileName){}
		  else{$gameScreen.showPicture(stand_mark,FileName,1,Stand1X,Stand1Y,82,82,255,0);
		  $gameScreen.picture(stand_mark)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
		  }
	  }
	  //眼罩
	  if(EyePicFileNum == 0){$gameScreen.erasePicture(stand_eye);}
	  else{
		  FileName = 'eye/' + BasePoseFileName + "_eye_" + EyePicFileNum;
		  if($gameScreen.picture(stand_eye) && $gameScreen.picture(stand_eye)._name == FileName){}
		  else{$gameScreen.showPicture(stand_eye,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	
	  //口球
	  if(MouthFlag < 1){$gameScreen.erasePicture(stand_mouth);}
	  else{
		  FileName = 'mouth/' + BasePoseFileName + "_mouth_" + "1";
		  if($gameScreen.picture(stand_mouth) && $gameScreen.picture(stand_mouth)._name == FileName){}
		  else{$gameScreen.showPicture(stand_mouth,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	 
	  //项链
	  if(NeckPicFileNum == 0){$gameScreen.erasePicture(stand_neck);}
	  else{
		  FileName = 'neck/' + BasePoseFileName + "_neck_" + NeckPicFileNum;
		  if($gameScreen.picture(stand_neck) && $gameScreen.picture(stand_neck)._name == FileName){}
		  else{$gameScreen.showPicture(stand_neck,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	
	  //耳朵
	  if(EarPicFileNum == 0){$gameScreen.erasePicture(stand_ear);}
	  else{
		  FileName = 'ear/' + BasePoseFileName + "_ear_" + EarPicFileNum;
		  if($gameScreen.picture(stand_ear) && $gameScreen.picture(stand_ear)._name == FileName){}
		  else{
			  $gameScreen.showPicture(stand_ear,FileName,1,Stand1X,Stand1Y,82,82,255,0);
			  if(EarPicFileNum != 3){
			  if(StandAltFlag >= 1) $gameScreen.picture(stand_ear)._tone = $gameActors.actor(1).hairToneb;
			  else $gameScreen.picture(stand_ear)._tone = $gameActors.actor(1).hairTone;}
		  }
	  }	
	  //避孕套
	  if(!$gameSwitches.value(2910)){$gameScreen.erasePicture(stand_byt);}
	  else{
		  FileName = 'BYT/' + 'pose' + StandPoseID + '_' + $gameVariables.value(4888);
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  if($gameScreen.picture(stand_byt) && $gameScreen.picture(stand_byt)._name == FileName){}
		  else{$gameScreen.showPicture(stand_byt,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	
	  //ピアスL
	  if(PiercePicFileNum == 0){$gameScreen.erasePicture(stand_pierceL);}
	  else{
		  FileName = 'nipple/' + BasePoseFileName + "_option_" + PiercePicFileNum;
		  if($gameScreen.picture(stand_pierceL) && $gameScreen.picture(stand_pierceL)._name == FileName){}
		  else{$gameScreen.showPicture(stand_pierceL,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	
	  //ピアスR
	  if(PiercePicFileNumR == 0){$gameScreen.erasePicture(stand_pierceR);}
	  else{
		  FileName = 'nipple/' + BasePoseFileName + "_option_" + PiercePicFileNumR;
		  if($gameScreen.picture(stand_pierceR) && $gameScreen.picture(stand_pierceR)._name == FileName){}
		  else{$gameScreen.showPicture(stand_pierceR,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	
	  //喷水
	  if(!$gameSwitches.value(2914)){$gameScreen.erasePicture(effect_splash);}
	  else{
		  FileName = BasePoseFileName + "_option_" + "0037";
		  if($gameScreen.picture(effect_splash) && $gameScreen.picture(effect_splash)._name == FileName){}
		  else{$gameScreen.showPicture(effect_splash,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	
	  //精液body
	  if(SemenBody < 1){$gameScreen.erasePicture(stand_semenbody);}
	  else{
		  if(SemenBody >= 15){var SemenBodyPicFileNum = "0006"}
		  else if(SemenBody >= 8){var SemenBodyPicFileNum = "0005"}
		  else{var SemenBodyPicFileNum = "0004"}
		  FileName = BasePoseFileName + "_semen_" + SemenBodyPicFileNum;
		  if($gameScreen.picture(stand_semenbody) && $gameScreen.picture(stand_semenbody)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenbody,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }	
	  //精液face
	  if(SemenFace < 1){$gameScreen.erasePicture(stand_semenface);}
	  else{
		  if(SemenFace >= 15){var SemenFacePicFileNum = "0003"}
		  else if(SemenFace >= 8){var SemenFacePicFileNum = "0002"}
		  else{var SemenFacePicFileNum = "0001"}
		  FileName = BasePoseFileName + "_semen_" + SemenFacePicFileNum;
		  if($gameScreen.picture(stand_semenface) && $gameScreen.picture(stand_semenface)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenface,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }
	  //精液下体
	  if(SemenVagina < 1 && SemenAnus < 1){$gameScreen.erasePicture(stand_semenhole);}
	  else{
		  if(SemenVagina >= 1 && SemenAnus >= 1){var SemenHolePicFileNum = "0009"}
		  else if(SemenVagina >= 1 && SemenAnus == 0){var SemenHolePicFileNum = "0007"}
          else if(SemenVagina == 0 && SemenAnus >= 1){var SemenHolePicFileNum = "0008"}
          else{}
		  FileName = BasePoseFileName + "_semen_" + SemenHolePicFileNum;
		  if($gameScreen.picture(stand_semenhole) && $gameScreen.picture(stand_semenhole)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenhole,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }
	  //精液口
	  if(SemenMouth < 1){$gameScreen.erasePicture(stand_semenmouth);}
	  else{
		  FileName = BasePoseFileName + "_semen_" + "0010";
		  if($gameScreen.picture(stand_semenmouth) && $gameScreen.picture(stand_semenmouth)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenmouth,FileName,1,Stand1X,Stand1Y,82,82,255,0);}
	  }
      //立ち絵エロ

      var BindType = $gameVariables.value(415)//拘束の相手種族
      var MouthStateID = $gameVariables.value(351)//口塞ぎの相手番号
      var VaginaStateID = $gameVariables.value(352)//前の相手番号
      var AnusStateID = $gameVariables.value(353)//後ろの相手番号
      var WaitStateID = $gameVariables.value(354)//挿入前相手番号
      //4(拘束)
      if(StandPoseID == 4 && BindType == 2){; Dif1PicFileName = "tentacle";}
      else if(StandPoseID == 4 && BindType == 1){Dif1PicFileName = "manhand";Dif2PicFileName = "man";}
      else if(StandPoseID == 4 && BindType == 3){Dif1PicFileName = "tentaclewall";Dif2PicFileName = "tentaclewallback";}
      else if(StandPoseID == 4 && BindType == 4){Dif1PicFileName = "worm";}
      //else if(StandPoseID == 4 && BindType == 5){Dif1PicFileName = "demonhand";Dif2PicFileName = "demon";}
      else if(StandPoseID == 4 && BindType == 10){Dif1PicFileName = "chain";}
      else if(StandPoseID == 4 && BindType == 11){Dif1PicFileName = "tickle";}
	  else if(StandPoseID == 4 && BindType == 15){Dif1PicFileName = "machine01";}
	  else if(StandPoseID == 4 && BindType == 16){Dif1PicFileName = "machine02";}
	  else if(StandPoseID == 4 && BindType == 17){Dif1PicFileName = "machine03";}
	  else if(StandPoseID == 4 && BindType == 18){Dif1PicFileName = "machine04";}
      //5(片足上げ)
      else if(StandPoseID == 5 && VaginaStateID == 2 && AnusStateID == 2 && MouthStateID == 2){Dif1PicFileName = "tentacle_07";}//触手三穴
      else if(StandPoseID == 5 && VaginaStateID == 2 && AnusStateID == 2){Dif1PicFileName = "tentacle_04";}
      else if(StandPoseID == 5 && VaginaStateID == 2 && MouthStateID == 2){Dif1PicFileName = "tentacle_05";}//触手口膣
      else if(StandPoseID == 5 && AnusStateID == 2 && MouthStateID == 2){Dif1PicFileName = "tentacle_06";}//触手口尻
      else if(StandPoseID == 5 && VaginaStateID == 2){Dif1PicFileName = "tentacle_02";}
      else if(StandPoseID == 5 && AnusStateID == 2){Dif1PicFileName = "tentacle_03";}
      else if(StandPoseID == 5 && BindType == 2){Dif1PicFileName = "tentacle_01";}
      else if(StandPoseID == 5 && VaginaStateID == 1){Dif1PicFileName = "man01_penis_v";Dif2PicFileName = "man01";}
      else if(StandPoseID == 5 && WaitStateID == 1){Dif1PicFileName = "man01_penis";Dif2PicFileName = "man01";}
      
      //6(バック)
      else if(StandPoseID == 6 && VaginaStateID == 1){Dif1PicFileName = "man01";}
      else if(StandPoseID == 6 && AnusStateID == 1){Dif1PicFileName = "man01";}
      //7(二穴)
      else if(StandPoseID == 7 && VaginaStateID == 1 && AnusStateID == 1 && BindType == 10){Dif1PicFileName = "man01_hand02";Dif2PicFileName = "man01";}
      else if(StandPoseID == 7 && VaginaStateID == 1 && BindType == 10){Dif1PicFileName = "man02_hand";Dif2PicFileName = "man02";}
      else if(StandPoseID == 7 && VaginaStateID == 1 && AnusStateID == 1){Dif1PicFileName = "man01_hand";Dif2PicFileName = "man01";}
      //8(開脚))
      //注意・パラメータにかぶりがある場合より多い方を上にする
      else if(StandPoseID == 8 && VaginaStateID == 1 && AnusStateID == 1 && BindType == 9){Dif1PicFileName = "tentaclechair_w";;Dif2PicFileName = "tentaclechair";}
      else if(StandPoseID == 8 && BindType == 9){Dif1PicFileName = "tentaclechair_f";;Dif2PicFileName = "tentaclechair";}
      
      else if(StandPoseID == 8 && BindType == 8){Dif1PicFileName = "tentaclehypnosis";}
      
      else if(StandPoseID == 8 && VaginaStateID == 1 && MouthStateID == 1){Dif1PicFileName = "penis_m";;Dif2PicFileName = "man01";}
      else if(StandPoseID == 8 && AnusStateID == 1 && MouthStateID == 1){Dif1PicFileName = "penis_ma";;Dif2PicFileName = "man01";}
      else if(StandPoseID == 8 && VaginaStateID == 1){Dif1PicFileName = "man01_penis_v";;Dif2PicFileName = "man01";}
      else if(StandPoseID == 8 && AnusStateID == 1){Dif1PicFileName = "man01_penis_a";;Dif2PicFileName = "man01";}
      
      //9(奉仕)
      else if(StandPoseID == 9 && MouthStateID == 1){Dif1PicFileName = "mouthhuman";}
      else if(StandPoseID == 9 && MouthStateID == 2){Dif1PicFileName = "mouthtentacle";}
	  
	  else if(StandPoseID == 10 && VaginaStateID == 1){Dif1PicFileName = "man";}
      else{}
	  if($gameActors.actor(1).hasArmor($dataArmors[83]) && (StandPoseID == 5 || StandPoseID == 8) && VaginaStateID == 1) Dif1PicFileName += 'b';



      FileName = BasePoseFileName + "_sexual_" + Dif1PicFileName//ファイル名指定
      if($gameScreen.picture(stand_diffront) && $gameScreen.picture(stand_diffront)._name == FileName){
        //既に同じファイル名が表示されてる場合はスルー
      }else{
        if(Dif1PicFileName != 0){    
          $gameScreen.showPicture(stand_diffront,FileName,1,Stand1X,Stand1Y,82,82,255,0)
        }else{
          $gameScreen.erasePicture(stand_diffront)
        }
      }

      FileName = BasePoseFileName + "_sexual_" + Dif2PicFileName//ファイル名指定
      if($gameScreen.picture(stand_difback) && $gameScreen.picture(stand_difback)._name == FileName){
        //既に同じファイル名が表示されてる場合はスルー
      }else{
        if(Dif2PicFileName != 0){    
          $gameScreen.showPicture(stand_difback,FileName,1,Stand1X,Stand1Y,82,82,255,0)
        }else{
          $gameScreen.erasePicture(stand_difback)
        }
      }
      
	  $gameScreen.showPicture(stand_MOLU,'MOLU',0,0,0,100,100,255,0)	  
    }	
	else if (command === 'ResetLoseStand') {
		$gameVariables._data[912] = 0
		$gameVariables._data[415] = 0
		$gameVariables._data[351] = 0
		$gameVariables._data[352] = 0
		$gameVariables._data[353] = 0
		$gameVariables._data[354] = 0
		for(var i = 66; i <= 94; i++){$gameScreen.erasePicture(i)} //需要调整352末路文字图层
	}	
	else if (command === 'ExtasySemen'){
		var ExtasyPointTotal = 0
		var CulExtasyPoint = 0;
		if($gameVariables.value(1238) > 0){
			CulExtasyPoint = (2 * Math.random() + 1 + $gameVariables.value(4878)) * $gameVariables.value(1238);
			CulExtasyPoint *= ($gameVariables.value(1027) + 100) / 100;
			if(Math.random() < 0.05 + $gameActors.actor(1).isLearnedSkill(960) * 0.5){
				TickerManager.show(`\\i[892]\\c[27]会心一击`);
                $gameScreen.startFlash([255,255,255,100], 20);
				CulExtasyPoint *= 1.5;}
			ExtasyPointTotal = Math.floor(CulExtasyPoint - CulExtasyPoint * $gameVariables.value(1098) / 100)
			$gameVariables._data[1026] += ExtasyPointTotal
            $gameVariables._data[4992] = ExtasyPointTotal
			$gameVariables._data[411] -= ExtasyPointTotal / 2
			if(ExtasyPointTotal > 0) TickerManager.show(`\\i[3582]\\c[27]快感值 \\V[4992]`);
			this.setupChild($dataCommonEvents[167].list, 0)
		}
	}
	else if(command.toLowerCase() === "add_abu_enemy") {
		var EnemyList = [];
		EnemyList = $gameActors.actor(1).abu.enemyList;
		if(EnemyList.length < 1)	return;
		var EnemyID = EnemyList[Math.randomInt(EnemyList.length)];
		var x = 300 + Math.randomInt(300);
		var y = 300 + Math.randomInt(200);
		var enemy = new Game_Enemy(EnemyID, x, y);
		$gameTroop._enemies.push(enemy);
		enemy.addState(3);
		var kindState = ['demon','daimaoabu','slime','renegade','human','tentacle','variant','imitator','aquatic','slaver','insect','machine','plant','succubus','abadoncore','worm','boss','demidemon','hybrid']
		for(var i = 0; i < kindState.length; i++){
			if($dataEnemies[EnemyID].meta[kindState[i]+'']) enemy.addState(352 + i);
		}
		if($dataEnemies[EnemyID].meta['BindSkill']) enemy.addState(203);
		BattleManager._spriteset.removeEnemies();
		BattleManager._spriteset.createEnemies();
		$gameTroop.makeUniqueNames();
	}
	else if(command.toLowerCase() === "clear_abu_enemy"){
		for(var index = 0;index < $gameTroop._enemies.length;index++){
			if(!$dataEnemies[$gameTroop._enemies[index]._enemyId].meta['BindSkill'] && !$dataEnemies[$gameTroop._enemies[index]._enemyId].meta['noMirror']){
				$gameTroop._enemies.splice(index,1);
				BattleManager._spriteset.removeEnemies();
				BattleManager._spriteset.createEnemies();
				AudioManager.playSe({name: 'Move1', pan: 0, pitch: 100, volume: 100});
				break;}}
	}
	else if (command.toLowerCase() === "add_enemy_troop") {
		 for(var i = 0;i < $gameActors.actor(1).jumpEnemy.length;i++){
			var troop = $dataTroops[$gameActors.actor(1).jumpEnemy[i]];
			for (var k = 0; k < troop.members.length; k++) {
				var member = troop.members[k];
				if ($dataEnemies[member.enemyId]) {
					var x = 300 + Math.randomInt(300);
					var y = 300 + Math.randomInt(200);
					var enemy = new Game_Enemy(member.enemyId, x, y);
					$gameTroop._enemies.push(enemy);
				}   
			}
			BattleManager._spriteset.removeEnemies();
			BattleManager._spriteset.createEnemies();
			$gameTroop.makeUniqueNames();
		}
    }
	else {
      My_Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };
  
})();