import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import ReactSelect from './components/select/Select';

const options = [
    { value: 'mashhad', label: 'مشهد' },
    { value: 'tehran', label: 'تهران' },
    { value: 'esfahan', label: 'اصفهان' },
    { value: 'shiraz', label: 'شیراز' },
    { value: 'kerman', label: 'کرمان' },
    { value: 'karaj', label: 'کرج' },
    { value: 'kermanshah', label: 'کرمانشاه' },
    { value: 'sanandaj', label: 'سنندج' },
    { value: 'ahvaz', label: 'اهواز' },
]
export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // status: null,
            status: { value: 'mashhad', label: 'مشهد' },
        }

        this.reactSelectChange = this.reactSelectChange.bind(this);
    }

    reactSelectChange(selected) {
        console.log("reactSelectChange", selected);
        this.setState({
            status: selected
        });
    }

    render() {
        const { status } = this.state;
        return (
            <div className="mt-5">
                <div className="col-md-3 col-sm-7">
                    <ReactSelect
                        className="autoCompeletSelect"
                        value={status}
                        onChange={this.reactSelectChange}
                        options={options}
                        mobileMode={true}
                        placeholder="انتخاب کنید" />
                </div>
            </div>
        );
    }
}