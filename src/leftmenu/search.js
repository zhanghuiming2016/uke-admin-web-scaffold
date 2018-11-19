import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';
import { Icon } from 'ukelli-ui';
import { Call } from 'basic-helper';

import { Link } from '../router-multiple';

const ESC_KEY = 27;

export default class SearchBox extends Component {
  static propTypes = {
    onChangeMenu: PropTypes.func,
    onToggleNav: PropTypes.func,
    showLeftMenu: PropTypes.bool,
    codeMapper: PropTypes.object,
  };
  constructor(props) {
    super(props);

    this.state = {
      searchMap: '',
      isShow: false,
    };
  }

  componentDidMount() {
    Mousetrap.bind(['alt+s'], e => {
      this._input.focus();
      if (!this.props.showLeftMenu) {
        this.shouldBeHidden = true;
        this.props.onToggleNav(true);
      }
      return false;
    });
  }

  componentWillUnmount() {
    Mousetrap.unbind(['alt+s']);
  }

  searchMenu(val) {
    this.setState({
      searchMap: val
    });
  }
  setSearchCon(isShow) {
    this.setState({
      isShow,
    });
  }

  handleEsc = e => {
    if (e.keyCode === ESC_KEY) {
      this._input.blur();
      if (this.shouldBeHidden) {
        this.shouldBeHidden = false;
        this.props.onToggleNav(false);
      }
    }
  };
  show = () => {
    this._input.focus();
  }
  render() {
    const { searchMap, isShow } = this.state;
    const { codeMapper, onChangeMenu } = this.props;
    const allCode = Object.keys(codeMapper) || [];
    return (
      <div 
        className={'search-container' + (isShow ? ' show-content' : '')}>
        <input
          ref={c => (this._input = c)}
          type="text"
          placeholder="搜索菜单，首字母组合更快哦"
          className="form-control input-sm"
          onChange={e => this.searchMenu(e.target.value)}
          onFocus={e => this.setSearchCon(true)}
          onBlur={e => {
            setTimeout(() => {
              this.setSearchCon(false);
              this.shouldBeHidden = false;
            }, 100);
          }}
          onKeyUp={this.handleEsc}/>
        <div className="hide-content">
          {
            allCode
              .filter(
                code => {
                  let item = codeMapper[code] || '';
                  return item.indexOf(searchMap) != -1 || code.indexOf(searchMap.toUpperCase()) != -1;
                }
              )
              .map((code, idx) => {
                return (
                  <Link
                    className="result-item"
                    key={idx}
                    to={code}
                    onClick={e => Call(onChangeMenu, code)}>
                    {codeMapper[code]}
                  </Link>
                );
              })
          }
        </div>
      </div>
    );
  }
}
