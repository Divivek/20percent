import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

// actions
import {
  fetchRegisterPhone,
} from './actions';


class RegisterPhone extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      name : '',
      code : null,
      phone : '',

      registering : false,
      verification : false,
    };

    this.onName = this.onName.bind(this);
    this.onPhone = this.onPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(newProps) {
    
  }

  onPhone(phone) {
    this.setState({
      phone : phone,
    });
  }

  onName(name) {
    this.setState({
      name : name,
    });
  }

  onCode(code) {
    this.setState({
      code : code,
    });
  }

  async onSubmit() {
    // submit
    this.setState({
      registering : true,
    });

    // log
    const done = await new Promise((resolve) => this.props.fetchRegisterPhone(this.state.name, this.state.phone, this.state.code, resolve));

    // redirect
    if (done.user) {
      window.location = '/';
    }

    // submit
    this.setState({
      registering  : false,
      verification : true,
    });
  }

  render() {
    const {
      error,
    } = this.props;
    const {
      registering,
      verification,
    } = this.state;

    if (error) {
      return <div className={styles.errorMsg}>{ error }</div>;
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.container)}>
        <Helmet><title>{`Register by Phone | 20Percent`}</title></Helmet>

        { verification ? (
          <div className={appLayout.primaryContent}>
            <input
              key={'code'}
              type="text"
              className={styles.titleInput}
              placeholder={'Verification Code'}
              onChange={(event) => { this.onCode(event.target.value); }}
            />

            <button onClick={(event) => { this.onSubmit(event); }} className={styles.buttonInput}>
              { registering ? 'Submitting...' : 'Submit' }
            </button>
          </div>
        ) : (
          <div className={appLayout.primaryContent}>
            <input
              key={'phone'}
              type="text"
              className={styles.titleInput}
              placeholder={'Phone Number'}
              onChange={(event) => { this.onPhone(event.target.value); }}
            />
            <input
              key={'name'}
              type="text"
              className={styles.titleInput}
              placeholder={'Name'}
              onChange={(event) => { this.onName(event.target.value); }}
            />

            <button onClick={(event) => { this.onSubmit(event); }} className={styles.buttonInput}>
              { registering ? 'Registering...' : 'Register' }
            </button>
          </div>
        ) }
        
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    
  }; },
  (dispatch) => { return {
    fetchRegisterPhone: (name, phone, code, resolve) => { dispatch(fetchRegisterPhone(name, phone, code, resolve)); },
  }; }
)(RegisterPhone);
