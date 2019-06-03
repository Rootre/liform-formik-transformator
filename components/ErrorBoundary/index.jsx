import {Component} from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });

        console.error(error);
    }

    render() {
        if (this.state.error) {
            return null;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;