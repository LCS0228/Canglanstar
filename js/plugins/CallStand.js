/*---------------------------------------------------------------------------*
 * 2020/01/7 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 立ち絵表示プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   CallStand 立ち絵IDor立ち絵エロ名 アニメX アニメY //衣装指定とかもできると〇
 * 
 * 戦闘エロのメモ
 * v[351] = 口を塞いでいる相手のID
 * v[352] = 前の以下略
 * v[353] = 後ろの以下略
 * v[415] = 拘束相手
 * 
 * 種族[1,human][2,tentacle][3,demon][4,worm?]
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallStand' || command === 'CallStandForce') {

      

      //プラグインコマンド


      if (args[0].match(/\\v/)) {
        //args[1]に\vを含む場合の処理
        array = args[0].match(/[0-9]+\.?[0-9]*/g);
        for(var i = 0; i < array.length; i++) {
        args[0] = Number(array);
        var StandPoseID = $gameVariables.value(args[0]);
          }
        }else{var StandPoseID = args[0]
          }
      if(args[1] != null){var StandAnimeX = Number(args[1])}else{var StandAnimeX = 0};//アニメーション座標X
      if(args[2] != null){var StandAnimeY = Number(args[2])}else{var StandAnimeY = 0};//アニメーション座標Y
      if(args[3] != null){var StandAnimeWait = Number(args[3])}else{var StandAnimeWait = 1};//アニメーションウェイト

      //立ち絵基本座標
	  if($gameActors.actor(1).zoomIn){
		var Stand1X = 500
		var Stand1Y = 30
		var scale = 80
	  }else{
		var Stand1X = 380
		var Stand1Y = 0
		var scale = 100
	  }
      $gameVariables._data[902] = Stand1X
      $gameVariables._data[903] = Stand1Y



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

      else if(StandPoseID == "奉仕_人間"){StandPoseID = 9;$gameVariables._data[351] = 1}
      else if(StandPoseID == "奉仕_触手"){StandPoseID = 9;$gameVariables._data[351] = 2}
      else if(StandPoseID == "催眠奉仕_触手"){StandPoseID = 9;$gameVariables._data[351] = 2}
      else{console.error('ポーズIDが不正'); StandPoseID = 1;}

      $gameVariables._data[915] = StandPoseID//ゲーム内変数に入れておく
      $gameVariables._data[916] = StandPoseID//ゲーム内変数に入れておく

      if(command == 'CallStandForce'){$gameVariables._data[912] = StandPoseID}
      else{$gameVariables._data[912] = 0}

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
      var stand_bigin = 34;
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
	  var stand_hair = stand_bigin + 12; //299 以及变身处
	  //服饰
	  var stand_ear = stand_bigin + 13;//299 以及变身处
	  var stand_pierceL = stand_bigin + 14;
	  var stand_pierceR = stand_bigin + 15;
      var stand_under = stand_bigin + 16;  
      var stand_leg = stand_bigin + 17;
	  var effect_splash = stand_bigin + 18;
      var stand_cloth = stand_bigin + 19; //乳环处理到此为止
      var stand_neck = stand_bigin + 20; 
	  var stand_byt = stand_bigin + 21; //1043
      var stand_semenbody = stand_bigin + 22;
      var stand_semenface = stand_bigin + 23;
      var stand_semenmouth = stand_bigin + 24; //尾巴处理到此为止
	  var effect_breath = stand_bigin + 25; //229
      var stand_diffront = stand_bigin + 36;

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
      if($gameActors._data[1]._equips[9] && $gameActors._data[1]._equips[9]._itemId >= 5){
         EyePicFileNum = $dataArmors[$gameActors._data[1]._equips[9]._itemId].meta.FileNumEye;
      }
	  
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
			stand_ear += 11;
			stand_pierceL -= 1;
			stand_pierceR -= 1;
			stand_under -= 1;
			stand_leg -= 1;
			effect_splash -= 1;
			stand_cloth -= 1;
			stand_neck -= 1;
			stand_byt -= 1;
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
		 if(NippleL == 1) NippleL = $dataArmors[k].meta.UnderNippleL[StandPoseID-1];
		 if(NippleR == 1) NippleR = $dataArmors[k].meta.UnderNippleR[StandPoseID-1];
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


      /* FileName = BasePoseFileName + "_body_" + BaseID
	  var bodyTone = [0,0,0,0];
	  if($gameActors.actor(1).isStateAffected(316)) bodyTone = [50,0,29,0];
      if($gameScreen.picture(stand_base) && $gameScreen.picture(stand_base)._name == FileName && bodyTone == $gameScreen.picture(stand_base)._tone){
      }else{
		var realPictureId = $gameScreen.realPictureId(stand_base);
		var P = new Game_Picture();
		P.show(FileName,0,Stand1X,Stand1Y,scale,scale,255,0);
		P._tone = bodyTone;
        $gameScreen._pictures[realPictureId] = P;
      } */
	  FileName = BasePoseFileName + "_body_" + BaseID
      if($gameScreen.picture(stand_base) && $gameScreen.picture(stand_base)._name == FileName){
      }else{
        $gameScreen.showPicture(stand_base,FileName,0,Stand1X,Stand1Y,scale,scale,255,0)
      }
	  var bodyTone = [0,0,0,0];
	  if($gameActors.actor(1).isStateAffected(316)) bodyTone = [50,0,29,0];
      if($gameScreen.picture(stand_base) && bodyTone != $gameScreen.picture(stand_base)._tone) $gameScreen.picture(stand_base).tint(bodyTone, 0);
		  
	  //头发
	  if(!$gameScreen.picture(stand_base) || $gameSwitches.value(98)) $gameScreen.erasePicture(stand_hair);
	  else{
		  if(StandAltFlag >= 1) FileName = 'hair/' + BasePoseFileName + "_hair_" + '0002';
		  else FileName = 'hair/' + BasePoseFileName + "_hair_" + '0001';
		  if($gameScreen.picture(stand_hair) && $gameScreen.picture(stand_hair)._name == FileName){}
		  else{
			var realPictureId = $gameScreen.realPictureId(stand_hair);
			var P = new Game_Picture();
			P.show(FileName,0,Stand1X,Stand1Y,scale,scale,255,0);
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
          $gameScreen.showPicture(stand_cloth,FileName,0,Stand1X,Stand1Y,scale,scale,EqClothOpacity,0)
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
          $gameScreen.showPicture(stand_leg,FileName,0,Stand1X,Stand1Y,scale,scale,LegOpacity,0)
        }else{
          $gameScreen.erasePicture(stand_leg)//全裸の場合消去
        }
      }
      //下着
      FileName = 'under/' + BasePoseFileName + "_option_" + UnderPicFileNum
      if($gameScreen.picture(stand_under) && $gameScreen.picture(stand_under)._name == FileName){
      }else{
        if(UnderPicFileNum != 0){//取得した装備タグの衣装ファイル名が0(全裸)以外の場合  
          $gameScreen.showPicture(stand_under,FileName,0,Stand1X,Stand1Y,scale,scale,240,0)
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
            $gameScreen.showPicture(effect_breath,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);           
          }else{
            $gameSwitches._data[52] = false;//吐息アニメ
            $gameScreen.erasePicture(effect_breath);
          }
      }
      //表情    
      var FaceId = AutoFaceId();
	  if(FaceId == 0 || ['06','10'].includes(StandPoseID) || !$gameScreen.picture(stand_base)){
	     if($gameScreen.picture(stand_face)) $gameScreen.erasePicture(stand_face);
	  }else{
	     FaceId = ( '0000' + FaceId ).slice( -4 );//ゼロ埋め
         FileName = BasePoseFileName + "_face_" + FaceId         
         if($gameScreen.picture(stand_face) && $gameScreen.picture(stand_face)._name == FileName){
		 }else{
			$gameScreen.showPicture(stand_face,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);
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
		  else{$gameScreen.showPicture(stand_sweat,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //侵蚀
	  if(!ConfigManager.Erode){$gameScreen.erasePicture(stand_ero);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + "9";
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  var s = ($gameVariables.value(1030) - 45)*5;
		  if($gameScreen.picture(stand_ero) && $gameScreen.picture(stand_ero)._name == FileName && $gameScreen.picture(stand_ero)._opacity == s){}
		  else{$gameScreen.showPicture(stand_ero,FileName,0,Stand1X,Stand1Y,scale,scale,s,0);}
	  }
	  //伤痕
	  if(ScarFlag < 1){$gameScreen.erasePicture(stand_scar);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + "8";
		  if($gameScreen.picture(stand_scar) && $gameScreen.picture(stand_scar)._name == FileName){}
		  else{$gameScreen.showPicture(stand_scar,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //涂鸦
	  if(PaintIndex == "0"){$gameScreen.erasePicture(stand_paint);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + PaintIndex;
		  if(StandPoseID == 6 && StandAltFlag == 0) FileName += "b";
		  if($gameScreen.picture(stand_paint) && $gameScreen.picture(stand_paint)._name == FileName){}
		  else{$gameScreen.showPicture(stand_paint,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //淫紋
	  if(MarkIndex == "0"){$gameScreen.erasePicture(stand_mark);}
	  else{
		  FileName = 'mark/' + BasePoseFileName + "_mark_" + MarkIndex;
		  if($gameScreen.picture(stand_mark) && $gameScreen.picture(stand_mark)._name == FileName){}
		  else{$gameScreen.showPicture(stand_mark,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);
		  $gameScreen.picture(stand_mark)._blendMode = PIXI.BLEND_MODES.MULTIPLY;
		  }
	  }
	  //眼罩
	  if(EyePicFileNum == 0 || $gameSwitches.value(98)){$gameScreen.erasePicture(stand_eye);}
	  else{
		  FileName = 'eye/' + BasePoseFileName + "_eye_" + EyePicFileNum;
		  if($gameScreen.picture(stand_eye) && $gameScreen.picture(stand_eye)._name == FileName){}
		  else{$gameScreen.showPicture(stand_eye,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //口球
	  if(MouthFlag < 1){$gameScreen.erasePicture(stand_mouth);}
	  else{
		  FileName = 'mouth/' + BasePoseFileName + "_mouth_" + "1";
		  if($gameScreen.picture(stand_mouth) && $gameScreen.picture(stand_mouth)._name == FileName){}
		  else{$gameScreen.showPicture(stand_mouth,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	 
	  //项链
	  if(NeckPicFileNum == 0){$gameScreen.erasePicture(stand_neck);}
	  else{
		  FileName = 'neck/' + BasePoseFileName + "_neck_" + NeckPicFileNum;
		  if($gameScreen.picture(stand_neck) && $gameScreen.picture(stand_neck)._name == FileName){}
		  else{$gameScreen.showPicture(stand_neck,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //耳朵
	  if(EarPicFileNum == 0){$gameScreen.erasePicture(stand_ear);}
	  else{
		  FileName = 'ear/' + BasePoseFileName + "_ear_" + EarPicFileNum;
		  if($gameScreen.picture(stand_ear) && $gameScreen.picture(stand_ear)._name == FileName){}
		  else{
			  $gameScreen.showPicture(stand_ear,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);
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
		  else{$gameScreen.showPicture(stand_byt,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //ピアスL
	  if(PiercePicFileNum == 0){$gameScreen.erasePicture(stand_pierceL);}
	  else{
		  FileName = 'nipple/' + BasePoseFileName + "_option_" + PiercePicFileNum;
		  if($gameScreen.picture(stand_pierceL) && $gameScreen.picture(stand_pierceL)._name == FileName){}
		  else{$gameScreen.showPicture(stand_pierceL,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //ピアスR
	  if(PiercePicFileNumR == 0){$gameScreen.erasePicture(stand_pierceR);}
	  else{
		  FileName = 'nipple/' + BasePoseFileName + "_option_" + PiercePicFileNumR;
		  if($gameScreen.picture(stand_pierceR) && $gameScreen.picture(stand_pierceR)._name == FileName){}
		  else{$gameScreen.showPicture(stand_pierceR,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //喷水
	  if(!$gameSwitches.value(2914)){$gameScreen.erasePicture(effect_splash);}
	  else{
		  FileName = BasePoseFileName + "_option_" + "0037";
		  if($gameScreen.picture(effect_splash) && $gameScreen.picture(effect_splash)._name == FileName){}
		  else{$gameScreen.showPicture(effect_splash,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //精液body
	  if(SemenBody < 1){$gameScreen.erasePicture(stand_semenbody);}
	  else{
		  if(SemenBody >= 15){var SemenBodyPicFileNum = "0006"}
		  else if(SemenBody >= 8){var SemenBodyPicFileNum = "0005"}
		  else{var SemenBodyPicFileNum = "0004"}
		  FileName = BasePoseFileName + "_semen_" + SemenBodyPicFileNum;
		  if($gameScreen.picture(stand_semenbody) && $gameScreen.picture(stand_semenbody)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenbody,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }	
	  //精液face
	  if(SemenFace < 1){$gameScreen.erasePicture(stand_semenface);}
	  else{
		  if(SemenFace >= 15){var SemenFacePicFileNum = "0003"}
		  else if(SemenFace >= 8){var SemenFacePicFileNum = "0002"}
		  else{var SemenFacePicFileNum = "0001"}
		  FileName = BasePoseFileName + "_semen_" + SemenFacePicFileNum;
		  if($gameScreen.picture(stand_semenface) && $gameScreen.picture(stand_semenface)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenface,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
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
		  else{$gameScreen.showPicture(stand_semenhole,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
	  }
	  //精液口
	  if(SemenMouth < 1){$gameScreen.erasePicture(stand_semenmouth);}
	  else{
		  FileName = BasePoseFileName + "_semen_" + "0010";
		  if($gameScreen.picture(stand_semenmouth) && $gameScreen.picture(stand_semenmouth)._name == FileName){}
		  else{$gameScreen.showPicture(stand_semenmouth,FileName,0,Stand1X,Stand1Y,scale,scale,255,0);}
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
      
	  else if(StandPoseID == 8 && AnusStateID == 1 && MouthStateID == 1 && VaginaStateID == 1){Dif1PicFileName = "penis_maa";;Dif2PicFileName = "man01";}      
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
          $gameScreen.showPicture(stand_diffront,FileName,0,Stand1X,Stand1Y,scale,scale,255,0)
        }else{
          $gameScreen.erasePicture(stand_diffront)
        }
      }

      FileName = BasePoseFileName + "_sexual_" + Dif2PicFileName//ファイル名指定
      if($gameScreen.picture(stand_difback) && $gameScreen.picture(stand_difback)._name == FileName){
        //既に同じファイル名が表示されてる場合はスルー
      }else{
        if(Dif2PicFileName != 0){    
          $gameScreen.showPicture(stand_difback,FileName,0,Stand1X,Stand1Y,scale,scale,255,0)
        }else{
          $gameScreen.erasePicture(stand_difback)
        }
      }

      //アニメーション座標
      if (StandAnimeX != 0 || StandAnimeY != 0){
        $gameVariables._data[902] = Stand1X
        $gameVariables._data[903] = Stand1Y
        var StandMoveX = Stand1X
        var StandMoveY = Stand1Y
        StandMoveX = Stand1X + StandAnimeX
        StandMoveY = Stand1Y + StandAnimeY
        this.wait(5)

        //入力済み
        //console.error(args[1])
        //console.error(Stand1Y)
        //console.error(Stand1X)
        //console.error(Stand1Y)
        //console.error(StandMoveX)


        //動かす処理
        

        MovePic(stand_difback,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_cloth_back,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        
        MovePic(stand_base,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_hair,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_sweat,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_leg,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_under,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_cloth,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_face,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(effect_breath,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(effect_splash,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_mouth,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_semenbody,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_semenface,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_mark,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_ero,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_scar,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_paint,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_eye,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_pierceL,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_pierceR,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_neck,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_ear,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
		MovePic(stand_byt,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        
        MovePic(stand_semenmouth,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_semenhole,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        MovePic(stand_diffront,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
        
        this.wait(5)

      }
    




    };//おわり





//消去コマンド
if (command === 'ResetStandEro') {//消去1
  $gameVariables._data[912] = 0//強制指定解除
  $gameVariables._data[415] = 0//拘束相手
  $gameVariables._data[351] = 0//口
  $gameVariables._data[352] = 0//膣
  $gameVariables._data[353] = 0//尻
  $gameVariables._data[354] = 0//挿入まち
  //$gameSwitches._data[34] = false;//立ち絵えろスイッチおふ？
  $gameScreen.erasePicture(34)
  $gameScreen.erasePicture(70) //这俩为敌人图层
}

    if (command === 'EraceStand1' || command === 'EraceStand') {//消去1
      for(var i = 34; i <= 59; i++){$gameScreen.erasePicture(i);}
	  $gameScreen.erasePicture(70);
    }
  

    if (command === 'TempEraceStand1' || command === 'イベント中一時立ち絵消去') {//消去1
      $gameSwitches._data[46] = true;
    }


    if (command === 'StandAnimation') {//アニメーションのみ
      var Stand1X = 450
      var Stand1Y = 50
      //ピクチャ番号指定
      //開始番号
      var stand_bigin = 34;
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
      var stand_cloth = stand_bigin + 19;
      var stand_neck = stand_bigin + 20; 
	  var stand_byt = stand_bigin + 21;
      var stand_semenbody = stand_bigin + 22;
      var stand_semenface = stand_bigin + 23;
      var stand_semenmouth = stand_bigin + 24;
	  var effect_breath = stand_bigin + 25; //229
      var stand_diffront = stand_bigin + 36;
      if(args[0] != null){var StandAnimeX = Number(args[0])}else{var StandAnimeX = 0};//アニメーション座標X
      if(args[1] != null){var StandAnimeY = Number(args[1])}else{var StandAnimeY = 0};//アニメーション座標Y
      if(args[2] != null){var StandAnimeWait = Number(args[2])}else{var StandAnimeWait = 1};//アニメーションウェイト
      if (StandAnimeX != 0 || StandAnimeY != 0){
        var StandMoveX = Stand1X + StandAnimeX
        var StandMoveY = Stand1Y + StandAnimeY
      MovePic(stand_difback,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_cloth_back,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      
      MovePic(stand_base,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_sweat,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_leg,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_under,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_cloth,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_face,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(effect_breath,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(effect_splash,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_mouth,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_semenbody,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_semenface,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_mark,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  MovePic(stand_ero,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  MovePic(stand_scar,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  MovePic(stand_paint,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  MovePic(stand_eye,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)  
      MovePic(stand_pierceL,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  MovePic(stand_pierceR,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  MovePic(stand_neck,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)	  
      MovePic(stand_ear,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  MovePic(stand_byt,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
	  
      MovePic(stand_semenmouth,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_semenhole,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      MovePic(stand_diffront,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait)
      }
    }
  };


  function MovePic(TempPicNum,Stand1X,Stand1Y,StandMoveX,StandMoveY,StandAnimeWait) {
    if($gameScreen.picture(TempPicNum)){
      Torigoya.Tween.create($gameScreen.picture(TempPicNum))
      .to({_x: StandMoveX,_y: StandMoveY},StandAnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({_x: Stand1X,_y: Stand1Y},StandAnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
    }
  }


  function AutoFaceId() {
    if($gameSwitches.value(15) || $gameSwitches.value(34)){var FaceId = $gameVariables.value(895)}//イベント中or立ち絵エロ中はFaceIdで指定
    else{  
      var FaceId = 2    
      var Estrus = 35
      var Battle = 13
      var Extasy = 34
      var ShameSmile = 33
      var ShameUnhappy = 32
      var Shame = 31
      var Jito = 17
      var Joy = 5
      var Stern = 7
      var Yoin = 37
      var PokerFace = 2
      var MouthOpen = 25
      var Damage = 15
	  var Orgasm = 36
	  var BigOrgasm = 41

      if($gameVariables.value(916) == 9 && $gameVariables.value(351) >= 1){FaceId = MouthOpen}//奉仕
	  else if($gameActors.actor(1).isStateAffected(164)){FaceId = BigOrgasm}//强绝顶
	  else if($gameActors.actor(1).isStateAffected(163)){FaceId = Orgasm}//弱绝顶
	  else if($gameActors.actor(1).isStateAffected(165)){
		   if($gameVariables.value(1033) == 3) FaceId = 40;
		   else FaceId = 37;
	  }//绝顶余韵
      else if($gameVariables.value(1027) >= 50){FaceId = Estrus}//発情中
      else if($gameVariables.value(1026) >= 500){FaceId = Extasy}//快感高
      else if($gameVariables.value(1020) >= 1){FaceId = ShameUnhappy}//ぶっかけ
      else if($gameActors.actor(1).isStateAffected(28)){FaceId = Shame}//羞恥
      else if($gameParty.inBattle()){
        if($gameSwitches.value(38)){FaceId = Joy}//戦闘終了時
        else if($gameSwitches.value(170)){FaceId = Damage}//ダメージ
        else{FaceId = Battle}//戦闘中
      }//暫定
	  else if($gameActors.actor(1).isStateAffected(220)){FaceId = Damage}//感情受伤
      else if($gameActors.actor(1).isStateAffected(219)){FaceId = Jito}//感情じとー
      else if($gameActors.actor(1).isStateAffected(216)){FaceId = Yoin}//感情余韻
      else if($gameActors.actor(1).isStateAffected(221)){FaceId = Shame}//感情羞恥
      else if($gameSwitches.value(228)){FaceId = Shame}//露出中オン
      else if($gameActors._data[1]._equips[1]._itemId == 0 && $dataMap.meta["PubricSpot"]){
        if($gameVariables.value(1021) >= 100){
          FaceId = ShameSmile
          }else{FaceId = Shame}
            }//全裸
	  else if($gameActors.actor(1).hp < $gameActors.actor(1).mhp / 4){FaceId = 14}
      else if($dataMap.meta["EnemyBase"]){FaceId = Stern}//平常敵ダンジョン攻略中
      else{FaceId = PokerFace};//平常
    }
    $gameVariables._data[895] = FaceId //変数に代入しておく
    return FaceId    
  }




})();