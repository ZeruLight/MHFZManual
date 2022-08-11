var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// JavaScript Document
window.fnc = window.fnc || {};
window.fnc.docwrite = window.fnc.docwrite || function (v){'use strict'; document.write(v);};
window.member.xhrSrc = (window.member.xhrSrc instanceof Array)?window.member.xhrSrc:[]; //外部ファイル読み込み定義用Array

window.env = window.env || {}; //環境情報

if (!window.env.isConsole) {
	var _dw = '';
	_dw += '<script type="text/javascript" src="js/libs/jquery.1.7.2.min.js"></script>';
	_dw += '<script type="text/javascript" src="js/libs/jquery.colorbox-min.js"></script>';
	_dw += '<script type="text/javascript" src="js/run.js"></script>';
	_dw += '<link href="css/colorbox.css" rel="stylesheet" type="text/css">';
	window.fnc.docwrite(_dw);
}

var toggleMenu;
var _hrefs = location.href.split('/');
var _crr = '/' + _hrefs.pop(); _crr = (_crr === '/')?'/index.html':_crr;

window.member.xhrSrc.push({file:'bnr.html', id:'bnrArea'});
if (_crr !== '/menu.html') {window.member.xhrSrc.push({file:'menu.html', id:'menuArea'});}

var InitMenu = function() {
	'use strict';
	var head_img = 'head_pc.jpg';
	switch (window.env.crrDom) {
		case 'ps4':
			head_img = 'head_ps4.jpg';
			document.getElementById('footer').className = 'ps4Only';
			break;

		case 'ps3':
			head_img = 'head_ps3.jpg';
			document.getElementById('footer').className = 'ps3Only';
			break;

		case 'psv':
			head_img = 'head_psvita.jpg';
			document.getElementById('footer').className = 'psvOnly';
			if (window.env.isPSVCon) {
				document.getElementsByTagName('body')[0].id = 'psvita';
			}
			break;

		case 'wiiu':
			head_img = 'head_wiiu.jpg';
			break;

		case 'xbox':
			head_img = 'head_xbox.jpg';
			break;

		case 'cog':
		case 'hangame':
		case 'dmm':
			//
			break;
	}
	document.getElementById('head').getElementsByTagName('h1')[0].getElementsByTagName('img')[0].src = 'img/' + head_img;
	//
	if (window.env.isConsole) {
		toggleMenu = function(elment){
			var _p = elment.parentNode;
			var isClosed = (_p.className !== 'current');
			var _li = document.getElementById('l_menu').getElementsByTagName('li');
			for(var i = 0; i < _li.length; i++) {
				if (_li[i].parentNode.parentNode.className !== 'sub') {
					_li[i].className = '';
				}
			}
			if (isClosed) {
				_p.className = 'current';
			}
		};
	} else {
		toggleMenu = function(elment){
			var _me = $(elment);
			var _p = _me.parent();
			var isClosed = !(_p.hasClass('crr'));
			$('#l_menu>li').removeClass('crr');
			if (isClosed) {
				_p.addClass('crr');
			}
			$('#l_menu .sub').each(function(){
				$(this).stop();
				if ($(this).parent().attr('id') === _p.attr('id')) {
					$(this).toggle(200);
				} else {
					$(this).hide(200);
				}
			});

		};
	}
	//
  /* Hardcoded
	var _as = document.getElementById('l_menu').getElementsByTagName('a');

	for (var i = 0; i < _as.length; i++) {
		if (_as[i].href.indexOf(_crr) !== -1) {
			var crr_li = _as[i].parentNode;
			crr_li.className = 'current';
			if (crr_li.parentNode.parentNode.className === 'sub') {
				crr_li.parentNode.parentNode.parentNode.className = 'current crr';
			}
		}

		if (_as[i].className === 'btn') {
			_as[i].href = 'javascript:void(0);';
			_as[i].setAttribute('onclick', 'toggleMenu(this);');
		}

	}
  */

	InitMenu = null;
};

if (window.env.isConsole) {
	window.onload = InitMenu;
} else {
	if(document.addEventListener) {
		document.addEventListener( 'DOMContentLoaded', InitMenu, false );
	} else if(document.attachEvent) {
		var CheckReadyState = function(){
			'use strict';
			if(document.readyState === 'complete') {
				document.detachEvent( 'onreadystatechange', CheckReadyState );
				InitMenu();
			}
		};

		document.attachEvent( 'onreadystatechange', CheckReadyState );
		(function() {
			'use strict';
			try{
				document.documentElement.doScroll( 'left' );
			} catch(e){
				setTimeout(arguments.callee, 1);
				return;
			}
			document.detachEvent( 'onreadystatechange', CheckReadyState );
			InitMenu();
		})();
	} else {
		InitMenu();
	}
}
}
