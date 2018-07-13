class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        }
        this.start = this.start.bind(this);
        this.step = this.step.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.restart = this.restart.bind(this);
    }
    reset() {
        this.setState({
        times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
        })
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if (!this.state.running) {
            this.setState ({
                running: true
            })
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (!this.state.running) {
            return;
        }
        this.calculate();
    }
    calculate() {
		const times = this.state.times;
		    times.miliseconds += 1;
		    if (times.miliseconds >= 100) {
		        times.seconds += 1;
		        times.miliseconds = 0;
		    }
		    if (times.seconds >= 60) {
		        times.minutes += 1;
		        times.seconds = 0;
		    }
		    this.setState ({
                times
            })
	}
    stop() {
        this.setState({
            running: false
        })
        clearInterval(this.watch);
    }
    restart() {
        this.reset();
    }
    render() {
        return (
            <div>
                <nav className="controls">
                    <button 
                        className="btn btn-success" 
                        id="start"
                        onClick={this.start}>Start</button>
                    <button 
                        className="btn btn-success" 
                        id="stop"
                        onClick={this.stop}>Stop</button>
                    <button 
                        className="btn btn-danger" 
                        id="restart"
                        onClick={this.restart}>Restart</button>
                </nav>
                <div className="timer">
                    <div className="stopwatch">
                    {this.format(this.state.times)}</div>
                </div>
            </div>
       ) 
    }
}
const pad0 = (value) => {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
  );