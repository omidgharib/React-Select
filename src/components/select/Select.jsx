import React, { Component } from "react";
import { isMobile } from 'react-device-detect';
import SelectItem from './SelectItem';
import "./style/select.css";

export default class ReactSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterText: "",
            data: [],
            isOpen: false,
            selectedItem: null
        };

        this.selected = this.selected.bind(this);
        this.filterTextChanged = this.filterTextChanged.bind(this);
        this.openList = this.openList.bind(this);
        this.clickOutSide = this.clickOutSide.bind(this);
    }

    componentDidMount() {
        window.addEventListener("click", this.clickOutSide);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.clickOutSide.bind(this));
    }


    clickOutSide(e) {
        this.setState({
            isOpen: false,
            filterText: ""
        });
    }

    selected(data) {
        if (this.props.onChange) {
            this.props.onChange(data);
            this.setState({
                selectedItem: data,
                isOpen: false,
                filterText: ""
            });
        }
    }

    openList(e) {
        e.stopPropagation(); // prevent click event ( clickOutSide will not be happen )
        const { isOpen } = this.state;
        if (!isOpen) {
            setTimeout(function () {
                this.refs.selectInput.focus();
            }.bind(this), 50);
        }
        this.setState({
            isOpen: !isOpen
        });
    }

    filterTextChanged(e) {
        this.setState({
            filterText: e.target.value
        });
    }

    filterItemsByLabelText(text) {
        const { options } = this.props;
        let result = [];
        text = this.fixNumbers(text);
        if (options.length > 0) {
            for (let i = 0; i < options.length; i++) {
                const item = options[i];
                if (item.label && item.label.includes(text)) {
                    result.push(item);
                }
            }
        }
        return result;
    }

    fixNumbers(str) {
        const
            persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
            engNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
        if (typeof str === 'string') {
            for (var i = 0; i < 10; i++) {
                str = str.replace(persianNumbers[i], i).replace(engNumbers[i], i);
            }
        }
        return str;
    }

    render() {
        const { filterText, isOpen, selectedItem } = this.state;
        const { options, placeholder, className, value, inputClassName, mobileMode } = this.props;
        const items = [];
        let listSizeHeight = 0;
        const itemSelected = value || selectedItem;
        if (isOpen) {
            let data = options;
            if (filterText.length > 0) {
                data = this.filterItemsByLabelText(filterText);
            }

            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let isSelected = false;
                if (itemSelected.value === item.value) {
                    isSelected = true;
                }
                items.push(<SelectItem key={i} data={item} selected={this.selected} isSelected={isSelected} mobileMode={mobileMode} />);
            }
            if (items.length < 5) {
                listSizeHeight = items.length * 37;
            }
            else {
                listSizeHeight = 5 * 37;
            }
        }
        if (isMobile && mobileMode && isOpen) {
            return (
                <div className="select-container-overlay mobile-mode ">
                    <div className={"select-container position-relative " + (isOpen ? "is-open " : " ") + (className ? className : "")} >
                        <div className={"select-input-content "} onClick={this.openList} >
                            <div className={"position-absolute pr-2 "}>{(filterText.length === 0 && itemSelected) ? itemSelected.label : ""}</div>
                            <input className={"select-input pr-2 border-bottom " + (inputClassName ? inputClassName : "")} autoCapitalize="none"
                                autoComplete="off" autoCorrect="off" id="select-input" ref="selectInput" spellCheck="false" tabIndex="0"
                                type="text" aria-autocomplete="list" onChange={this.filterTextChanged} value={filterText}
                            />
                            <div aria-hidden="true" className="position-absolute select-input-close" onClick={this.clickOutSide}>
                                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g id="cancel-music" transform="translate(0 0)"><path id="Path_962" data-name="Path 962" d="M8.664,7l4.992-4.992A1.177,1.177,0,0,0,11.992.344L7,5.336,2.009.344A1.177,1.177,0,0,0,.345,2.008L5.336,7,.345,11.991a1.177,1.177,0,1,0,1.664,1.664L7,8.663l4.992,4.992a1.177,1.177,0,0,0,1.664-1.664Z" transform="translate(0)" fill="%234A4A4A" fillRule="evenodd" /></g></svg>
                            </div>
                        </div>
                    </div>
                    {
                        (isOpen && items.length > 0) ?
                            <div className="select-list position-absolute border-bottom " >
                                {items}
                            </div>
                            : null
                    }
                </div>
            );
        }
        return (
            <div className={"select-container position-relative " + (isOpen ? "is-open " : " ") + (className ? className : "")} >
                <div className={"select-input-content "} onClick={this.openList} >
                    <div className={"position-absolute pr-2 "}>{(filterText.length === 0 && itemSelected) ? itemSelected.label : (filterText.length === 0 && placeholder ? placeholder : "")}</div>
                    <input className={"select-input pr-2 " + (inputClassName ? inputClassName : "")} autoCapitalize="none"
                        autoComplete="off" autoCorrect="off" id="select-input" ref="selectInput" spellCheck="false" tabIndex="0"
                        type="text" aria-autocomplete="list" onChange={this.filterTextChanged} value={filterText}
                    />
                    <div aria-hidden="true" className="position-absolute select-input-arrow">
                        {
                            isMobile ?
                                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g id="search"><path fill="%23707070" d="M14.286,12.571h-.914l-.343-.343a7.153,7.153,0,0,0,1.829-4.8,7.429,7.429,0,1,0-7.429,7.429,7.153,7.153,0,0,0,4.8-1.829l.343.343v.914L18.286,20,20,18.286Zm-6.857,0a5.143,5.143,0,1,1,5.143-5.143A5.121,5.121,0,0,1,7.429,12.571Z" /></g></svg>
                                : <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                        }
                    </div>
                </div>
                {
                    (isOpen && items.length > 0) ?
                        <div className="select-list position-absolute border rounded " style={{ height: listSizeHeight + "px" }} >
                            {items}
                        </div>
                        : null
                }
            </div>
        );
    }
};