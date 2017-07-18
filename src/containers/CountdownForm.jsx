import React from 'react';

class CountdownForm extends React.Component{
  onSubmit = (e) =>{
    e.preventDefault();
    var strSeconds = this.seconds.value;

    console.log('input count', $('input').length);

    if(strSeconds.match(/^[0-9]*$/)){
      this.seconds.value = "";
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  }

  render(){
    return(
      <div>
        <form ref={(ref) => this.from = ref} onSubmit={this.onSubmit} className="countdown-form">
          <input type="text" ref={(ref) => this.seconds = ref} placeholder="Enter time in seconds" />
          <button className="button expanded">Start</button>
        </form>
      </div>
    )
  }
}

module.exports = CountdownForm;
