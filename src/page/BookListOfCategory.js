import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import api from '../api/request'
import querystring from 'querystring'
import config from '../config/config.js'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    IconButton, MenuItem, IconMenu, Drawer, RefreshIndicator, Divider, Subheader, List, ListItem, AppBar, MuiThemeProvider, FontIcon, BottomNavigation, BottomNavigationItem, Paper, Avatar
} from 'material-ui'
import { Link, BrowserRouter, Route } from 'react-router-dom'
import ActionSearch from 'material-ui/svg-icons/action/search'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
var _tempData = null;
/**
 * 
 */
export default class BookListOfCategory extends Component {

    constructor(props) {
        super(props);
        if (_tempData !== null)
            console.log(window.location.href)
        if (_tempData !== null) {
            /**
             * 防止数据重置
             */
            this.state = _tempData.state;
            this._count = _tempData._count;
            this._isLoadingBooks = _tempData._isLoadingBooks;
            this._requestParams = _tempData._requestParams;

            console.error("-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-==")
            console.log(this.state)
        } else {
            const qs = querystring.parse(window.location.search.replace("?", ""))
            this.state = {
                title: "书籍列表",
                books: [],
                gender: qs.gender,
                minor: qs.minor,
                major: qs.major,
                refreshIndicatorStatus: config.refreshIndicatorStatus.hide,
                drawerOpen: false,
                api_subCategories: {}
            }
            this._requestParams = {
                gender: this.state.gender,
                type: "hot",
                major: this.state.major,
                minor: this.state.minor,
                start: 0,
                limit: 20
            };
            /**
             * 书籍总量
             */
            this._count = -1;
            /**
             * 是否正在加载数据
             */
            this._isLoadingBooks = false;
        }
    }
    componentDidMount() {
        if (this.state.books.length == 0) {
            this._refreshTitle();
            this._requestNextBooks();
        }
    }
    componentWillUnmount() {
        _tempData = {
            state: this.state,
            _count: this._count,
            _isLoadingBooks: this._isLoadingBooks,
            _requestParams: this._requestParams,
            _window_location_href: window.location.href
        };
    }
    _refreshTitle() {
        if (this._requestParams.major === undefined && this._requestParams.minor !== undefined) {
            this.setState({
                title: this._requestParams.minor
            })
        } else if (this._requestParams.major !== undefined && this._requestParams.minor === undefined) {
            this.setState({
                title: this._requestParams.major
            })
        } else if (this._requestParams.major !== undefined && this._requestParams.minor !== undefined) {
            this.setState({
                title: this._requestParams.major + "-" + this._requestParams.minor
            })
        }
    }
    /**
     * 请求下一页数据
     */
    _requestNextBooks() {
        var _d = this._requestParams.start * this._requestParams.limit - this.state.books.length;
        if (this._count == -1 || this._count > this.state.books.length) {
            this.setState({
                refreshIndicatorStatus: config.refreshIndicatorStatus.loading
            });
            /**
             * 加载下一页
             */
            this._requestParams.start = this._count < 0 ? 0 : this._requestParams.start + 1;
            api.categoryInfo(this._requestParams.gender,
                this._requestParams.type,
                this._requestParams.major, this._requestParams.minor, this._requestParams.start, this._requestParams.limit)
                .then(res => {
                    this._count = res.data.data.total;
                    if (this._requestParams.start == 0) {
                        this.setState({
                            books: res.data.data.books
                        })
                    } else {
                        const _books = this.state.books;
                        const __books = res.data.data.books;
                        for (var i in __books) {
                            _books.push(__books[i]);
                        }
                        this.setState({
                            books: _books
                        })
                    }
                    this.setState({
                        refreshIndicatorStatus: config.refreshIndicatorStatus.hide
                    });
                    this._isLoadingBooks = false;
                }).catch(e => {
                    this.setState({
                        refreshIndicatorStatus: config.refreshIndicatorStatus.hide
                    });
                })
        } else {
            /**
             * 已经加载完毕
             */
            this.setState({
                refreshIndicatorStatus: config.refreshIndicatorStatus.hide
            });
            alert("已经加载到最后一页");
        }

    }
    /**
     * 
     */
    _refreshBooks() {
        this._count = -1;
        this.state.books = [];
        this._requestParams.start = 0;
        this._requestNextBooks();
    }
    /**
     * 渲染书籍列表
     */
    _renderBooks() {
        const itemRender = () => {
            const books = this.state.books;
            const _items = [];
            for (var i in books) {
                const item = books[i];
                // console.log(item)
                _items.push(<Link
                    key={i}
                    to={"/books/detail"}
                ><ListItem
                        leftAvatar={<Avatar size={50} backgroundColor={"#ffffff"} src={config.hostUriRes + "agent/" + item.cover} />}
                        primaryText={item.title}
                        secondaryTextLines={2}
                        secondaryText={
                            <p className="App-text-small">
                                <span style={{ color: "#0077ff", paddingRight: 2 }}>{item.author}</span>|<span style={{ paddingLeft: 2 }}>{config.renderNumber(item.latelyFollower) + "人气"}</span>
                                <br />
                                {item.shortIntro}
                            </p>
                        }
                    /></Link>)
            }
            return _items;
        };
        return (
            <List className="App-layout-list">
                {itemRender()}
            </List>
        );
    }

    /**
      * 请求分类信息
      */
    _requestApiSubCategory() {
        api.subCategories().then(res => {
            const data = res.data.data;
            if (querystring.stringify(data) == querystring.stringify(this.state.api_subCategories)) {
                return;
            }
            this.setState({
                api_subCategories: data
            });
            console.log(data)
            // api_categories

        });
    }
    /**
     * 渲染分类
     */
    _renderBookSubCategory() {
        this._requestApiSubCategory();
        const _renderSub = (its, _gender, _major) => {
            var __items = [];
            for (var i in its) {
                const item = its[i];
                // console.log(item)

                // __items.push(<Divider inset={true} key={index + "_" + i+"_divider"}/>);
                __items.push(
                    <ListItem
                        key={_gender + "_" + i}
                        primaryText={<span className="App-text-small">{item}</span>}
                        onClick={(event) => {
                            this._requestParams.gender = _gender;
                            this._requestParams.major = _major;
                            this._requestParams.minor = item;
                            this._refreshTitle();
                            this._refreshBooks();
                            this.setState({
                                drawerOpen: false
                            })
                        }}
                    />);
            }
            return __items;
        }
        const itemRender = (items) => {
            var _items = [];
            // console.log(items)
            const _render = (its, index, _gender) => {
                var __items = [];
                for (var i in its) {
                    const item = its[i];
                    // console.log(item)

                    // __items.push(<Divider inset={true} key={index + "_" + i+"_divider"}/>);
                    __items.push(
                        <ListItem
                            key={index + "_" + i}
                            primaryText={<span className="App-text-small">{item.major}</span>}
                            onClick={(event) => {
                                this._requestParams.gender = _gender;
                                if (this._requestParams.major !== item.major) {
                                    this.minor = "";
                                }
                                this._requestParams.major = item.major;
                                this._refreshTitle();
                                this._refreshBooks();
                                this.setState({
                                    drawerOpen: false
                                })
                            }}
                            initiallyOpen={false}
                            primaryTogglesNestedList={false}
                            nestedItems={_renderSub(item.mins, _gender, item.major)}
                        />);
                }
                return __items;
            }

            _items.push(<ListItem key="1"
                primaryText="男生分类"
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={_render(items.male, 1, "male")} />);
            _items.push(<Divider key={"1_divider"} />);
            _items.push(<ListItem key="2"
                primaryText="女生分类"
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={_render(items.female, 2, "female")} />);
            _items.push(<Divider key={"2_divider"} />);
            _items.push(<ListItem key="3"
                primaryText="漫画"
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={_render(items.picture, 3, "picture")} />);
            _items.push(<Divider key={"3_divider"} />);
            _items.push(<ListItem key="4"
                primaryText="出版物"
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={_render(items.press, 4, "press")} />);
            _items.push(<Divider key={"4_divider"} />);


            return _items;
        };
        return (
            <div>
                <Subheader key="0"><h3>分类筛选</h3></Subheader>
                <List className="App-layout-list">
                    {itemRender(this.state.api_subCategories)}
                </List>
            </div>
        );
    }

    render() {
        // api.categoryInfo()
        // api.categoryInfo("male",)

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div style={{
                    height: document.documentElement.clientHeight
                }} className="App-layout">
                    <Paper zDepth={1}><AppBar ref="e_header" title={this.state.title}
                        iconElementRight={<div><Link to={"/books/search"}><IconButton><ActionSearch color="#ffffff" /></IconButton></Link>
                            <IconMenu
                                iconButtonElement={
                                    <IconButton><MoreVertIcon color="#ffffff" />
                                    </IconButton>}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                                <MenuItem primaryText="刷新" onClick={(e) => {
                                    this._refreshTitle();
                                    this._refreshBooks();
                                }} />
                                <MenuItem primaryText="帮助" />
                                <MenuItem primaryText="Github" /></IconMenu>
                        </div>}
                        onLeftIconButtonTouchTap={(event) => {
                            this.setState({
                                drawerOpen: !this.state.drawerOpen
                            })
                        }} />
                        <Drawer
                            docked={false}
                            width={200}
                            open={this.state.drawerOpen}
                            onRequestChange={(open) => this.setState({ drawerOpen: open })}
                        >
                            {this._renderBookSubCategory()}

                        </Drawer>
                    </Paper>

                    <div className="App-layout-content"
                        onScroll={(event) => {
                            if (event.target.scrollHeight - event.target.scrollTop == event.target.clientHeight
                                && !this._isLoadingBooks) {
                                this._isLoadingBooks = true;
                                this._requestNextBooks();
                            }
                        }}>
                        {this._renderBooks()}

                    </div>
                    <div><RefreshIndicator
                        percentage={100}
                        size={50}
                        left={document.documentElement.clientWidth / 2 - 25}
                        top={document.documentElement.clientHeight - 60}
                        color="red" // Overridden by percentage={100}
                        status={this.state.refreshIndicatorStatus}
                    /></div>

                </div>
            </MuiThemeProvider >
        );
    }
}