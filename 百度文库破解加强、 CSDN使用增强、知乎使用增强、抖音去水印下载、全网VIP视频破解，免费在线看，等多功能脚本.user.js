// ==UserScript==
// @name         百度文库破解加强、全网VIP视频破解,去广告,免费在线看、全网音乐直接下载、短视频去水印下载:支持抖音、快手等，知乎使用增强、CSDN使用增强等多功能脚本
// @namespace    congcongguoke_baiduwenku_script
// @version      3.0.15
// @description  1：百度文库文档免费下载、内容自由复制、广告过滤等；2：全网VIP视频免费破解去广告(支持自定义接口，综合线路电视剧免跳出选集)支持爱奇艺、腾讯、优酷、芒果TV、哔哩哔哩等；3：全网音乐有声音频免客户端下载,支持网易云音乐、QQ音乐、酷狗、酷我、喜马拉雅、咪咕等；4：知乎使用增强：外链接直接跳出、问题,回答时间标注、短视频下载等；5：短视频去水印下载(无限制下载)支持：抖音、快手；6：CSDN使用增强：广告移除、净化剪切板、未登录查看折叠评论等；7：京东、淘宝、天猫等优惠券查询
// @icon         https://pic.rmb.bdstatic.com/bjh/344e0cbee6932f2060304ed72dc3269d.png
// @author       匆匆过客,王超,橘子爱哭
// @include      *://wenku.baidu.com/*
//---------------------------------------------------
// @include      *music.163.com*
// @include      *://y.qq.com*
// @include      *://www.kugou.com*
// @include      *://www.kuwo.cn*
// @include      *://www.lizhi.fm*
// @include      *://*.ximalaya.com*
// @include      *://music.migu.cn*
//---------------------------------------------------
// @include      *://*.kuaishou.com/*
// @include		 *://www.douyin.com/video/*
//---------------------------------------------------
// @include      *://*.zhihu.com/*
// @include      *://v.vzuu.com/video/*
// @include      *://video.zhihu.com/video/*
//---------------------------------------------------
// @include      *://bbs.csdn.net/*
// @include      *://www.csdn.net/*
// @include      *://blog.csdn.net/*/article/details/*
// @include      *://*.blog.csdn.net/article/details/*
//---------------------------------------------------
// @include      *://*.youku.com/v_*
// @include      *://*.iqiyi.com/v_*
// @include      *://*.iqiyi.com/w_*
// @include      *://*.iqiyi.com/a_*
// @include      *://*.le.com/ptv/vplay/*
// @include      *://v.qq.com/x/cover/*
// @include      *://v.qq.com/x/page/*
// @include      *://*.tudou.com/listplay/*
// @include      *://*.tudou.com/albumplay/*
// @include      *://*.tudou.com/programs/view/*
// @include      *://*.mgtv.com/b/*
// @include      *://film.sohu.com/album/*
// @include      *://tv.sohu.com/v/*
// @include      *://*.acfun.cn/v/*
// @include      *://*.bilibili.com/video/*
// @include      *://*.bilibili.com/anime/*
// @include      *://*.bilibili.com/bangumi/play/*
// @include      *://*.baofeng.com/play/*
// @include      *://vip.pptv.com/show/*
// @include      *://v.pptv.com/show/*
// @include      *://item.taobao.com/*
//---------------------------------------------------
// @include      *://*detail.tmall.com/*
// @include      *://*detail.tmall.hk/*
// @include      *://*product.suning.com/*
// @include      *://*item.jd.com/*
// @include      *://item.yiyaojd.com/*
// @include      *://npcitem.jd.hk/*
// @include      *://*detail.vip.com/*
// @include      *://*mobile.yangkeduo.com/goods*
//---------------------------------------------------
// @include      *://showxi.xyz/mov/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @connect      zhihu.com
// @connect      vzuu.com
// @connect      kuaishou.com
// @connect      ixigua.com
// @connect      t.mimixiaoke.com
// @connect      t.jtm.pub
// @connect      cdn.jsdelivr.net
// @connect      pcw-api.iqiyi.com
// @grant        GM_info
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @license      AGPL License
// @original-script https://greasyfork.org/zh-CN/scripts/390952
// @original-author 橘子爱哭
// @original-license GPL License
// @antifeature  referral-link 【应GreasyFork代码规范要求：含有优惠券查询功能的脚本必须添加此提示！脚本使用过程中无任何强制跳转等行为，请大家放心！在此感谢大家的理解...】
// @charset		 UTF-8
// ==/UserScript==

(function() {
	'use strict';
	
	////**********************************************
	////未经许可，禁止二次分发修改
	////**********************************************
	
	/////**********************************************
	//true:开启  false:关闭
	//想关闭某个模块只需把对应的值改为false即可
	const isOpenWenkuModule = true;      //是否开启文库功能模块
	const iSOpenDouyinModule = true;     //是否开启抖音功能模块
	const iSOpenKuaishouModule = true;     //是否开启快手功能模块
	const isOpenVideoVipModule = true;   //是否开启视频解析模块
	const isOpenMusicVipModule = true;   //是否开启音乐解析模块
	const isOpenGoodsCouponModule = true;//是否开启优惠券模块
	const isOpenZhihuModule = true;      //是否开启知乎优化模块
	const isOpenCsdnModule = true;      //是否开启CSDN优化模块
	/////**********************************************
	
	var $ = $ || window.$; //获得jquery的$标识符
	const window_url = window.location.href;
	const window_host = window.location.host;
	
	//自定义视频解析接口
	var customizeMovieInterface=[
		//{"name":"此处填接口名称","url":"此处填接口url"}
	];
	
	/**
	 * 百度文库开始
	 */
	const baiduwenkuHelper={};
	baiduwenkuHelper.wenkudownloadUrl = "http://www.tool77.com/tampermonkey/doc/download?wenku_url=";
	baiduwenkuHelper.isRun = function(){
		if(window_host.indexOf("wenku.baidu.com") != -1){
			return true;
		}
		return false;
	};
	baiduwenkuHelper.removeAD=function(){
    	if(window_host.indexOf("wenku.baidu.com") != -1){
		    setInterval(function(){
		    	$(".banner-ad").hide();
		    	$(".union-ad-bottom").hide();
		    	$("iframe").hide();
		    	
		    	//VIP去广告小按钮
		    	$(".ggbtm-vip-close").hide();
		    	$(".ad-vip-close-bottom").hide();
		    	$(".ad-vip-close").hide();
		    	
		    	//搜索页面
		    	$("#fengchaoad").hide();
		    	$(".search-aside-adWrap").hide();
		    },300);
	    }
	};
	baiduwenkuHelper.generateHtml=function(){
		var $that = this;
    	if((window_url.indexOf("wenku.baidu.com/view")==-1 && window_url.indexOf("wenku.baidu.com/link")==-1) 
			|| window_host!="wenku.baidu.com"){
    		return;
    	}
		
		this.openAllPage();  //折叠的文档全部展开
		
		var topBox = "<div style='position:fixed;z-index:999999;background-color:#ccc;cursor:pointer;top:150px;left:0px;'>"+
						"<div id='baiduwenku_helper_download_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#25AE84;'>下载</div>"+
						"<div id='baiduwenku_helper_copyall_btn' style='font-size:12px;padding:8px 2px;color:#FFF;background-color:#FE8A23;'>复制</div>"+
				 	 "</div>";
		$("body").append(topBox);
		
		//解析下载
		$("body").on("click","#baiduwenku_helper_download_btn",function(){
			var wenkuUrl = $that.wenkudownloadUrl+encodeURIComponent(window_url);
			GM_openInTab(wenkuUrl, { active: true });
		});
		
		if($("#reader-container").length == 0){ //这是旧的文档展示页面
			var onePageCopyContentHtml = '<div class="baiduwenku_helper_copy_onepage" style="float:left;padding:3px 8px;background:green;z-index:999;position:relative;top:60px;color:#fff;background-color:#FE8A23;font-size:13px;cursor:pointer;">复制此页面内容</div>'; 
			$('.mod.reader-page.complex, .ppt-page-item, .mod.reader-page-mod.complex, .reader-page-wrap').each(function() {
				$(this).prepend(onePageCopyContentHtml);
			});
			//复制全部文档内容
			$("body").on("click","#baiduwenku_helper_copyall_btn",function(){
				$that.copybaiduWenkuAll();
			});
			//复制每一页内容
			$("body").on("click",".baiduwenku_helper_copy_onepage",function(){
				var $inner = $(this).parent(".mod").find(".inner")
				$that.copybaiduWenkuOne($inner, true);
			});
		}else{ //新的付费页面
			var onePageCopyContentHtml = '<div class="baiduwenku_helper_copy_onepage" style="float:left;padding:3px 8px;background:green;z-index:999;position:relative;top:60px;color:#fff;background-color:#FE8A23;font-size:13px;cursor:pointer;">复制此页面内容</div>'; 
			setInterval(function(){  //添加复制按钮
				$('.reader-page').each(function() {
					if($(this).find(".baiduwenku_helper_copy_onepage").length==0){
						$(this).prepend(onePageCopyContentHtml);
					}
				});
			},200);
			//复制全部文档内容
			$("body").on("click","#baiduwenku_helper_copyall_btn",function(){
				$that.copybaiduWenkuAll_VIP();
			});
			//复制每一页内容
			$("body").on("click", ".baiduwenku_helper_copy_onepage", function(){
				$that.copybaiduWenkuOne_VIP($(this).parents(".reader-page"), true);
			});
		}		
   	};
    baiduwenkuHelper.showBaiduCopyContentBox=function(str){
    	var ua = navigator.userAgent;
    	var opacity = '0.95';
		if (ua.indexOf("Edge") >= 0) {
		    opacity = '0.6';
		} else{
		    opacity = '0.95';
		}
    	var copyTextBox = '<div id="baiduwenku_helper_copy_text_box" style="width:100%;height:100%;position: fixed;z-index: 9999;display: block;top: 0px;left: 0px;background:rgba(255,255,255,' + opacity + ');-webkit-backdrop-filter: blur(20px);display: flex;justify-content:center;align-items:center;">'+
    						'<div id="baiduwenku_helper_copy_box_close" style="width:100%;height:100%;position:fixed;top:0px;left:0px;"><div style="font-size:16px;margin-top:20px;text-align:center;"><b>点击文本外关闭弹框</b></div></div>'+
    					  	'<pre id="baiduwenku_helper_copy_text_content" style="padding:20px;border:1px solid #CCC;border-radius:4px;width:60%;font-size:16px;line-height:22px;z-index:10000;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;word-break:break-all;max-height:70%;overflow:auto;"></pre>'+
    					  '</div>"';
    	$('#baiduwenku_helper_copy_text_box').remove();
	    $('body').append(copyTextBox);
	    $('#baiduwenku_helper_copy_text_content').html(str);
	    $('#baiduwenku_helper_copy_box_close').click(function() {
	       $('#baiduwenku_helper_copy_text_box').remove();
	    });
   	};
   	baiduwenkuHelper.showDialog=function(str){
   		var dialogHtml = '<div id="baiduwenku_helper_dialog" style="margin:0px auto;opacity:0.8;padding:5px 10px;position:fixed;z-index: 10001;display: block;bottom:30px;left:44%;color:#fff;background-color:#CE480F;font-size:13px;border-radius:3px;">'+str+'</div>';
   		$('#baiduwenku_helper_dialog').remove();
	    $('body').append(dialogHtml);
	    setTimeout(function(){
	    	$('#baiduwenku_helper_dialog').remove();
	    }, 1500);
   	};
	baiduwenkuHelper.openAllPage=function(){
		var $noVipPage = $(".fold-no-vip-page-text"); //2021-06-10：VIP文档不能点击继续浏览
		if($noVipPage.length == 0){
			var readall = $(".read-all");
			if(readall.length!=0){
				setTimeout(function(){
					readall.click();
				},100);
			};
			var bannerMoreBtn = $(".banner-more-btn");
			if(bannerMoreBtn.length!=0){
				setTimeout(function(){
					bannerMoreBtn.click();
				},100);
			}
		}
	};
	baiduwenkuHelper.copybaiduWenkuAll_VIP=function(){  /*** 新页面内容提取 ****/
		var contentHtml = "";
		var that = this;
		$(".reader-page").each(function(){
			contentHtml += that.copybaiduWenkuOne_VIP($(this), false);
		});
		if(!!contentHtml){
			this.showBaiduCopyContentBox(contentHtml);
		}else{
			this.showDialog("提取文档内容失败了");
		}
	};
	baiduwenkuHelper.copybaiduWenkuOne_VIP=function($page, isappend){
		var $that = this;
		var contentHtml = "";  //提取文字
		var picNum = 0;        //图片数目
		var picTemplate = "<div style='margin:10px 0px;text-align:center;'><img src='@' width='90%'><div>____图(#)____</div></div>";
		
		//word，xlsx类型的文档
		$page.find(".reader-pic-layer,.reader-txt-layer").each(function(){
			if($(this).hasClass("reader-pic-layer")){
				$(this).find("img").each(function(){
					var imageurl = $(this).attr("src");
					if(!!imageurl){
						picNum++;
						var imageHtml = picTemplate;
						imageHtml = imageHtml.replace(/#/g,picNum);
						imageHtml = imageHtml.replace(/@/g,imageurl);
						contentHtml += imageHtml;
					}
				});
			}else{
				$(this).find(".reader-word-layer").each(function(){
					contentHtml += $(this).text().replace(/\u2002/g, ' ');
				});
			}
		});
		
		//txt类型的文档
		$page.find(".p-txt").each(function(){
			contentHtml += $(this).text().replace(/\u2002/g, ' ');
		});
		
		contentHtml = contentHtml.replace(/。\s/g, '。\r\n');
		if(!!contentHtml){
			if(isappend){
				$that.showBaiduCopyContentBox(contentHtml);
			}
			return contentHtml;
		}else{
			if(isappend){
				$that.showDialog("提取文档内容失败了");
			}
			return "";
		}
	};
    baiduwenkuHelper.copybaiduWenkuAll=function(){ /*** 旧页面内容提取 ****/
		var contentHtml = "";
		var that = this;
		$(".inner").each(function(){
			contentHtml += that.copybaiduWenkuOne($(this), false);
		});
		if(!!contentHtml){
			this.showBaiduCopyContentBox(contentHtml);
		}else{
			this.showDialog("提取文档内容失败了");
		}
    };
    baiduwenkuHelper.copybaiduWenkuOne=function($inner, isappend){
    	var $that = this;
		var str = "";  //提取文字
		
		$inner.find('.reader-word-layer').each(function(){
			str += $(this).text().replace(/\u2002/g, ' ');
		});
		$inner.find('.p-txt').each(function(){
			str += $(this).text().replace(/\u2002/g, ' ');
		});
		str = str.replace(/。\s/g, '。\r\n');
		
		//提取css中的图片
		var picHtml = "";
		var picUrlReg = /\(((\'|\")?https.*?)\)/i;
		var cssUrl = "";
		var picNum = 0;
		var picUrlLengthMin = 65;
		var picTemplate = "<div style='margin:10px 0px;text-align:center;'><img src='@' width='90%'><div>____图(#)____</div></div>";
		$inner.find('.reader-pic-item').each(function(){
			cssUrl= $(this).css("background-image");
			if(!!cssUrl && (cssUrl.indexOf("https")!=-1 || cssUrl.indexOf("HTTPS")!=-1)){
				var array = cssUrl.match(picUrlReg);
				if(array.length>1){
					cssUrl = array[1].replace(/\"/g, "");
					if(!!cssUrl && cssUrl.length>picUrlLengthMin){
						picNum ++;
						var onePic = picTemplate;
						onePic = onePic.replace(/#/g,picNum);
						onePic = onePic.replace(/@/g,cssUrl);
						picHtml += onePic;
					}
				}
			}
			
		});
		
		var srcUrl = "";
		$inner.find('img').each(function(){
			srcUrl = $(this).attr("src");
			if(!!srcUrl && srcUrl.length>picUrlLengthMin && srcUrl.indexOf("https://wkretype")!=-1){
				picNum ++;
				var onePic = picTemplate;
				onePic = onePic.replace(/#/g,picNum);
				onePic = onePic.replace(/@/g,srcUrl);
				picHtml += onePic;
			}
		});
		
		//追加内容
		var contentHtml = str+picHtml;
		if(!!contentHtml && contentHtml.length>0){
			if(isappend){
				$that.showBaiduCopyContentBox(contentHtml);
			}
			return contentHtml;
		}else{
			if(isappend){
				$that.showDialog("提取文档内容失败了");
			}
			return "";
		}
    };
	baiduwenkuHelper.start=function(){
		if(this.isRun()){			
			this.generateHtml();
			this.removeAD();
		}
	};
	if(isOpenWenkuModule){
		baiduwenkuHelper.start();
	}

	/**
	 * 音乐下载：无损音乐、封面、歌词
	 */
	const musicvip={};
	musicvip.eleId = Math.ceil(Math.random()*100000000);
	musicvip.isRun = function(){
		var musicurls=[
			"music.163.com","y.qq.com","www.kugou.com","www.kuwo.cn","www.xiami.com","music.taihe.com","music.migu.cn","lizhi.fm","qingting.fm","ximalaya.com"
		];
		for(var i=0; i<musicurls.length;i++){
			if(window.location.host.indexOf(musicurls[i])!=-1){
				return true;
			}
		}
		return false;
	};
	musicvip.getPlayUrl = function(){
		var currentHost = window.location.host;
		var currentUrl = window.location.href;
		var playUrl = null;
		if(currentUrl.match(/music\.163\./)){ //网易云音乐
			if(currentUrl.match(/^https?:\/\/music\.163\.com\/#\/(?:song|dj)\?id/)) {
				playUrl = 'https://music.liuzhijin.cn/?url='+encodeURIComponent(currentUrl);
			}else if(currentUrl.match(/^https?:\/\/y\.music\.163\.com\/m\/(?:song|dj)\?id/)) {
				playUrl = 'https://music.liuzhijin.cn/?url='+encodeURIComponent('https://music.163.com/song?id='+getQueryString('id'));
			}
		}
		else if(currentUrl.match(/y\.qq\.com/)){ //QQ音乐
			if(currentUrl.indexOf("?")) currentUrl = currentUrl.split("?")[0];
			if(currentUrl.indexOf("#")) currentUrl = currentUrl.split("#")[0];
			var musicMatch = currentUrl.match(/^https?:\/\/y\.qq\.com\/n\/ryqq\/songDetail\/(\S*)/);
			if(musicMatch){
				playUrl = 'https://music.liuzhijin.cn/?id='+musicMatch[1]+'&type=qq'
			}
			var musicMatch2 = currentUrl.match(/^https?:\/\/y\.qq\.com\/n\/yqq\/song\/(\S*).html/);
			if(musicMatch2){
				playUrl = 'https://music.liuzhijin.cn/?id='+musicMatch2[1]+'&type=qq';
			}
		}
		else if(currentUrl.match(/kugou\.com/)){ //酷狗
			var musicMatch = currentUrl.match(/hash=(\S*)&album/);
			if(musicMatch){
				playUrl = 'https://music.liuzhijin.cn/?id='+musicMatch[1]+'&type=kugou';
			}
		}
		else if(currentUrl.match(/kuwo\.cn/)){  //酷我
			if(currentUrl.indexOf("?")) currentUrl = currentUrl.split("?")[0];
			if(currentUrl.indexOf("#")) currentUrl = currentUrl.split("#")[0];
			var musicMatch = currentUrl.match(/play_detail\/(\S*)/);
			if(musicMatch){
				playUrl = 'https://music.liuzhijin.cn/?id='+musicMatch[1]+'&type=kuwo';
			}
		}
		else if(currentUrl.match(/www\.ximalaya\.com/)){ //喜马拉雅
		    var xmlyUrlArr = currentUrl.split("/");
		    for(var xuaIndex =0;xuaIndex<xmlyUrlArr.length;xuaIndex++){
		        if(xuaIndex==xmlyUrlArr.length-1){
					playUrl = 'https://music.liuzhijin.cn/?id='+xmlyUrlArr[xuaIndex]+'&type=ximalaya&playUrl='+encodeURIComponent(currentUrl);
		        }
		    }
		}
		else if(currentUrl.match(/www\.lizhi\.fm/)){ //荔枝音乐
			if(currentUrl.indexOf("?")) currentUrl = currentUrl.split("?")[0];
			if(currentUrl.indexOf("#")) currentUrl = currentUrl.split("#")[0];
			var musicMatch = currentUrl.match(/^https?:\/\/www\.lizhi\.fm\/(\d*)\/(\d*)/);
			if(musicMatch){
				playUrl = 'https://music.liuzhijin.cn/?id='+musicMatch[2]+'&type=lizhi';
			}
		}
		else if(currentUrl.match(/music\.migu\.cn/)){ //咪咕音乐
			if(currentUrl.indexOf("?")) currentUrl = currentUrl.split("?")[0];
			if(currentUrl.indexOf("#")) currentUrl = currentUrl.split("#")[0];
			var musicMatch = currentUrl.match(/^https?:\/\/music\.migu\.cn\/v3\/music\/song\/(\S*)/);
			if(musicMatch){
				playUrl = 'https://music.liuzhijin.cn/?id='+musicMatch[1]+'&type=migu';
			}
		}
		return playUrl;
	};
	musicvip.addStyle=function(){
		var innnerCss = 
		"@keyframes turnaround{0%{-webkit-transform:rotate(0deg);}25%{-webkit-transform:rotate(90deg);}50%{-webkit-transform:rotate(180deg);}75%{-webkit-transform:rotate(270deg);}100%{-webkit-transform:rotate(360deg);}}"+
		"#plugin_kiwi_analysis_vip_music_box_"+this.eleId+" {position:fixed; top:150px; left:0px; width:28px; background-color:#FD2929;z-index:9999999899999;}"+
		"#plugin_kiwi_analysis_vip_music_box_"+this.eleId+" >.plugin_item{cursor:pointer; width:100%; padding:10px 0px; text-align:center;}"+
		"#plugin_kiwi_analysis_vip_music_box_"+this.eleId+" >.plugin_item >img{width:19px; display:inline-block; vertical-align:middle;animation:turnaround 3s linear infinite;}";
		$("body").prepend("<style>"+innnerCss+"</style>");
	};
	musicvip.generateHtml=function(){
		var html="";
		var vipImgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADU0lEQVRoQ+2ZTYhNYRjHf/+1kkQk5WNDbNj5GGUoaXyUZDFZWEgWmgXRLFkiYjFJGlYWE1IoH1mQZrJRysJHYuEjJR8LYlYePdcZnXvuOfe+59wzM+fWvJtb9zxfv/d53+d533NEhw91ePxMAeTNoJlZik6fpIG8tlx+wjOQAeCxbJJ0Py9ElQDeA92S3uSBqBKAx+0Z2CzpTyhE1QA87nOSDpQKYGYPQg0m5SR1x/9rsgfiYkcknQrxGZSBQKep/iTV+chha6ek660gqgzwEeiR9KwZRJUBPO6HEcTvLIiqA3jcg5L2lQlQtykzDB8F1tc6ZfE9EDfdL+lkmq/cGUgGlGY0qlplArib1E3dSQCpm7qTADwLA5L64lnvNICfwDxJP8YgOg3A4z4s6XSlALwwmNlqYBXgvz3AtIwKNyKpa9wAzGwxcDFPGU0ptQuBXcBeYEkC5JWkpU0BzGw6cAjYDqys2zSJuu7PYvJjM+j6tRHSB7JKs5l5KU4eJL9Imp0JYGZO7o1oeWrjaGxMeeUbrpTNeouZvUxmIS6fPCn6jN9ocng6I8kzUxtmthW4FSof6eQFeAqsiPm4JMmX1r8Mx52b2TCwNiOgJ8AOSR9iAEnjcdUG+YIA34EZMcNdkkayANLeGLjsWUkHk2Bm5obWpACnyucFMLP5gN+Vx8Y1Sb5k/49kBvxhP7AIeA3cBR5LupeWFTNbBhwHNgDPgdvN5AsAeDxXIt8eg6+AuqN1UCNrssZzP0q7kTWpQj5BDuBBb5H0Oemw0gBRxhxiVNLbtNmqPECrFE8BtJqhqJt6GZwJzAJONKzjlO7eym5qGQ1VaiVnZtuiY4j/zmklH3LLy7JR6hKKjiHeL/xEGTwmHSA6CnvgdU0mlGBSAaJZH2s2oTHH5d5JWlBE0XXaWkIlBO8xDEtaN+EAASfR0Jh6JQ2FCpfWic3sJuBVpp0xJKm3HQOFllBJs+9H8d2SXkwGwB3/ktKGY/8Ss0fSpzZs1FSLZuA8sL+g80HAv0qOFtSvUysKcCy6N+eJ4Wr0Zu1RHqVWsoUA3KiZhUD4G7TLfm+W5Muu9FEYIILwCuK3sY3AXOAb8DX6veAvCCT9Kj3qmMG2AMYzsFDbUwChMzVecn8BFTyUQAGmXQcAAAAASUVORK5CYII=";
		html+= "<div id='plugin_kiwi_analysis_vip_music_box_"+this.eleId+"'>";
		html+= "<div class='plugin_item jump_analysis_website' title='VIP音乐破解，免客户端下载！'><img src='"+vipImgBase64+"'></div>";
		html+= "</div>";
		$("body").append(html);
		
		$("#plugin_kiwi_analysis_vip_music_box_"+this.eleId+"").on("click", function(){
			var playUrl = musicvip.getPlayUrl();
			if(!!playUrl) GM_openInTab(playUrl, false);
		})
	};
	musicvip.operation=function(){
		setInterval(function(){
			var playUrl = musicvip.getPlayUrl();
			var $vipMusicBox = $("#plugin_kiwi_analysis_vip_music_box_"+musicvip.eleId+"");
			if(!!playUrl){
				if($vipMusicBox.length==0){
					musicvip.generateHtml();
				}
			}else{
				$vipMusicBox.remove();
			}
		}, 100);
	};
	musicvip.start=function(){
		if(this.isRun()){
			this.addStyle();
			this.operation();
		}
	};
	if(isOpenMusicVipModule){
		musicvip.start();
	}
	
	/**
	 * 抖音解析开始
	 */
	const douyingHelper={};
	douyingHelper.anasetinterval=null;
	douyingHelper.isRun = function(){
		if(window_url.indexOf("//www.douyin.com/video")!=-1){
			return true;
		}
		return false;
	};
	douyingHelper.generateHtml = function(){
		var innnerCss = ".video_analysis_889988{font-size:12px;padding:5px;text-align:center;color:#FFF;background-color:#F93A60;cursor:pointer;margin-bottom:10px;};";
		$("body").prepend("<style>"+innnerCss+"</style>");
		var topBox = "<div style='position:fixed;z-index:999999;top:150px;left:0px;' id='xdddd78887444iio'>";
			for(var i=0; i<10; i++){
				topBox += "<div class='video_analysis_889988' style='display:none;'><a href='' target='_blank'></a></div>"
			}
			topBox +="</div>";
		$("body").append(topBox);
	};
	douyingHelper.getPlayerUrl=function(){
		setInterval(function(){
			$("body").find("video").each(function(){
				var numbers = ["①","②","③","④", "⑤", "⑥", "⑦"];
				$("#xdddd78887444iio .video_analysis_889988").hide();
				$(this).find("source").each(function(index, element){
					var src = $(this).attr("src");
					var $ele = $("#xdddd78887444iio").find(".video_analysis_889988").eq(index);
					var $a = $ele.find("a");
					$a.text("地址"+numbers[index]);
					$a.attr("href", src);
					$ele.show();
				});
			});
		},300);
	};
	douyingHelper.start=function(){
		if(this.isRun()){
			this.generateHtml();
			this.getPlayerUrl();
		}
	};
	if(iSOpenDouyinModule){
		douyingHelper.start();
	}
	
	/**
	 * 快手去水印下载
	 */
	const kuaishouHelper={};
	kuaishouHelper.anasetinterval=null;
	kuaishouHelper.isRun=function(){
		var windowurl = window.location.href;
		if(windowurl.indexOf("kuaishou.com")!=-1){
			return true;
		}
		return false;
	};
	kuaishouHelper.generateCss = function(){
		var innnerCss =
		`
			.video_analysis_889988{font-size:12px;padding:8px;text-align:center;color:#FFF;background-color:#F93A60;cursor:pointer;margin-bottom:15px;};
			#douyin_helper_download_play{display:none;}
		`;
		$("body").prepend("<style>"+innnerCss+"</style>");
	};
	kuaishouHelper.getPlayerUrl=function(){
		var $analysis = $("#douyin_helper_download_analysis");
		var isRun = false;
		var $that = this;
		$analysis.on("click", function(){
			if(isRun) return;
			var windowurl = window.location.href;
			if(windowurl.indexOf("#")!=-1){
				windowurl = windowurl.split("#")[0];
			}
			if(windowurl.indexOf("?")!=-1){
				windowurl = windowurl.split("?")[0];
			}
			var urlArray = windowurl.split("/");
			var sourceId = urlArray[urlArray.length-1];
			if(!sourceId){
				return;
			}
			windowurl = "https://c.kuaishou.com/fw/photo/"+sourceId;
			var times=1;
			isRun = true;
			$that.anasetinterval = setInterval(function(){
				$analysis.text("本地解析：准备中("+times+"S)");
				times++;
			},1000);
			//windowurl = windowurl.replace("https://video.kuaishou.com/featured", "https://c.kuaishou.com/fw/photo");
			GM_xmlhttpRequest({
				url: windowurl,
				method: "get",
				headers: {
					'User-agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36'
				},
				onload: function(response) {
					var status = response.status;
					var playurl = "";
					if(status==200||status=='200'){
						var responseText = response.responseText;
						if(!!responseText){
							try{
								playurl = responseText.match(/"srcNoMark":"(https:\/\/.*?)"/i)[1];
							}catch(e){}
						}
					}
					console.log("playurl="+playurl);
					clearInterval(kuaishouHelper.anasetinterval);
					kuaishouHelper.anasetinterval==null;
					isRun=false;
					if(!!playurl){
						$analysis.text("本地解析：点我解析");
						GM_openInTab(playurl, false);
					}else{
						$analysis.text("本地解析：失败：点我重试");
					}
				}
			});
		});
	};
	kuaishouHelper.generateHtml = function(){  //不停的检测地址变化
		setInterval(function(){
			var $box = $("#video_analysis_plugin_xxxsiii");
			if(window.location.href.indexOf("kuaishou.com/short-video")!=-1){
				if($box.length==0){					
					var topBox = "<div style='position:fixed;z-index:999999;top:40%;left:0px;' id='video_analysis_plugin_xxxsiii'>"+
									"<div class='video_analysis_889988'><a style='color:#FFFFFF;' href='http://www.tool77.com/video' target='_blank'>网页解析</a></div>"+
									"<div id='douyin_helper_download_analysis' class='video_analysis_889988'>本地解析：点我解析</div>"+
								 "</div>";
					$("body").append(topBox);
					kuaishouHelper.getPlayerUrl();
				}
			}else{
				$box.remove();
			}
		},100);
	};
	kuaishouHelper.start=function(){
		if(this.isRun()){
			kuaishouHelper.generateCss();
			kuaishouHelper.generateHtml();
		}
	};
	if(iSOpenKuaishouModule){
		kuaishouHelper.start();
	}
	
	/**
	 * VIP视频破解开始
	 */
	const movievipHelper={};
	movievipHelper.customizeSourceArray=customizeMovieInterface;
	movievipHelper.defaultSourceArray=[
		{"name":"纯净解析","url":"https://z1.m1907.cn/?jx="},
		{"name":"高速接口1","url":"https://jsap.attakids.com/?url="},
		{"name":"高速接口2","url":"https://api.sigujx.com/?url="},
		{"name":"B站解析1","url":"https://vip.parwix.com:4433/player/?url="},
		{"name":"B站解析2","url":"https://www.cuan.la/m3u8.php?url="},
		{"name":"Ckplayer","url":"https://www.ckplayer.vip/jiexi/?url="},
		{"name":"乐多资源","url":"https://api.leduotv.com/wp-api/ifr.php?isDp=1&vid="},
		{"name":"ccyjjd","url":"https://ckmov.ccyjjd.com/ckmov/?url="},
		{"name":"M3U8","url":"https://jx.m3u8.tv/jiexi/?url="},
		{"name":"BL","url":"https://vip.bljiex.com/?v="},
		{"name":"Mao解析","url":"https://qd.hxys.tv/m3u8.php?url="},
		{"name":"盘古","url":"https://www.pangujiexi.cc/jiexi.php?url="},
		{"name":"SSAMAO","url":"https://www.ssamao.com/jx/?url="},
		{"name":"无极","url":"https://da.wujiys.com/?url="},
		{"name":"618G","url":"https://jx.618g.com/?url="},
		{"name":"ckmov","url":"https://www.ckmov.vip/api.php?url="},
		{"name":"迪奥","url":"https://123.1dior.cn/?url="},
		{"name":"福星","url":"https://jx.popo520.cn/jiexi/?url="},
		{"name":"RDHK","url":"https://jx.rdhk.net/?v="},
		{"name":"H8","url":"https://www.h8jx.com/jiexi.php?url="},
		{"name":"解析la","url":"https://api.jiexi.la/?url="},
		{"name":"久播","url":"https://jx.jiubojx.com/vip.php?url="},
		{"name":"九八","url":"https://jx.youyitv.com/?url="},
		{"name":"老板","url":"https://vip.laobandq.com/jiexi.php?url="},
		{"name":"乐喵","url":"https://jx.hao-zsj.cn/vip/?url="},
		{"name":"MUTV","url":"https://jiexi.janan.net/jiexi/?url="},
		{"name":"明日","url":"https://jx.yingxiangbao.cn/vip.php?url="},
		{"name":"磨菇","url":"https://jx.wzslw.cn/?url="},
		{"name":"OK","url":"https://okjx.cc/?url="},
		{"name":"维多","url":"https://jx.ivito.cn/?url="},
		{"name":"小蒋","url":"https://www.kpezp.cn/jlexi.php?url="},
		{"name":"小狼","url":"https://jx.yaohuaxuan.com/?url="},
		{"name":"智能","url":"https://vip.kurumit3.top/?v="},
		{"name":"星驰","url":"https://vip.cjys.top/?url="},
		{"name":"星空","url":"http://60jx.com/?url="},
		{"name":"月亮","url":"https://api.yueliangjx.com/?url="},
		{"name":"0523","url":"https://go.yh0523.cn/y.cy?url="},
		{"name":"云端","url":"https://jx.ergan.top/?url="},
		{"name":"云析","url":"https://jx.yparse.com/index.php?url="},
		{"name":"17云","url":"https://www.1717yun.com/jx/ty.php?url="},
		{"name":"66","url":"https://api.3jx.top/vip/?url="},
		{"name":"116","url":"https://jx.116kan.com/?url="},
		{"name":"200","url":"https://vip.66parse.club/?url="},
		{"name":"8090","url":"https://www.8090g.cn/?url="}
	];
	movievipHelper.getServerSource=function(){
		//合并自定义接口和默认接口
		movievipHelper.defaultSourceArray = movievipHelper.customizeSourceArray.concat(movievipHelper.defaultSourceArray);
		//执行操作
		movievipHelper.addStyle();
		movievipHelper.generateHtml();
		movievipHelper.operation();
		console.log("onload................");
	};
	movievipHelper.eleId = Math.ceil(Math.random()*100000000);
	movievipHelper.isRun = function(){
		var isVip = false;
		var host = window.location.host;
		var vipWebsites = ["iqiyi.com","v.qq.com","youku.com", "le.com","tudou.com","mgtv.com","sohu.com",
			"acfun.cn","bilibili.com","baofeng.com","pptv.com"];
   		for(var b=0; b<vipWebsites.length; b++){
	   		if(host.indexOf(vipWebsites[b]) != -1){
	   			isVip = true;
	   			break;
	   		}
	   	}
   		return isVip;
	};
	movievipHelper.addStyle=function(){
		var themeColor = "#DD001B"; 
		var innnerCss = 
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" {position:fixed;top:150px; left:0px; padding:5px 0px; width:28px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item{cursor:pointer; width:100%; text-align:center;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.jump_analysis_website{padding:10px 0px;background-color:"+themeColor+";}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.open_page_inner_source{margin-top:6px; padding:5px 0px;background-color:"+themeColor+";}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item >img{width:19px; display:inline-block; vertical-align:middle;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box{display:none;width:310px;height:400px;position:absolute;left:25px;overflow:hidden;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box{width:330px;height:100%;padding-left:10px;overflow-y:scroll;overflow-x:hidden;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table{width:300px;border-spacing:5px;border-collapse:separate;line-height:20px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table td{border-bottom:3px solid "+themeColor+";border-top:3px solid "+themeColor+";width:33%;color:#FFF;font-size:11px;text-align:center;cursor:pointer;background-color:"+themeColor+";box-shadow:0px 0px 5px #fff;border-radius:3px;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table td:hover{border-bottom:3px solid #FEF2A6;border-top:3px solid #FEF2A6;}"+
		"#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box> .inner_table_box> table .td_hover{border-bottom:3px solid #FEF2A6;border-top:3px solid #FEF2A6;}";
		$("body").prepend("<style>"+innnerCss+"</style>");
	};
	movievipHelper.generateHtml=function(){
		var html="";
		var vipImgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABACAYAAABFqxrgAAADBklEQVR4Xu2cz6tNURTHP7tI5iRlID9CJFMlkYGSRPGklBRKiCSSxJMBkYGSgWQq/gBT/gMDUzMzf8RX6959nuO9e+75sff54d69B+/W23evvdbnrLX32j/OdfgiaStwGzgBvHfOPc7qln9KsrpHRfU9/n+xgt6ngW/AK+fcT9PV2R9JZ4A3wHpvQBVh/yuETO/fwDXn3GfnAXxa9vTmAUJm8oJBMADmCfkyTxC+GAT1GMOD6DpBsIExeUKCMArH5AkJwnhcTp4wBcI85QmFnpAgAAlCgjAeMJMnJAjJE5YWdSkcIq5vvwP7IsprRVSrGaNzzuSfAz4Aa1qxIILQ1iHkNnKfAA8j6BxdRGcQ/IbuOuAtYDu+gymdQsh5xX7gHbB7CCR6gZCDccGPF6Ot/75KrxB8iKwCngL35hZCzit2Ac/8CVinPIo8YRH4OkWTQ1WO4WyKrGuNJDsGfAlsr9vW0v0mehdCqHCmV3oM1wRCzjPuAC9qgmiU6Q4Wgh8vNgJ2+HulIozZg5DzioMexuESGLMLIQfjkh+LNhXAmH0IPkTueq9YOwHEbEOQdMobv3dKSMwmBEl7fAhUWW/EhTCBdnaEn839bU+RtvS2PmyqXF11dmiid+9p8yTjJF0ELPZ3VjQ+6GuDgiDpAHAfOBZkVc3Gg4AgaQPwALieXSaraUfQ13uHIOmmN35bkCUBjXuDIOm4N/5ogP5RmnYOQdIOwJ7+1SgWRBDSGQRJNrXajVmL+80RdI8mYtp+QlknlfMESSe98UfKhAbW235CWVmhd6tLacBS3BvA5TLNItXHzRhjbKoAv4CiFV8ku/8RM0gIbRg6TWaC0PRKQdtjQvKErgkkTxgTjzsmNNm/7+HJL+8y6rnDAOzpToVW0+buzAjrKUFIF7zHHpQ8IUFInrA0mqZw8OHwY8IFqkaZV9hEFaV1E71HL4c+9wcdeS2aCItiRaCQJnovZC+MfwTO5hRoIixQ/yjN6+j994XxrGtJt4DzwBbgdaSdpSiW1RBSBcKKnw74AzEYpoku7zbwAAAAAElFTkSuQmCC";
		var openBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAmCAYAAACCjRgBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAL9SURBVFhH1Zg9aBRBGIZjhGAwas6AjSKilYkajWChqKVBQRBsFUtBsLMzIEEtDCFFCsFCsU0jKGphYyOKCoqFP1FQRDh/EiMm57H36/PefhvuuNvs5i7o7AMfszNz833vO7s3yW3bUlIul9uJNdZNHqVSaVWxWLxE229DyQLhPfl8frZQKDzl+jix2qaSAY9PCgM/acu0M9yNES4327T7mIFpGQjAxH3uxF6i0z7mLuitMyByudwXDAwRG+yjboLWhgaqmMDELtp2W+IWCOvAwFRFagjMv+ZLfhoj62xZa5BzOcm20+6k7VXfxlP0+4gdmvc8r3+heWIbsY/xX0QkfDeuk7NPuVqCXF0ke8Bz+omdeYaIytFHO0j/JTv2nnhLfLDjMWz+ja7JU/QlRsP6J6w5GuRsChav1EmhhCSbo+m28UH6WY0H0P9NEzrfDBjO6Lgl3xblXTRm4J7l0+2vFjjrD/vQ1xkfOt8K9hToEexQ/ti4YkBg4Bt5z2UymfWqEQuXDFQxgZndqhOJowZUa5LmFHV6VC8UVw0EoO0qtbaqZkNcNyDsuD0krapdQxIMCGrl0DmczWY3qf48STEQgNa7fMH3c+n/8kuaAYGB79Q/KB2JM0DNKfTepL7/f1SSDFCv8p+s6s+TBAM8MnNovEPNPapdg+sGqPGRXT/P5TLVrcNVA+TOI/wRdQ6rXiguGiDvVzSNUSP6V5trBtj1F8QJ1YiFKwaUm7hB3l7lj021ARL8819kgjyT5DurvIuG9V3csockKRI/6AcCj9CfIUSOKOgvYNi8UMu4NMXCjsfbrDmgnE3B4k6SXCTGiWH1bXyA/mVilBghxiLmrxDjiIp1VzD7mY0bSqfT9f9h/i/QtQJhUe+FPIQ/ZgOO2TJ3QF83AkPfzHF3dDzqhe9GW+IWCGv4apGxErv+ijhpH3UTtNYZYNen2fVrnucN2MfcBb01Brh+x66fsWn34Yu5FtF/CB2Pt+j7PzqSApueIp4j/gLiF34dsiS0tf0FTeKCC8H/mvYAAAAASUVORK5CYII=";
		html+= "<div id='plugin_analysis_vip_movie_box_"+movievipHelper.eleId+"' style='z-index:999999999999999999999;'>";
		html+= "<div class='plugin_item jump_analysis_website' title='点我！跳转综合VIP视频解析，电视剧可免跳出选集'><img src='"+vipImgBase64+"'></div>";
		html+= "<div class='plugin_item open_page_inner_source'><img src='"+openBase64+"'>";
		html+= "<div class='play_source_box'>";
		html+= "<div class='inner_table_box'>";
		html+= "<table style=''><tr>";
		for(var playLineIndex=0; playLineIndex<this.defaultSourceArray.length; playLineIndex++){
			if(playLineIndex%3==0){
				html +="<tr>";
				html += "<td data-url='"+this.defaultSourceArray[playLineIndex].url+"'>"+this.defaultSourceArray[playLineIndex]['name']+"</td>";
				continue;
			}
			html += "<td data-url='"+this.defaultSourceArray[playLineIndex].url+"'>"+this.defaultSourceArray[playLineIndex]['name']+"</td>";
			if((playLineIndex+1)%3==0){
				html +="</tr>";
			}
		}
		html+= "</tr></table>";
		html+= "</div></div>";
		html+= "</div>";
		html+= "</div>";
		$("body").append(html);
		var $vipMovieBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+"");
		var $playSourceBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.plugin_item>.play_source_box");
		var btnHeight = $vipMovieBox.height();
		var playSourceBoxHeight = $playSourceBox.height();
		var playSourceBoxTop = (playSourceBoxHeight-btnHeight)*0.3;
		$playSourceBox.css("top","-"+playSourceBoxTop+"px");
	};
	movievipHelper.comprehensiveAnalysis=function(videoUrl, newWindow){ //综合解析
		var jumpWebsite = "https://showxi.xyz/mov/s/?sv=2&url="+videoUrl;
		if(newWindow && (typeof GM_openInTab==="function")){
			GM_openInTab(jumpWebsite, {active: true});
		}else{
			location.href = jumpWebsite;
		}
	};
	movievipHelper.operation=function(){
		$("body").on("click", "#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" .jump_analysis_website", function(){
			movievipHelper.comprehensiveAnalysis(window.location.href, true);
		});
		var $vipMovieBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.open_page_inner_source");
		var $playSourceBox = $("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+">.plugin_item>.play_source_box");
		$vipMovieBox.on("mouseover", () => {
			$playSourceBox.show();
		});
		$vipMovieBox.on("mouseout", () => {
			$playSourceBox.hide();
		});
		var player_nodes = [
			{ url:"v.qq.com", node:"#mod_player"},
			{ url:"www.iqiyi.com", node:"#flashbox"},
			{ url:"v.youku.com", node:"#player"},
			{ url:"w.mgtv.com", node:"#mgtv-player-wrap"},
			{ url:"www.mgtv.com", node:"#mgtv-player-wrap"},
			{ url:"tv.sohu.com", node:"#player"},
			{ url:"film.sohu.com", node:"#playerWrap"},
			{ url:"www.le.com", node:"#le_playbox"},
			{ url:"video.tudou.com", node:".td-playbox"},
			{ url:"v.pptv.com", node:"#pptv_playpage_box"},
			{ url:"vip.pptv.com", node:".w-video"},
			{ url:"www.wasu.cn", node:"#flashContent"},
			{ url:"www.acfun.cn", node:"#ACPlayer"},
			{ url:"vip.1905.com", node:"#player"},
			{url:"play.tudou.com",node:"#player"},
			{url:"www.bilibili.com/video",node:"#bilibiliPlayer"},
			{url:"www.bilibili.com/bangumi",node:"#player_module"},
		];
		var node = "";
		for(var m in player_nodes) {
			var playUrl = window.location.href;
			if(playUrl.indexOf(player_nodes[m].url)!= -1){
				node = player_nodes[m].node;
			}
		}
		$("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box>.inner_table_box> table td").on("click", function(){
			$("#play-iframe-outer-7788op").remove();
					
			$("#plugin_analysis_vip_movie_box_"+movievipHelper.eleId+" >.plugin_item>.play_source_box>.inner_table_box> table td").removeClass("td_hover");
			$(this).addClass("td_hover");
					
			var playUrl = window.location.href;
			var playHtml = "<div id='play-iframe-outer-7788op' style='width:100%;height:100%;'><iframe allowtransparency=true frameborder='0' scrolling='no' allowfullscreen=true allowtransparency=true name='jx_play' style='height:100%;width:100%' id='play-iframe-6677i-7788'></iframe></div>";
			$(node).html(playHtml);
			var iframeSrc= $(this).attr("data-url")+playUrl;
			$("#play-iframe-6677i-7788").attr("src", iframeSrc);
		})
	};
	movievipHelper.adAccelerate=function(){//视频广告加速
		switch (window.location.host) {
			case 'www.iqiyi.com':
				try{
					unsafeWindow.rate = 0;
					unsafeWindow.Date.now = () => {
						return new unsafeWindow.Date().getTime() + (unsafeWindow.rate += 1000);
					}
					setInterval(() => {
						unsafeWindow.rate = 0;
					}, 600000);
				}catch(e){}
				try{
					setInterval(() => {
						if (document.getElementsByClassName("cupid-public-time")[0] != null) {
							$(".skippable-after").css("display", "block");
							document.getElementsByClassName("skippable-after")[0].click();
						}
						$(".qy-player-vippay-popup").css("display", "none");
						$(".black-screen").css("display", "none");
					}, 500);
				}catch(e){}
				break;
			case 'v.qq.com':
				try{
					setInterval(() => { //视频广告加速
						$(".txp_ad").find("txpdiv").find("video")[0].currentTime = 1000;
						$(".txp_ad").find("txpdiv").find("video")[1].currentTime = 1000;
					}, 1000)
					setInterval(() => {
						var txp_btn_volume = $(".txp_btn_volume");
						if (txp_btn_volume.attr("data-status") === "mute") {
							$(".txp_popup_volume").css("display", "block");
							txp_btn_volume.click();
							$(".txp_popup_volume").css("display", "none");
						}
						$(".mod_vip_popup").css("display", "none");
						$(".tvip_layer").css("display", "none");
						$("#mask_layer").css("display", "none");
					}, 500);
				}catch(e){}
				break;
			case 'v.youku.com':
				try{
					window.onload = function () {
						if (!document.querySelectorAll('video')[0]) {
							setInterval(() => {
								document.querySelectorAll('video')[1].playbackRate = 16;
							}, 100)
						}
					}
					setInterval(() => {
						var H5 = $(".h5-ext-layer").find("div")
						if(H5.length != 0){
							$(".h5-ext-layer div").remove();
							var control_btn_play = $(".control-left-grid .control-play-icon");
							if (control_btn_play.attr("data-tip") === "播放") {
								$(".h5player-dashboard").css("display", "block");
								control_btn_play.click();
								$(".h5player-dashboard").css("display", "none");
							}
						}
						$(".information-tips").css("display", "none");
					}, 500);
				}catch(e){}
				break;
			case 'tv.sohu.com':
				try{
					setInterval(() => {
						$(".x-video-adv").css("display", "none");
						$(".x-player-mask").css("display", "none");
						$("#player_vipTips").css("display", "none");
					}, 500);
				}catch(e){}
				break
		}
	};
	movievipHelper.paramsSelectedInit=function(){
		var episodeList=[];
		var episodeObj = {
			"websiteTitle":"",
			"episodeList":episodeList,
			"originVideoUrl":""
		};
		GM_setValue("episodeObj",episodeObj);
		return episodeObj;
	};
	movievipHelper.getSelected=function(){
		if(window_host==="v.qq.com"){
			setInterval(function(){ //每100ms,检测一次集数的变化
				var episodeObj = movievipHelper.paramsSelectedInit();
				var episodeList = episodeObj.episodeList;
				var $mod_episode = $(".mod_episode");
				try{
					if($mod_episode.attr("data-tpl")=="episode"){
						$mod_episode.find(".item").each(function(){
							var $a = $(this).find("a");
							var href = $a.attr("href");
							if(!!href){
								href = "https://v.qq.com"+href;
								var aText = $a.text();
								aText = aText.replace(/\s/g,"");
	    						episodeList.push({"aText":aText, "href":href, "description":""});
							}
						});
					}
				}catch(e){}
				//加入油猴缓存
				episodeObj.websiteTitle="qq";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
					episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			},100);
		};
		if(window_host==="www.iqiyi.com"){
			var episodeObj = movievipHelper.paramsSelectedInit();
			var episodeList = episodeObj.episodeList;
			var $i71playpagesdramalist = $("div[is='i71-play-ab']");
			if($i71playpagesdramalist.length!=0){
				var data =  $i71playpagesdramalist.attr(":page-info");
				if(!!data){
					var dataJson = JSON.parse(data);
					var barTotal = 1;
					var albumId = dataJson.albumId;
					console.log("albumId=",albumId);
					try{
						var $barlis = $(".qy-episode-tab").find(".bar-li");
						barTotal = $barlis.length;
						if(barTotal==0) barTotal=1;
					}catch(e){}
					//获取具体数据
					for(var page=1; page<=barTotal;  page++){
						try{
							GM_xmlhttpRequest({
								url: "https://pcw-api.iqiyi.com/albums/album/avlistinfo?aid="+albumId+"&page="+page+"&size=30",
							  	method: "GET",
							  	headers: {"Content-Type": "application/x-www-form-urlencoded"},
							  	onload: function(response) {
									var status = response.status;
									if(status==200||status=='200'){
										var serverResponseJson = JSON.parse(response.responseText);
										var code = serverResponseJson.code;
										if(code=="A00000"){
											var serverEpsodelist = serverResponseJson.data.epsodelist;
											//console.log(serverEpsodelist)
											for(var i=0; i<serverEpsodelist.length; i++){
												var aText = serverEpsodelist[i].order;
												var href = serverEpsodelist[i].playUrl;
												var description = serverEpsodelist[i].subtitle;
												episodeList.push({"aText":aText, "href":href, "description":description});
											}
											//加入油猴缓存
											if(episodeList.length!=0){
												episodeObj.episodeList=episodeList;
											}
											episodeObj.websiteTitle="iqiyi";
											episodeObj.originVideoUrl=window_url;
											GM_setValue("episodeObj",episodeObj);
										}
									}
							  	}
							});
						}catch(err){}
						setTimeout(function(){}, 500);
					}
					episodeObj.websiteTitle="iqiyi";
					episodeObj.originVideoUrl=window_url;
					GM_setValue("episodeObj",episodeObj);
				}
			}
		};
		if(window_host==="www.mgtv.com"){
			var episodeObj = movievipHelper.paramsSelectedInit();
			var episodeList = episodeObj.episodeList;
			setTimeout(function(){
				$("body").find(".aside-tabbox").each(function(){
					$(this).find("li").each(function(){
	    				var $a = $(this).find("a");
						var href = $a.attr("href");
						var aText = $(this).text();
						if(!!href && aText.indexOf("预告")==-1){
							href = "https://www.mgtv.com"+href;
							aText = aText.replace("VIP","");
							episodeList.push({"aText":aText, "href":href, "description":""});
						}
					});
				});
				//加入油猴缓存
				episodeObj.websiteTitle="mgtv";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
					episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			},1000);
		};
		if(window_host==="v.youku.com"){
			function youku_select(){
				var episodeObj = movievipHelper.paramsSelectedInit();
				var episodeList = episodeObj.episodeList;
				$(".anthology-content-scroll").find(".anthology-content").find(".box-item").each(function(){
					var title = $(this).attr("title");
					var href = $(this).attr("href");
					
					var $markText = $(this).find(".mark-text");
					if($markText.length==0 || "预告".indexOf($markText.text)==-1){
						if(!!href){
							var aText = title;
							var arr = aText.split(" ");
							if(arr.length>=2) aText = arr[arr.length-1];
							aText = aText.replace(/[^0-9]/ig,"");
							
							if(!!aText){
								episodeList.push({"aText":aText, "href":href, "description":title});
								//console.log({"aText":aText, "href":href, "description":title})
							}
						}
					}
				});
				//加入油猴缓存
				episodeObj.websiteTitle="youku";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
	    			episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			}
			youku_select();
			setInterval(function(){
				youku_select();
			}, 600);
		};
		if(window_host==="tv.sohu.com"){
			var episodeObj = movievipHelper.paramsSelectedInit();
			var episodeList = episodeObj.episodeList;
			setTimeout(function(){
				var $jlistwrap = $(".j-list-wrap");
				if(!!$jlistwrap){
					$jlistwrap.find("li").each(function(){
						var $a = $(this).find("a");
						if(!!$a){
							var aText = $(this).attr("data-order");
							var href = $a.attr("href");
							var title = $a.attr("data-title");
							if(!!aText && !!href){
								href = "https"+href;
								episodeList.push({"aText":aText, "href":href, "description":title});
								//console.log({"aText":aText, "href":href, "description":title});
							}
						}
					});
				}
				//加入油猴缓存
				episodeObj.websiteTitle="sohu";
				episodeObj.originVideoUrl=window_url;
				if(episodeList.length!=0){
	    			episodeObj.episodeList=episodeList;
	    		}
				GM_setValue("episodeObj",episodeObj);
			},1000);
		};
	};
	movievipHelper.movieWebsitesPlayersSelected=function(){//支持电视剧选集
		if(window_url.indexOf("showxi.xyz")!=-1){
			var innerCss=
				`
				#plugin_congcongguoke_episode_box{overflow:auto;font-size:14px!important;text-align:left!important;}
				#plugin_congcongguoke_episode_box .tip{padding:5px;}
				#plugin_congcongguoke_episode_box .episode-items> a{display:inline-block;width:25px;height:25px;text-align:center;line-height:25px;border:1px dashed #000;color:#000;margin:5px;text-decoration:none;cursor:pointer;}
				#plugin_congcongguoke_episode_box .episode-items> a:hover{border:1px dashed #FF5302;color:#FF5302;}
				#plugin_congcongguoke_episode_box .episode-items> .active{border:1px dashed #FF5302;color:#FF5302;}
				`;
			$("body").prepend("<style>"+innerCss+"</style>");
			var episodeObj = GM_getValue("episodeObj");
			if(!!episodeObj){
				var episodeList = episodeObj.episodeList;
				if(!!episodeList && episodeList.length!=0){
					episodeList.sort((d1, d2)=>{  //排序
						var aText1 = d1.aText;
						var aText2 = d2.aText;
						var aText1Value = parseInt(aText1);
						var aText2Value = parseInt(aText2);
						if(isNaN(aText1Value) || isNaN(aText2Value)){
							return 0;
						}else{
							return aText1Value-aText2Value;
						}
					});
					
					var websiteTitle = episodeObj.websiteTitle;
					var currentvideourl = GM_getValue("currentvideourl");
					var originVideoUrl=episodeObj.originVideoUrl;
					var waiturl="";
					var aclass="";
					
					var html = "<div id='plugin_congcongguoke_episode_box'>";
					html += "<div class='tip'><b>电视剧点击集数，可自由选集，<a href='"+originVideoUrl+"'>点我返回原视频</a></b></div>";
					html += "<div class='episode-items'>";
					for(var i=0; i<episodeList.length; i++){
						waiturl=episodeList[i].href;
						aclass="plugin-episode";
						if(window_url.indexOf(waiturl)!=-1 || (currentvideourl==waiturl && websiteTitle=="iqiyi")){
							aclass = aclass +" "+"active";
						}
						html+= "<a class='"+aclass+"' data-href='"+waiturl+"' title='"+episodeList[i].description+"'>"+episodeList[i].aText+"</a>";
					}
					html += "</div>";
					html += "</div>";
					
					let insertHtmlInterval = setInterval(function(){
						var $selectContainer = $("#palyer-iframe");
						if($selectContainer.length!=0){
							$selectContainer.after(html);
							clearInterval(insertHtmlInterval)
						}
					}, 100);
					
				}
			}
			$("body").on("click", ".plugin-episode", function(){
				var href=$(this).data("href");
				if(!!href){
					movievipHelper.comprehensiveAnalysis(href, false);
				}
			});			
		}
	};
	movievipHelper.start=function(){
    	if(movievipHelper.isRun() && window.top==window.self){
    		movievipHelper.getServerSource();
			movievipHelper.adAccelerate();
			movievipHelper.getSelected();
    	}
		movievipHelper.movieWebsitesPlayersSelected();
    };
	if(isOpenVideoVipModule){
		movievipHelper.start();
	}
	
	/**
	 * 知乎助手开始
	 */
	const zhihuHelper={};
	zhihuHelper.autoJumpTarget = function(){ //直接跳转到目标网页
		var regexResult = location.search.match(/target=(.+?)(&|$)/);
		if(regexResult && regexResult.length==3){
			location.href = decodeURIComponent(regexResult[1]);
		}
	};
	zhihuHelper.clearAdvert = function(){  //去除广告，可能造成误伤，用最小策略
		setInterval(function(){
			var ad1 = document.querySelector('.AppBanner');
			if (ad1!=="undefined" && ad1!==null) {
			    ad1.style.display = "none";
			}
			var ad2 = document.querySelector('.AdblockBanner');
			if (ad2!=="undefined" && ad2!==null) {
			    ad2.style.display = "none";
			}
		}, 1000);
	};
	zhihuHelper.changeHeightQualityPic = function(){ //图片自动高清
		setInterval(function(){
			$("body").find("img").each(function(){
				var dataoriginal = $(this).attr("data-original");
				if(!!dataoriginal){
					$(this).attr("src", dataoriginal);
				}
			});
		}, 500);
	};
	zhihuHelper.noLoginBox = function(){ //去除登录提示
		var IntervalUnit = 200;
		var totalIntervalMs = 0;
		var loginInterval = setInterval(function(){
			$(".signFlowModal").children(".Modal-closeButton").click();
			totalIntervalMs += IntervalUnit;
			if(totalIntervalMs >= 2000){  //循环多次，我就不信还显示
				clearInterval(loginInterval);
			}
		}, IntervalUnit); 
		$(".AppHeader-login").click(function(){
			clearInterval(loginInterval);
			$(".Modal-wrapper").show();
		});
	};
	zhihuHelper.markQuestionDate = function(){  //标注回答时间
		//DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss")
		function DateFormat(time, format) {  //时间格式化
		    var o = {
		        "M+": time.getMonth() + 1, //月份 
		        "d+": time.getDate(), //日 
		        "h+": time.getHours(), //小时 
		        "m+": time.getMinutes(), //分 
		        "s+": time.getSeconds(), //秒 
		        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
		        "S": time.getMilliseconds() //毫秒 
		    };
		    if(/(y+)/.test(format)){
				format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
		    for(var k in o){
		        if(new RegExp("(" + k + ")").test(format)){
		            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
		    return format;
		}
		
		function addDateQuestion() { //为问题添加创建时间和编辑时间
			var title = document.querySelector(".QuestionPage");
			if(!!title){
				var dateCreated = title.querySelector("[itemprop~=dateCreated][content]").content;
				var dateModified = title.querySelector("[itemprop~=dateModified][content]").content;
				var createDate = DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
				var editDate = DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
				
				var side = title.querySelector(".QuestionHeader-side");
				var timeDiv = document.createElement('div');
				timeDiv.innerHTML = `<p>创建于:&nbsp;${createDate}</p><p>编辑于:&nbsp;${editDate}</p>`;
				timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;';
				side.appendChild(timeDiv);
			}
		}
		
		let listNum = 0;
		function addTimeAnswerItems() { //为回答添加创建时间和编辑时间
			var list = document.querySelectorAll(".ContentItem");
			if (listNum != list.length) {
				listNum = list.length;
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					if (item.getAttribute('zh_date_mk') === 'true') {
						continue;
					}
					var dateCreated = item.querySelector("[itemprop~=dateCreated][content]").content;
					var dateModified = item.querySelector("[itemprop~=dateModified][content]").content;
					var createDate = DateFormat(new Date(dateCreated), "yyyy-MM-dd hh:mm:ss");
					var editDate = DateFormat(new Date(dateModified), "yyyy-MM-dd hh:mm:ss");
						
					var sideItem = item.querySelector(".css-h5al4j");
					var timeDiv = document.createElement('span');
					timeDiv.innerHTML = `<p>创建于:&nbsp;${createDate}&nbsp;&nbsp;&nbsp;编辑于:&nbsp;${editDate}</p>`;
					timeDiv.class = "Voters";
					timeDiv.style.cssText = 'color:#6f6f6f;font-size:13px;display:block;padding:5px 0px;';
					sideItem.appendChild(timeDiv);
					item.setAttribute('zh_date_mk', 'true');
				}
			}
		}
		addDateQuestion();
		document.querySelector(".Question-main").addEventListener('DOMNodeInserted', addTimeAnswerItems);
	};
	zhihuHelper.autoExpandQuestionInfo = function(){ //问题全部展开
		var mm0 = document.querySelector('.QuestionRichText-more');
		if(mm0!=="undefined" && mm0!==null) { //展开问题描述
			mm0.click();
		}
		var mm1 = document.querySelector('.SignContainer-content');
		if(mm1!=="undefined" && mm1!==null) {
			var c1 = document.querySelector('.Modal-backdrop');
			if (c1!=="undefined" && c1!==null) {
				c1.click();
			}
			var c2 = document.querySelector('.Modal-closeButton');
			if (c2!=="undefined" && c2!==null) {
				c2.click();
			}
		}
	};
	zhihuHelper.downloadVideo = function(){ //知乎视频下载
		
	};
	zhihuHelper.start = function(){
		//直接跳转到目标网页
	    if(window_host == "link.zhihu.com"){ 
	    	this.autoJumpTarget();
		}
		//知乎正文
		if(window_host.indexOf("zhihu.com")!=-1){
		    if(window_url.indexOf("https://www.zhihu.com/question/") != -1){
		        this.autoExpandQuestionInfo();     //问题全部展开
	    		this.markQuestionDate();           //问题日期
		    }
		    this.noLoginBox();     //去除登录框
		    this.clearAdvert();    //去除广告
		}
	};
	if(isOpenZhihuModule){
		zhihuHelper.start();
	}
	
	/**
	 * 优惠券查询
	 */
	var goodsCoupon={};
	goodsCoupon.getPlatform=function(){
		var couponUrl = window.location.href;
		var platform="";
		if(couponUrl.indexOf("suning.com")!=-1){
			platform = "suning";
		}else if(couponUrl.indexOf("detail.tmall")!=-1){
			platform = "tmall";
		}else if(couponUrl.indexOf("item.taobao.com")!=-1){
			platform = "taobao";
		}else if(couponUrl.indexOf("item.jd.com")!=-1 || couponUrl.indexOf("item.yiyaojd.com")!=-1 || couponUrl.indexOf("npcitem.jd.hk")!=-1){
			platform = "jd";
		}else if(couponUrl.indexOf("detail.vip.com")!=-1){
			platform = "vpinhui";
		}else if(couponUrl.indexOf("mobile.yangkeduo.com")!=-1){
			platform = "pdd";
		}
		return platform;
	}
	goodsCoupon.filterStr = function(str){
		if(!str) return "";
		str = str.replace(/\t/g,"");
		str = str.replace(/\r/g,"");
		str = str.replace(/\n/g,"");
		str = str.replace(/\+/g,"%2B");//"+"
		str = str.replace(/\&/g,"%26");//"&"
		str = str.replace(/\#/g,"%23");//"#"
		return encodeURIComponent(str)
	};
	goodsCoupon.getGoodsData=function(platform){
		var goodsId = "";
		var goodsName = "";
		var websiteUrl = window.location.href;
		if(platform=="taobao"){
			goodsId = this.getQueryString("id");
			goodsName=$(".tb-main-title").text();
			
		}else if(platform=="tmall"){
			goodsId = this.getQueryString("id");
			goodsName=$(".tb-detail-hd").text();
			
		}else if(platform=="jd"){
			goodsName=$("div.sku-name").text();
			goodsId = this.getQueryStringByUrl(websiteUrl);
			
		}else if(platform=="suning"){
			var text = $("#itemDisplayName").text();
			if(!!text){
				text = text.replace("苏宁超市","");
				text = text.replace("自营","");
			}
			goodsName=text;
			goodsId = this.getQueryStringByUrl(websiteUrl);
			
		}else if(platform=="vpinhui"){
			goodsId = this.getQueryStringByUrl(websiteUrl).replace("detail-","");
			goodsName = $(".pib-title-detail").text();
			
		}else if(platform=="pdd"){
			goodsId = this.getQueryString("goods_id");
			goodsName = $(".enable-select").text();
		}
		var data={"goodsId":goodsId, "goodsName":this.filterStr(goodsName)}
		return data;
	};
	goodsCoupon.createHtml = function(platform, goodsId, goodsName){
		if(!platform || !goodsId) return;
		var goodsCouponUrl = "https://t.mimixiaoke.com/api/plugin/hit/v2?script=1&";
		if(platform==="jd"){
			goodsCouponUrl = "http://t.jtm.pub/api/platform/jd/coupon?itemId="+goodsId+"&q="+goodsName+"&content=&no=1";
		}else{			
			if(platform!=="vpinhui"){
				goodsCouponUrl = goodsCouponUrl+"platform="+platform+"&id="+goodsId+"&q="+goodsName;
			}else{
				var vip = goodsId.split("-");
				var vaddition = vip[0];
				var vid = vip[1];
				goodsCouponUrl = goodsCouponUrl+"platform="+platform+"&id="+vid+"&q="+goodsName+"&addition="+vaddition;
			}		
		}
		GM_xmlhttpRequest({
			url: goodsCouponUrl,
		  	method: "GET",
		  	headers: {"Content-Type": "application/x-www-form-urlencoded"},
		  	onload: function(response) {
				var status = response.status;
				if(status==200||status=='200'){
					//console.log(response.responseText);
					var serverResponseJson = JSON.parse(response.responseText);
					var data = serverResponseJson.data;
					if(!data || data==="null"){
						return;
					}
					var cssText = data.css;
					var htmlText = data.html;
					var handler = data.handler;
					if(!cssText || !htmlText || !handler){
						return;
					}
					$("body").prepend("<style>"+cssText+"</style>");
					var handlers = handler.split("@");
					for(var i=0; i<handlers.length; i++){
						var $handler = $(""+handlers[i]+"");
						if(platform=="taobao"){
							$handler.parent().after(htmlText);
						}else if(platform=="tmall"){
							$handler.parent().after(htmlText);
						}else if(platform=="jd"){
							$handler.after(htmlText);
						}else if(platform=="suning"){
							$handler.parent().after(htmlText);
						}else if(platform=="vpinhui"){
							$handler.parent().after(htmlText);
						}else if(platform=="pdd"){
							$handler.after(htmlText);
						}					
					}
				}
		  	}
		});
	};
	goodsCoupon.getQueryString = function(tag) {
		var t = new RegExp("(^|&)" + tag + "=([^&]*)(&|$)");
		var a = window.location.search.substr(1).match(t);
		if (a != null) return a[2];
		return "";
	};
	goodsCoupon.getQueryStringByUrl = function(url) {
		if(url.indexOf("?")!=-1){
			url = url.split("?")[0]
		}
		if(url.indexOf("#")!=-1){
			url = url.split("#")[0]
		}
		var splitText = url.split("/");
		var idText = splitText[splitText.length-1];
		idText = idText.replace(".html","");
		return idText;
	};
	goodsCoupon.start = function(){
		var platform = this.getPlatform();
		if(!platform) return;
		var delayMS = 0;
		if(platform=="vpinhui"){ //唯品会采用了异步加载
			var vipInterval = setInterval(function(){
				if($(".pib-title-detail").length!=0 || delayMS>=1200){
					var goodsData = goodsCoupon.getGoodsData(platform);
					goodsCoupon.createHtml(platform, goodsData.goodsId, goodsData.goodsName);
					clearInterval(vipInterval)
				}
				delayMS+=100;
			},100);
		}else{
			var goodsData = goodsCoupon.getGoodsData(platform);
			goodsCoupon.createHtml(platform, goodsData.goodsId, goodsData.goodsName);
		}
	};	
	if(isOpenGoodsCouponModule){
		goodsCoupon.start();
	}
	
	/**
	 * CSDN使用增强
	 */
	const csdnHelper={};
	csdnHelper.isRun=function(){
		if(window_host.indexOf("csdn.")!=-1){
			return true;
		}
		return false;
	};
	csdnHelper.start = function(){
		if(!this.isRun()){
			return;
		}
		if((window_host==="blog.csdn.net" || window_host==="csdnnews.blog.csdn.net") && window_url.indexOf("article/details")!=-1){ //csdn文章详情页
			setInterval(function(){
				$("#footerRightAds").remove();     //移除左侧google广告
				$(".side-question-box").remove();  //移除右侧那个学习弹框
				$("div[id^='dmp_ad']").remove();
				
				$("div[class^='ad_']").remove();
				$("div[id^='floor-ad_']").remove();
				
				$('.toolbar-advert').remove();
				$('#recommendAdBox').remove();
			},500);
			//未登录查看全部评论
			$(".comment-list-box").css({
				"overflow": "auto",
				"max-height":1000
			});
		}
		csdn.copyright.init("", "", ""); //去除剪贴板劫持
		localStorage.setItem("anonymousUserLimit", ""); // 免登陆
		$("#content_views").unbind("click");//移除url拦截
	};
	if(isOpenCsdnModule){
		csdnHelper.start();
	}
})();

/**
 * 作者备注：
 * 王超先生的知乎视频下载脚本代码非常精炼，我认为此功能不需要再二次编写了
 * 此部分代码已获得原作者授权同意，并符合MIT协议，请知悉！
 * 
 * 下载知乎视频，作者：王超， 脚本链接：https://greasyfork.org/zh-CN/scripts/39206
 * 版本：1.20
 * 版权归原作者所有
 */

(async () => {
  if (window.location.host == 'www.zhihu.com') return;
 
  const playlistBaseUrl = 'https://lens.zhihu.com/api/v4/videos/';
  // const videoBaseUrl = 'https://video.zhihu.com/video/';
  const videoId = window.location.pathname.split('/').pop(); // 视频id
  const menuStyle = 'transform:none !important; left:auto !important; right:-0.5em !important;';
  const playerId = 'player';
  const coverSelector = '#' + playerId + ' > div:first-child > div:first-child > div:nth-of-type(2)';
  const controlBarSelector = '#' + playerId + ' > div:first-child > div:first-child > div:last-child > div:last-child > div:first-child';
  const svgDownload = '<path d="M9.5,4 H14.5 V10 H17.8 L12,15.8 L6.2,10 H9.5 Z M6.2,18 H17.8 V20 H6.2 Z"></path>';
  const player = document.getElementById(playerId);
  // const resolutions = {'普清': 'ld', '标清': 'sd', '高清': 'hd', '超清': 'fhd'};
  const resolutions = [
    {ename: 'ld', cname: '普清'},
    {ename: 'sd', cname: '标清'},
    {ename: 'hd', cname: '高清'},
    {ename: 'fhd', cname: '超清'}
  ];
  let videos = []; // 存储各分辨率的视频信息
 
  function fetchRetry (url, options = {}, times = 1, delay = 1000, checkStatus = true) {
    return new Promise((resolve, reject) => {
      // fetch 成功处理函数
      function success (res) {
        if (checkStatus && !res.ok) {
          failure(res);
        }
        else {
          resolve(res);
        }
      }
 
      // 单次失败处理函数
      function failure (error) {
        if (--times) {
          setTimeout(fetchUrl, delay);
        }
        else {
          reject(error);
        }
      }
 
      // 总体失败处理函数
      function finalHandler (error) {
        throw error;
      }
 
      function fetchUrl () {
        return fetch(url, options)
          .then(success)
          .catch(failure)
          .catch(finalHandler);
      }
 
      fetchUrl();
    });
  }
 
  // 下载指定url的资源
  async function downloadUrl (url, name = (new Date()).valueOf() + '.mp4') {
    // Greasemonkey 需要把 url 转为 blobUrl
    if (GM_info.scriptHandler === 'Greasemonkey') {
      const res = await fetchRetry(url);
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
    }
 
    // Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制
    if (window.GM_download) {
      GM_download({url, name});
    }
    else {
      // firefox 需要禁用 CSP, about:config -> security.csp.enable => false
      let a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.style.display = 'none';
      // a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
 
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  }
 
  // 格式化文件大小
  function humanSize (size) {
    let n = Math.log(size) / Math.log(1024) | 0;
    return (size / Math.pow(1024, n)).toFixed(0) + ' ' + (n ? 'KMGTPEZY'[--n] + 'B' : 'Bytes');
  }
 
  if (!player) return;
 
  // 获取视频信息
  const res = await fetchRetry(playlistBaseUrl + videoId, {
    headers: {
      'referer': 'refererBaseUrl + videoId',
      'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20' // in zplayer.min.js of zhihu
    }
  }, 3);
  const videoInfo = await res.json();
 
  // 获取不同分辨率视频的信息
  for (const [key, video] of Object.entries(videoInfo.playlist)) {
    video.name = key.toLowerCase();
	var resolution = resolutions.find(v => v.ename === video.name);
	video.cname = resolution ? resolution.cname : "";
    if (!videos.find(v => v.size === video.size)) {
      videos.push(video);
    }
  }
 
  // 按格式大小排序
  videos = videos.sort(function (v1, v2) {
    const v1Index = resolutions.findIndex(v => v.ename === v1.name);
    const v2Index = resolutions.findIndex(v => v.ename === v2.name);
 
    return v1Index === v2Index ? 0 : (v1Index > v2Index ? 1 : -1);
    // return v1.size === v2.size ? 0 : (v1.size > v2.size ? 1 : -1);
  }).reverse();
 
  document.addEventListener('DOMNodeInserted', (evt) => {
    const domControlBar = evt.relatedNode.querySelector(':scope > div:last-child > div:first-child');
    if (!domControlBar || domControlBar.querySelector('.download')) return;
 
    const domFullScreenBtn = domControlBar.querySelector(':scope > div:nth-last-of-type(1)');
    const domResolutionBtn = Array.from(domControlBar.querySelectorAll(':scope > div')).filter(el => el.innerText.substr(1, 1) === '清')[0];
    let domDownloadBtn, defaultResolution, buttons;
    if (!domFullScreenBtn || !domFullScreenBtn.querySelector('button')) return;
 
    // 克隆分辨率菜单或全屏按钮为下载按钮
    domDownloadBtn = (domResolutionBtn && (domResolutionBtn.className === domFullScreenBtn.className))
      ? domResolutionBtn.cloneNode(true)
      : domFullScreenBtn.cloneNode(true);
 
    defaultResolution = domDownloadBtn.querySelector('button').innerText;
 
    // 生成下载按钮图标
    domDownloadBtn.querySelector('button:first-child').outerHTML = domFullScreenBtn.cloneNode(true).querySelector('button').outerHTML;
    domDownloadBtn.querySelector('svg').innerHTML = svgDownload;
    domDownloadBtn.className = domDownloadBtn.className + ' download';
 
    buttons = domDownloadBtn.querySelectorAll('button');
 
    // button 元素添加对应的下载地址属性
    buttons.forEach(dom => {
      const video = videos.find(v => v.cname === dom.innerText) || videos[videos.length - 1];
 
      dom.dataset.video = video.play_url;
      if (dom.innerText) {
        (dom.innerText = `${dom.innerText} (${humanSize(video.size)})`);
      }
      else if (buttons.length == 1) {
        dom.nextSibling.querySelector('div').innerText = humanSize(video.size);
      }
    });
 
    // 鼠标事件 - 显示菜单
    domDownloadBtn.addEventListener('pointerenter', () => {
      const domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
      if (domMenu) {
        domMenu.style.cssText = menuStyle + 'opacity:1 !important; visibility:visible !important';
      }
    });
 
    // 鼠标事件 - 隐藏菜单
    domDownloadBtn.addEventListener('pointerleave', () => {
      const domMenu = domDownloadBtn.querySelector('div:nth-of-type(1)');
      if (domMenu) {
        domMenu.style.cssText = menuStyle;
      }
    });
 
    // 鼠标事件 - 选择菜单项
    domDownloadBtn.addEventListener('pointerup', event => {
      let e = event.srcElement || event.target;
 
      while (e.tagName !== 'BUTTON') {
        e = e.parentNode;
      }
 
      downloadUrl(e.dataset.video);
    });
 
    // 显示下载按钮
    domControlBar.appendChild(domDownloadBtn);
  });
})();