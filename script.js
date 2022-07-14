class Calendar {
  constructor({
    defaultDate
  }) {
    if (defaultDate instanceof Date) {
      this.defaultDate = defaultDate
    } else {
      this.defaultDate = new Date();
    }

    this.#init();
  }

  // private properties
  #year;
  #month;
  #date;

  #init = () => {
    this.#year = this.defaultDate.getFullYear();
    this.#month = this.defaultDate.getMonth() + 1;
  }

  #renderYearMonth = () => {
    
  }
}