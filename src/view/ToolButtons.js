import React, { Component } from 'react';

import {
    IconButton, MenuItem, IconMenu, SvgIcon, Divider, Subheader, List, ListItem, FontIcon, Paper, Avatar
} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// const SearchButton = (props) => (
//     <IconMenu
//       iconButtonElement={
//         <IconButton><MoreVertIcon /></IconButton>
//       }
//       targetOrigin={{horizontal: 'right', vertical: 'top'}}
//       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//     >
//       <MenuItem primaryText="Refresh" />
//       <MenuItem primaryText="Help" />
//       <MenuItem primaryText="Sign out" />
//     </IconMenu>
//   );
//   SearchButton.muiName = 'IconMenu';
//   export default SearchButton;

export default class ToolButtons extends Component {
    render() {
        return (<div><IconButton><ActionSearch color="#ffffff" /></IconButton>
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon color="#ffffff" />
                    </IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <MenuItem primaryText="刷新" onClick={(e)=>{
                    setTimeout(()=>{
                        window.location.reload();
                    },300);
                }}/>
                <MenuItem primaryText="帮助" />
                <MenuItem primaryText="Github" /></IconMenu>
        </div>)
    }
}