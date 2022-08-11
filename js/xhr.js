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

/*
* このスクリプト（xhr.js）使い方
* このスクリプトは init.js が必要です。
例：
<html>
	<head>
		<script type="text/javascript" src="/js/init.js"></script>
	</head>

	<body>


	<script type="text/javascript" src="/js/xhr.js"></script>
	</body>
</html>

*読み込むファイル(file)と流し込み先の要素のID(id)、要素取り出し用の区切り文字(delim)の3項目を以下のように window.member.xhrSrc に登録してください。
*要素取り出し用の区切り文字(delim)は省略可能です。省略時は'<!--###content###-->'になります。
例：
<script type="text/javascript">
//xhr.js 用設定
window.member.xhrSrc.push({file:'xhr1.html', id:'xhr1', delim:'<!--###src_content###-->'});
window.member.xhrSrc.push({file:'xhr2.html', id:'xhr2'});
window.member.xhrSrc.push({file:'xhr1.html', id:'xhr3', delim:'<!--###src_content2###-->'});
</script>
</head>

*本JSファイルの埋め込み場所よりも前であればどこに書いても構いません。

■その他の機能
●<img>タグのクラスに、overImageEnabled を指定すると自動で onmouseover、onmouseoutを設定します。
例：
<img class="overImageEnabled test" src="/images/sub/sample.jpg">
↓
<img class="overImageEnabled test" src="/images/sub/sample.jpg" onmouseover="this.src=\"/images/sub/sample_over.jpg\"" onmouseout="this.src=\"/images/sub/sample.jpg\"">


**注意事項**
・要素に流し込む部分に、document.writeするスクリプトがあると、ページ全体に影響を及ぼすので、そういったscriptが含まれないように注意してください。
・読み込むファイル(file)内の、要素取り出し用の区切り文字(delim)で挟み込んだ部分をとりだして適用します。
　そのため、読み込むファイル内に要素取り出し用の区切り文字(delim)が３箇所以上記述されている場合は、最初と２番目の間のみが取り出されます。
・一つのファイル内の複数の部分を取り出したい場合は、異なる要素取り出し用の区切り文字(delim)で個別に登録してください。
*/

window.fnc.updateRegularEventBanner = window.fnc.updateRegularEventBanner || function(){};  //regular_event.js
window.fnc.spModeInit = window.fnc.spModeInit || function(){}; //gnavi.js

(function(){
	'use strict';
	/* bodyのクラス設定 ***************************************************/
	$('body').addClass(window.env.crrDom);
	var _root = '/index';
	if ((window.env.pathname.substr(0, _root.length) === _root) || (window.env.pathname === '/')) {
		$('body').addClass('top');
	} else {
		$('body').addClass('sub');
	}
	if (window.env.isSP) {
		$('body').addClass('sp');
		window.fnc.spModeInit();
	}
	if (window.env.isConsole) {
		//Game Console時、bodyにcsクラスを追加
		$('body').addClass('cs');
	}
	/**********************************************************************/

	var _ch,_sp;
	_ch = 'cog';
	_sp = '/sp_cog/';
	if(window.env.isHangame){
		_ch = 'hangame';
		_sp = '/sp_han/';
	} else if(window.env.isXbox){
		_ch = 'xbox360';
		_sp = '/sp_xbox/';
	} else if(window.env.isPs4){
		_ch = 'ps4';
		_sp = '/sp_ps4/';
	} else if(window.env.isPs3){
		_ch = 'ps3';
		_sp = '/sp_ps3/';
	} else if(window.env.isPsV){
		_ch = 'psvita';
		_sp = '/sp_psvita/';
	} else if(window.env.isWiiU){
		_ch = 'wiiu';
		_sp = '/sp_wiiu/';
	}

	var _now = new Date();
	var _cb = 'cachebr=' + _now.getFullYear() + '_' + _now.getMonth() + '_' + _now.getDate() + '_' + _now.getHours() + '_' + _now.getMinutes();

	var XHR = function(uri, delim, trgId){
		if (uri.substr(0, 1) === '/') {
			uri = window.env.root + uri;
		}
		if (window.env.isLocal) {
			uri = replaceAll(uri, '/sp/', _sp);
		} else {
			if (uri.split('?').length > 1) {
				uri += '&' + _cb;
			} else {
				uri += '?' + _cb;
			}
		}

		$.ajax({
			async:false,
			dataType:'text',
			url:uri,
			success:function(data){
				var _arr = String(data).split(delim);
				if (_arr[1]) {
					$('#'+trgId).html(_arr[1]);
				} else {
					//$('#'+trgId).html('<p>ERROR:<br>' +  uri + '<br>を読み込めませんでした。</p>');
				}
			},
			error:function(){
				//$('#'+trgId).html('<p>ERROR:<br>' +  uri + '<br>を読み込めませんでした。</p>');
			}
		});


	};
	//
	var replaceAll = function(expression, org, dest){return expression.split(org).join(dest);};
	//
	var _ddom;
	_ddom = [];
	var _rdom;
	_rdom = [];
	var constractPathConv = function(){
		_ddom = [];
		_ddom.push('//web.archive.org/web/20191218005632/http://members.mh-frontier.jp/');
		_ddom.push('//web.archive.org/web/20191218005632/http://members.mhf-z.jp/');
		_ddom.push('//web.archive.org/web/20191218005632/http://www.mhf-z.jp/');
		_ddom.push('//' + _ch + '.mhf-z.jp/');
		_ddom.push('//' + _ch + '-members.mhf-z.jp/');
		_ddom.push('//web.archive.org/web/20191218005632/http://www.capcom-onlinegames.jp/');
		//
		var _sub,_dev;
		if (window.env.isLocal || window.env.isDebug) {
			//_sub = 'debug-'; _dev = 'dev02v';
			_sub = 'debug-'; _dev = 'pre02v';
		}
		if (window.env.isStage) {
			_sub = 'stage-'; _dev = 'pre02v';
		}
		try {
			if (_sub) {
				_rdom = [];
				_rdom.push('//' + _sub + 'members.mh-frontier.net/');
				_rdom.push('//' + _sub + 'members.mhf-z.net/');
				_rdom.push('//' + _sub + 'www.mhf-z.net/');
				_rdom.push('//' + _sub + _ch + '.mhf-z.net/');
				_rdom.push('//' + _sub + _ch + '-members.mhf-z.net/');
				_rdom.push('//' + _dev + '.capcom-onlinegames.jp/');
			}
		} catch (e){}
		//
		var domCheck = function(src){
			if (_rdom.length) {
				for (var i = 0; i < _ddom.length; i++) {
					if (src.indexOf(_ddom[i]) !== -1) {
						src = replaceAll(src, '%2fwww%2ecapcom-onlinegames%2ejp', '%2fpre02v%2ecapcom-onlinegames%2ejp');
						src = replaceAll(src, '%2fwww%2ecapcom%2donlinegames%2ejp', '%2fpre02v%2ecapcom%2donlinegames%2ejp');
						return replaceAll(src, String(_ddom[i]), String(_rdom[i]));
					}
				}
			}
			return src;
		};


		if (_rdom.length === _ddom.length) {
			var i,_ank,_href;
			_ank = document.getElementsByTagName('a');
			for (i = 0; i < _ank.length; i++) {
				if (_ank[i].className.indexOf('direct_link') === -1){ // a.direct_link はスルー
					_href = domCheck(_ank[i].href);
					_ank[i].href = (window.env.isLocal)?replaceAll(_href, '/sp/', _sp):_href;
				}
			}
			_ank = document.getElementsByTagName('area');
			for (i = 0; i < _ank.length; i++) {
				if (_ank[i].className.indexOf('direct_link') === -1){ // a.direct_link はスルー
					_href = domCheck(_ank[i].getAttribute('href'));
					_ank[i].setAttribute('href', (window.env.isLocal) ? replaceAll(_href, '/sp/', _sp) : _href);
				}
			}
		}
	};
	var pathFix = function(){
		/**/
		try {
			window.fnc.updateRegularEventBanner();
		} catch (e) {}

		var i,_anks,_imgs,tmp;
		/************************************************************************************************************/
		_anks = document.getElementsByTagName('a');
		for (i = 0; i < _anks .length; i++) {
			tmp = _anks[i].href;
			tmp = replaceAll(tmp, '/support/rule/index.php', '/support/rule/');
			tmp = replaceAll(tmp, '/support/inquiry/index.php', '/support/inquiry/');
			tmp = replaceAll(tmp, '/support/update/index.php', '/support/update/');
			tmp = replaceAll(tmp, '/information/event', '/sp_contens/event');
			_anks[i].href = tmp;
		}
		/************************************************************************************************************/

		if (window.env.isLocal) {
			if (window.env.isMSIE) {
				var _scripts = document.getElementsByTagName('script');
				for (i = 0; i < _scripts.length; i++) {
					if ((_scripts[i].src.substr(0, 6) === 'file:/') && (_scripts[i].src.substr(0, window.env.root.length) !== window.env.root)) {
						tmp = window.env.root + '/' + (_scripts[i].src).split(':/').pop();
						tmp = replaceAll(tmp, '/htdocs_sp/topic/', '/htdocs_members/topic/');
						tmp = replaceAll(tmp, '/htdocs_sp/campaign/', '/htdocs_members/campaign/');
						tmp = replaceAll(tmp, '/htdocs_sp/contents/', '/htdocs_members/contents/');
						tmp = replaceAll(tmp, '/htdocs_sp/goods/', '/htdocs_members/goods/');
						_scripts[i].src = tmp;
					}
				}
			}

			_anks = document.getElementsByTagName('a');
			for (i = 0; i < _anks.length; i++) {
				if ((_anks[i].href.substr(0, 6) === 'file:/') && (_anks[i].href.substr(0, window.env.root.length) !== window.env.root)) {
					tmp = window.env.root + '/' + (_anks[i].href).split(':/').pop();
					if (tmp.substr(tmp.length-1, 1) === '/') {tmp += 'index.html';}
					tmp = replaceAll(tmp, '/htdocs_sp/topic/', '/htdocs_members/topic/');
					tmp = replaceAll(tmp, '/htdocs_sp/campaign/', '/htdocs_members/campaign/');
					tmp = replaceAll(tmp, '/htdocs_sp/contents/', '/htdocs_members/contents/');
					tmp = replaceAll(tmp, '/htdocs_sp/goods/', '/htdocs_members/goods/');
					tmp = replaceAll(tmp, '/sp/request/', '/support/request/');
					tmp = replaceAll(tmp, '/sp/qa/', '/support/qa/');
					tmp = replaceAll(tmp, '/sp/bug/', '/support/qabug');
					_anks[i].href = tmp;
				}
			}

			_imgs = document.getElementsByTagName('img');
			for (i = 0; i < _imgs.length; i++) {
				if ((_imgs[i].src.substr(0, 6) === 'file:/') && (_imgs[i].src.substr(0, window.env.root.length) !== window.env.root)) {
					_imgs[i].src = window.env.root + '/' + (_imgs[i].src).split(':/').pop();
				}
			}
		}

		_imgs = document.getElementsByTagName('img');
		for (i = 0; i < _imgs.length; i++) {
			if (String(_imgs[i].className).indexOf('overImageEnabled') !== -1){
				var _src = String(_imgs[i].src).split('.');
				var _ext = _src.pop();
						_src = _src.join('.');
				_imgs[i].setAttribute('onmouseover', 'this.src="' + _src + '_over.' + _ext + '"');
				_imgs[i].setAttribute('onmouseout',  'this.src="' + _src + '.' + _ext + '"');
			}
		}

		if (window.env.isHangame) {
			_anks = document.getElementsByTagName('a');
			for (i = 0; i < _anks .length; i++) {
				if (!_anks[i].getAttribute('target')) {
					_anks[i].setAttribute('target', '_top');
				}
			}
		}
		//
		//
		constractPathConv();

		window.fnc.xhrComplete();
	};
	//
	var _xhrIdx = 0;
	//
	var loadHtmlToElement = function(){
		try {
			if (_xhrIdx < window.member.xhrSrc.length) {
				var _tmp = window.member.xhrSrc[_xhrIdx];
				if (!(_tmp.delim)) {
					_tmp.delim = '<!--###content###-->';
				}
				XHR(String(_tmp.file), _tmp.delim, _tmp.id);
				//
				_xhrIdx++;
				loadHtmlToElement();
			} else {
				pathFix();
			}
		} catch(e) {
			pathFix();
		}
	};
	//
	loadHtmlToElement();
})();

}
