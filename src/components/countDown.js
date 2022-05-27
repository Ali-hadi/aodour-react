import React from 'react';
import moment from 'moment';

export default class Countdown extends React.Component {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  };

  componentDidMount() {

   let eventTime = moment(this.props.timeTillDate, 'DD-MM-YYYY HH:mm:ss').unix();
   let currentTime = moment().unix();
   let diffTime = eventTime - currentTime;
   let duration = moment.duration(diffTime * 1000, 'milliseconds');
   let  interval = 1000;

if(diffTime > 0) {
  this.interval = setInterval(() => {
        duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
        var d = moment.duration(duration).days(),
            h = moment.duration(duration).hours(),
            m = moment.duration(duration).minutes(),
            s = moment.duration(duration).seconds();

            d = d.toString().length === 1 ? "0" + d : d;
            h = h.toString().length === 1 ? "0" + h : h;
            m = m.toString().length === 1 ? "0" + m : m;
            s = s.toString().length === 1 ? "0" + s : s;   

        this.setState({ days: d, hours: h, minutes: m, seconds: s });
        // show how many hours, minutes and seconds are left

    }, 1000);
}else{
  this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    if (!seconds) {
      return null;
    }

    return (

      <>
        {
          this.props.withDays ? <li><h4>{days}</h4><span>days</span></li> : null
        }
      <li><h4>{hours}</h4><span>Hours</span></li>
      <li><h4>{minutes}</h4><span>minutes</span></li>
      <li><h4>{seconds}</h4><span>seconds</span></li>
    </>
    )
  }
}