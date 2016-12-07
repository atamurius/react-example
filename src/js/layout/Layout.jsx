import React, { PropTypes as P } from 'react';

export default function OrdersList({ children }) {
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
                <a href="/orders">Orders</a>
              </li>
              <li>
                <a href="/tasks">Task list</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><p className="navbar-text">Аноним</p></li>
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
