import './App.css';
import React from 'react';

const STUDY_FUND_TAX_CEILING = 1178.4;
const MONTHLY_WORK_DAYS = 5 * 365 / (12 * 7);

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      salary: 0,
      stocks: 0,
      stockValue: 0,
      stockPrice: 0,
      isStudyFundTaxCeiling: true,
      yearlyBonus: 0,
      vacationDay: 12,
      tenBis: 0,
      isTenBisMonthly: true,
      travel: 0,
      isTravelMonthly: true,
    }
    this.usdToNis = 3.25;

    this.monthlyValue = this.calc();

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  calc() {
    var studyValue = this.state.salary * 0.075;
    if (this.state.isStudyFundTaxCeiling) {
      studyValue = Math.min(studyValue, STUDY_FUND_TAX_CEILING);
    }

    var tenBisValue = this.state.tenBis;
    if (!this.state.isTenBisMonthly) {
      tenBisValue *= MONTHLY_WORK_DAYS;
    }

    var travelValue = this.state.travel;
    if (!this.state.isTravelMonthly) {
      travelValue *= MONTHLY_WORK_DAYS;
    }

    const beforeVacation = this.state.salary * (1 + 0.125 + 1 / 12) // including pension and dismissal
      + this.state.stocks * this.usdToNis * (this.state.stockValue - this.state.stockPrice) / 48
      + studyValue
      + this.state.yearlyBonus / 12
      + tenBisValue
      + travelValue;
    return beforeVacation * (1 + this.state.vacationDay / (12 * MONTHLY_WORK_DAYS));
  }

  calc4realz() {
    return this.salary;
  }
  handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    if (name == "isStudyFundTaxCeiling" || name == "isTenBisMonthly" || name == "isTravelMonthly") {
      value = value == "true";
    } else {
      value = parseFloat(value);
    }
    this.setState({
      [name]: value
    });

  }

  render() {
    return (<div dir="rtl" onChange={this.handleInputChange}>
      <table>
        <tr>
          <td><label for="salary" class="form-label">משכורת חודשי </label></td>
          <td>
            <input class="form-control"type="number" id="salary" name="salary" value={this.state.salary} />
          </td>
        </tr>
        <tr>
          <td>
            <label for="stocks" class="form-label">
              מניות / אופציות במשך 4 שנים

            </label>
          </td>
          <td>
            <input class="form-control"type="number" id="stocks" name="stocks" value={this.state.stocks} />
          </td>
          <td>
            <label class="form-label">
              שווי מנייה בדולרים
            </label>
          </td>
          <td>
            <input class="form-control"type="number" id="stockValue" name="stockValue" value={this.state.stockValue} />
          </td>
          <td>
            <label class="form-label">
              עלות מימוש
            </label>
          </td>
          <td>
            <input class="form-control"type="number" id="stockPrice" name="stockPrice" value={this.state.stockPrice} />
          </td>
          <td>
            <label class="form-label">שער: {this.usdToNis}</label>
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label">
              קרן השתלמות
            </label>
          </td>
          <td>
            <select  class="form-select" id="isStudyFundTaxCeiling" name="isStudyFundTaxCeiling" value={this.state.isStudyFundTaxCeiling}>
              <option value="true">תקרת מס</option>
              <option value="false">לפי המשכורת</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label">
              בונוס שנתי
            </label>
          </td>
          <input class="form-control"type="number" id="yearlyBonus" name="yearlyBonus" value={this.state.yearlyBonus} />
        </tr>
        <tr>
          <td>
            <label class="form-label">
              ימי חופש
            </label>
          </td>
          <td>
            <input class="form-control"type="number" id="vacationDay" name="vacationDay" value={this.state.vacationDay} />
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label">
              תן ביס
            </label>
          </td>
          <td>
            <input class="form-control"type="number" id="tenBis" name="tenBis" value={this.state.tenBis} />
          </td>
          <td>
            <select  class="form-select" value="true" id="isTenBisMonthly" name="isTenBisMonthly" value={this.state.isTenBisMonthly}>
              <option value="true" >חודשי</option>
              <option value="false">יומי</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label">
              נסיעות
            </label>
          </td>
          <td>
            <input class="form-control"type="number" id="travel" name="travel" value={this.state.travel} />
          </td>
          <td>
            <select  class="form-select" id="isTravelMonthly" name="isTravelMonthly" value={this.state.isTravelMonthly}>
              <option value="true">חודשי</option>
              <option value="false">יומי</option>
            </select>
          </td>
        </tr>
      </table>
      <h1>שווי חודשי: {this.calc()}</h1>
    </div>);
  }
}

function App() {
  return <Calculator />
}



export default App;
