import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { name } from '../modules/orders';

@connect(state => ({
  name: name(state)
}))
export default class OrdersList extends React.Component {

  render() {
    const { children, name } = this.props;
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Заказ<sup>и</sup>Ко</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Пин-код" />
                </div>
                <button type="submit" className="btn btn-default">Создать заказ</button>
              </form>
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/tasks">Task list</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><p className="navbar-text">{name}</p></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          {children}
        </div>
      </div>
    )
  }
}
