import React from "react";
import moment from "moment";
import { Table } from "antd";
import qs from "query-string";

import SearchBar from "./SearchBar";
import "./App.css";
import "antd/dist/antd.css";
import { ENDPOINT } from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchData({});
  }

  fetchData = searchObj => {
    fetch(`${ENDPOINT}?${qs.stringify(searchObj)}`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(e => console.log(e));
  };

  render() {
    const { data } = this.state;
    const columns = [
      {
        title: "Account Number",
        dataIndex: "accNo"
      },
      {
        title: "Account Name",
        dataIndex: "accName"
      },
      {
        title: "Date",
        dataIndex: "transactionDate",
        render: text => moment(text).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "Amount",
        dataIndex: "amount"
      }
    ];

    return (
      <div className="app-container">
        <SearchBar onSearch={searchObj => this.fetchData(searchObj)} />
        <Table
          columns={columns}
          dataSource={data}
          bordered
          expandable={{
            expandedRowRender: record => (
              <p style={{ margin: 0 }}>{record.paymentDetail}</p>
            )
          }}
        />
      </div>
    );
  }
}

export default App;
