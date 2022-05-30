class Utils {
  normalizeAmount(text) {
    return text.replace('.', '').replace(',','.');
  }

  normalizeDay(date) {
    return date.split(' ')[0];
  }

  normalizeMonth(date) {
    const month = date.split(' ')[1]
    const months = {
      'Jan': '01',
      'Fev': '02',
      'Mar': '03',
      'Abr': '04',
      'Mai': '05',
      'Jun': '06',
      'Jul': '07',
      'Ago': '08',
      'Set': '09',
      'Out': '10',
      'Nov': '11',
      'Dez': '12'
    }

    return months[month];
  }

  normalizeYear(date) {
    const dateArray = date.split(' ');

    if (dateArray.length > 2) {
      return '20' + dateArray[2];
    }

    return new Date().getFullYear();
  }

  normalizeDate(date) {
    return this.normalizeYear(date) + this.normalizeMonth(date) + this.normalizeDay(date);
  }

  getChargesList() {
    const that = this;
    const charges = [];

    document.querySelectorAll('.charge:not([style=\'display:none\'])').forEach(function(charge){
      const date = that.normalizeDate(charge.querySelector('.time').textContent);
      const description = charge.querySelector('.description').textContent.trim();
      const amount = that.normalizeAmount(charge.querySelector('.amount').textContent);

      charges.push({ date, description, amount });
    });

    return charges;
  }
}