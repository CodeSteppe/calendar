class Calendar {
  constructor({
    element,
    defaultDate
  }) {
    if (defaultDate instanceof Date) {
      this.defaultDate = defaultDate
    } else {
      this.defaultDate = new Date();
    }
    if (element instanceof HTMLElement) {
      this.element = element;
    }

    this.#init();
  }

  // private properties
  #year;
  // start from 1
  #month;
  #date;

  #init = () => {
    const defaultYear = this.defaultDate.getFullYear();
    const defaultMonth = this.defaultDate.getMonth() + 1;
    this.#setYearMonth(defaultYear, defaultMonth);
    this.#listenEvents();
  }

  #listenEvents = () => {
    // DOMS
    const lastYearButton = this.element.querySelector('.lastYear');
    const lastMonthButton = this.element.querySelector('.lastMonth');
    const nextYearButton = this.element.querySelector('.nextYear');
    const nextMonthButton = this.element.querySelector('.nextMonth');
    // last year
    lastYearButton.addEventListener('click', () => {
      this.#year--;
      this.#setYearMonth(this.#year, this.#month);
    });
    // next year
    nextYearButton.addEventListener('click', () => {
      this.#year++;
      this.#setYearMonth(this.#year, this.#month);
    });
    // last month
    lastMonthButton.addEventListener('click', () => {
      if (this.#month === 1) {
        this.#month = 12;
        this.#year--;
      } else {
        this.#month--;
      }
      this.#setYearMonth(this.#year, this.#month);
    });
    // next month
    nextMonthButton.addEventListener('click', () => {
      if (this.#month === 12) {
        this.#month = 1;
        this.#year++;
      } else {
        this.#month++
      }
      this.#setYearMonth(this.#year, this.#month);
    });
    // click dates
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('date')) {
        console.log(e.target.dataset.date);
      }
    });
  }

  #setYearMonth = (year, month) => {
    this.#year = year;
    this.#month = month;
    // the only place to do renders
    this.#renderYearMonth();
    this.#renderDates();
  }

  #renderYearMonth = () => {
    const currentYearMonth = this.element.querySelector('.currentYearMonth');
    currentYearMonth.textContent = `${this.#year} - ${this.#month}`
  }

  #getLastMonthInfo = () => {
    let lastMonth = this.#month - 1;
    let yearOfLastMonth = this.#year;
    if (lastMonth === 0) {
      lastMonth = 12;
      yearOfLastMonth -= 1;
    }
    let dayCountInLastMonth = this.#getDayCount(yearOfLastMonth, lastMonth);

    return {
      lastMonth,
      yearOfLastMonth,
      dayCountInLastMonth
    }
  }

  #getNextMonthInfo = () => {
    let nextMonth = this.#month + 1;
    let yearOfNextMonth = this.#year;
    if (nextMonth === 13) {
      nextMonth = 1;
      yearOfNextMonth += 1;
    }
    let dayCountInNextMonth = this.#getDayCount(yearOfNextMonth, nextMonth);

    return {
      nextMonth,
      yearOfNextMonth,
      dayCountInNextMonth
    }
  }

  #renderDates = () => {
    // DOM
    const datesEL = this.element.querySelector('.dates');
    datesEL.innerHTML = '';

    const dayCountInCurrentMonth = this.#getDayCount(this.#year, this.#month);
    const firstDay = this.#getDayOfFirstDate();
    const { lastMonth, yearOfLastMonth, dayCountInLastMonth } = this.#getLastMonthInfo();
    const { nextMonth, yearOfNextMonth } = this.#getNextMonthInfo();

    for (let i = 1; i <= 42; i++) {
      const dateEL = document.createElement('button');
      dateEL.classList.add('date');
      let dateString;
      let date;
      if (firstDay > 1 && i < firstDay) {
        // dates in last month
        date = dayCountInLastMonth - (firstDay - i) + 1;
        dateString = `${yearOfLastMonth}-${lastMonth}-${date}`;
      } else if (i >= dayCountInCurrentMonth + firstDay) {
        // dates in next month
        date = i - (dayCountInCurrentMonth + firstDay) + 1;
        dateString = `${yearOfNextMonth}-${nextMonth}-${date}`;
      } else {
        // dates in currrent month
        date = i - firstDay + 1;
        dateString = `${this.#year}-${this.#month}-${date}`;
        dateEL.classList.add('currentMonth');
      }
      dateEL.textContent = date;
      dateEL.dataset.date = dateString;
      datesEL.append(dateEL);
    }
  }

  /**
   * Get day count with year, month
   * @param {number} year year number
   * @param {number} month month number that starts from 1
   * @returns 
   */
  #getDayCount = (year, month) => {
    return new Date(year, month, 0).getDate();
  }

  #getDayOfFirstDate = () => {
    let day = new Date(this.#year, this.#month - 1, 1).getDay();
    return day === 0 ? 7 : day;
  }
}