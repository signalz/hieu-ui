import React from "react";

const Info = ({ label, data }) => (
  <div>
    <span style={{ fontWeight: "bold" }}>{label}</span> <span>: {data}</span>
  </div>
);

export default class Details extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        {Object.keys(data).map(key => (
          <Info key={key} label={key} data={data[key]} />
        ))}
      </div>
    );
  }
}
