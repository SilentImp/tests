import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Fetch } from '../../actions/Users';

import './Users.less';

class Users extends Component {


  static propTypes = {
    users: PropTypes.shape({
      loading: PropTypes.boolean,
      currentPage: PropTypes.number,
      pageCount: PropTypes.number,
      totalCount: PropTypes.number,
      perPage: PropTypes.number,
      data: PropTypes.array,
    }).isRequired,
    actions: PropTypes.shape({
      Fetch: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
  }

  static mapUsers = user => (<article key={user.id} className="User">
    <img alt="avatar" width="128" height="128" src={user.avatar} />
    <p>{`${user.first_name} ${user.last_name}`}</p>
  </article>)

  constructor(props) {
    super(props);
    this.props.actions.Fetch();
  }

  next = () => {
    this.props.actions.Fetch();
  }

  render() {
    if (!this.props.users || !this.props.users.data) return null;
    const components = this.props.users.data.map(Users.mapUsers);
    return (
      <article className="Users">
        {components}
        {(this.props.users.currentPage < this.props.users.pageCount) && <button
          disabled={this.props.users.loading}
          onClick={this.next}
          type="button"
          className="Users__more"
        >
            more
          </button>
        }
      </article>);
  }
}

function mapStateToProps(state) {
  return {
    users: state.Users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      Fetch: bindActionCreators(Fetch, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
