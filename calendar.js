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
  #month;
  #date;

  #init = () => {
    this.#year = this.defaultDate.getFullYear();
    this.#month = this.defaultDate.getMonth();
    this.#renderYearMonth();
  }

  #renderYearMonth = () => {
    const currentYearMonth = this.element.querySelector('.currentYearMonth');
    currentYearMonth.textContent = `${this.#year} - ${this.#month + 1}`
  }

  #getDaysInCurrentMonth = () => {
    return new Date(this.#year, this.#month, 0).getDate();
  }
}