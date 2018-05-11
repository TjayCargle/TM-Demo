//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Visual tp Gauge
// YEP_X_VisualtpGauge.js
//=============================================================================
 
var Imported = Imported || {};
Imported.YEP_X_VisualtpGauge = true;
 
var Yanfly = Yanfly || {};
Yanfly.VTG = Yanfly.VTG || {};
 
//=============================================================================
 /*:
 * @plugindesc v1.03 (Requires YEP_BattleEngineCore.js) Reveal tp Gauges
 * when a battler is selected or takes damage in battle.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Display Actor
 * @desc Do you wish to display the tp Gauge for actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Defeat First
 * @desc Enemies must be defeated first before showing the tp Gauge.
 * NO - false     YES - true
 * @default false
 *
 * @param Always Visible
 * @desc tp Gauge is always visible and doesn't fade away.
 * NO - false     YES - true
 * @default false
 *
 * @param ---Appearance---
 * @default
 *
 * @param Minimum Gauge Width
 * @desc This is the minimum width in pixels for tp Gauges.
 * @default 144
 *
 * @param Gauge Height
 * @desc This is the height in pixels for tp Gauges.
 * @default 18
 *
 * @param Back Color
 * @desc This is the text color used for the back of tp Gauges.
 * @default 19
 *
 * @param tp Color 1
 * @desc This is the text color used for the 1st part of tp Gauges.
 * @default 20
 *
 * @param tp Color 2
 * @desc This is the text color used for the 2nd part of tp Gauges.
 * @default 21
 *
 * @param Gauge Duration
 * @desc This is the frames the tp gauge will continue to show after
 * it finishes draining or filling.
 * @default 30
 *
 * @param Gauge Position
 * @desc Where do you wish to show the tp gauge?
 * BELOW - false     ABOVE - true
 * @default false
 *
 * @param Y Buffer
 * @desc How much do you wish to shift the gauge Y position?
 * @default -16
 *
 * @param Use Thick Gauges
 * @desc Use the thick gauges provided by this plugin?
 * Default - false     Thick - true
 * @default true
 *
 * @param ---Text Display---
 * @default
 *
 * @param Show tp
 * @desc Show the actual 'tp' text.
 * NO - false     YES - true
 * @default false
 *
 * @param Show Value
 * @desc Show the tp value.
 * NO - false     YES - true
 * @default false
 *
 * @param Show Max
 * @desc Show the Maxtp value if value is shown?
 * NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BattleEngineCore.
 * Make sure this plugin is located under YEP_BattleEngineCore in the plugin
 * list.
 *
 * This plugin shows the tp Gauges of enemies as they're selected or while they
 * take damage. You can also opt for actors to show their tp Gauge as well.
 * Adjust the parameters to change the way you want the tp Gauges to appear.
 *
 * By default, enemies would need to be defeated first in order for the gauges
 * to show up. This can be changed within the parameter settings. However,
 * during battle test, the tp gauges are always shown unless the enemy has a
 * hidden tp gauge.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Class and Enemy Notetags:
 *   <Hide tp Gauge>
 *   This tp gauge will always be hidden if this notetag is present.
 *
 *   <Show tp Gauge>
 *   This tp gauge will always be shown if this notetag is present while the
 *   target is selected or taking damage.
 *
 *   <tp Gauge Width: x>
 *   This will set the battler's tp Gauge width to x pixels. However, if this
 *   width is less than the minimum width, minimum width will take priority.
 *
 *   <tp Gauge Height: x>
 *   This set's the tp Gauge height to x pixels.
 *
 *   <tp Gauge Back Color: x>
 *   This changes the tp Gauge's back color to x text color.
 *
 *   <tp Gauge Color 1: x>
 *   This changes the tp Gauge's color 1 to x text color.
 *
 *   <tp Gauge Color 2: x>
 *   This changes the tp Gauge's color 2 to x text color.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Fixed a bug when Escape skill-effects are used on battlers.
 *
 * Version 1.02:
 * - Fixed a bug with gauge height not adjusting.
 *
 * Version 1.01b:
 * - Fixed a bug regarding dependancy checks.
 * - Fixed many bugs regarding stacking errors.
 *
 * Version 1.01:
 * - Rewrote the good majority of plugin to accomodate the following features:
 * ---'Always Visible' parameter.
 * ---'Gauge Position' parameter.
 * ---'Y Buffer' parameter.
 * ---'Use Thick Gauges' parameter.
 * ---'Show tp' parameter.
 * ---'Show Value' parameter.
 * ---'Show Max' parameter.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================
 
if (Imported.YEP_BattleEngineCore) {
 
//=============================================================================
// Parameter Variables
//=============================================================================
 
Yanfly.Parameters = PluginManager.parameters('YEP_X_VisualtpGauge');
Yanfly.Param = Yanfly.Param || {};
 
Yanfly.Param.VTGDisplayActor = String(Yanfly.Parameters['Display Actor']);
Yanfly.Param.VTGDefeatFirst = String(Yanfly.Parameters['Defeat First']);
Yanfly.Param.VTGAlwaysShow = eval(String(Yanfly.Parameters['Always Visible']));
 
Yanfly.Param.VTGMintpWidth = Number(Yanfly.Parameters['Minimum Gauge Width']);
Yanfly.Param.VTGGaugeHeight = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.VTGBackColor = Number(Yanfly.Parameters['Back Color']);
Yanfly.Param.VTGtpColor1 = Number(Yanfly.Parameters['tp Color 1']);
Yanfly.Param.VTGtpColor2 = Number(Yanfly.Parameters['tp Color 2']);
Yanfly.Param.VTGGaugeDuration = Number(Yanfly.Parameters['Gauge Duration']);
Yanfly.Param.VTGGaugePos = eval(String(Yanfly.Parameters['Gauge Position']));
Yanfly.Param.VTGBufferY = Number(Yanfly.Parameters['Y Buffer']);
Yanfly.Param.VTGThick = eval(String(Yanfly.Parameters['Use Thick Gauges']));
 
Yanfly.Param.VTGShowtp = eval(String(Yanfly.Parameters['Show tp']));
Yanfly.Param.VTGShowValue = eval(String(Yanfly.Parameters['Show Value']));
Yanfly.Param.VTGShowMax = eval(String(Yanfly.Parameters['Show Max']));
 
//=============================================================================
// DataManager
//=============================================================================
 
Yanfly.VTG.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.VTG.DataManager_isDatabaseLoaded.call(this)) return false;
        this.processVTGNotetags($dataClasses);
        this.processVTGNotetags($dataEnemies);
        return true;
};
 
DataManager.processVTGNotetags = function(group) {
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);
 
    obj.hidetpGauge = false;
        obj.showtpGauge = false;
        obj.tpGaugeWidth = 100;
        obj.tpGaugeHeight = Yanfly.Param.VTGGaugeHeight;
        obj.tpGaugeBackColor = Yanfly.Param.VTGBackColor;
        obj.tpGaugeColor1 = Yanfly.Param.VTGtpColor1;
        obj.tpGaugeColor2 = Yanfly.Param.VTGtpColor2;
 
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:HIDE tp GAUGE)>/i)) {
                obj.hidetpGauge = true;
            } else if (line.match(/<(?:SHOW tp GAUGE)>/i)) {
                obj.showtpGauge = true;
            } else if (line.match(/<(?:tp GAUGE WIDTH):[ ](\d+)>/i)) {
                obj.tpGaugeWidth = parseInt(RegExp.$1);
            } else if (line.match(/<(?:tp GAUGE HEIGHT):[ ](\d+)>/i)) {
                obj.tpGaugeHeight = parseInt(RegExp.$1);
            } else if (line.match(/<(?:tp GAUGE BACK COLOR):[ ](\d+)>/i)) {
                obj.tpGaugeBackColor = parseInt(RegExp.$1);
            } else if (line.match(/<(?:tp GAUGE COLOR 1):[ ](\d+)>/i)) {
                obj.tpGaugeColor1 = parseInt(RegExp.$1);
            } else if (line.match(/<(?:tp GAUGE COLOR 2):[ ](\d+)>/i)) {
                obj.tpGaugeColor2 = parseInt(RegExp.$1);
            }
        }
    }
};
 
//=============================================================================
// Game_System
//=============================================================================
 
Yanfly.VTG.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.VTG.Game_System_initialize.call(this);
        this.initShowntpGauge();
};
 
Game_System.prototype.initShowntpGauge = function() {
    this._showntpGauge = [];
};
 
Game_System.prototype.showtpGaugeEnemy = function(id) {
    if (this._showntpGauge === undefined) this.initShowntpGauge();
        if (!eval(Yanfly.Param.VTGDefeatFirst)) return true;
        return this._showntpGauge.contains(id);
};
 
Game_System.prototype.addtpGaugeEnemy = function(id) {
    if (this._showntpGauge === undefined) this.initShowntpGauge();
        if (this._showntpGauge.contains(id)) return;
        this._showntpGauge.push(id);
};
 
//=============================================================================
// Game_Battler
//=============================================================================
 
Game_Battler.prototype.tpGaugeVisible = function() {
        if (this._notpGauge) return false;
    if (this.isHidden()) return false;
        return true;
};
 
Game_Battler.prototype.tpGaugeWidth = function() {
        var width = 100;
        return (width & 1) ? width + 1 : width;
};
 
Game_Battler.prototype.tpGaugeHeight = function() {
        return Yanfly.Param.VTGGaugeHeight;
};
 
Game_Battler.prototype.tpGaugeBackColor = function() {
        return Yanfly.Param.VTGBackColor;
};
 
Game_Battler.prototype.tpGaugeColor1 = function() {
        return Yanfly.Param.VTGtpColor1;
};
 
Game_Battler.prototype.tpGaugeColor2 = function() {
        return Yanfly.Param.VTGtpColor2;
};
 
//=============================================================================
// Game_Actor
//=============================================================================
 
Game_Actor.prototype.tpGaugeVisible = function() {
    if (this.isHidden()) return false;
        if (this.currentClass().showtpGauge) return true;
        if (!eval(Yanfly.Param.VTGDisplayActor)) return false;
        if (this.currentClass().hidetpGauge) return false;
        return Game_Battler.prototype.tpGaugeVisible.call(this);
};
 
Game_Actor.prototype.tpGaugeWidth = function() {
   
        width = 100;
        return (width & 1) ? width + 1 : width;
};
 
Game_Actor.prototype.tpGaugeHeight = function() {
        return this.currentClass().tpGaugeHeight;
};
 
Game_Actor.prototype.tpGaugeBackColor = function() {
        return this.currentClass().tpGaugeBackColor;
};
 
Game_Actor.prototype.tpGaugeColor1 = function() {
        return this.currentClass().tpGaugeColor1;
};
 
Game_Actor.prototype.tpGaugeColor2 = function() {
        return this.currentClass().tpGaugeColor2;
};
 
//=============================================================================
// Game_Enemy
//=============================================================================
 
Game_Enemy.prototype.tpGaugeVisible = function() {
    if (this.isHidden()) return false;
        if (this.enemy().hidetpGauge) return false;
    if (BattleManager.isBattleTest()) return true;
        if (this.enemy().showtpGauge) return true;
        if (!$gameSystem.showtpGaugeEnemy(this._enemyId)) return false;
        return Game_Battler.prototype.tpGaugeVisible.call(this);
};
 

 
Game_Enemy.prototype.tpGaugeWidth = function() {
    
        width = 100
        return (width & 1) ? width + 1 : width;
};
 
Game_Enemy.prototype.tpGaugeHeight = function() {
        return this.enemy().tpGaugeHeight;
};
 
Game_Enemy.prototype.tpGaugeBackColor = function() {
        return this.enemy().tpGaugeBackColor;
};
 
Game_Enemy.prototype.tpGaugeColor1 = function() {
        return this.enemy().tpGaugeColor1;
};
 
Game_Enemy.prototype.tpGaugeColor2 = function() {
        return this.enemy().tpGaugeColor2;
};
 
//=============================================================================
// Sprite_Battler
//=============================================================================
 
Yanfly.VTG.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.VTG.Sprite_Battler_update.call(this);
    this.createVisualtpGaugeWindow();
};
 
Sprite_Battler.prototype.createVisualtpGaugeWindow = function() {
        if (this._createdVisualtpGaugeWindow) return;
        if (!this._battler) return;
        if (this.checkVisualATBGauge()) {
            if (!this._visualATBWindow) return;
            if (!this.parent.parent.children.contains(this._visualATBWindow)) return;
        }
        this._createdVisualtpGaugeWindow = true;
    this._visualtpGauge = new Window_VisualtpGauge();
    this._visualtpGauge.setBattler(this._battler);
    this.parent.parent.addChild(this._visualtpGauge);
};
 
Sprite_Battler.prototype.checkVisualATBGauge = function() {
    if (!Imported.YEP_X_BattleSysATB) return false;
    if (!BattleManager.isATB()) return false;
    if (!Imported.YEP_X_VisualATBGauge) return false;
    return this._battler.isEnemy();
};
 
Yanfly.VTG.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Yanfly.VTG.Sprite_Battler_setBattler.call(this, battler);
    if (this._visualtpGauge) this._visualtpGauge.setBattler(battler);
};
 
//=============================================================================
// Window_VisualtpGauge
//=============================================================================
 
function Window_VisualtpGauge() {
    this.initialize.apply(this, arguments);
}
 
Window_VisualtpGauge.prototype = Object.create(Window_Base.prototype);
Window_VisualtpGauge.prototype.constructor = Window_VisualtpGauge;
 
Window_VisualtpGauge.prototype.initialize = function() {
    this._opacitySpeed = 255 / Yanfly.Param.VTGGaugeDuration;
    this._dropSpeed = 0;
    this._visibleCounter = 0;
    Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
    this._battler = null;
    this._requestRefresh = false;
    this._currenttpValue = 0;
    this._displayedValue = 0;
    this.contentsOpacity = 0;
    this.opacity = 0;
};
 
Window_VisualtpGauge.prototype.setBattler = function(battler) {
    if (this._battler === battler) return;
    this._battler = battler;
    this._currenttpValue = this._battler ? this._battler.tp : 0;
    this._displayedValue = this._battler ? this._battler.tp : 0;
};
 
Window_VisualtpGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._battler) return;
    this.updateWindowAspects();
};
 
Window_VisualtpGauge.prototype.updateWindowAspects = function() {
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updatetpPosition();
    this.updateRefresh();
};
 
Window_VisualtpGauge.prototype.updateWindowSize = function() {
    var spriteWidth = this._battler.tpGaugeWidth();
    var width = spriteWidth + this.standardPadding() * 2;
    var height = Math.max(this.lineHeight(), this.gaugeHeight() + 4);
    height += this.standardPadding() * 2;
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.createContents();
    this._requestRefresh = true;
};
 
Window_VisualtpGauge.prototype.updateWindowPosition = function() {
    if (!this._battler) return;
    var battler = this._battler;
    this.x = battler.spritePosX();
    this.x -= Math.ceil(this.width / 2);
    this.y = battler.spritePosY();
    if (Yanfly.Param.VTGGaugePos) {
      this.y -= battler.spriteHeight();
    } else {
      this.y -= this.standardPadding();
    }
    this.y += Yanfly.Param.VTGBufferY;
};
 
Window_VisualtpGauge.prototype.updateOpacity = function() {
    if (this.isShowWindow()) {
      this.contentsOpacity += 32;
    } else {
      this.contentsOpacity -= 32;
    }
};
 
Window_VisualtpGauge.prototype.isShowWindow = function() {
    if (!this._battler.isAppeared()) return false;
    if (!this._battler.tpGaugeVisible()) return false;
    if (Yanfly.Param.VTGAlwaysShow && !this._battler.isDead()) return true;
    if (this._currenttpValue !== this._displayedValue) return true;
    if (this._battler.isSelected()) return true;
    --this._visibleCounter;
    return this._visibleCounter > 0;
};
 
Window_VisualtpGauge.prototype.updatetpPosition = function() {
    if (!this._battler) return;
    if (this._currenttpValue !== this._battler.tp) {
      this._visibleCounter = Yanfly.Param.VTGGaugeDuration;
      this._currenttpValue = this._battler.tp;
      var difference = Math.abs(this._displayedValue - this._battler.tp);
      this._dropSpeed = Math.ceil(difference / Yanfly.Param.VTGGaugeDuration);
    }
    this.updateDisplayCounter();
};
 
Window_VisualtpGauge.prototype.updateDisplayCounter = function() {
    if (this._currenttpValue == this._displayedValue) return;
    var d = this._dropSpeed;
    var c = this._currenttpValue;
    if (this._displayedValue > this._currenttpValue) {
      this._displayedValue = Math.max(this._displayedValue - d, c);
    } else if (this._displayedValue < this._currenttpValue) {
      this._displayedValue = Math.min(this._displayedValue + d, c);
    }
    this._requestRefresh = true;
};
 
Window_VisualtpGauge.prototype.updateRefresh = function() {
    if (this._requestRefresh) this.refresh();
};
 
Window_VisualtpGauge.prototype.refresh = function() {
    this.contents.clear();
    if (!this._battler) return;
    this._requestRefresh = false;
    var wy = this.contents.height - this.lineHeight();
    var ww = this.contents.width;
    this.drawActortp(this._battler, 0, wy, ww);
};
 
Window_VisualtpGauge.prototype.gaugeBackColor = function() {
    return this.textColor(this._battler.tpGaugeBackColor());
};
 
Window_VisualtpGauge.prototype.tpGaugeColor1 = function() {
    return this.textColor(this._battler.tpGaugeColor1());
};
 
Window_VisualtpGauge.prototype.tpGaugeColor2 = function() {
    return this.textColor(this._battler.tpGaugeColor2());
};
 
Window_VisualtpGauge.prototype.drawActortp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    var rate = this._displayedValue / 100;
    this.drawGauge(x, y, width, rate, color1, color2);
    if (Yanfly.Param.VTGShowtp) {
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.tpA, x, y, 44);
    }
    if (Yanfly.Param.VTGShowValue) {
      var val = this._displayedValue
      var max = 100;
      var w = width;
      var color = this.tpColor(actor);
      this.drawCurrentAndMax(val, max, x, y, w, color, this.normalColor());
    }
};
 
Window_VisualtpGauge.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    if (Yanfly.Param.VTGShowMax) {
      Window_Base.prototype.drawCurrentAndMax.call(this, current, max,
        x, y, width, color1, color2);
    } else {
      var align = Yanfly.Param.VTGShowtp ? 'right' : 'center';
      var text = Yanfly.Util.toGroup(current);
      this.changeTextColor(color1);
      this.drawText(text, x, y, width, align);
    }
};
 
Window_VisualtpGauge.prototype.gaugeHeight = function() {
    if (!this._battler) return Window_Base.prototype.gaugeHeight.call(this);
    return this._battler.tpGaugeHeight();
};
 
if (Imported.YEP_CoreEngine && Yanfly.Param.VTGThick) {
 
Window_VisualtpGauge.prototype.drawGauge =
function(dx, dy, dw, rate, color1, color2) {
    var color3 = this.gaugeBackColor();
    var fillW = Math.floor(dw * rate).clamp(0, dw);
    var gaugeH = this.gaugeHeight();
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    if (eval(Yanfly.Param.GaugeOutline)) {
      color3.paintOpacity = this.translucentOpacity();
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
      dx += 2;
      gaugeY += 2;
      fillW = Math.max(0, fillW - 4);
      gaugeH -= 4;
    } else {
      var fillW = Math.floor(dw * rate);
      var gaugeY = dy + this.lineHeight() - gaugeH - 2;
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    }
    this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};
 
} // Imported.YEP_CoreEngine
 
//=============================================================================
// Utilities
//=============================================================================
 
Yanfly.Util = Yanfly.Util || {};
 
if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};
 
//=============================================================================
// End of File
//=============================================================================
};