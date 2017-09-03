import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api/request'
import querystring from 'querystring'
import config from './config/config.js'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Divider, Subheader, List, ListItem, AppBar, MuiThemeProvider, FontIcon, BottomNavigation, BottomNavigationItem, Paper, Avatar
} from 'material-ui'
import { Link, BrowserRouter, Route } from 'react-router-dom'




class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            api_rank: {
                female: [],
                male: []
            },
            api_categories: {}
        }
    }

    _getCurrentPage() {
        switch (this.state.selectedIndex) {
            case 0: {
                return this._renderBookShelves();
            }
            case 1: {
                return this._renderBookRank();
            } break;
            case 2: {
                return this._renderBookCategory();
            } break;
        }
        return this._renderBookShelves();
    }

    select(index) {
        this.setState({ selectedIndex: index });
    }

    componentDidMount() {
        console.log("start-");
        console.log(this.refs.e_header)
    }
    /**
     * 渲染书架
     */
    _renderBookShelves() {
        return (
            <List className="App-layout-list">
                <ListItem
                    leftAvatar={<Avatar src="http://www.material-ui.com/images/grid-list/honey-823614_640.jpg" />}
                    rightIcon={<FontIcon className="material-icons">书架</FontIcon>}
                    primaryText="Photos"
                    secondaryText="Jan 9, 2014"
                />
            </List>
        );
    }
    /**
     * 请求分类信息
     */
    _requestApiCategory() {
        api.categories().then(res => {
            const data = res.data.data;
            if (querystring.stringify(data) == querystring.stringify(this.state.api_categories)) {
                return;
            }
            this.setState({
                api_categories: data
            });
            // api_categories

        });
    }
    /**
     * 渲染分类
     */
    _renderBookCategory() {
        this._requestApiCategory();
        const itemRender = (items) => {
            var _items = [];
            // console.log(items)
            const _render = (its, index, _gender) => {
                var __items = [];
                for (var i in its) {
                    const item = its[i];
                    // console.log(item)

                    // __items.push(<Divider inset={true} key={index + "_" + i+"_divider"}/>);
                    __items.push(<Link
                        key={index + "_" + i}
                        to={"/books/category?" + querystring.stringify({
                            major: item.name,
                            gender: _gender
                        })}>
                        <ListItem
                            primaryText={item.name}
                            leftAvatar={<Avatar backgroundColor="#00000000" />}
                            secondaryText={"共有" + item.bookCount + "本"}
                        /></Link>);
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
            <List className="App-layout-list">
                {itemRender(this.state.api_categories)}
            </List>
        );
    }
    /**
     * 请求排行榜信息
     */
    _requestApiRank() {
        api.rankCategory().then(res => {
            const data = res.data.data;
            if (querystring.stringify(data) == querystring.stringify(this.state.api_rank)) {
                console.log(data)

                return;
            }
            this.setState({ api_rank: data })
        })
    }
    /**
     * 渲染排行榜
     */
    _renderBookRank() {
        this._requestApiRank();
        const itemRender = (items, _gender) => {
            var _items = [];
            const _render = (its) => {
                const __items = [];
                for (var i in its) {
                    const item = its[i];
                    // console.log(item)
                    __items.push(<Link
                        key={item._id}
                        to={{
                            pathname: "/books/rank?" + querystring.stringify({
                                gender: _gender,
                                ...item
                            }),
                        }}><ListItem
                            leftAvatar={<Avatar src={config.hostUriRes + item.cover} />}
                            primaryText={item.title}
                        /></Link>);
                    __items.push(<Divider key={item._id + "_divider"} />);
                }
                return __items;
            };
            _items.push(<Subheader key="0">男生榜</Subheader>)
            _items.push(_render(items.male, "male"));
            _items.push(<Subheader key="1">女生榜</Subheader>)
            _items.push(_render(items.female, "female"));
            return _items;
        };
        return (
            <List className="App-layout-list">
                {itemRender(this.state.api_rank)}
            </List>
        );
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div style={{
                    height: document.documentElement.clientHeight
                }} className="App-layout">
                    <Paper zDepth={1}><AppBar ref="e_header" title="novel-reader-samples" /></Paper>
                    <div className="App-layout-content">
                        {this._getCurrentPage()}

                    </div>
                    <Paper zDepth={1}>
                        <BottomNavigation selectedIndex={this.state.selectedIndex}>
                            <BottomNavigationItem
                                label=""
                                icon={<FontIcon className="material-icons">书架</FontIcon>}
                                onClick={() => this.select(0)}
                            />
                            <BottomNavigationItem
                                label=""
                                icon={<FontIcon className="material-icons">排行榜</FontIcon>}
                                onClick={() => this.select(1)}
                            />
                            <BottomNavigationItem
                                label=""
                                icon={<FontIcon className="material-icons">分类</FontIcon>}
                                onClick={() => this.select(2)}
                            />
                        </BottomNavigation>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
