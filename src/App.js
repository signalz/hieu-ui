import React from "react";
import moment from "moment";
import { Table, message } from "antd";
import qs from "query-string";

import SearchBar from "./SearchBar";
import Details from "./Details";
import "./App.css";
import "antd/dist/antd.css";
import { ENDPOINT } from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      requestDuration: 0,
    };
  }

  fetchData = (searchObj) => {
    const { accNo, startDate, endDate } = searchObj;
    const queryObj = {
      accNo: accNo || null,
      from: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      to: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
    };
    const startRequestTime = moment();
    message.loading("Loading data ...", 1);
    fetch(`${ENDPOINT}?${qs.stringify(queryObj)}`)
      .then((res) => {
        this.setState({
          requestDuration: moment() - startRequestTime,
        });
        return res.ok ? res.json() : Promise.reject("Something wrong");
      })
      .then((data) => {
        this.setState({ data });
        message.success("Load data successfully");
      })
      .catch((e) => message.error(e));
  };

  render() {
    const { data } = this.state;
    const columns = [
      {
        title: "Account Number",
        dataIndex: "accNo",
      },
      {
        title: "Account Name",
        dataIndex: "accName",
      },
      {
        title: "Date",
        dataIndex: "transactionDate",
        render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "Amount",
        dataIndex: "amount",
      },
    ];

    return (
      <div className="app-container">
        <SearchBar onSearch={(searchObj) => this.fetchData(searchObj)} />
        <Table
          columns={columns}
          dataSource={data}
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{<Details data={record} />}</p>
            ),
          }}
        />
        <div>
          <span>Request duration time: </span>
          <span>{this.state.requestDuration} ms</span>
        </div>
      </div>
    );
  }
}

export default App;
