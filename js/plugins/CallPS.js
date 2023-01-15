(function(){
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallProstitute') {

      var PSID = 0
        if (args[0].match(/\\v/)) {
          
          //args[1]に\vを含む場合の処理
          array = args[0].match(/[0-9]+\.?[0-9]*/g);
          for(var i = 0; i < array.length; i++) {
            args[0] = Number(array);
            var PSID = $gameVariables.value(args[0]);
          }
        }else{
          var PSID = Number(args[0])
        }
              
        var MessagePT = args[1];
        console.log(args[0])
        console.log(PSID)
        console.log(MessagePT)
        var PSMS = $psmessage[PSID][MessagePT]
        
        if(PSMS == "なし"){
            //処理スキップ
        }else if(PSMS) TickerManager.show(`\\i[892]\\C[27]${PSMS}`);

      } 
    }
  })();