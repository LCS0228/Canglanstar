/*---------------------------------------------------------------------------*
 * 2020/01/7 shimo8
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 快感値計算機
 * @author しもや
 * @help
 * ・プラグインコマンド
 *   extaCul 部位ID 行為補正 威力補正
 */



(function(){
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);
      if (command === 'extaCul') {
            //プラグイン値
            var extaType = args[0]
            //args[1]行為による補正
            if(args[1] != null){
                var PlayCorrect = Number(args[1])
            }else{var PlayCorrect = 1};
            //args[2]すごい威力補正
            if(args[2] != null){
                if (args[2].match(/\\v/)) {//変数を含む場合の処理
                    array = args[2].match(/[0-9]+\.?[0-9]*/g);
                    for(var i = 0; i < array.length; i++) {//戦闘の場合自動加算したい？
                        args[2] = Number(array);
                        var AeroTechnic = $gameVariables.value(args[2]);
                    }
                }else{
                    var AeroTechnic = Number(args[1])
                }
            }else{var AeroTechnic = 1};

            //各パラメータ定義
            var extaPointTotal = 0//最終合計値
            var CulextaPoint = 0 //計算合計値
            var CulextaPointB = 0 //補正計算値
            var Etrust = $gameVariables.value(1027) //現在余情値 
            var AddEtrust  = 0//余情値加算用
            var extaPart = 0 //部位感度(開発度)
            var Critical = 0 //部位の基礎クリティカル率
            var Baseexta = 0 //部位の基礎感度
            var CrPointBase = 0//クリティカル加算値
            var CrCorrect = 30//クリティカル補正値(パーセント)
            var RangeNum = 20//乱数範囲

            //開発度代入基礎感度は　行為判定にしてしまう？
            if(extaType == "mo"){
                extaPart = $gameVariables.value(1102)
                Critical = 0
                Baseexta = 0
            }
            else if(extaType == "ninpo"){
                extaPart = $gameVariables.value(1103)
                Critical = 5
                Baseexta = 2
            }
            else if(extaType == "Lit"){
                extaPart = $gameVariables.value(1104)
                Critical = 10
                Baseexta = 4
            }
            else if(extaType == "va"){
                extaPart = $gameVariables.value(1106)
                Critical = 10
                Baseexta = 3
            }
            else if(extaType == "An"){
                extaPart = $gameVariables.value(1105)
                Critical = 5
                Baseexta = 1
            }
            else if(extaType == "Hip"){
                extaPart = $gameVariables.value(1105)
                Critical = 0
                Baseexta = 0
            }
            else if(extaType == "Shame"){
                extaPart = $gameVariables.value(1110)
                Critical = 0
                Baseexta = 0
            }
            else if(extaType == "sem"){
                extaPart = $gameVariables.value(1111)
                Critical = 0
                Baseexta = 0
            }
            else if(extaType == "Miso"){
                extaPart = $gameVariables.value(1112)
                Critical = 0
                Baseexta = 0
            }
            else if(extaType == "Service"){
                extaPart = $gameVariables.value(1113)
                Critical = 0
                Baseexta = 0
            }
            else if(extaType == "Pert"){
                extaPart = $gameVariables.value(1114)
                Critical = 0
                Baseexta = 0
            }
            else if(extaType == "Direct"){
                    extaPart = 0
                    Critical = 0
                    Baseexta = 0
            }else{
                extaPart = 0
                Critical = 0
                Baseexta = 0
                {console.error('部位未入力もしくは記述ミス');}
            }



            //行為による快感補正が足りない？
            //計算開始
            CulextaPoint += Baseexta //基礎感度を加算
            CulextaPoint += extaPart //部位感度を加算
            CulextaPointB += PlayCorrect //部位感度を加算
            CulextaPointB += AeroTechnic //部位感度を加算
            CulextaPoint *= CulextaPointB
            if(extaType == "Direct"){CulextaPoint = AeroTechnic}//ダイレクトの場合、すごい威力そのまま入力



            //余情補正 余情値パーセント分の快感度を加算
            AddEtrust = CulextaPoint
            AddEtrust *= Etrust
            AddEtrust /= 100//係数  

            //クリティカル計算
            var CriticalPart = extaPart * 5
            Critical += CriticalPart////部位感度の5倍の値を基本値に加算
            Critical += AeroTechnic//すごい威力補正加算
            var CriticalRandom = Math.floor(Math.random() * (101-1)+1);//1-100のランダム値
                if (Critical >= CriticalRandom) {//割合加算
                CrPointBase = CulextaPoint
                CrPointBase *= CrCorrect
                CrPointBase /= 100
                $gameVariables._data[2980] = '敏感状态'
                this.setupChild($dataCommonEvents[97].list, 0)
                $gameScreen.startFlash([255,255,255,100], 20)
                }
                






            //補正値加算
            CulextaPoint += AddEtrust //余情加算
            CulextaPoint += CrPointBase //クリティカル加算

            //範囲乱数化
            var BaseNum = CulextaPoint
            var Cul = 0
            BaseNum *= RangeNum
            BaseNum /= 100
            max = BaseNum;
            var RangeRandom = Math.floor( Math.random() * max ) ;
            Cul = RangeRandom
            if (Math.random() > 0.5){//加算か減算ランダム
                CulextaPoint += Cul;
            }else{
                CulextaPoint -= Cul;
            }

            //最終値を加算
            extaPointTotal = Math.floor(CulextaPoint)
            $gameVariables._data[2026] = $gameVariables.value(2026) + extaPointTotal
            $gameVariables._data[4992] = extaPointTotal


            //拘束中の場合、拘束中快感に加算
            $gameVariables._data[414] = $gameVariables.value(414) + extaPointTotal
        }
    }
})();