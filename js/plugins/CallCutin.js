/*---------------------------------------------------------------------------*
 * 2020/01/7 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc カットイン表示プラグイン
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   callcutin ID アニメX アニメY SE(1以上でオン) BGS(1以上でオン)
 */


(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallCutin') {
    //プラグインコマンド


    if (args[0].match(/\\v/)) {//変数を含む場合の処理
      array = args[0].match(/[0-9]+\.?[0-9]*/g);
      for(var i = 0; i < array.length; i++) {//戦闘の場合自動加算したい？
          args[0] = array;
          var EroCutinAddID = $gameVariables.value(args[0]);//カットイン名
      }
    }else{
      var EroCutinAddID = args[0]//カットイン名
    }

if(args[1] != null){var AnimeX = Number(args[1])}else{var AnimeX = 0};//アニメーション座標X
if(args[2] != null){var AnimeY = Number(args[2])}else{var AnimeY = 0};//アニメーション座標Y
if(args[3] != null){var CutinSE = args[3]}else{var CutinSE = 0};//SEフラグ
if(args[4] != null){var CutinBGS = args[4]}else{var CutinBGS = 0};//BGSフラグ

//ゲーム中の装備番号
var EqCloth = 1
var EqLeg =7


//表示中
$gameSwitches.setValue(155,true)

//呼び出しファイル名入力用
var Dif2ID = "なし"
var DifID = "なし"
var DifSE = "なし"
var DifSemen = "なし"
var DifBGS = "なし"//未使用

//座標
var Cutin1X = 248
var Cutin1Y = 256
var Cutin2X = 412
var Cutin2Y = 464

//着用中衣装パラメータ
var EqNum = 0;
var Nipple = true;
var FileNameCloth = 0;
if($gameActors._data[1]._equips[EqCloth]._itemId >= 5){
	EqNum = $gameActors._data[1]._equips[EqCloth]._itemId;
	var CLOTHTAG = $dataArmors[EqNum].meta.ClothName;
	var UNDERFLAG = Number($dataArmors[EqNum].meta.ClothUnderFlag); //下着
	if(EqNum == 71 && $gameActors.actor(1).isStateAffected(94)) EqNum = 72;
	if(EqNum == 71 && $gameActors.actor(1).isStateAffected(95)) EqNum = 73;
	FileNameCloth = $dataArmors[EqNum].meta.FileNumCloth;
	if(!$dataArmors[EqNum].meta["CutinNipple"]) Nipple = false;
}else{
	var CLOTHTAG = 'Naked';
	var UNDERFLAG = 1;
}

//変身中か否か
if($gameSwitches.value(131)){
  var ChangeFlag = true
}else{
  var ChangeFlag = false
}

//下着つけていない、かつ下着フラグオンの時
if($gameActors._data[1]._equips[12]){
	var k = $gameActors._data[1]._equips[12]._itemId;
	if(k >= 5){
		if($dataArmors[k].meta.ForceDisplay)  UNDERFLAG = 1;
		if(UNDERFLAG >= 1 && Nipple && !$dataArmors[k].meta["CutinNipple"]) Nipple = false;
	}else{
		UNDERFLAG = 0;
	}
}else{UNDERFLAG = 0;}

    
//定義
var CUTINBASENUM = 0//部位ベース名
var CUTINFILENUM = 0//ファイル名末尾の番号
var CUTINCLOTHFLAG = 0//衣装反映の有無
var CUTINTITESFLAG = 0//タイツ反映
var CUTINOPTIONFLAG = 0//下着反映(タイツが優先)
var CUTINALTFLAG = 0//変身差分(ベース番号に加算)


//相手タイプ
//胸
if(EroCutinAddID == "乳首弄り"){
  var Dif2ID = "なし"
  var DifID = "finger_0001"
  var DifSE = "Knead01"//SE
  CUTINBASENUM = "breast"
  CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸揉み前"){
    var Dif2ID = "なし"
    var DifID = "knead_0001"
    var DifSE = "Knead01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸揉み後ろ"){
    var Dif2ID = "なし"
    var DifID = "knead_0002"
    var DifSE = "Knead01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "花弁触手_胸"){
    var Dif2ID = "なし"
    var DifID = "tentacle_0001"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "繊毛触手_胸"){
    var Dif2ID = "なし"
    var DifID = "tentacle_0002"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "怪魔舌_胸"){
    var Dif2ID = "なし"
    var DifID = "tongue_0001"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "舔胸"){
    var Dif2ID = "なし"
    var DifID = "tongue_0002"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "スライム_胸"){
    var Dif2ID = "なし"
    var DifID = "slime_0001"
    var DifSE = "Slime01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "噴乳"){
    var Dif2ID = "なし"
    var DifID = "milk"
    var DifSE = "Splash01"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸撮影"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "胸注射"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var DifSE = "なし"//SE
    CUTINBASENUM = "breast"
    CUTINFILENUM = 1//ベースファイル開始番号
  }

//あそこ
  else if(EroCutinAddID == "膣触り"){
    var Dif2ID = "なし"
    var DifID = "0001"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "手マン"){
    var Dif2ID = "なし"
    var DifID = "0002"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "手マン潮吹き"){
    var Dif2ID = "なし"
    var DifID = "0003"
    var DifSE = "Spouts01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "抚摸阴部"){
    var Dif2ID = "なし"
    var DifID = "0017"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }  
  else if(EroCutinAddID == "繊毛触手_膣"){
    var Dif2ID = "なし"
    var DifID = "0011"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "イソギンチャク触手_膣"){
    var Dif2ID = "なし"
    var DifID = "0012"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "イソギンチャク触手_膣内"){
    var Dif2ID = "なし"
    var DifID = "0013"
    var DifSE = "Tentacle01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "デモンハンド膣"){
    var Dif2ID = "なし"
    var DifID = "0016"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "綱渡り"){
    var Dif2ID = "なし"
    var DifID = "0005"
    var DifSE = "TouchWet01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "電マ"){
    var Dif2ID = "なし"
    var DifID = "0004"
    var DifSE = "Vibe01"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }
  else if(EroCutinAddID == "舔逼"){
    var Dif2ID = "なし"
    var DifID = "tongue_0002"
    var DifSE = "なし"//SE
    CUTINBASENUM = "vagina"
    CUTINFILENUM = 1//ベースファイル開始番号
  }

  else if(EroCutinAddID == "タイツ"){
    var Dif2ID = "なし"
    var DifID = "なし"
    var DifSE = "Rustle01"//SE
    CUTINBASENUM = "tites"
    CUTINFILENUM = 1//ベースファイル開始番号
  }

//尻
else if(EroCutinAddID == "舔屁股"){
    var Dif2ID = "なし"
    var DifID = "tongue_0002"
    var DifSE = "なし"//SE
    CUTINBASENUM = "hip"
    CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻覗かれ"){
  var Dif2ID = "なし"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻触り"){
  var Dif2ID = "なし"
  var DifID = "handL"
  var DifSE = "HardTouch01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻触りダブル"){
  var Dif2ID = "なし"
  var DifID = "handLR"
  var DifSE = "HardTouch01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "尻穴責め"){
  var Dif2ID = "なし"
  var DifID = "handanus"
  var DifSE = "TouchAnus01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "イボ触手_尻"){
  var Dif2ID = "なし"
  var DifID = "tentacle_0001"
  var DifSE = "Tentacle01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "素股"){
  var Dif2ID = "なし"
  var DifID = "penis_0001"
  var DifSE = "Knead01"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "ローター"){
  var Dif2ID = "なし"
  var DifID = "rotor_0001"
  var DifSE = "なし"//SE
  CUTINBASENUM = "hip"
  CUTINFILENUM = 1//ベースファイル開始番号
}

//キス
else if(EroCutinAddID == "キス_人間" || EroCutinAddID == "キス"){
  var Dif2ID = "なし" 
  var DifID = "0001"
  var DifSE = "Kiss01"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "ベロチュー_人間" || EroCutinAddID == "キス"){
  var Dif2ID = "なし" 
  var DifID = "0003"
  var DifSE = "Kiss01"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "キス_人間_事後" || EroCutinAddID == "キス_事後"){
  var Dif2ID = "なし"
  var DifID = "0002"
  var DifSE = "なし"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "トマト"){
  var Dif2ID = "なし"
  var DifID = "0004"
  var DifSE = "なし"//SE
  CUTINBASENUM = "kiss"
  CUTINFILENUM = 4//ベースファイル開始番号
}

//手奉仕
else if(EroCutinAddID == "手奉仕_ペニスのみ"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 91//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_浅"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_中"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_深"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_人間_射精"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_浅"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_中"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_深"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_怪魔_射精"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}

else if(EroCutinAddID == "手奉仕_触手_浅"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_触手_中"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_触手_深"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "手奉仕_触手_射精"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "handjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}

//口奉仕

else if(EroCutinAddID == "口奉仕_人間_浅"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_人間_中"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_人間_深"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_人間_射精"){
  var Dif2ID = "penis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_浅"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_中"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_深"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_怪魔_射精"){
  var Dif2ID = "demonpenis_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_浅"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_中"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 4//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_深"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 7//ベースファイル開始番号
}
else if(EroCutinAddID == "口奉仕_触手_射精"){
  var Dif2ID = "tentacle_0001"
  var DifID = "なし"
  var DifSE = "なし"//SE
  var DifSemen = "Semen_0001"//汁
  CUTINBASENUM = "blowjob"
  CUTINFILENUM = 1//ベースファイル開始番号
}

//アクメ
else if(EroCutinAddID == "絶頂"){
  var Dif2ID = "なし"
  var DifID = "なし"
  var DifSE = "Spouts01"//SE
  CUTINBASENUM = "acme"
  CUTINFILENUM = 1//ベースファイル開始番号
}

//なしの場合
  else if(EroCutinAddID == "なし"){
    var Dif2ID = "なし"
    var DifID = "なし"
  }
  else{
    var DifID = "なし"
  }



//ベースファイル指定
var EyeFlag = 0;  //Expand2 k
var HairFlag = 0; //Expand5 k bl a
var BYTFlag = 0;  //Expand5 v h
var RingFlag = 0; //Expand2 b
var ScarFlag = 0; //Expand1 k b v h a
var PaintFlag = 0;//Expand3 b v h a
var EroFlag = 0;  //Expand4 k b v h a
var SemenFlag = 0;//Cutin1Semen1
  if(CUTINBASENUM == "kiss")
  {
  CUTINCLOTHFLAG = 0//衣装差分の有無
  CUTINTITESFLAG = 0//タイツ差分の有無
  CUTINOPTIONFLAG = 0//オプション差分の有無
  CUTINALTFLAG = 1//変身差分の有無
  ScarFlag = 1;
  EroFlag = 1;
  if($gameActors._data[1]._equips[9] && $gameActors._data[1]._equips[9]._itemId >= 5) EyeFlag = 1;
  HairFlag = 1;
  }
  else if(CUTINBASENUM == "breast")
  {
  CUTINCLOTHFLAG = 1
  if($gameActors._data[1]._equips[7]._itemId == 301) CUTINTITESFLAG = 1;
  else CUTINTITESFLAG = 0;
  CUTINOPTIONFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  if($gameActors._data[1]._equips[10] && $gameActors._data[1]._equips[10]._itemId >= 5) RingFlag = 1;
  }
  else if(CUTINBASENUM == "vagina")
  {
  CUTINCLOTHFLAG = 1
  CUTINTITESFLAG = 1
  CUTINOPTIONFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  SemenFlag = 1;
  BYTFlag = 1;
  }
  else if(CUTINBASENUM ==  "hip")
  {
  CUTINCLOTHFLAG = 1
  CUTINTITESFLAG = 1
  CUTINOPTIONFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  SemenFlag = 1;
  BYTFlag = 1;
  }
  else if(CUTINBASENUM == "handjob")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 0
  CUTINALTFLAG = 1
  }
  else if(CUTINBASENUM == "tites")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 0
  }
  else if(CUTINBASENUM == "blowjob")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 0
  HairFlag = 1
  CUTINALTFLAG = 1
  }
  else if(CUTINBASENUM == "acme")
  {
  CUTINCLOTHFLAG = 0
  CUTINTITESFLAG = 0
  CUTINOPTIONFLAG = 0
  CUTINALTFLAG = 1
  PaintFlag = 1;
  ScarFlag = 1;
  EroFlag = 1;
  HairFlag = 1;
  if($gameActors._data[1]._equips[10] && $gameActors._data[1]._equips[10]._itemId >= 5) RingFlag = 1;
  }
  else{{console.error(CUTINBASENUM + 'ベースファイル名未指定');}}; 

//SE演奏
  if (CutinSE == 1 && DifSE != "なし"){
    var seindex = $se_list.seID.indexOf(DifSE);
    if(seindex != -1){
      var file =  $se_list.File[seindex];
      AudioManager.playSe({name: file,volume: 90, pitch: 100, pan: 0})
    }else{}
  }

  EraceCutin1Base();
  EraceCutin1Cloth();
  EraceCutin1Semen1();
  EraceCutin1Dif1();
  EraceCutin1Dif2();
  EraceCutin1Option();
  EraceCutin1Tites();
  EraceCutin1Expand();

//後ろ(Dif2)
if(Dif2ID != "なし"){
  DIF2FILENAME = "actor01_cutin_" + CUTINBASENUM + "_h_" + Dif2ID//ファイル名
  var bitmap = ImageManager.loadPicture(DIF2FILENAME);//ファイル名
  var spriteDif2 = new Sprite(bitmap);//スプライト名
  SceneManager._scene._spriteset.addChild(spriteDif2); spriteDif2.x = Cutin1X; spriteDif2.y = Cutin1Y;//スプライト名
  SceneManager._scene.Cutin1Dif2 = spriteDif2;//シーン名、スプライト名
}


//素体表示(base、全裸の場合消去
if(CLOTHTAG == "Change" && CUTINALTFLAG >= 1){//変身中は素体ナンバー+1
  CUTINFILENUM += 1
};
if(CLOTHTAG == "DarkChange" && CUTINALTFLAG >= 1){
  CUTINFILENUM += 2
};
if(CUTINFILENUM >= 10){
  BASEFILENAME = "actor01_cutin_" + CUTINBASENUM + "_00" + CUTINFILENUM
}else{
  BASEFILENAME = "actor01_cutin_" + CUTINBASENUM + "_000" + CUTINFILENUM
}
var bitmap = ImageManager.loadPicture(BASEFILENAME);//ファイル名
var spriteBase = new Sprite(bitmap);//スプライト名
SceneManager._scene._spriteset.addChild(spriteBase); spriteBase.x = Cutin1X; spriteBase.y = Cutin1Y;//スプライト名
SceneManager._scene.Cutin1Base = spriteBase;//シーン名、スプライト名

//扩展
if(ScarFlag >= 1 && $gameActors.actor(1).isStateAffected(320)){//伤痕
   ExpandName1 = 'mark/' + "actor01_cutin_" + CUTINBASENUM + "_mark_8";
   var bitmap = ImageManager.loadPicture(ExpandName1);
   var spriteExpand1 = new Sprite(bitmap);
   SceneManager._scene._spriteset.addChild(spriteExpand1); spriteExpand1.x = Cutin1X; spriteExpand1.y = Cutin1Y;//スプライト名
   SceneManager._scene.Cutin1Expand1 = spriteExpand1;
}
if(!Nipple && RingFlag >= 1){//物件乳环
	var FileNamePierce = $dataArmors[$gameActors._data[1]._equips[10]._itemId].meta.FileNumPierce;
	ExpandName2 = 'nipple/' + "actor01_cutin_" + CUTINBASENUM + "_option_" + FileNamePierce;
	var bitmap = ImageManager.loadPicture(ExpandName2);
	var spriteExpand2 = new Sprite(bitmap);
	SceneManager._scene._spriteset.addChild(spriteExpand2); spriteExpand2.x = Cutin1X; spriteExpand2.y = Cutin1Y;
	SceneManager._scene.Cutin1Expand2 = spriteExpand2;
}
if(EyeFlag >= 1){//眼罩
	var FileNameEye = $dataArmors[$gameActors._data[1]._equips[9]._itemId].meta.FileNumEye;
	ExpandName2 = 'eye/' + "actor01_cutin_" + CUTINBASENUM + "_eye_" + FileNameEye;
	var bitmap = ImageManager.loadPicture(ExpandName2);
	var spriteExpand2 = new Sprite(bitmap);
	SceneManager._scene._spriteset.addChild(spriteExpand2); spriteExpand2.x = Cutin1X; spriteExpand2.y = Cutin1Y;
	SceneManager._scene.Cutin1Expand2 = spriteExpand2;
}
if(PaintFlag >= 1 && $gameVariables.value(4900) > 0){//涂鸦
	if($gameVariables.value(4900) <= 1){var PaintIndex = "11"}
	else if($gameVariables.value(4900) <= 2){var PaintIndex = "12"}
	else{var PaintIndex = "13"}
	ExpandName3 = 'mark/' + "actor01_cutin_" + CUTINBASENUM + "_mark_" + PaintIndex;
	var bitmap = ImageManager.loadPicture(ExpandName3);
	var spriteExpand3 = new Sprite(bitmap);
	SceneManager._scene._spriteset.addChild(spriteExpand3); spriteExpand3.x = Cutin1X; spriteExpand3.y = Cutin1Y;
	SceneManager._scene.Cutin1Expand3 = spriteExpand3;
}
if(EroFlag >= 1 && $gameVariables.value(1030) > 45 && ConfigManager.Erode){//侵蚀
   ExpandName4 = 'mark/' + "actor01_cutin_" + CUTINBASENUM + "_mark_9";
   var bitmap = ImageManager.loadPicture(ExpandName4);
   var spriteExpand4 = new Sprite(bitmap);
   SceneManager._scene._spriteset.addChild(spriteExpand4); spriteExpand4.x = Cutin1X; spriteExpand4.y = Cutin1Y;
   spriteExpand4.opacity = Math.min(($gameVariables.value(1030) - 45)*5,255);
   SceneManager._scene.Cutin1Expand4 = spriteExpand4;
}
if(HairFlag >= 1){//头发换色
	if(CUTINFILENUM >= 10) ExpandName5 = 'hair/' + "actor01_cutin_" + CUTINBASENUM + "_hair_" + "00" + CUTINFILENUM;
    else ExpandName5 = 'hair/' + "actor01_cutin_" + CUTINBASENUM + "_hair_" + "000" + CUTINFILENUM;
	var bitmap = ImageManager.loadPicture(ExpandName5);
	var spriteExpand5 = new Sprite(bitmap);
	SceneManager._scene._spriteset.addChild(spriteExpand5); spriteExpand5.x = Cutin1X; spriteExpand5.y = Cutin1Y;
	if(CLOTHTAG == "Change" && CUTINALTFLAG >= 1 && $gameActors.actor(1).hairToneb) spriteExpand5.setColorTone($gameActors.actor(1).hairToneb);
	else if($gameActors.actor(1).hairTone) spriteExpand5.setColorTone($gameActors.actor(1).hairTone);
	SceneManager._scene.Cutin1Expand5 = spriteExpand5;
}
  //オプション
if(CUTINOPTIONFLAG >= 1 && UNDERFLAG >= 1){//タイツオフ、下着オンかつ未返信
  var k = $gameActors._data[1]._equips[12]._itemId;
  if(k == 84 && ($gameActors.actor(1).isStateAffected(37) || $gameActors.actor(1).isStateAffected(38))) k++;
  var FileNameUnder = $dataArmors[k].meta.FileNumUnder;
  var UNDERFILENAME = 'under/' + "actor01_cutin_" + CUTINBASENUM + "_option_" + FileNameUnder
  var bitmap = ImageManager.loadPicture(UNDERFILENAME);//ファイル名
  var spriteOption = new Sprite(bitmap);//スプライト名
  SceneManager._scene._spriteset.addChild(spriteOption); spriteOption.x = Cutin1X; spriteOption.y = Cutin1Y;//スプライト名
  SceneManager._scene.Cutin1Option = spriteOption;//シーン名、スプライト名
}



//タイツ・足装備
if(CUTINTITESFLAG >= 1 && [300,301,307].includes($gameActors._data[1]._equips[EqLeg]._itemId) && ChangeFlag == false){//タイツフラグonかつ足装備ID300かつ未変身
  var LEGEQNUM = $gameActors._data[1]._equips[EqLeg]._itemId//足装備番号代入//黒タイツ以外たぶん落ちるので暫定的に↑でID300の場合のみにした
  var FileNameLeg = $dataArmors[LEGEQNUM].meta.FileNumOption//足装備のタグからファイル番号読み込み
  var LEGFILENAME = "actor01_cutin_" + CUTINBASENUM + "_option_" + FileNameLeg//ファイル名結合
  var bitmap = ImageManager.loadPicture(LEGFILENAME);//ファイル名
  var spriteTites = new Sprite(bitmap);//スプライト名
  SceneManager._scene._spriteset.addChild(spriteTites); spriteTites.x = Cutin1X; spriteTites.y = Cutin1Y;
  spriteTites.opacity = 230;//スプライト名
  SceneManager._scene.Cutin1Tites = spriteTites;//シーン名、スプライト名
}



  //衣装表示
if(EqNum >= 5 && CUTINCLOTHFLAG >= 1){//衣装フラグオンかつ5以上
  var CLOTHFILENAME = "actor01_cutin_" + CUTINBASENUM + "_cloth_" + FileNameCloth
  var bitmap = ImageManager.loadPicture(CLOTHFILENAME);//ファイル名
  var spriteCloth = new Sprite(bitmap);//スプライト名
  SceneManager._scene._spriteset.addChild(spriteCloth); spriteCloth.x = Cutin1X; spriteCloth.y = Cutin1Y;
  spriteCloth.opacity = $gameVariables.value(4964);
  SceneManager._scene.Cutin1Cloth = spriteCloth;//シーン名、スプライト名
}

if(Nipple && RingFlag >= 1){//物件乳环
	var FileNamePierce = $dataArmors[$gameActors._data[1]._equips[10]._itemId].meta.FileNumPierce
	ExpandName2 = 'nipple/' + "actor01_cutin_" + CUTINBASENUM + "_option_" + FileNamePierce + 'b';
	var bitmap = ImageManager.loadPicture(ExpandName2);
	var spriteExpand2 = new Sprite(bitmap);
	SceneManager._scene._spriteset.addChild(spriteExpand2); spriteExpand2.x = Cutin1X; spriteExpand2.y = Cutin1Y;
	SceneManager._scene.Cutin1Expand2 = spriteExpand2;
}

if(BYTFlag >= 1 && $gameSwitches.value(2910)){//避孕套
	ExpandName5 = 'BYT/' + CUTINBASENUM + "_" + $gameVariables.value(4888);
	var bitmap = ImageManager.loadPicture(ExpandName5);
	var spriteExpand5 = new Sprite(bitmap);
	SceneManager._scene._spriteset.addChild(spriteExpand5); spriteExpand5.x = Cutin1X; spriteExpand5.y = Cutin1Y;
	SceneManager._scene.Cutin1Expand5 = spriteExpand5;
}

//身上带的精液 
if(SemenFlag >= 1 && $gameVariables.value(942) > 0){
  SEMENFILENAME = "actor01_cutin_" + CUTINBASENUM + "_" + "Semen_0001"
  var bitmap = ImageManager.loadPicture(SEMENFILENAME);//ファイル名
  var spriteSemen1 = new Sprite(bitmap);//スプライト名
  SceneManager._scene._spriteset.addChild(spriteSemen1); spriteSemen1.x = Cutin1X; spriteSemen1.y = Cutin1Y;//スプライト名
  SceneManager._scene.Cutin1Semen1 = spriteSemen1;
}

//前
if(DifID != "なし"){
    DIFFILENAME = "actor01_cutin_" + CUTINBASENUM + "_h_" + DifID//ファイル名
    var bitmap = ImageManager.loadPicture(DIFFILENAME);//ファイル名
    var spriteDif1 = new Sprite(bitmap);//スプライト名
    SceneManager._scene._spriteset.addChild(spriteDif1); spriteDif1.x = Cutin1X; spriteDif1.y = Cutin1Y;//スプライト名
    SceneManager._scene.Cutin1Dif1 = spriteDif1;//シーン名、スプライト名
};

//发射的精液
if(DifSemen != "なし"){
  SEMENFILENAME = "actor01_cutin_" + CUTINBASENUM + "_" + DifSemen
  var bitmap = ImageManager.loadPicture(SEMENFILENAME);//ファイル名
  var spriteSemen1 = new Sprite(bitmap);//スプライト名
  SceneManager._scene._spriteset.addChild(spriteSemen1); spriteSemen1.x = Cutin1X; spriteSemen1.y = Cutin1Y;//スプライト名
  SceneManager._scene.Cutin1Semen1 = spriteSemen1;//シーン名、スプライト名
}
	
//アニメーション座標
var CutinAnimeX = 0 + Cutin1X
var CutinAnimeY = 0 + Cutin1Y
if (AnimeX != 0) CutinAnimeX += AnimeX;
if (AnimeY != 0) CutinAnimeY += AnimeY;

if (AnimeX != 0 || AnimeY != 0){

//番号、原点、X,Y,拡大、不透明、合成、移動ウェイト
//アニメウェイト
var AnimeWait = 10;

//動かす処理、スプライトに置き換える場合上部の処理変更
    if(SceneManager._scene.Cutin1Dif2){
      Torigoya.Tween.create(SceneManager._scene.Cutin1Dif2)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
      if(SceneManager._scene.Cutin1Base){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Base)
        .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
        .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
      if(SceneManager._scene.Cutin1Option){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Option)
        .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
        .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
      if(SceneManager._scene.Cutin1Tites){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Tites)
        .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
        .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
      if(SceneManager._scene.Cutin1Cloth){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Cloth)
        .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
        .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
      if(SceneManager._scene.Cutin1Dif1){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Dif1)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
      if(SceneManager._scene.Cutin1Semen1){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Semen1)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
	  if(SceneManager._scene.Cutin1Expand1){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Expand1)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
	  if(SceneManager._scene.Cutin1Expand2){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Expand2)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
	  if(SceneManager._scene.Cutin1Expand3){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Expand3)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
	  if(SceneManager._scene.Cutin1Expand4){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Expand4)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
	  if(SceneManager._scene.Cutin1Expand5){
        Torigoya.Tween.create(SceneManager._scene.Cutin1Expand5)
      .to({x: CutinAnimeX,y: CutinAnimeY},AnimeWait, Torigoya.Tween.Easing.easeOutSine)
      .to({x: Cutin1X,y: Cutin1Y},AnimeWait, Torigoya.Tween.Easing.easeOutSine).start()
      }
    }

//ライン2


$gameVariables._data[4869] = 0;
$gameSwitches._data[2919] = true;
this.wait(5);

//おわり
};





//消去コマンド
if (command === 'EraceCutin1' || command === 'eracecutin1') {//消去1
  EraceCutin1Base()
  EraceCutin1Cloth()
  EraceCutin1Semen1()
  EraceCutin1Dif1()
  EraceCutin1Dif2()
  EraceCutin1Option()
  EraceCutin1Tites()
  EraceCutin1Expand()
}
if (command === 'EraceCutin2' || command === 'eracecutin2') {
  EraceCutin2Base()
  EraceCutin2Cloth()
  EraceCutin2Semen1()
  EraceCutin2Dif1()
  EraceCutin2Dif2()
  EraceCutin2Option()
  EraceCutin2Tites()
}
if (command === 'EraceCutinAll' || command ==='eracecutinall') {//全消去
  EraceCutin1Base()
  EraceCutin1Cloth()
  EraceCutin1Semen1()
  EraceCutin1Dif1()
  EraceCutin1Dif2()
  EraceCutin1Option()
  EraceCutin1Tites()
  EraceCutin1Expand()
  EraceCutin2Base()
  EraceCutin2Cloth()
  EraceCutin2Semen1()
  EraceCutin2Dif1()
  EraceCutin2Dif2()
  EraceCutin2Option()
  EraceCutin2Tites()
  }
};



//消去用関数
function EraceCutin1Base() {
  if(SceneManager._scene.Cutin1Base) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Base)//シーン名変更
    SceneManager._scene.Cutin1Base = null;//シーン名変更
  }
};

function EraceCutin1Cloth() {
  if(SceneManager._scene.Cutin1Cloth) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Cloth)//シーン名変更
    SceneManager._scene.Cutin1Cloth = null;//シーン名変更
  }
};

function EraceCutin1Dif1() {
  if(SceneManager._scene.Cutin1Dif1) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Dif1)//シーン名変更
    SceneManager._scene.Cutin1Dif1 = null;//シーン名変更
  }
};

function EraceCutin1Dif2() {
  if(SceneManager._scene.Cutin1Dif2) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Dif2)//シーン名変更
    SceneManager._scene.Cutin1Dif2 = null;//シーン名変更
  }
};

function EraceCutin1Tites() {
  if(SceneManager._scene.Cutin1Tites) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Tites)//シーン名変更
    SceneManager._scene.Cutin1Tites = null;//シーン名変更
  }
};

function EraceCutin1Option() {
  if(SceneManager._scene.Cutin1Option) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Option)//シーン名変更
    SceneManager._scene.Cutin1Option = null;//シーン名変更
  }
};

function EraceCutin1Semen1() {
  if(SceneManager._scene.Cutin1Semen1) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Semen1)//シーン名変更
    SceneManager._scene.Cutin1Semen1 = null;//シーン名変更
  }
};

function EraceCutin1Expand() {
  if(SceneManager._scene.Cutin1Expand1) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Expand1);//シーン名変更
    SceneManager._scene.Cutin1Expand1 = null;//シーン名変更
  }
  if(SceneManager._scene.Cutin1Expand2) {
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Expand2);
    SceneManager._scene.Cutin1Expand2 = null;
  }
  if(SceneManager._scene.Cutin1Expand3) {
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Expand3);
    SceneManager._scene.Cutin1Expand3 = null;
  }
  if(SceneManager._scene.Cutin1Expand4) {
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Expand4);
    SceneManager._scene.Cutin1Expand4 = null;
  }
  if(SceneManager._scene.Cutin1Expand5) {
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin1Expand5);
    SceneManager._scene.Cutin1Expand5 = null;
  }
};

//カットイン2
function EraceCutin2Base() {
  if(SceneManager._scene.Cutin2Base) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin2Base)//シーン名変更
    SceneManager._scene.Cutin2Base = null;//シーン名変更
  }
};

function EraceCutin2Cloth() {
  if(SceneManager._scene.Cutin2Cloth) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin2Cloth)//シーン名変更
    SceneManager._scene.Cutin2Cloth = null;//シーン名変更
  }
};

function EraceCutin2Dif1() {
  if(SceneManager._scene.Cutin2Dif1) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin2Dif1)//シーン名変更
    SceneManager._scene.Cutin2Dif1 = null;//シーン名変更
  }
};

function EraceCutin2Dif2() {
  if(SceneManager._scene.Cutin2Dif2) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin2Dif2)//シーン名変更
    SceneManager._scene.Cutin2Dif2 = null;//シーン名変更
  }
};

function EraceCutin2Option() {
  if(SceneManager._scene.Cutin2Option) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin2Option)//シーン名変更
    SceneManager._scene.Cutin2Option = null;//シーン名変更
  }
};

function EraceCutin2Tites() {
  if(SceneManager._scene.Cutin2Tites) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin2Tites)//シーン名変更
    SceneManager._scene.Cutin2Tites = null;//シーン名変更
  }
};

function EraceCutin2Semen1() {
  if(SceneManager._scene.Cutin2Semen1) {//既に表示がある場合消す処理//シーン名変更
    SceneManager._scene._spriteset.removeChild(SceneManager._scene.Cutin2Semen1)//シーン名変更
    SceneManager._scene.Cutin2Semen1 = null;//シーン名変更
  }
};


})();