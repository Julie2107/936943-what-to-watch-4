import React, {PureComponent} from "react";

import {TabType} from "../consts";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentTab: TabType.OVERVIEW,
      };

      this._handleTabClick = this._handleTabClick.bind(this);
    }

    _handleTabClick(tab) {
      this.setState({
        currentTab: tab,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeTab = {this.state.currentTab}
          onTabClick={this._handleTabClick}
        >
        </Component>
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
