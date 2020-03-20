import React from "react";
import { Button, Input, DatePicker } from "antd";

const { RangePicker } = DatePicker;

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      accNo: ""
    };
  }

  onRangePickerChange = dates => {
    if (dates) {
      this.setState({
        startDate: dates[0],
        endDate: dates[1]
      });
    } else {
      this.setState({
        startDate: null,
        endDate: null
      });
    }
  };

  onSearchClick = () => console.log(this.state);

  render() {
    const { startDate, endDate, accNo } = this.state;
    return (
      <div
        style={{
          display: "flex",
          minWidth: 500
        }}
      >
        <RangePicker
          value={[startDate, endDate]}
          onChange={this.onRangePickerChange}
          style={{
            marginRight: 20,
            width: "40%"
          }}
        />
        <Input
          placeholder="Account number"
          value={accNo}
          onChange={e => this.setState({ accNo: e.value })}
          style={{
            marginRight: 20,
            width: "40%"
          }}
        />
        <Button type="primary" onClick={this.onSearchClick}>
          Search
        </Button>
      </div>
    );
  }
}
