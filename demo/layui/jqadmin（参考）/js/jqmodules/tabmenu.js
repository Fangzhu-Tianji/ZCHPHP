/*
 * @Author: Paco
 * @Date:   2017-01-31
 * @lastModify 2017-03-19
 * +----------------------------------------------------------------------
 * | jqadmin [ jq酷打造的一款懒人后台模板 ]
 * | Copyright (c) 2017 http://jqadmin.jqcool.net All rights reserved.
 * | Licensed ( http://jqadmin.jqcool.net/licenses/ )
 * | Author: Paco <admin@jqcool.net>
 * +----------------------------------------------------------------------
 */

layui.define(['jquery', 'elem'], function(exports) {
    var $ = layui.jquery,
        element = layui.elem(),
        device = layui.device(),
        tabMenu = function() {
            this.config = {
                item: '.jqadmin-tab-box',
                closed: true
            };
        },
        objTab = {};

    /**
     * [参数设置 options]
     */
    tabMenu.prototype.set = function(options) {
        if (typeof(options) == 'string' && options != "") {
            this.config.item = options;
        } else if (typeof(options) == 'object') {
            $.extend(true, this.config.config, options);
        }
        return this;
    };

    /**
     *@todo 初始化对象
     *@return 返回对象参数初始化结果
     */
    tabMenu.prototype.init = function() {

        var _this = this,
            config = _this.config,
            $container = $('' + config.item + ''),
            filter = $container.attr('lay-filter');

        if (filter === undefined || filter === '') {
            $container = $('' + config.item + '', window.parent.document);

            filter = $container.attr('lay-filter');
            if (filter === undefined || filter === '') {
                console.log('错误:请设置Tab菜单选项卡属性lay-filter过滤器');
            }
        }



        objTab.titleBox = $container.children('ul.layui-tab-title');
        objTab.contentBox = $container.children('div.layui-tab-content');
        objTab.tabFilter = filter;
        _this.hideRightMenu();
        if (device.ios || device.android) {
            _this.touch();
        } else {
            _this.drag();
        }
        return _this;
    }

    /**
     *@todo 检查页面是否已打开，如果已打开则返回索引值，否则返回-1
     *@param string title 打开页面的标题
     *@return int tab的索引值，元则返回-1
     */
    tabMenu.prototype.exited = function(title) {
        var tab_index = -1;
        if (objTab.titleBox === undefined) {
            this.init()
        }

        objTab.titleBox.find('li').each(function(i, e) {
            var $em = $(this).children('em');
            if ($em.text() === title) {
                tab_index = $(this).attr('lay-id');
            };
        });
        return tab_index;
    }

    /**
     *@todo 添加tab菜单选项卡
     *@param object data [ title 菜单选项卡标题
                          ,href 菜单URL地址
                          ,icon 菜单的ICON图标
                    ]
     */
    tabMenu.prototype.tabAdd = function(data, isFresh) {
        var tab_index = this.exited(data.title),
            _this = this;
        if (tab_index === -1) {
            var layID = new Date().getTime() //data.parent ? 'p' + lastTabIdIndex : lastTabIdIndex;
            var content = '<iframe src="' + data.href + '" data-id="' + layID + '" class="jqadmin-iframe"></iframe>';
            var title = '';

            // 如果icon有定义则添加到标题中
            if (data.icon !== undefined) {
                title += '<i class="iconfont ">' + data.icon + '</i>';
            }
            title += '<em>' + data.title + '</em>';
            if (this.config.closed) {
                title += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + layID + '">&#x1006;</i>';
            }

            //添加tab
            element.tabAdd(objTab.tabFilter, {
                title: title,
                content: content,
                id: layID,
                parent: data.parent
            });

            if (this.config.closed) {
                //监听关闭事件
                objTab.titleBox.find('li').children('i.layui-tab-close[data-id=' + layID + ']').on('click', function() {
                    element.tabDelete(objTab.tabFilter, $(this).parent('li').attr('lay-id'), data.parent);
                    _this.tabMove(1, 1);
                    element.init();
                });
            };

            this.tabMove(tab_index, 0);
            //切换到当前打开的选项卡
            element.tabChange(objTab.tabFilter, layID, data.parent);


            //监听鼠标右键事件
            objTab.titleBox.find('li:not([bind])').on('contextmenu', function(event) {
                $(this).attr("bind", 1);
                var layId = $(this).attr('lay-id');
                var e = event || window.event;
                $('body').find("ul.right-click-menu").remove();

                var rightMenuHtml = "<ul class='right-click-menu' lay-id='" + layId + "'><li><a href='javascript:;' data-event='fresh'>刷新</a></li><li><a href='javascript:;' data-event='close'>关闭</a></li><li><a href='javascript:;' data-event='other'>关闭其它</a></li><li><a href='javascript:;' data-event='all'>全部关闭</a></li></ul>";
                $(rightMenuHtml).css({ "top": e.pageY, "left": e.pageX }).prependTo('body');
                $('body').find("ul.right-click-menu").find("a").on('click', { _this: _this }, _this.rightMenuEvent);
                return false;
            });

        } else {
            element.tabChange(objTab.tabFilter, tab_index, data.parent);
            this.tabMove(tab_index, 0);
            if (isFresh) {
                _this.fresh(tab_index);
            }
        }
    }

    tabMenu.prototype.rightMenuEvent = function(event) {
        var _this = event.data._this;
        var event = $(this).data('event');
        var index = $(this).parents('.right-click-menu').attr('lay-id');
        $(this).parents('.right-click-menu').remove();
        switch (event) {
            case "close":
                if (index != 0) {
                    element.tabDelete(objTab.tabFilter, index);
                }

                break;

            case "other":
                objTab.titleBox.find('li').each(function(i, o) {
                    var layId = $(o).attr('lay-id');
                    if (layId != index && layId != 0) {
                        element.tabDelete(objTab.tabFilter, layId);
                    }
                })
                break;

            case "all":
                objTab.titleBox.find('li').each(function(i, o) {
                    var layId = $(o).attr('lay-id');
                    if (layId != 0) {
                        element.tabDelete(objTab.tabFilter, layId);
                    }
                })
                break;

            default:
                _this.fresh(index);
        }

        _this.tabMove(1, 1);
        element.init();
    }

    tabMenu.prototype.fresh = function(index) {
        element.tabChange(objTab.tabFilter, index);
        var othis = objTab.titleBox.find('>li[lay-id="' + index + '"]'),
            index = othis.parent().children('li').index(othis),
            parents = othis.parents('.layui-tab').eq(0),
            item = parents.children('.layui-tab-content').children('.layui-tab-item'),
            src = item.eq(index).find('iframe').attr("src");
        item.eq(index).find('iframe').attr("src", src);
    }

    tabMenu.prototype.hideRightMenu = function() {
        $(document).on('contextmenu', function(event) {
            $(this).find('.right-click-menu').remove();
        });
        $(document).on('click', function(event) {
            $(this).find('.right-click-menu').remove();
        })
    }

    /**
     *@todo 判断菜单选项卡是否已超出了总宽度，若超出则显示左右移动按钮，否则隐藏按钮
     *@param int index 大于等于0时表示菜单选项卡已经存在，才有移动的需求
     *@param int scene 为1时表示删除tab菜单选项卡，为0时表示切换或是添加菜单选项卡
     */
    tabMenu.prototype.tabMove = function(index, scene) {
        //取得屏幕总宽度
        var navWidth = parseInt(objTab.titleBox.parent('div').width());
        if ($(window).width() < 450) {
            navWidth = $(window).width();
        }
        //取得菜单选项卡总宽度
        var $tabNav = objTab.titleBox.find('li'),
            tab_all_width = 0;
        $tabNav.each(function(i, n) {
            tab_all_width += $(n).outerWidth(true);
        });

        if (!$tabNav[0]) { return }
        if (tab_all_width > navWidth + 1) {
            var ml = navWidth - tab_all_width - 54;
            if (ml < 0) {

                if (index >= 0) {
                    var current_tab_left = parseInt(objTab.titleBox.find('.layui-this').position().left),
                        curent_tab_ml = parseInt(objTab.titleBox.css("marginLeft")),
                        curent_ml = current_tab_left + parseInt(curent_tab_ml);
                    if (curent_ml <= 0) {
                        ml = 0 - current_tab_left;
                    } else {
                        var is_show = -(curent_tab_ml - navWidth + parseInt(objTab.titleBox.find('.layui-this').outerWidth(true)) + current_tab_left + 54);
                        if (is_show <= 0) {
                            ml = navWidth - current_tab_left - parseInt(objTab.titleBox.find('.layui-this').outerWidth(true)) - 54;
                        } else {
                            if (scene == 1 && parseInt(curent_tab_ml) < 0) {
                                ml = navWidth - current_tab_left - parseInt(objTab.titleBox.find('.layui-this').outerWidth(true)) - 54;

                                if (ml > 0) {
                                    ml = 0;
                                }
                            } else {
                                return;
                            }
                        }
                    }
                }
                objTab.titleBox.css({ "marginLeft": ml });
            }
            if (ml == 0 && tab_all_width < navWidth + 1) {
                objTab.titleBox.parent('div').find('.tab-move-btn').hide();
            } else {
                if ($(window).width() > 450) {
                    objTab.titleBox.parent('div').find('.tab-move-btn').show();
                }
            }
        } else {
            objTab.titleBox.parent('div').find('.tab-move-btn').hide();
            objTab.titleBox.css({ "marginLeft": 0 });
        }
    }


    tabMenu.prototype.drag = function() {
        var _this = this;
        objTab.titleBox.on("mousedown", function(e) {

            //取得屏幕总宽度
            var navWidth = parseInt(objTab.titleBox.parent('div').width());

            //取得菜单选项卡总宽度
            var $tabNav = objTab.titleBox.find('li'),
                tab_all_width = 0;
            $tabNav.each(function(i, n) {
                tab_all_width += $(n).outerWidth(true);
            });
            if (!$tabNav[0]) { return };
            if (tab_all_width > navWidth + 1) {
                var maxml = tab_all_width - navWidth + 54
                var _x = e.pageX - parseInt(objTab.titleBox.css("marginLeft")); //取得鼠标到标签左边left的距离

                objTab.titleBox.on("mousemove", function(e) {
                    x = e.pageX - _x;
                    if (x > 0) {
                        x = 0;
                    } else if (x < -maxml) {
                        x = -maxml;
                    }
                    objTab.titleBox.css({ "marginLeft": x });
                });

                $(document).on("mouseup", function(e) {
                    objTab.titleBox.off("mousemove");
                })
                return false;
            }

        });
    }

    tabMenu.prototype.touch = function() {
        var _this = this;
        objTab.titleBox.on("touchstart", function(e) {
            var touch = e.originalEvent.changedTouches[0];
            //取得屏幕总宽度
            var navWidth = parseInt(objTab.titleBox.parent('div').width());

            //取得菜单选项卡总宽度
            var $tabNav = objTab.titleBox.find('li'),
                tab_all_width = 0;
            $tabNav.each(function(i, n) {
                tab_all_width += $(n).outerWidth(true);
            });
            if (!$tabNav[0]) { return };
            if (tab_all_width > navWidth + 1) {
                var maxml = tab_all_width - navWidth + 54
                var _x = touch.pageX - parseInt(objTab.titleBox.css("marginLeft")); //取得鼠标到标签左边left的距离

                objTab.titleBox.on("touchmove", function(e) {
                    var touch = e.originalEvent.changedTouches[0],
                        x = touch.pageX - _x;
                    if (x > 0) {
                        x = 0;
                    } else if (x < -maxml) {
                        x = -maxml;
                    }
                    objTab.titleBox.css({ "marginLeft": x });
                });

                objTab.titleBox.on("touchend", function(e) {
                    objTab.titleBox.off("touchmove");
                })
            }

        });
    }

    exports('tabmenu', function(options) {
        var navtab = new tabMenu();
        return navtab.set(options)
    });
});