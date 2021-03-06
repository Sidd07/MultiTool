
import React, { Component } from 'react';
import './style.css';
import CalenderUI from './calenderUi';
import Modal from 'react-modal';
import StickyNote from '../stickynotes/stickynote';
import axios from 'axios';


Modal.setAppElement('#root');
class Calender extends Component {

    constructor(props) {
        super(props)
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.data = this.data.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshDate = this.refreshDate.bind(this)
        this.showMonthView = this.showMonthView.bind(this)
        this.selectMonth = this.selectMonth.bind(this)

        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        this.monthText = '';
        this.optional = false
        this.date = new Date()
        this.currnetMonth = new Date().getMonth()
        this.months.forEach((element) => {
            if (this.months.indexOf(element) === this.currnetMonth) {
                this.monthText = element
            }
        })

        this.state = { month: this.monthText, date: this.date, modalIsOpen: false, selectedDate: '', monthView: false }
    }
    refreshDate = () => {
        this.currnetMonth = new Date().getMonth()
        this.setState(state => ({
            month: this.monthText,
            date: this.date,
            monthView: false
        }))
      
    }
    showMonthView = () => {
        console.log('im show month')
        this.setState(state => ({
            monthView: true,
            month: this.monthText
        }))
    }

    changeMonth = (arrow) => {
        if (arrow === 'left') {
            if (this.currnetMonth !== 0) {
                this.currnetMonth = this.currnetMonth - 1;
                this.months.forEach((element) => {
                    if (this.months.indexOf(element) === this.currnetMonth) {
                        if (this.currnetMonth === new Date().getMonth() && this.state.date.getFullYear() === new Date().getFullYear()) {
                            this.setState(state => ({
                                month: element,
                                date: new Date()
                            }))
                        }
                        else {
                            this.setState(state => ({
                                month: element,
                                date: new Date(`${element}/1/${this.state.date.getFullYear()}`)
                            }))
                        }
                    }
                });
            } else {
                this.changeYear(arrow)
            }

        } else {
            if (this.currnetMonth !== 11) {
                this.currnetMonth = this.currnetMonth + 1;
                this.months.forEach((element) => {
                    if (this.months.indexOf(element) === this.currnetMonth) {
                        if (this.currnetMonth === new Date().getMonth() && this.state.date.getFullYear() === new Date().getFullYear()) {
                            console.log("im state", this.state.date)
                            this.setState(state => ({
                                month: element,
                                date: new Date()
                            }))
                        } else {
                            this.setState(state =>
                                ({

                                    month: element,
                                    date: new Date(`${element}/1/${this.state.date.getFullYear()}`)
                                }))
                        }
                    }
                });
            } else {
                this.changeYear(arrow)
            }
        }

        this.data()

    }

    selectMonth = (month) => {
        this.currnetMonth = this.months.indexOf(month)   
        if (this.monthText == month) {           
            console.log( 'im select month',this.currnetMonth)
            this.setState(state => ({
                month:month,
                date: new Date(),
                monthView: false
            }))
            
        }
        else {      
            this.setState(state => ({                
                month: month,
                date: new Date(`${month}/1/${this.state.date.getFullYear()}`),
                monthView: false
            }))

        }
    }

    changeYear = (arrow) => {
        if (arrow === 'right') {
            this.currnetMonth = 0
            this.setState(this.setState(state => ({
                month: 'January',
                date: new Date(`1/1/${this.state.date.getFullYear() + 1}`)
            })))
        } else {
            this.currnetMonth = 11
            this.setState(this.setState(state => ({
                month: 'December',
                date: new Date(`12/1/${this.state.date.getFullYear() - 1}`)
            })))
        }
        this.data()
    }


    openModal(date, month, year) {

        console.log('im date', date, month, year)
        this.setState(state => ({ modalIsOpen: true, selectedDate: `${date}/${month}/${year}` }))
    }

    afterOpenModal() {

        this.subtitle.style.color = '#000';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    data = () => {
        var calender = {};
        var now_time = this.state.date
        console.log(now_time)
        var now_date = now_time.getDate();
        var now_year = now_time.getFullYear();
        var now_month = now_time.getMonth();
        var m = now_month === 12 ? 1 : parseInt(now_month) + 1;
        var d = new Date(now_year, m, 0);
        calender.days_num = d.getDate();

        console.log('im d get date ()', d.getDate())

        if (now_date !== 1) {
            var first_time = new Date(now_year, now_month, 1);
            calender.first_day = first_time.getDay();

        } else {
            calender.first_day = now_time.getDay();
        }
        let html = []
        let num_for = 1;
        let flag = false;
        for (var week = 1; week <= 6; week++) {
            let days = []
            for (var day = 0; day <= 6 && num_for <= calender.days_num; day++) {
                if (day >= calender.first_day || flag) {
                    if (num_for === now_date && now_time.getMonth() === new Date().getMonth() && now_time.getFullYear() === new Date().getFullYear()) {
                        days.push(<div className="item today" onClick={e => this.openModal(e.target.innerText, m, now_year)}> {num_for}</div>);
                    } else {
                        if (day === 0 || day === 6) {
                            days.push(<div className="item holiday" id='selectedDate' data-toggle="modal" data-target="#exampleModal" onClick={e => this.openModal(e.target.innerText, m, now_year)} >{num_for}</div>);
                        } else {
                            days.push(<div className="item " onClick={e => this.openModal(e.target.innerText, m, now_year)}> {num_for}</div>);
                        }
                    }

                    flag = true;
                    num_for++;
                } else {
                    days.push(<div className="item"></div>);
                }

            }
            html.push(<div className="row">{days}</div>)
        }

        return html
    }




    render() {

        return (
            <div>
                <br />
                {/* <center><h1>Hi, I'm Calender!</h1></center> */}
                <br />
                <CalenderUI data={this.data()}
                    month={this.state.month}
                    date={this.state.date}
                    onClick={this.changeMonth}
                    refreshDate={this.refreshDate}
                    showMonthView={this.showMonthView}
                    isMonthView={this.state.monthView}
                    months={this.months}
                    selectMonth={this.selectMonth}
                ></CalenderUI>

                {this.state.modalIsOpen ?
                    <StickyNote isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal} selectedDate={this.state.selectedDate}
                    ></StickyNote> : null}
            </div>
        );
    }
}
export default Calender;
